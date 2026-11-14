// Configure one verified sales channel before accepting quote requests.
// Use the international format without '+' or spaces for WhatsApp, e.g. countrycode + number.
export const QUOTE_CONFIG = {
  salesWhatsapp: '966551276060',
  requestEndpoint: 'https://osus-alhalwa.com/backend/wp-json/osus/v1/quotes',
  trackingEndpoint: 'https://osus-alhalwa.com/backend/wp-json/osus/v1/track'
} as const;
