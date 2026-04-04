# Tareas: Segment-Based Invitation Redesign

- [ ] 1. Crear `src/data/segments.js` definiendo la estructura de negocio (15 Años, Bodas, etc.) y asegurando que cada template contenga `modelId` y `variantId` válidos según `models.js`.
- [ ] 2. Modificar `src/features/preview/steps/StepDesign.jsx` (Wizard):
    - [ ] Reemplazar la selección de Skeleton por la selección de Segmento (pestañas/botones).
    - [ ] Renderizar las tarjetas de los Templates correspondientes al segmento.
    - [ ] Refactorizar el `onSelect` o `onChange` para que configure modelo y variante de una vez.
    - [ ] Añadir botón/link visible de "Hablar con un asesor sobre este diseño".
- [ ] 3. Modificar `src/components/organisms/TemplatesSection.jsx` (Home):
    - [ ] Importar `segments.js`.
    - [ ] Crear tabs de navegación por segmento.
    - [ ] Actualizar el map de renderizado de las tarjetas (`TemplateCard` o similar) con la data del segmento.
    - [ ] Añadir los botones "Probar Editor" y "Contactar Asesor".
- [ ] 4. Revisión visual y pruebas E2E (Playwright, si corresponde) para constatar que el motor de render (`InvitationPreview`) reciba las credenciales técnicas de forma impecable y no sufra crashes por estados nulos.
