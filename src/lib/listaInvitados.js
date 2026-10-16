import { RESTRICCIONES, ETIQUETA_RESTRICCION } from './restricciones.js';

/**
 * La lista de invitados, sin red: leer lo que se pega, resumir, filtrar,
 * exportar. Vive aparte de guestService para poder probarse sin Supabase.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TELEFONO = /^\+?[\d\s().-]{6,30}$/;

/**
 * De un texto pegado a una lista de invitados.
 *
 * El cliente no va a cargar cien nombres de a uno en un formulario: los tiene
 * en un papel, en una nota del telefono o en un Excel. Pega y listo.
 *
 * Un nombre por linea. Tres formas de escribirla:
 *
 *   Juan Pérez, 1                       nombre y cupo (cuantos puede traer)
 *   Ana Ruiz, ana@acme.com, 1155551234  con coma: si hay un mail, cada dato se
 *                                       reconoce por lo que es, en cualquier orden
 *   Ana Ruiz <TAB> Acme <TAB> ana@...   pegado desde Excel: lo mismo, por tabs
 *
 * Los datos de contacto se reconocen por su forma y no por su posicion: un mail
 * tiene arroba, un telefono son digitos, un cupo son uno o dos digitos y lo que
 * sobra es la empresa. Asi no importa en que orden estan las columnas de la
 * planilla de quien organiza.
 */
export function parsearLista(texto) {
  const lineas = texto
    .split('\n')
    .map((linea) => linea.trim())
    .filter(Boolean);

  // Una planilla copiada trae su encabezado. No es un invitado.
  if (lineas.length && /^nombre( y apellido)?(\t|,|$)/i.test(lineas[0])) lineas.shift();

  return lineas.map(parsearLinea);
}

function parsearLinea(linea) {
  const porTabs = linea.includes('\t');
  const celdas = (porTabs ? linea.split('\t') : linea.split(',')).map((c) => c.trim());

  // Con coma y sin mail se conserva lo de siempre: sólo cuenta como cupo si lo
  // que sigue a la ultima coma es un numero. Asi "Pérez, Juan" no se interpreta
  // como una empresa llamada "Juan".
  if (!porTabs && !celdas.some((c) => c.includes('@'))) {
    const coma = linea.lastIndexOf(',');
    if (coma > 0) {
      const posible = linea.slice(coma + 1).trim();
      if (/^\d+$/.test(posible)) {
        return { name: linea.slice(0, coma).trim().slice(0, 120), max_companions: Number(posible) };
      }
    }
    return { name: linea.slice(0, 120), max_companions: 0 };
  }

  const [nombre, ...resto] = celdas;
  const invitado = { name: nombre.slice(0, 120), max_companions: 0 };
  const sobrantes = [];

  for (const celda of resto) {
    if (!celda) continue;
    if (celda.includes('@')) {
      // Un mail mal escrito se descarta: la base rechaza la carga entera si uno
      // solo no pasa su control.
      if (!invitado.email && EMAIL.test(celda) && celda.length <= 254) invitado.email = celda;
    } else if (/^\d{1,2}$/.test(celda)) {
      invitado.max_companions = Number(celda);
    } else if (TELEFONO.test(celda) && celda.replace(/\D/g, '').length >= 6) {
      if (!invitado.phone) invitado.phone = celda;
    } else {
      sobrantes.push(celda);
    }
  }
  if (sobrantes.length) invitado.company = sobrantes.join(' ').slice(0, 120);
  return invitado;
}

/**
 * Un telefono tal como lo escribe la gente, al formato que pide wa.me: sólo
 * digitos, con codigo de pais.
 *
 * Supone numeros argentinos de celular con codigo de area y sin el 15 ("11
 * 5555-1234"). Lo que viene con "+" se respeta tal cual: ya trae su pais.
 */
export function normalizarTelefono(telefono) {
  if (!telefono) return '';
  const digitos = telefono.replace(/\D/g, '');
  if (telefono.trim().startsWith('+')) return digitos;
  let d = digitos.replace(/^00/, '').replace(/^0/, '');
  if (d.startsWith('54')) return d.startsWith('549') ? d : `549${d.slice(2)}`;
  return d.length === 10 ? `549${d}` : d;
}

/** El numero que va al salon, y el que dice a quien hay que perseguir. */
export function resumirInvitados(invitados) {
  const confirmados = invitados.filter((g) => g.status === 'confirmado');
  return {
    invitados: invitados.length,
    confirmados: confirmados.length,
    rechazados: invitados.filter((g) => g.status === 'rechazado').length,
    pendientes: invitados.filter((g) => g.status === 'pendiente').length,
    // Cada confirmado es él más los que trae.
    personas: confirmados.reduce((suma, g) => suma + 1 + (g.companions || 0), 0),
  };
}

/**
 * Cuantos confirmados tienen cada restriccion: el dato que se le pasa al
 * catering. Cuenta al invitado, no a sus acompañantes: de ellos no se sabe.
 */
export function resumirRestricciones(invitados) {
  const confirmados = invitados.filter((g) => g.status === 'confirmado');
  return RESTRICCIONES
    .map((r) => ({
      id: r.id,
      label: r.label,
      cantidad: confirmados.filter((g) => (g.dietary || []).includes(r.id)).length,
    }))
    .filter((r) => r.cantidad > 0);
}

/** estado: 'todos' | 'confirmado' | 'rechazado' | 'pendiente'. */
export function filtrarInvitados(invitados, { estado = 'todos', conRestricciones = false } = {}) {
  return invitados.filter((g) => {
    if (estado !== 'todos' && g.status !== estado) return false;
    if (conRestricciones && !(g.dietary?.length || g.dietary_notes)) return false;
    return true;
  });
}

const TEXTO_ESTADO = { confirmado: 'Confirmó', rechazado: 'No viene', pendiente: 'Sin responder' };

// Una celda que empieza con = + - @ la ejecuta Excel como formula. Los nombres
// y las aclaraciones los escribe el invitado, asi que se neutraliza.
function celdaCsv(valor) {
  let texto = valor == null ? '' : String(valor);
  if (/^[=+\-@\t\r]/.test(texto)) texto = `'${texto}`;
  return `"${texto.replace(/"/g, '""')}"`;
}

/**
 * La lista para abrir en Excel. Separa con punto y coma y lleva BOM: es lo que
 * Excel en español espera; con comas y sin BOM abre todo en una sola columna y
 * rompe las tildes.
 */
export function invitadosACsv(invitados, origen) {
  const encabezado = [
    'Nombre', 'Empresa', 'Email', 'Teléfono', 'Estado', 'Acompañantes',
    'Restricciones', 'Aclaraciones', 'Enlace',
  ];
  const filas = invitados.map((g) => [
    g.name,
    g.company,
    g.email,
    g.phone,
    TEXTO_ESTADO[g.status] || g.status,
    g.status === 'confirmado' ? g.companions || 0 : '',
    (g.dietary || []).map((id) => ETIQUETA_RESTRICCION[id] || id).join(', '),
    g.dietary_notes,
    `${origen}/i/${g.slug}?i=${g.token}`,
  ]);
  return '﻿' + [encabezado, ...filas].map((f) => f.map(celdaCsv).join(';')).join('\r\n');
}
