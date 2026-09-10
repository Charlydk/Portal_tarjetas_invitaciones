import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRsvpsByToken, resumirRsvps } from '../lib/rsvpService';
import './RsvpListPage.css';

/**
 * Las confirmaciones, para el cliente.
 *
 *   /confirmaciones/:token
 *
 * Sin cuenta ni clave: el mismo token que le deja ver su borrador. Se abre
 * desde el celular el día que hay que pasarle el número al salón, así que lo
 * primero y más grande es ese número.
 */

function RsvpListPage() {
  const { token } = useParams();
  const [estado, setEstado] = useState('cargando');
  const [respuestas, setRespuestas] = useState([]);

  useEffect(() => {
    let cancelado = false;
    fetchRsvpsByToken(token)
      .then((filas) => {
        if (cancelado) return;
        setRespuestas(filas);
        setEstado('listo');
      })
      .catch(() => !cancelado && setEstado('error'));
    return () => { cancelado = true; };
  }, [token]);

  if (estado === 'cargando') return <div className="rsvp-vacio" />;

  if (estado === 'error') {
    return (
      <main className="rsvp">
        <p className="rsvp__marca">FX Estudio</p>
        <h1 className="rsvp__titulo">No pudimos abrir la lista</h1>
        <p className="rsvp__nota">Puede ser un problema momentáneo. Probá recargar en un rato.</p>
      </main>
    );
  }

  const r = resumirRsvps(respuestas);

  return (
    <main className="rsvp">
      <p className="rsvp__marca">FX Estudio</p>
      <h1 className="rsvp__titulo">Confirmaciones</h1>

      {/* El número que va al salón, primero y grande: es a lo que se entra. */}
      <section className="rsvp__resumen">
        <div className="rsvp__dato rsvp__dato--grande">
          <strong>{r.personas}</strong>
          <span>personas asisten</span>
        </div>
        <div className="rsvp__dato">
          <strong>{r.vienen}</strong>
          <span>confirmaron</span>
        </div>
        <div className="rsvp__dato">
          <strong>{r.noVienen}</strong>
          <span>no pueden</span>
        </div>
      </section>

      {r.conNotas > 0 && (
        <p className="rsvp__nota">
          {r.conNotas === 1
            ? '1 invitado dejó una aclaración alimentaria.'
            : `${r.conNotas} invitados dejaron aclaraciones alimentarias.`}
        </p>
      )}

      {respuestas.length === 0 ? (
        <p className="rsvp__nota">
          Todavía no confirmó nadie. Las respuestas aparecen acá apenas alguien completa el
          formulario de la invitación.
        </p>
      ) : (
        <ul className="rsvp__lista">
          {respuestas.map((fila, i) => (
            <li key={i} className={`rsvp__fila ${fila.attending ? 'is-viene' : 'is-no-viene'}`}>
              <div className="rsvp__fila-datos">
                <p className="rsvp__nombre">{fila.guest_name}</p>
                {fila.notes && <p className="rsvp__notas">{fila.notes}</p>}
              </div>
              <p className="rsvp__estado">
                {fila.attending
                  ? fila.companions > 0
                    ? `Viene +${fila.companions}`
                    : 'Viene'
                  : 'No viene'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default RsvpListPage;
