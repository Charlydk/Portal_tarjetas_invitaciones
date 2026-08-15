// Single source for the business WhatsApp link.
//
// The number used to be hardcoded in each component — PricingSection pointed at
// `wa.me/1234567890` and the hero at the placeholder `5491100000000`. On a site
// whose whole conversion path is "write to us", a dead number is the most
// expensive bug there is.

const NUMBER = import.meta.env.VITE_BUSINESS_WHATSAPP || '';

/** True when a real number is configured. Guard CTAs with this. */
export const hasWhatsApp = Boolean(NUMBER) && NUMBER !== '5491100000000';

/** wa.me link with a prefilled message. */
export function waLink(text = '¡Hola! Me interesan las invitaciones digitales.') {
  return `https://wa.me/${NUMBER}?text=${encodeURIComponent(text)}`;
}
