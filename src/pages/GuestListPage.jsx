import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addGuests, listGuests, parsearLista, removeGuest, resumirInvitados } from '../lib/guestService';
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
 * WhatsApp suelto puede responder.
 */

const ESTADOS = {
  confirmado: { texto: 'Viene',    clase: 'is-si' },
  rechazado:  { texto: 'No viene', clase: 'is-no' },
  pendiente:  { texto: 'Sin responder', clase: 'is-pendiente' },
};

function Invitado({ invitado, origen, slug, onQuitar }) {
  const [copiado, setCopiado] = useState(false);
  const estado = ESTADOS[invitado.status] || ESTADOS.pendiente;
  const enlace = `${origen}/i/${slug}?i=${invitado.token}`;

  const mensaje = encodeURIComponent(
    `¡Hola ${invitado.name}! Te mandamos nuestra invitación. Podés confirmar ahí mismo: ${enlace}`
  );

  async function copiar() {
    await navigator.clipboard.writeText(enlace);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 1600);
  }

  return (
    <li className={`inv-list__fila ${estado.clase}`}>
      <div className="inv-list__datos">
        <p className="inv-list__nombre">
          {invitado.name}
          {invitado.max_companions > 0 && (
            <span className="inv-list__cupo">+{invitado.max_companions}</span>
          )}
        </p>
        <p className="inv-list__estado">
          {estado.texto}
          {invitado.status === 'confirmado' && invitado.companions > 0 && ` con ${invitado.companions}`}
          {invitado.notes && <span className="inv-list__notas"> · {invitado.notes}</span>}
        </p>
      </div>

      <div className="inv-list__acciones">
        {/* Abre WhatsApp con el mensaje y su enlace ya escritos. Un toque por
            invitado, sin escribir nada — y sale del teléfono de los novios, que
            es de quien el invitado espera recibirla. */}
        <a className="inv-list__btn inv-list__btn--wa" href={`https://wa.me/?text=${mensaje}`} target="_blank" rel="noopener noreferrer">
          Enviar
        </a>
        <button className="inv-list__btn" onClick={copiar}>{copiado ? '✓' : 'Copiar'}</button>
        <button className="inv-list__btn inv-list__btn--quitar" onClick={() => onQuitar(invitado)} aria-label={`Quitar a ${invitado.name}`}>
          ✕
        </button>
      </div>
    </li>
  );
}

function GuestListPage() {
  const { token } = useParams();
  const [invitados, setInvitados] = useState([]);
  const [estado, setEstado] = useState('cargando');
  const [texto, setTexto] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [slug, setSlug] = useState('');

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

  // El slug sale del primer invitado que ya tenga enlace; hasta que haya uno,
  // no hace falta porque tampoco hay nada que compartir.
  useEffect(() => {
    if (!slug && invitados.length) {
      import('../lib/guestService').then(async ({ fetchGuest }) => {
        const g = await fetchGuest(invitados[0].token).catch(() => null);
        if (g?.slug) setSlug(g.slug);
      });
    }
  }, [invitados, slug]);

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
  const origen = window.location.origin;

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

      <section className="inv-list__alta">
        <h2 className="inv-list__subtitulo">Agregar invitados</h2>
        <p className="inv-list__nota">
          Uno por línea. Si podés, poné después de una coma cuántas personas trae:
          <br />
          <code>Juan Pérez, 1</code> · <code>Familia Díaz, 3</code> · <code>Marta</code>
        </p>
        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          rows={5}
          placeholder={'Juan Pérez, 1\nFamilia Díaz, 3\nMarta'}
        />
        <button className="inv-list__btn inv-list__btn--principal" onClick={agregar} disabled={guardando || !texto.trim()}>
          {guardando ? 'Agregando…' : 'Agregar a la lista'}
        </button>
      </section>

      {invitados.length === 0 ? (
        <p className="inv-list__nota">Todavía no cargaste a nadie.</p>
      ) : (
        <ul className="inv-list__lista">
          {invitados.map((g) => (
            <Invitado key={g.id} invitado={g} origen={origen} slug={slug} onQuitar={quitar} />
          ))}
        </ul>
      )}
    </main>
  );
}

export default GuestListPage;
