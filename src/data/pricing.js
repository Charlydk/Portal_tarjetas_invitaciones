// src/data/pricing.js
// ─── Configuración de precios del cotizador dinámico ───────────────────────
// Editá estos valores para actualizar los precios en toda la app.

export const BASE_PRICE = 10000;

// Módulos incluidos en el precio base (no suman costo extra)
export const INCLUDED_MODULES = [
  'showCivil',
  'showCeremony',
  'showParty',
  'showGifts',
  'showRSVP',
];

// Costo adicional de cada módulo opcional
export const MODULE_PRICES = {
  showCountdown: 2500,
  showDressCode: 2500,
  showGallery:   2500,
  showMusic:     2500,
  askDiets:      2500,
};

// Metadata de módulos para mostrar en la UI (labels, íconos, si está incluido)
export const MODULE_LABELS = {
  showCivil:    { label: 'Ceremonia Civil',        icon: '🏛️', included: true  },
  showCeremony: { label: 'Ceremonia Religiosa',    icon: '⛪', included: true  },
  showParty:    { label: 'Fiesta / Evento',        icon: '🥂', included: true  },
  showGifts:    { label: 'Lista de Regalos',       icon: '🎁', included: true  },
  showRSVP:     { label: 'Confirmación RSVP',      icon: '📞', included: true  },
  showCountdown:{ label: 'Cuenta Regresiva',       icon: '⏳', included: false },
  showDressCode:{ label: 'Dress Code',             icon: '👗', included: false },
  showGallery:  { label: 'Galería de Fotos',       icon: '📸', included: false },
  showMusic:    { label: 'Sugerencia de Música',   icon: '🎵', included: false },
  askDiets:     { label: 'Consulta Dietaria',      icon: '🥗', included: false },
};

// Orden de aparición en el StepModules
export const MODULE_ORDER = [
  'showCivil',
  'showCeremony',
  'showParty',
  'showGifts',
  'showRSVP',
  'showCountdown',
  'showDressCode',
  'showGallery',
  'showMusic',
  'askDiets',
];
