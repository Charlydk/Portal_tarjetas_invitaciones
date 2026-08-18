/**
 * Los campos de una invitación, en un solo lugar.
 *
 * Existen dos maneras de empezar una tarjeta y necesitan cosas distintas:
 *
 *   El editor público arranca con una pareja de ejemplo, porque el cliente
 *   tiene que ver algo vivo desde el primer segundo o no entiende qué compra.
 *
 *   El panel arranca en blanco, porque ahí se transcriben los datos reales de
 *   alguien. Un "Zoe" de muestra que nadie pisó termina impreso en la tarjeta
 *   de un cliente, y eso se descubre tarde.
 *
 * La lista de campos, en cambio, es una sola. Estaba escrita dentro del
 * `useState` de DemoPage: cualquier campo nuevo había que acordarse de sumarlo
 * también acá, y el que se olvidara no fallaba, simplemente faltaba.
 */

const EN_UN_MES = () =>
  new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().slice(0, 16);

export function createInvitationData({ modelId = null, variantId = null, sample = false } = {}) {
  return {
    modelId,
    variantId,

    // Protagonistas
    name1: sample ? 'Zoe' : '',
    name2: sample ? 'Lucas' : '',
    welcomePhrase: sample ? '¡Estás invitado!' : '',
    invitePhrase: sample ? 'Con cariño te invitamos a compartir este día tan especial' : '',
    // Alimenta la cuenta regresiva. Formato datetime-local.
    eventDate: EN_UN_MES(),

    // Ceremonia civil
    civilDate: '',
    civilTime: '',
    civilPlace: '',
    civilAddress: '',
    civilMapUrl: '',
    civilMapUnknown: false,

    // Ceremonia religiosa
    ceremonyDate: '',
    ceremonyTime: '',
    ceremonyPlace: '',
    ceremonyAddress: '',
    ceremonyMapUrl: '',
    ceremonyMapUnknown: false,

    // La fiesta
    partyDateString: '',
    partyTime: '',
    partyPlace: '',
    partyAddress: '',
    partyMapUrl: '',
    partyMapUnknown: false,
    eventVenue: '',

    // Regalos
    giftMode: 'cbu',
    bankCbu: '',
    alias: sample ? 'zoe.lucas.boda' : '',

    // A dónde confirman los invitados
    whatsappNumber: sample ? '5493810000000' : '',
    whatsappCountryCode: '54',
    whatsappLocalNumber: sample ? '3810000000' : '',

    // Dress code
    dressCodeDescription: sample ? 'Elegante' : '',
    dressCodeColorNote: '',

    galleryPhotos: [],
    musicPlaylistUrl: '',

    // Qué secciones se ven. Todas activas: es más rápido apagar lo que sobra
    // que ir prendiendo de a una.
    showCivil: true,
    showCeremony: true,
    showParty: true,
    showCountdown: true,
    showDressCode: true,
    showGifts: true,
    showGallery: true,
    showMusic: true,
    showRSVP: true,
  };
}
