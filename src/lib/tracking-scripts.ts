/**
 * Scripts de rastreamento (GA4/Google Ads via gtag.js e Meta Pixel), montados a partir de
 * variáveis VITE_* (públicas, embutidas no bundle no build — não são segredo). Cada uma é
 * opcional: sem a variável configurada, o script correspondente simplesmente não é incluído.
 */
export function buildTrackingScripts(): Array<{ attrs?: Record<string, unknown>; children?: string }> {
  const scripts: Array<{ attrs?: Record<string, unknown>; children?: string }> = []

  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID
  const googleAdsId = import.meta.env.VITE_GOOGLE_ADS_ID
  const gtagIds = [gaId, googleAdsId].filter((id): id is string => Boolean(id))

  if (gtagIds.length > 0) {
    scripts.push({ attrs: { src: `https://www.googletagmanager.com/gtag/js?id=${gtagIds[0]}`, async: true } })
    scripts.push({
      children: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
${gtagIds.map((id) => `gtag('config', '${id}');`).join('\n')}`,
    })
  }

  const metaPixelId = import.meta.env.VITE_META_PIXEL_ID
  if (metaPixelId) {
    scripts.push({
      children: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${metaPixelId}');
fbq('track', 'PageView');`,
    })
  }

  return scripts
}
