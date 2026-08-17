import React, { useCallback, useEffect, useState } from 'react';
import { isAdmin, listInvitations, onSession, setStatus, signIn, signOut } from '../lib/adminService';
import './AdminPage.css';

/**
 * El panel del equipo.
 *
 * Existe porque las tarjetas las van a cargar dos personas y una no escribe
 * SQL. Mientras la carga fue una consulta a mano el panel era un lujo; con dos
 * operadores es la única forma de que el negocio funcione.
 *
 * Los permisos NO están acá: los tiene la base. Esta pantalla asume que puede
 * pedir cualquier cosa y que lo que no corresponde va a volver vacío o va a
 * fallar. Ver supabase/migrations/004_admin.sql.
 */

const ESTADOS = {
  borrador:   { texto: 'Borrador',   clase: 'is-borrador' },
  revision:   { texto: 'En revisión', clase: 'is-revision' },
  publicada:  { texto: 'Publicada',  clase: 'is-publicada' },
  archivada:  { texto: 'Archivada',  clase: 'is-archivada' },
};

function LoginForm({ onDone }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setEnviando(true);
    setError('');
    try {
      await signIn(email.trim(), password);
      onDone?.();
    } catch {
      // El mensaje de la base distingue "no existe" de "clave incorrecta", y
      // decirlo permitiría averiguar qué direcciones tienen cuenta.
      setError('No pudimos entrar con esos datos.');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form className="admin-login" onSubmit={handleSubmit}>
      <p className="admin-login__marca">FX Estudio</p>
      <h1 className="admin-login__titulo">Panel</h1>

      <label className="admin-campo">
        <span>Correo</span>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="username" />
      </label>

      <label className="admin-campo">
        <span>Contraseña</span>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
      </label>

      {error && <p className="admin-error">{error}</p>}

      <button className="admin-boton admin-boton--principal" type="submit" disabled={enviando}>
        {enviando ? 'Entrando…' : 'Entrar'}
      </button>
    </form>
  );
}

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
        {publicada && <Copiable etiqueta="tarjeta" url={`${origen}/i/${tarjeta.slug}`} />}
      </div>

      <div className="admin-fila__acciones">
        {publicada ? (
          <button
            className="admin-boton"
            onClick={() => onCambioEstado(tarjeta, 'borrador')}
          >
            Despublicar
          </button>
        ) : (
          <button
            className="admin-boton admin-boton--principal"
            onClick={() => onCambioEstado(tarjeta, 'publicada')}
          >
            Publicar
          </button>
        )}
      </div>
    </article>
  );
}

function AdminPage() {
  const [session, setSession] = useState(undefined); // undefined = todavía no sabemos
  const [autorizado, setAutorizado] = useState(null);
  const [tarjetas, setTarjetas] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => onSession(setSession), []);

  const cargar = useCallback(async () => {
    if (!session) {
      setAutorizado(null);
      return;
    }
    const permitido = await isAdmin();
    setAutorizado(permitido);
    if (!permitido) return;

    try {
      setTarjetas(await listInvitations());
    } catch {
      setError('No pudimos traer las tarjetas. Probá recargar.');
    }
  }, [session]);

  useEffect(() => { cargar(); }, [cargar]);

  async function cambiarEstado(tarjeta, status) {
    try {
      await setStatus(tarjeta.id, status, { alreadyPublished: Boolean(tarjeta.published_at) });
      await cargar();
    } catch {
      setError('No pudimos cambiar el estado de esa tarjeta.');
    }
  }

  if (session === undefined) return <div className="admin-vacio" />;

  if (!session) {
    return <main className="admin"><LoginForm /></main>;
  }

  // Una cuenta válida que no está en la lista. Pasa cuando alguien se registra
  // solo: conviene decirlo claro en vez de mostrar una lista vacía, que se lee
  // como "todavía no cargaron nada".
  if (autorizado === false) {
    return (
      <main className="admin">
        <div className="admin-login">
          <h1 className="admin-login__titulo">Esta cuenta no tiene acceso</h1>
          <p className="admin-nota">Pedile a alguien del equipo que agregue tu correo.</p>
          <button className="admin-boton" onClick={signOut}>Salir</button>
        </div>
      </main>
    );
  }

  return (
    <main className="admin">
      <header className="admin-cabecera">
        <div>
          <p className="admin-login__marca">FX Estudio</p>
          <h1 className="admin-titulo">Tarjetas</h1>
        </div>
        <button className="admin-boton" onClick={signOut}>Salir</button>
      </header>

      {error && <p className="admin-error">{error}</p>}

      {autorizado && tarjetas.length === 0 && (
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

export default AdminPage;
