import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AdminGate from '../features/admin/AdminGate';
import { fetchInvitation, saveInvitation } from '../lib/adminService';
import { createInvitationData } from '../data/invitationDefaults';
import { invitationModels } from '../data/models';

import { StepModules } from '../features/preview/steps/StepModules';
import { StepProtagonists } from '../features/preview/steps/StepProtagonists';
import { StepVenue } from '../features/preview/steps/StepVenue';
import { StepExtras } from '../features/preview/steps/StepExtras';
import { StepGallery } from '../features/preview/steps/StepGallery';
import { StepMusic } from '../features/preview/steps/StepMusic';
import { StepGifts } from '../features/preview/steps/StepGifts';

// Los pasos reusados traen sus estilos de acá. Sin esto se ven crudos: es el
// precio de reusarlos, y es mucho más barato que mantener dos formularios.
import '../features/preview/ControlPanel.css';
import './AdminPage.css';

/**
 * Cargar y corregir una tarjeta.
 *
 * Reusa los mismos pasos del asistente público, pero apilados en una sola
 * pantalla en vez de uno por vez. La diferencia no es estética: el cliente
 * descubre su tarjeta de a poco y agradece que lo lleven de la mano; acá se
 * está transcribiendo un WhatsApp que ya está escrito, y saltar entre siete
 * pantallas para copiar datos que se tienen todos a la vista es una pérdida
 * de tiempo repetida en cada venta.
 *
 * Reusar los pasos también significa que un campo nuevo aparece en los dos
 * lados solo. No hay una segunda copia del formulario que se desactualice.
 */

const SECCIONES = [
  { titulo: 'Qué incluye',        Componente: StepModules,      siempre: true },
  { titulo: 'Protagonistas',      Componente: StepProtagonists, siempre: true },
  { titulo: 'Lugar y fechas',     Componente: StepVenue,        ver: (d) => d.showCivil || d.showCeremony || d.showParty },
  { titulo: 'Extras',             Componente: StepExtras,       ver: (d) => d.showDressCode || d.askDiets },
  { titulo: 'Galería',            Componente: StepGallery,      ver: (d) => d.showGallery },
  { titulo: 'Playlist',           Componente: StepMusic,        ver: (d) => d.showMusic },
  { titulo: 'Regalos',            Componente: StepGifts,        ver: (d) => d.showGifts },
];

