import Script from "next/script";

// Klaviyo onsite (public) company ID — exposed client-side by design.
const KLAVIYO_COMPANY_ID = "RHuYaW";

/**
 * Klaviyo onsite JavaScript: loads klaviyo.js and initializes the global
 * `window.klaviyo` queue so onsite forms, popups and tracking work site-wide.
 * Rendered once from the root layout. `afterInteractive` is Klaviyo's
 * recommended strategy (loads early, after hydration begins).
 */
export function KlaviyoScript() {
  return (
    <>
      <Script
        id="klaviyo-onsite"
        strategy="afterInteractive"
        src={`https://static.klaviyo.com/onsite/js/${KLAVIYO_COMPANY_ID}/klaviyo.js?company_id=${KLAVIYO_COMPANY_ID}`}
      />
      <Script id="klaviyo-init" strategy="afterInteractive">
        {`!function(){if(!window.klaviyo){window._klOnsite=window._klOnsite||[];try{window.klaviyo=new Proxy({},{get:function(n,i){return"push"===i?function(){var n;(n=window._klOnsite).push.apply(n,arguments)}:function(){for(var n=arguments.length,o=new Array(n),w=0;w<n;w++)o[w]=arguments[w];var t="function"==typeof o[o.length-1]?o.pop():void 0,e=new Promise((function(n){window._klOnsite.push([i].concat(o,[function(i){t&&t(i),n(i)}]))}));return e}}})}catch(n){window.klaviyo=window.klaviyo||[],window.klaviyo.push=function(){var n;(n=window._klOnsite).push.apply(n,arguments)}}}}();`}
      </Script>
    </>
  );
}
