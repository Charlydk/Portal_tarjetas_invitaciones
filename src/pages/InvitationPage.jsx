import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GuestCard from '../features/invitation/GuestCard';
import { fetchInvitationBySlug, fetchInvitationByToken } from '../lib/invitationsService';
import { invitationModels } from '../data/models';

/**
 * La tarjeta entregada de un cliente.
 *
 *   /i/:slug            lo que abre un invitado — sólo si está publicada
 *   /borrador/:token    lo que abre el cliente para verla antes de publicar
 *
 * Con esto una tarjeta deja de ser un repositorio con su propio deploy y pasa a
 * ser una fila: diez clientes son diez filas y un solo sitio, y cambiarle la
 * hora a una es editar un campo en vez de volver a publicar a mano.
 */

const ESTADO = { CARGANDO: 'cargando', LISTA: 'lista', NO_ESTA: 'no-esta', ERROR: 'error' };

function Mensaje({ titulo, texto }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '40px 28px',
      background: 'var(--color-background)',
      color: 'var(--color-text)',
    }}>
      <p style={{
        fontFamily: "'Cinzel', serif",
        fontSize: '0.72rem',
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color: 'var(--color-primary)',
        margin: '0 0 18px',
      }}>
        FX Estudio
      </p>
      <h1 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontWeight: 400,
        fontSize: 'clamp(1.6rem, 6vw, 2.4rem)',
        margin: '0 0 14px',
      }}>
        {titulo}
      </h1>
      <p style={{ maxWidth: '42ch', opacity: 0.72, lineHeight: 1.65, margin: 0 }}>
        {texto}
      </p>
    </div>
  );
}

function InvitationPage({ modoBorrador = false }) {
  const { slug, token } = useParams();
  const [estado, setEstado] = useState(ESTADO.CARGANDO);
  const [fila, setFila] = useState(null);

  useEffect(() => {
    let cancelado = false;

    (async () => {
      try {
        const row = modoBorrador
          ? await fetchInvitationByToken(token)
          : await fetchInvitationBySlug(slug);
        if (cancelado) return;
        setFila(row);
        setEstado(row ? ESTADO.LISTA : ESTADO.NO_ESTA);
      } catch (err) {
        if (cancelado) return;
        console.error('No se pudo cargar la invitación', err);
        setEstado(ESTADO.ERROR);
      }
    })();

    return () => { cancelado = true; };
  }, [slug, token, modoBorrador]);

  if (estado === ESTADO.CARGANDO) {
    // Sin spinner: la puerta de bienvenida tapa la pantalla en cuanto llega la
    // fila, y un spinner que aparece y desaparece en 200 ms molesta más que el
    // silencio.
    return <div style={{ minHeight: '100vh', background: 'var(--color-background)' }} />;
  }

  if (estado === ESTADO.ERROR) {
    return (
      <Mensaje
        titulo="No pudimos abrir la invitación"
        texto="Puede ser un problema momentáneo de conexión. Probá recargar la página en un rato."
      />
    );
  }

  if (estado === ESTADO.NO_ESTA) {
    // No existe, no está publicada o venció: para quien abre el enlace las tres
    // son lo mismo, y decir cuál es sería contar de más.
    return (
      <Mensaje
        titulo="Esta invitación ya no está disponible"
        texto="El enlace puede haber vencido o estar mal copiado. Pedile el enlace nuevo a quien te invitó."
      />
    );
  }

  const variant = invitationModels
    .flatMap((m) => m.variants)
    .find((v) => v.id === fila.variant_id);

  if (!variant) {
    return (
      <Mensaje
        titulo="No pudimos mostrar esta invitación"
        texto="El diseño de esta tarjeta no está disponible. Escribinos y lo resolvemos."
      />
    );
  }

  const formData = { ...fila.data, variantId: fila.variant_id };

  const avisoBorrador = modoBorrador && fila.status !== 'publicada' && (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 9999,
      background: 'rgba(20, 17, 11, 0.88)',
      backdropFilter: 'blur(8px)',
      color: '#F5EFE3',
      textAlign: 'center',
      padding: '10px 20px',
      fontSize: '0.78rem',
      letterSpacing: '0.06em',
      fontFamily: "'Lato', sans-serif",
    }}>
      Vista previa · todavía no está publicada
    </div>
  );

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <GuestCard variant={variant} formData={formData} topBar={avisoBorrador} />
    </div>
  );
}

export default InvitationPage;
