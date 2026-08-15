// src/data/segments.js
//
// The public catalogue. Only finished designs live here.
//
// It used to list 44 entries, 39 of them unfinished legacy skeletons whose
// thumbnails were stock photos unrelated to the actual card — a visitor clicked
// expecting one thing and got another. The skeletons still exist in
// src/templates/ and stay reachable at /preview/:variantId; they are simply not
// offered for sale until they are converted into allegories.
//
// Rule for adding an entry: it needs a `previewImage` that honestly shows the
// design. If there is no such image, the design is not finished.

export const invitationSegments = [
  {
    id: 'bodas',
    name: 'Bodas',
    description: 'Diseños elegantes para tu casamiento.',
    templates: [
      {
        id: 'boda-caricatura',
        name: 'Boda Caricatura',
        modelId: 'allegories',
        variantId: 'boda-caricatura',
        previewImage: '/allegories/boda-caricatura/fondo.webp',
        description: 'Ilustración en acuarela, crema y celeste, con video de fondo. Cálida e informal.',
      },
      {
        id: 'cenicienta-boda',
        name: 'Boda de Cuento',
        modelId: 'allegories',
        variantId: 'cenicienta-boda',
        previewImage: '/allegories/cenicienta/fondo.jpeg',
        description: 'Azul noche y dorado, con video y medallones ilustrados. La más formal del catálogo.',
      },
      {
        id: 'aurora-boda',
        name: 'Bosque Encantado',
        modelId: 'allegories',
        variantId: 'aurora-boda',
        previewImage: '/allegories/aurora/baile.webp',
        description: 'Bosque oscuro, dorado envejecido y luciérnagas. Romántica y dramática.',
      },
    ],
  },
  {
    id: '15-anos',
    name: '15 Años',
    description: 'Celebrá tus quince con el estilo que te merecés.',
    templates: [
      {
        id: 'cenicienta-baile',
        name: 'Cenicienta',
        modelId: 'allegories',
        variantId: 'cenicienta-baile',
        previewImage: '/allegories/cenicienta/fondo.jpeg',
        description: 'Azul noche y dorado, con video y medallones ilustrados. Cada sección contada dentro del cuento.',
      },
      {
        id: 'rapunzel-luces',
        name: 'Rapunzel',
        modelId: 'allegories',
        variantId: 'rapunzel-luces',
        previewImage: '/allegories/rapunzel/fondo.webp',
        description: 'Violeta y dorado, con los farolitos en video de portada.',
      },
      {
        id: 'aurora-gotica',
        name: 'Aurora Gótica',
        modelId: 'allegories',
        variantId: 'aurora-gotica',
        previewImage: '/allegories/aurora/baile.webp',
        description: 'Bosque oscuro, dorado envejecido y luciérnagas. La más producida del catálogo.',
      },
      {
        id: 'mariposas-neon',
        name: 'Mariposas',
        modelId: 'allegories',
        variantId: 'mariposas-neon',
        previewImage: '/allegories/mariposas/fondo.webp',
        description: 'Mariposas neón sobre negro, con video de fondo. La más moderna.',
      },
    ],
  },
];
