import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminGate from '../features/admin/AdminGate';
import { listInvitations, setStatus, signOut } from '../lib/adminService';
import { FILTRO_INICIAL, FILTROS, contarPorEstado, filtrarTarjetas } from '../lib/adminFiltros';
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

/**
 * Un enlace de la tarjeta, con para qué sirve y los dos gestos posibles.
 *
 * Antes eran cuatro "Copiar X · abrir" apilados: había que adivinar qué era cada
 * uno y el "abrir" era un texto chico que parecía un adorno. Acá cada enlace
 * tiene nombre, una línea que explica a quién va dirigido, y dos botones del
 * mismo peso. Copiar es lo que se hace casi siempre: los enlaces van pegados en
 * un WhatsApp.
 */
function Enlace({ etiqueta, ayuda, ruta }) {
  const [copiado, setCopiado] = useState(false);

  async function copiar() {
    await navigator.clipboard.writeText(`${window.location.origin}${ruta}`);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 1600);
  }

  return (
    <li className="admin-enlace">
      <div className="admin-enlace__texto">
        <p className="admin-enlace__nombre">{etiqueta}</p>
        <p className="admin-enlace__ayuda">{ayuda}</p>
      </div>
      <div className="admin-enlace__acciones">
        <button className="admin-boton admin-boton--chico" onClick={copiar}>
          {copiado ? '✓ Copiado' : 'Copiar'}
        </button>
        {/* Ruta relativa: abre en el mismo sitio donde está el panel. */}
        <a className="admin-boton admin-boton--chico" href={ruta} target="_blank" rel="noopener noreferrer">
          Abrir ↗
        </a>
      </div>
    </li>
  );
}

function Fila({ tarjeta, onCambioEstado }) {
  const estado = ESTADOS[tarjeta.status] || { texto: tarjeta.status, clase: '' };
  const publicada = tarjeta.status === 'publicada';
  const archivada = tarjeta.status === 'archivada';

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

      <div className="admin-fila__acciones">
        <Link className="admin-boton" to={`/admin/${tarjeta.id}`}>Editar</Link>

        {publicada && (
          <button className="admin-boton" onClick={() => onCambioEstado(tarjeta, 'borrador')}>
            Despublicar
          </button>
        )}
        {archivada && (
          <button className="admin-boton admin-boton--principal" onClick={() => onCambioEstado(tarjeta, 'borrador')}>
            Restaurar
          </button>
        )}
        {!publicada && !archivada && (
          <button className="admin-boton admin-boton--principal" onClick={() => onCambioEstado(tarjeta, 'publicada')}>
            Publicar
          </button>
        )}

        {!archivada && (
          <button className="admin-boton admin-boton--suave" onClick={() => onCambioEstado(tarjeta, 'archivada')}>
            Archivar
          </button>
        )}
      </div>

      <details className="admin-enlaces">
        <summary>Enlaces</summary>
        <ul className="admin-enlaces__lista">
          <Enlace
            etiqueta="Revisión del cliente"
            ayuda="Para que vea su tarjeta y la apruebe."
            ruta={`/borrador/${tarjeta.edit_token}`}
          />
          {publicada && (
            <Enlace
              etiqueta="Tarjeta publicada"
              ayuda="El enlace que reciben los invitados."
              ruta={`/i/${tarjeta.slug}`}
            />
          )}
          <Enlace
            etiqueta="Lista de invitados"
            ayuda="Donde el cliente carga a su gente y les manda la invitación."
            ruta={`/invitados/${tarjeta.edit_token}`}
          />
          <Enlace
            etiqueta="Confirmaciones"
            ayuda="Quién respondió y qué contestó."
            ruta={`/confirmaciones/${tarjeta.edit_token}`}
          />
        </ul>
      </details>
    </article>
  );
}

function Lista() {
  const [tarjetas, setTarjetas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [aviso, setAviso] = useState('');
  const [filtro, setFiltro] = useState(FILTRO_INICIAL);

  const cargar = useCallback(async () => {
    try {
      setTarjetas(await listInvitations());
    } catch {
      setError('No pudimos traer las tarjetas. Probá recargar.');
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => { cargar(); }, [cargar]);

  async function cambiarEstado(tarjeta, status) {
    // Archivar una tarjeta publicada la saca de circulación: el enlace que ya
    // recibieron los invitados deja de abrir. Se reversa con Restaurar, pero
    // mientras tanto alguien puede estar mirándola, así que se avisa.
    if (status === 'archivada' && tarjeta.status === 'publicada') {
      const nombre = tarjeta.client_name || tarjeta.slug;
      if (!window.confirm(`«${nombre}» está publicada. Si la archivás, el enlace de los invitados deja de abrir hasta que la restaures. ¿Archivar?`)) return;
    }

    setError('');
    try {
      await setStatus(tarjeta.id, status, { alreadyPublished: Boolean(tarjeta.published_at) });
      const nombre = tarjeta.client_name || tarjeta.slug;
      setAviso({
        publicada: `«${nombre}» quedó publicada.`,
        archivada: `«${nombre}» quedó archivada. La encontrás en la pestaña Archivada.`,
        borrador: tarjeta.status === 'archivada'
          ? `«${nombre}» se restauró como borrador. La encontrás en la pestaña Borrador.`
          : `«${nombre}» volvió a borrador. La encontrás en la pestaña Borrador.`,
      }[status] || '');
      await cargar();
    } catch {
      setAviso('');
      setError('No pudimos cambiar el estado de esa tarjeta.');
    }
  }

  const cuentas = contarPorEstado(tarjetas);
  const visibles = filtrarTarjetas(tarjetas, filtro);
  const textoFiltro = FILTROS.find((f) => f.id === filtro)?.texto || '';

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
      {aviso && !error && <p className="admin-aviso" role="status">{aviso}</p>}

      {/* Por defecto sólo lo que está en revisión. Cada pestaña lleva su cuenta:
          lo que no se ve en pantalla se sabe que existe. */}
      {!cargando && tarjetas.length > 0 && (
        <nav className="admin-filtros" aria-label="Filtrar tarjetas por estado">
          {FILTROS.map((f) => (
            <button
              key={f.id}
              className={`admin-filtro ${filtro === f.id ? 'is-activo' : ''}`}
              aria-pressed={filtro === f.id}
              onClick={() => { setFiltro(f.id); setAviso(''); }}
            >
              {f.texto} <span className="admin-filtro__cuenta">{cuentas[f.id]}</span>
            </button>
          ))}
        </nav>
      )}

      {!cargando && tarjetas.length === 0 && !error && (
        <p className="admin-nota">Todavía no hay tarjetas cargadas.</p>
      )}

      {tarjetas.length > 0 && visibles.length === 0 && (
        <p className="admin-nota">
          No hay tarjetas en «{textoFiltro}».
          {cuentas.todas > 0 && ' Mirá las otras pestañas: ahí están las demás.'}
        </p>
      )}

      <div className="admin-lista">
        {visibles.map((t) => (
          <Fila key={t.id} tarjeta={t} onCambioEstado={cambiarEstado} />
        ))}
      </div>
    </main>
  );
}

export default function AdminPage() {
  return <AdminGate><Lista /></AdminGate>;
}
