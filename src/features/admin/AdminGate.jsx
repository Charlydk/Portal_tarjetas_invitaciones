import React, { useEffect, useState } from 'react';
import { isAdmin, onSession, signIn, signOut } from '../../lib/adminService';

/**
 * La puerta del panel.
 *
 * Vive aparte porque la usan la lista y el formulario por igual: si cada
 * pantalla resolviera su propio acceso, alcanzaría con olvidarse en una para
 * dejar un agujero.
 *
 * Igual, esto no es lo que protege nada — protege la base. Acá sólo se decide
 * qué mostrar. Ver supabase/migrations/004_admin.sql.
 */

function LoginForm() {
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
    } catch {
      // El error de la base distingue "no existe" de "clave incorrecta", y
      // repetirlo permitiría averiguar qué direcciones tienen cuenta.
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

function AdminGate({ children }) {
  const [session, setSession] = useState(undefined); // undefined = todavía no sabemos
  const [autorizado, setAutorizado] = useState(null);

  useEffect(() => onSession(setSession), []);

  useEffect(() => {
    if (!session) {
      setAutorizado(null);
      return;
    }
    isAdmin().then(setAutorizado);
  }, [session]);

  if (session === undefined) return <div className="admin-vacio" />;

  if (!session) return <main className="admin"><LoginForm /></main>;

  // Una cuenta válida que no está en la lista. Decirlo claro evita que se lea
  // como "todavía no hay nada cargado", que es lo que parece una lista vacía.
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

  if (autorizado === null) return <div className="admin-vacio" />;

  return children;
}

export default AdminGate;
