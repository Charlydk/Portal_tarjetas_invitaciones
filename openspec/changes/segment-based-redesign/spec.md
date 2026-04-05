# Especificaciones: Rediseño por Segmentos ("segment-based-redesign")

## Requirements

1. **Nuevo Origen de Datos (segments.js)**:
   - Crear el archivo `src/data/segments.js` como la fuente unificada para las categorías de negocio.
   - Un `Segment` DEBE contener las propiedades: `id`, `name`, `shortDescription`, y un array de `templates`.
   - Un `Template` DEBE contener: `id`, `name`, `modelId` (referencia al Skeleton), `variantId` (referencia a la variante dentro del modelo), y opcionalmente `thumbnail` o metadata específica de UI.

2. **Refactorización de ControlPanel.jsx (Wizard)**:
   - El primer paso de diseño DEBE permitir la selección del Segmento.
   - Al seleccionar un Segmento, la UI DEBE mostrar únicamente las plantillas asociadas a ese segmento.
   - Al seleccionar una Plantilla, el sistema DEBE actualizar el estado global o local con el `skeletonComponent` y la `variant` correspondientes (abstracción automática).

3. **Botón "Contactar Asesor"**:
   - Se DEBE incluir un CTA claramente visible en la tarjeta o lista de plantillas para derivar al usuario (ej: un link a WhatsApp preconfigurado con el nombre de la plantilla elegida).

4. **Home Page (TemplatesSection)**:
   - La sección de plantillas en la Home DEBE renderizar agrupada por Segmentos (ej: pestañas o carruseles separados por evento).

## Scenarios (BDD)

**Scenario 1: Filtrado visual por evento (Home)**
- **Given** que el usuario ingresa a la Home del portal
- **When** navega a la sección de Diseños Disponibles (`TemplatesSection`)
- **Then** visualiza pestañas o listas etiquetadas ("Bodas", "15 Años", etc.) en lugar de "Esqueletos", mostrando solo las plantillas de esa categoría.

**Scenario 2: Selección intuitiva en el Wizard**
- **Given** que el usuario inicia el Wizard de configuración
- **When** llega al paso de elegir diseño
- **Then** el sistema le pide elegir un "Tipo de Evento" (Segmento)
- **And** al seleccionarlo, muestra los diseños prearmados. Al hacer clic en uno (ej: "Boda Gold"), el preview se actualiza automáticamente aplicando `Skeleton1` y la variante `wedding-classic` sin preguntar configuraciones técnicas extra.

**Scenario 3: Vía Rápida comercial (Asesor)**
- **Given** que el usuario está viendo los diseños en el Wizard o en la Home
- **When** decide que prefiere que lo hagan por él y no quiere editar
- **Then** puede hacer clic en "Contactar Asesor" y se lo dirige al WhatsApp oficial con un mensaje pre-armado: *"Hola, me interesa armar mi invitación con el diseño [Nombre de Plantilla]"*.

## Non-Functional Requirements
- **Retrocompatibilidad**: `models.js` no se debe romper ni modificar destructivamente, ya que las vistas previas seguirán consumiendo esa información. `segments.js` actuará como una capa de mapeo por encima de `models.js`.
