/**
 * Google Ads conversion for booked intro calls.
 *
 * The Calendly calendar on /contact posts messages to this page. Only the
 * "calendly.event_scheduled" message means a visitor finished booking, so it is
 * the only one that sends the conversion. Page visits, calendar views, time
 * selections, and contact-form submissions are never counted.
 *
 * Safeguards:
 * - Messages are accepted only from https://calendly.com.
 * - One listener for the whole site, however many times the Contact page mounts.
 * - Each booking is counted once: its Calendly invitee address is remembered for
 *   the browser tab and also sent as transaction_id, so Google Ads drops repeats.
 *
 * The conversion goes through gtag, so if Google Consent Mode is added later,
 * the visitor's consent choice applies to it automatically.
 */

const CALENDLY_ORIGIN = 'https://calendly.com';
const BOOKING_CONVERSION = 'AW-18529566855/kx5MCPTOmKcdEIeBy4NF';
const STORAGE_KEY = 'scalize_counted_calendly_bookings';

type Gtag = (...args: unknown[]) => void;

let listening = false;
const countedThisPage = new Set<string>();

function alreadyCounted(id: string): boolean {
  if (countedThisPage.has(id)) return true;
  try {
    const stored: string[] = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]');
    return stored.includes(id);
  } catch {
    return false;
  }
}

function rememberCounted(id: string) {
  countedThisPage.add(id);
  try {
    const stored: string[] = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]');
    if (!stored.includes(id)) {
      stored.push(id);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    }
  } catch {
    // Storage can be blocked (private browsing). The in-page set still prevents repeats.
  }
}

function handleMessage(e: MessageEvent) {
  if (e.origin !== CALENDLY_ORIGIN) return;
  const data = e.data;
  if (!data || typeof data !== 'object' || data.event !== 'calendly.event_scheduled') return;

  // Calendly gives each booking a unique invitee address; fall back to the event address.
  const inviteeUri: unknown = data.payload?.invitee?.uri;
  const eventUri: unknown = data.payload?.event?.uri;
  const bookingId = typeof inviteeUri === 'string' ? inviteeUri : typeof eventUri === 'string' ? eventUri : '';
  if (!bookingId || alreadyCounted(bookingId)) return;

  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag !== 'function') return;

  rememberCounted(bookingId);
  gtag('event', 'conversion', {
    send_to: BOOKING_CONVERSION,
    transaction_id: bookingId.split('/').pop(),
  });
}

/** Start listening for completed Calendly bookings. Safe to call many times. */
export function trackCalendlyBookings() {
  if (listening || typeof window === 'undefined') return;
  listening = true;
  window.addEventListener('message', handleMessage);
}
