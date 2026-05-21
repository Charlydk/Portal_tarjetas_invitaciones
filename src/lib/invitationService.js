import { supabase } from './supabase'
import { invitationModels } from '../data/models'

function getTemplateName(modelId, variantId) {
  const model = invitationModels.find(m => m.id === modelId)
  const variant = model?.variants.find(v => v.id === variantId)
  return variant?.name || variantId || 'Sin selección'
}

function getSelectedModulesList(formData) {
  const lines = []
  if (formData.showCivil)     lines.push('• Ceremonia Civil')
  if (formData.showCeremony)  lines.push('• Ceremonia Religiosa')
  if (formData.showParty)     lines.push('• Fiesta / Evento')
  if (formData.showGifts)     lines.push('• Lista de Regalos')
  if (formData.showRSVP)      lines.push('• Confirmación RSVP')
  if (formData.showCountdown) lines.push('• Cuenta Regresiva (+$2.500)')
  if (formData.showDressCode) lines.push('• Dress Code (+$2.500)')
  if (formData.showGallery)   lines.push('• Galería de Fotos (+$2.500)')
  if (formData.showMusic)     lines.push('• Playlist (+$2.500)')
  if (formData.askDiets)      lines.push('• Consulta Dietaria (+$2.500)')
  return lines.join('\n')
}

export async function submitInvitationLead(formData, totalPrice) {
  const protagonistNames = [formData.name1, formData.name2].filter(Boolean).join(' & ')

  const { data, error } = await supabase
    .from('invitation_leads')
    .insert({
      whatsapp_number: formData.whatsappNumber,
      model_id: formData.modelId,
      variant_id: formData.variantId,
      template_name: getTemplateName(formData.modelId, formData.variantId),
      event_date: formData.eventDate,
      protagonist_names: protagonistNames,
      total_price: totalPrice,
      form_data: formData,
    })
    .select('id')
    .single()

  if (error) throw error
  return data
}

export function buildWhatsAppMessage(formData, totalPrice) {
  const protagonists = [formData.name1, formData.name2].filter(Boolean).join(' & ')
  const template = getTemplateName(formData.modelId, formData.variantId)

  let dateStr = 'A confirmar'
  if (formData.eventDate) {
    try {
      dateStr = new Date(formData.eventDate).toLocaleDateString('es-AR', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
      })
    } catch { /* keep default */ }
  }

  const modules = getSelectedModulesList(formData)
  const price = `$${totalPrice.toLocaleString('es-AR')}`

  return `¡Hola! Quiero hacer mi invitación digital 🎉

👥 *${protagonists}*
📅 *Fecha:* ${dateStr}
🎨 *Diseño:* ${template}
💰 *Precio estimado:* ${price}

*Módulos seleccionados:*
${modules}

¿Podemos avanzar?`
}
