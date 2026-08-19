import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminGate from '../features/admin/AdminGate';
import { listInvitations, setStatus, signOut } from '../lib/adminService';
import './AdminPage.css';

/**
 * La lista de tarjetas.
 *
 * Existe porque las tarjetas las cargan dos personas y una no escribe SQL.
 * Mientras la carga fue una consulta a mano el panel era un lujo; con dos
 * operadores es la única forma de que el negocio funcione.
 */

const ESTADOS = {
  borrador:  { texto: 'Borrador',    clase: 'is-borrador' },
  revision:  { texto: 'En revisión', clase: 'is-revision' },
  publicada: { texto: 'Publicada',   clase: 'is-publicada' },
  archivada: { texto: 'Archivada',   clase: 'is-archivada' },
};

function Copiable({ etiqueta, url }) {
  const [copiado, setCopiado] = useState(false);

  async function copiar() {
    await navigator.clipboard.writeText(url);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 1600);
  }

  return (
    <div className="admin-link">
      {/* Copiar es lo que se hace de verdad con estos links: van pegados en un
          WhatsApp. Abrirlos es la excepción, no el gesto principal. */}
      <button className="admin-boton admin-boton--chico" onClick={copiar}>
        {copiado ? '✓ Copiado' : `Copiar ${etiqueta}`}
      </button>
      <a href={url} target="_blank" rel="noopener noreferrer" className="admin-link__abrir">abrir</a>
    </div>
  );
}

function Fila({ tarjeta, onCambioEstado }) {
  const origen = window.location.origin;
  const estado = ESTADOS[tarjeta.status] || { texto: tarjeta.status, clase: '' };
  const publicada = tarjeta.status === 'publicada';

  return (
    <article className="admin-fila">
      <div className="admin-fila__datos">
        <h2 className="admin-fila__cliente">{tarjeta.client_name || 'Sin nombre'}</h2>
        <p className="admin-fila__meta">
          <span className={`admin-estado ${estado.clase}`}>{estado.texto}</span>
          <span className="admin-fila__slug">/{tarjeta.slug}</span>
          <span className="admin-fila__diseno">{tarjeta.variant_id}</span>
        </p>
      </div>

      <div className="admin-fila__links">
        <Copiable etiqueta="revisión" url={`${origen}/borrador/${tarjeta.edit_token}`} />
        <Copiable etiqueta="confirmaciones" url={`${origen}/confirmaciones/${tarjeta.edit_token}`} />
        <Copiable etiqueta="invitados" url={`${origen}/invitados/${tarjeta.edit_token}`} />
        {publicada && <Copiable etiqueta="tarjeta" url={`${origen}/i/${tarjeta.slug}`} />}
      </div>

      <div className="admin-fila__acciones">
        <Link className="admin-boton" to={`/admin/${tarjeta.id}`}>Editar</Link>
        {publicada ? (
          <button className="admin-boton" onClick={() => onCambioEstado(tarjeta, 'borrador')}>
            Despublicar
          </button>
        ) : (
          <button className="admin-boton admin-boton--principal" onClick={() => onCambioEstado(tarjeta, 'publicada')}>
            Publicar
          </button>
        )}
      </div>
    </article>
  );
}

function Lista() {
  const [tarjetas, setTarjetas] = useState([]);
  const [error, setError] = useState('');

  const cargar = useCallback(async () => {
    try {
      setTarjetas(await listInvitations());
    } catch {
      setError('No pudimos traer las tarjetas. Probá recargar.');
    }
  }, []);

  useEffect(() => { cargar(); }, [cargar]);

  async function cambiarEstado(tarjeta, status) {
    try {
      await setStatus(tarjeta.id, status, { alreadyPublished: Boolean(tarjeta.published_at) });
      await cargar();
    } catch {
      setError('No pudimos cambiar el estado de esa tarjeta.');
    }
  }

  return (
    <main className="admin">
      <header className="admin-cabecera">
        <div>
          <p className="admin-login__marca">FX Estudio</p>
          <h1 className="admin-titulo">Tarjetas</h1>
        </div>
        <div className="admin-cabecera__acciones">
          <Link className="admin-boton admin-boton--principal" to="/admin/nueva">+ Nueva tarjeta</Link>
          <button className="admin-boton" onClick={signOut}>Salir</button>
        </div>
      </header>

      {error && <p className="admin-error">{error}</p>}

      {tarjetas.length === 0 && !error && (
        <p className="admin-nota">Todavía no hay tarjetas cargadas.</p>
      )}

      <div className="admin-lista">
        {tarjetas.map((t) => (
          <Fila key={t.id} tarjeta={t} onCambioEstado={cambiarEstado} />
        ))}
      </div>
    </main>
  );
}

export default function AdminPage() {
  return <AdminGate><Lista /></AdminGate>;
}
