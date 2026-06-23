import Script from "next/script";

const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

/**
 * Loads the Google tag (gtag.js) for Google Ads conversion tracking and
 * remarketing. Renders nothing unless NEXT_PUBLIC_GOOGLE_ADS_ID is set, so it
 * stays inert in local/dev environments without the variable.
 */
export function GoogleAds() {
  if (!ADS_ID) return null;

  return (
    <>
      <Script
        id="gtag-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${ADS_ID}');
        `}
      </Script>
    </>
  );
}
