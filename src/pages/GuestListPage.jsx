import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addGuests, listGuests, markGuestsSent, removeGuest } from '../lib/guestService';
import {
  filtrarInvitados, invitadosACsv, normalizarTelefono, parsearLista,
  resumirInvitados, resumirRestricciones,
} from '../lib/listaInvitados';
import { ETIQUETA_RESTRICCION } from '../lib/restricciones';
import './GuestListPage.css';

/**
 * Mis invitados — la pantalla premium+.
 *
 *   /invitados/:token
 *
 * Sin cuenta: el mismo token de la tarjeta. El cliente carga su lista y, en el
 * mismo momento, tiene el enlace personalizado de cada invitado para mandarle.
 * Ese "en el mismo momento" es lo que se vende contra el "mandámela y te la
 * cargo mañana".
 *
 * Lo que la hace distinta de la confirmación base: acá se ve QUIÉN FALTA. Es la
 * pregunta que desvela a alguien dos semanas antes del evento, y la que ningún
 * WhatsApp suelto puede responder. Y para un evento con catering, qué come cada
 * uno: el resumen de restricciones es lo que se le pasa al proveedor.
 */

const ESTADOS = {
  confirmado: { texto: 'Viene',    clase: 'is-si' },
  rechazado:  { texto: 'No viene', clase: 'is-no' },
  pendiente:  { texto: 'Sin responder', clase: 'is-pendiente' },
};

const FILTROS = [
  { id: 'todos', texto: 'Todos' },
  { id: 'pendiente', texto: 'Sin responder' },
  { id: 'confirmado', texto: 'Vienen' },
  { id: 'rechazado', texto: 'No vienen' },
];

const MENSAJE_INICIAL =
  'Hola {nombre}, te invitamos a nuestro evento. Ahí mismo podés ver los detalles y confirmar tu asistencia: {enlace}';

function fechaCorta(iso) {
  return new Date(iso).toLocaleDateString('es-AR', { day: 'numeric', month: 'short' });
}

function Invitado({ invitado, origen, slug, mensaje, onQuitar, onEnviado }) {
  const [copiado, setCopiado] = useState(false);
  const estado = ESTADOS[invitado.status] || ESTADOS.pendiente;
  const enlace = `${origen}/i/${slug}?i=${invitado.token}`;

  const texto = encodeURIComponent(
    mensaje.replaceAll('{nombre}', invitado.name).replaceAll('{enlace}', enlace)
  );
  // Con teléfono cargado el chat se abre directo con esa persona; sin él, el
  // celular pregunta a quién mandárselo.
  const telefono = normalizarTelefono(invitado.phone);
  const hrefWa = `https://wa.me/${telefono}?text=${texto}`;

  async function copiar() {
    await navigator.clipboard.writeText(enlace);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 1600);
  }

  const contacto = [invitado.company, invitado.email, invitado.phone].filter(Boolean);
  const restricciones = (invitado.dietary || []).map((id) => ETIQUETA_RESTRICCION[id] || id);

  return (
    <li className={`inv-list__fila ${estado.clase}`}>
      <div className="inv-list__datos">
        <p className="inv-list__nombre">
          {invitado.name}
          {invitado.max_companions > 0 && (
            <span className="inv-list__cupo">+{invitado.max_companions}</span>
          )}
        </p>
        {contacto.length > 0 && <p className="inv-list__contacto">{contacto.join(' · ')}</p>}
        <p className="inv-list__estado">
          {estado.texto}
          {invitado.status === 'confirmado' && invitado.companions > 0 && ` con ${invitado.companions}`}
          {invitado.notes && <span className="inv-list__notas"> · {invitado.notes}</span>}
        </p>
        {(restricciones.length > 0 || invitado.dietary_notes) && (
          <p className="inv-list__restricciones">
            {[...restricciones, invitado.dietary_notes].filter(Boolean).join(' · ')}
          </p>
        )}
        {invitado.sent_at && (
          <p className="inv-list__enviado">
            Enviado por {invitado.sent_via === 'mail' ? 'mail' : 'WhatsApp'} el {fechaCorta(invitado.sent_at)}
          </p>
        )}
      </div>

      <div className="inv-list__acciones">
        {/* Abre WhatsApp con el mensaje y su enlace ya escritos. Un toque por
            invitado, sin escribir nada — y sale del teléfono de quien organiza,
            que es de quien el invitado espera recibirla. Se marca como enviado
            al tocar: no hay forma de saber si después lo mandó, pero sí de que
            no se le mande dos veces por descuido. */}
        <a
          className="inv-list__btn inv-list__btn--wa"
          href={hrefWa}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onEnviado(invitado)}
        >
          {invitado.sent_at ? 'Reenviar' : 'Enviar'}
        </a>
        <button className="inv-list__btn" onClick={copiar}>{copiado ? '✓' : 'Copiar'}</button>
        <button className="inv-list__btn inv-list__btn--quitar" onClick={() => onQuitar(invitado)} aria-label={`Quitar a ${invitado.name}`}>
          ✕
        </button>
      </div>
    </li>
  );
}