/** De "Valentina & Maximiliano" a "valentina-y-maximiliano". */
function sugerirSlug(formData) {
  const nombres = [formData.name1, formData.name2].filter(Boolean).join(' y ');
  return nombres
    .toLowerCase()
    // Separa los acentos de su letra y los descarta, para que "Martín" no
    // termine en una dirección con caracteres que rompen al compartirla.
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const TODAS_LAS_VARIANTES = invitationModels.flatMap((m) =>
  m.variants.map((v) => ({ modelId: m.id, variantId: v.id, nombre: v.name }))
);

function Formulario() {
  const { id } = useParams();
  const esNueva = !id || id === 'nueva';
  const navigate = useNavigate();

  const [formData, setFormData] = useState(() => createInvitationData());
  const [slug, setSlug] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientWhatsapp, setClientWhatsapp] = useState('');
  const [status, setStatusValue] = useState('borrador');
  const [expiresAt, setExpiresAt] = useState('');
  const [publishedAt, setPublishedAt] = useState(null);

  const [cargando, setCargando] = useState(!esNueva);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (esNueva) return;
    let cancelado = false;

    fetchInvitation(id)
      .then((fila) => {
        if (cancelado || !fila) return;
        // Lo guardado gana sobre los valores por defecto, pero los defaults
        // rellenan los campos que esa fila no tenga: una tarjeta cargada antes
        // de que existiera un campo no debe romper el formulario.
        setFormData({ ...createInvitationData(), ...fila.data });
        setSlug(fila.slug);
        setClientName(fila.client_name || '');
        setClientWhatsapp(fila.client_whatsapp || '');
        setStatusValue(fila.status);
        setPublishedAt(fila.published_at);
        setExpiresAt(fila.expires_at ? fila.expires_at.slice(0, 10) : '');
      })
      .catch(() => setError('No pudimos abrir esa tarjeta.'))
      .finally(() => !cancelado && setCargando(false));

    return () => { cancelado = true; };
  }, [id, esNueva]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const secciones = useMemo(
    () => SECCIONES.filter((s) => s.siempre || s.ver(formData)),
    [formData]
  );

  const listaParaGuardar = slug.trim() && formData.variantId;

  async function guardar(e) {
    e.preventDefault();
    setGuardando(true);
    setError('');
    try {
      await saveInvitation({
        id: esNueva ? undefined : id,
        slug: slug.trim(),
        clientName,
        clientWhatsapp,
        status,
        expiresAt,
        publishedAt,
        formData,
      });
      navigate('/admin');
    } catch (err) {
      // El caso frecuente y el único que la persona puede resolver sola.
      setError(
        err?.code === '23505'
          ? 'Ya existe una tarjeta con esa dirección. Cambiá el slug.'
          : 'No pudimos guardar. Revisá los datos y probá de nuevo.'
      );
      setGuardando(false);
    }
  }

  if (cargando) return <div className="admin-vacio" />;

  return (
    <main className="admin">
      <form className="admin-form" onSubmit={guardar}>
        <header className="admin-cabecera">
          <div>
            <p className="admin-login__marca">FX Estudio</p>
            <h1 className="admin-titulo">{esNueva ? 'Nueva tarjeta' : 'Editar tarjeta'}</h1>
          </div>
          <Link className="admin-boton" to="/admin">Volver</Link>
        </header>

        {error && <p className="admin-error">{error}</p>}

        {/* ── Lo del negocio: no es parte de la tarjeta, es de la venta ── */}
        <section className="admin-seccion">
          <h2 className="admin-seccion__titulo">La venta</h2>

          <div className="admin-grilla">
            <label className="admin-campo">
              <span>Diseño</span>
              <select
                value={formData.variantId || ''}
                onChange={(e) => {
                  const elegida = TODAS_LAS_VARIANTES.find((v) => v.variantId === e.target.value);
                  setFormData((prev) => ({
                    ...prev,
                    modelId: elegida?.modelId || null,
                    variantId: elegida?.variantId || null,
                  }));
                }}
                required
              >
                <option value="">Elegir…</option>
                {TODAS_LAS_VARIANTES.map((v) => (
                  <option key={v.variantId} value={v.variantId}>{v.nombre}</option>
                ))}
              </select>
            </label>

            <label className="admin-campo">
              <span>Dirección de la tarjeta</span>
              <div className="admin-slug">
                <span className="admin-slug__prefijo">/i/</span>
                <input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="valentina-y-maxi"
                  required
                />
                <button
                  type="button"
                  className="admin-boton admin-boton--chico"
                  onClick={() => setSlug(sugerirSlug(formData))}
                >
                  Sugerir
                </button>
              </div>
            </label>

            <label className="admin-campo">
              <span>Cliente</span>
              <input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Valentina Pérez" />
            </label>

            <label className="admin-campo">
              <span>WhatsApp del cliente</span>
              <input value={clientWhatsapp} onChange={(e) => setClientWhatsapp(e.target.value)} placeholder="5491100000000" />
            </label>

            <label className="admin-campo">
              <span>Estado</span>
              <select value={status} onChange={(e) => setStatusValue(e.target.value)}>
                <option value="borrador">Borrador</option>
                <option value="revision">En revisión</option>
                <option value="publicada">Publicada</option>
                <option value="archivada">Archivada</option>
              </select>
            </label>

            <label className="admin-campo">
              <span>Vence el (opcional)</span>
              <input type="date" value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)} />
            </label>
          </div>
        </section>

        {/* ── La tarjeta: los mismos pasos del asistente, todos a la vista ── */}
        {secciones.map(({ titulo, Componente }) => (
          <section className="admin-seccion" key={titulo}>
            <h2 className="admin-seccion__titulo">{titulo}</h2>
            <div className="admin-seccion__cuerpo">
              <Componente formData={formData} handleChange={handleChange} setFormData={setFormData} totalPrice={0} />
            </div>
          </section>
        ))}

        <div className="admin-form__pie">
          <button
            className="admin-boton admin-boton--principal"
            type="submit"
            disabled={guardando || !listaParaGuardar}
          >
            {guardando ? 'Guardando…' : 'Guardar tarjeta'}
          </button>
          {!listaParaGuardar && (
            <p className="admin-nota">Falta elegir el diseño y la dirección.</p>
          )}
        </div>
      </form>
    </main>
  );
}

export default function AdminCardPage() {
  return <AdminGate><Formulario /></AdminGate>;
}
