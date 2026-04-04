# Diseño Técnico: Segment-Based Invitation Redesign

## Arquitectura de la Solución

### 1. Data Layer (`src/data/segments.js`)
Actuará como el único punto de entrada para los selectores de UI. Contendrá un array de objetos `Segment`. Cada `Segment` agrupa `Template`s que apuntan a la configuración técnica real.
Esto mantiene `models.js` puro y desacoplado de la lógica de ventas.

### 2. State Management (El "Truco")
El estado global o de vista previa (`modelId`, `variantId`) **No cambia**. El motor subyacente sigue funcionando exactamente igual. La refactorización es estrictamente una abstracción de UI (Patrón *Decorator/Facade* sobre la selección).

### 3. Modificaciones en el Wizard (`StepDesign.jsx`)
- **Estado Local**: `selectedSegment` (por defecto el primero, e.g., "Bodas").
- **UI Render**: 
  - Fila de pestañas (Tabs) o botones pill para los Segmentos.
  - Grilla de tarjetas para los Templates del Segmento activo.
- **Acción**: Al hacer clic en un Template, se dispara la función `onChange` del padre enviando `{ modelId: template.modelId, variantId: template.variantId }` simultáneamente.

### 4. Modificaciones en Home (`TemplatesSection.jsx`)
- Importar `segments.js`.
- Crear un selector de categorías visual (Pestañas).
- Mapear las tarjetas de plantillas con dos CTAs:
  - "Personalizar (Probar Editor)" -> Lleva al `/wizard`.
  - "Contactar Asesor" -> Link `wa.me/` con un texto "Hola, quiero la plantilla [Nombre] de la categoría [Segmento]".
