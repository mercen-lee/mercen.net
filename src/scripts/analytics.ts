export const googleAnalyticsId = 'G-RW31LWWBTF';

type AnalyticsValue = string | number | boolean | null | undefined;
type AnalyticsParams = Record<string, AnalyticsValue>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: 'config' | 'event' | 'js', target: string | Date, params?: AnalyticsParams) => void;
  }
}

function cleanParams(params: AnalyticsParams): AnalyticsParams {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== ''),
  );
}

export function trackEvent(name: string, params: AnalyticsParams = {}): void {
  window.gtag?.('event', name, cleanParams(params));
}

export function trackPageView(hash = window.location.hash): void {
  const pagePath = `${window.location.pathname}${hash}`;

  window.gtag?.('event', 'page_view', {
    page_title: document.title,
    page_location: `${window.location.origin}${pagePath}`,
    page_path: pagePath,
  });
}
