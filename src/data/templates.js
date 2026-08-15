// src/data/templates.js
//
// URL slugs for the editor: /demo/:slug resolves against `slug` here, and falls
// back to matching `themeId` in DemoPage. Kept in step with segments.js — a
// design that is not offered in the catalogue does not need a pretty slug.
//
// Every legacy variant is still reachable directly at /demo/:variantId and
// /preview/:variantId; only the marketing slugs were pruned.

export const templates = [
  {
    id: 'boda-caricatura',
    title: 'Boda Caricatura',
    thumbnailUrl: '/allegories/boda-caricatura/fondo.webp',
    path: '/demo/boda-caricatura',
    themeId: 'boda-caricatura',
    slug: 'boda-caricatura',
    category: 'Bodas',
  },
  {
    id: 'cenicienta-boda',
    title: 'Boda de Cuento',
    thumbnailUrl: '/allegories/cenicienta/fondo.jpeg',
    path: '/demo/boda-cuento',
    themeId: 'cenicienta-boda',
    slug: 'boda-cuento',
    category: 'Bodas',
  },
  {
    id: 'aurora-boda',
    title: 'Bosque Encantado',
    thumbnailUrl: '/allegories/aurora/baile.webp',
    path: '/demo/bosque-encantado',
    themeId: 'aurora-boda',
    slug: 'bosque-encantado',
    category: 'Bodas',
  },
  {
    id: 'cenicienta-baile',
    title: 'Mis 15 - Cenicienta',
    thumbnailUrl: '/allegories/cenicienta/fondo.jpeg',
    path: '/demo/cenicienta',
    themeId: 'cenicienta-baile',
    slug: 'cenicienta',
    category: 'XV Años',
  },
  {
    id: 'rapunzel-luces',
    title: 'Mis 15 - Rapunzel',
    thumbnailUrl: '/allegories/rapunzel/fondo.webp',
    path: '/demo/rapunzel',
    themeId: 'rapunzel-luces',
    slug: 'rapunzel',
    category: 'XV Años',
  },
  {
    id: 'aurora-gotica',
    title: 'Mis 15 - Aurora Gótica',
    thumbnailUrl: '/allegories/aurora/baile.webp',
    path: '/demo/aurora',
    themeId: 'aurora-gotica',
    slug: 'aurora',
    category: 'XV Años',
  },
  {
    id: 'mariposas-neon',
    title: 'Mis 15 - Mariposas',
    thumbnailUrl: '/allegories/mariposas/fondo.webp',
    path: '/demo/mariposas',
    themeId: 'mariposas-neon',
    slug: 'mariposas',
    category: 'XV Años',
  },
];
