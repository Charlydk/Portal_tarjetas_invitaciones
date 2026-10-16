/**
 * Las restricciones alimentarias que se pueden marcar. Es un vocabulario
 * cerrado a proposito: asi "celiaco" se puede contar para el catering y no hay
 * que adivinar si escribieron "celiaca" o "sin tacc". Lo que no entre va en el
 * texto libre. Los ids son los que acepta guest_respond (007).
 *
 * Vive aparte de guestService para que la tarjeta lo importe sin arrastrar el
 * cliente de Supabase al bundle principal.
 */
export const RESTRICCIONES = [
  { id: 'celiaco', label: 'Celíaco' },
  { id: 'vegetariano', label: 'Vegetariano' },
  { id: 'vegano', label: 'Vegano' },
  { id: 'sin_lactosa', label: 'Sin lactosa' },
  { id: 'frutos_secos', label: 'Alergia a frutos secos' },
  { id: 'otra', label: 'Otra' },
];

export const ETIQUETA_RESTRICCION = Object.fromEntries(RESTRICCIONES.map((r) => [r.id, r.label]));