function leerMensaje(token) {
  try {
    return localStorage.getItem(`portal_mensaje_invitados_${token}`) || MENSAJE_INICIAL;
  } catch {
    return MENSAJE_INICIAL;
  }
}

function GuestListPage() {
  const { token } = useParams();
  const [invitados, setInvitados] = useState([]);
  const [estado, setEstado] = useState('cargando');
  const [texto, setTexto] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [filtro, setFiltro] = useState('todos');
  const [conRestricciones, setConRestricciones] = useState(false);
  const [mensaje, setMensaje] = useState(() => leerMensaje(token));

  const cargar = useCallback(async () => {
    try {
      const filas = await listGuests(token);
      setInvitados(filas);
      setEstado('listo');
    } catch {
      setEstado('error');
    }
  }, [token]);

  useEffect(() => { cargar(); }, [cargar]);

  function cambiarMensaje(nuevo) {
    setMensaje(nuevo);
    try { localStorage.setItem(`portal_mensaje_invitados_${token}`, nuevo); } catch { /* sin almacenamiento: queda en memoria */ }
  }

  async function agregar() {
    const nuevos = parsearLista(texto);
    if (!nuevos.length) return;
    setGuardando(true);
    try {
      await addGuests(token, nuevos);
      setTexto('');
      await cargar();
    } catch {
      setEstado('error');
    } finally {
      setGuardando(false);
    }
  }

  async function quitar(invitado) {
    if (!window.confirm(`¿Quitar a ${invitado.name} de la lista?`)) return;
    await removeGuest(token, invitado.id);
    await cargar();
  }

  // Un fallo acá no debe frenar el envío: WhatsApp ya se abrió. Sólo se pierde
  // la marca de "enviado".
  async function marcarEnviado(invitado) {
    try {
      await markGuestsSent(token, [invitado.id], 'whatsapp');
      await cargar();
    } catch { /* la marca es una comodidad, no el envío */ }
  }

  function descargarCsv() {
    const csv = invitadosACsv(invitados, window.location.origin);
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = 'invitados.csv';
    enlace.click();
    URL.revokeObjectURL(url);
  }

  if (estado === 'cargando') return <div className="inv-list-vacio" />;

  if (estado === 'error') {
    return (
      <main className="inv-list">
        <p className="inv-list__marca">FX Estudio</p>
        <h1 className="inv-list__titulo">No pudimos abrir tu lista</h1>
        <p className="inv-list__nota">Puede ser un problema momentáneo. Probá recargar en un rato.</p>
      </main>
    );
  }

  const r = resumirInvitados(invitados);
  const catering = resumirRestricciones(invitados);
  const visibles = filtrarInvitados(invitados, { estado: filtro, conRestricciones });
  const origen = window.location.origin;
  // Viene con la lista. Antes se averiguaba preguntándole a un invitado, y esa
  // consulta sólo responde si la tarjeta está publicada: mientras estaba en
  // borrador el enlace salía sin slug y no abría nada.
  const slug = invitados[0]?.slug || '';
  const publicada = invitados[0]?.invitation_status === 'publicada';

  return (
    <main className="inv-list">
      <p className="inv-list__marca">FX Estudio</p>
      <h1 className="inv-list__titulo">Mis invitados</h1>

      <section className="inv-list__resumen">
        <div className="inv-list__dato inv-list__dato--grande">
          <strong>{r.personas}</strong>
          <span>personas asisten</span>
        </div>
        <div className="inv-list__dato is-si">
          <strong>{r.confirmados}</strong><span>confirmaron</span>
        </div>
        <div className="inv-list__dato is-no">
          <strong>{r.rechazados}</strong><span>no pueden</span>
        </div>
        {/* El dato que ninguna otra herramienta le da. */}
        <div className="inv-list__dato is-pendiente">
          <strong>{r.pendientes}</strong><span>sin responder</span>
        </div>
      </section>

      {/* Lo que se le pasa al catering. Sólo aparece cuando alguien marcó algo. */}
      {catering.length > 0 && (
        <section className="inv-list__catering">
          <h2 className="inv-list__subtitulo">Para el catering</h2>
          <ul>
            {catering.map((c) => (
              <li key={c.id}><strong>{c.cantidad}</strong> {c.label.toLowerCase()}</li>
            ))}
          </ul>
          <p className="inv-list__nota">Cuenta a quienes confirmaron, sin sus acompañantes.</p>
        </section>
      )}

      {/* Los enlaces existen desde que se carga la lista, pero no abren nada
          hasta que la tarjeta se publica: la política de la base sólo deja ver
          las publicadas. Decirlo acá evita que alguien reparta cien enlaces
          muertos. */}
      {invitados.length > 0 && !publicada && (
        <p className="inv-list__aviso">
          La tarjeta todavía no está publicada. Los enlaces ya están listos, pero no van a
          abrir hasta que se publique.
        </p>
      )}

      <section className="inv-list__alta">
        <h2 className="inv-list__subtitulo">Agregar invitados</h2>
        <p className="inv-list__nota">
          Uno por línea, o pegá directo desde Excel. Podés sumar mail, teléfono, empresa y
          cuántas personas trae, en cualquier orden:
          <br />
          <code>Juan Pérez, 1</code> · <code>Ana Ruiz, ana@acme.com, 11 5555-1234, Acme</code> · <code>Marta</code>
        </p>
        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          rows={5}
          placeholder={'Juan Pérez, 1\nAna Ruiz, ana@acme.com, 11 5555-1234, Acme\nMarta'}
        />
        <button className="inv-list__btn inv-list__btn--principal" onClick={agregar} disabled={guardando || !texto.trim()}>
          {guardando ? 'Agregando…' : 'Agregar a la lista'}
        </button>
      </section>

      {invitados.length === 0 ? (
        <p className="inv-list__nota">Todavía no cargaste a nadie.</p>
      ) : (
        <>
          <section className="inv-list__mensaje">
            <h2 className="inv-list__subtitulo">Mensaje de WhatsApp</h2>
            <textarea
              value={mensaje}
              onChange={(e) => cambiarMensaje(e.target.value)}
              rows={3}
              aria-label="Mensaje de WhatsApp"
            />
            <p className="inv-list__nota">
              <code>{'{nombre}'}</code> y <code>{'{enlace}'}</code> se reemplazan por los de cada invitado.
            </p>
          </section>

          <div className="inv-list__barra">
            <div className="inv-list__filtros" role="group" aria-label="Filtrar por estado">
              {FILTROS.map((f) => (
                <button
                  key={f.id}
                  className={`inv-list__filtro ${filtro === f.id ? 'is-activo' : ''}`}
                  aria-pressed={filtro === f.id}
                  onClick={() => setFiltro(f.id)}
                >
                  {f.texto}
                </button>
              ))}
            </div>
            <label className="inv-list__check">
              <input
                type="checkbox"
                checked={conRestricciones}
                onChange={(e) => setConRestricciones(e.target.checked)}
              />
              Con restricciones
            </label>
            <button className="inv-list__btn" onClick={descargarCsv}>Descargar Excel</button>
          </div>

          {visibles.length === 0 ? (
            <p className="inv-list__nota">Nadie coincide con ese filtro.</p>
          ) : (
            <ul className="inv-list__lista">
              {visibles.map((g) => (
                <Invitado
                  key={g.id}
                  invitado={g}
                  origen={origen}
                  slug={slug}
                  mensaje={mensaje}
                  onQuitar={quitar}
                  onEnviado={marcarEnviado}
                />
              ))}
            </ul>
          )}
        </>
      )}
    </main>
  );
}

export default GuestListPage;
