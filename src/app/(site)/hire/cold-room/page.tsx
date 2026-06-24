import type { Metadata } from "next";
import Script from "next/script";
import { renderHirePage, hirePageMetadata } from "@/lib/content/render-hire";

const PATH = "/hire/cold-room";

export function generateMetadata(): Promise<Metadata> {
  return hirePageMetadata(PATH);
}

export default async function Page() {
  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-18261228771"
        strategy="afterInteractive"
      />
      <Script id="google-gtag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'AW-18261228771');
        `}
      </Script>
      {await renderHirePage(PATH)}
    </>
  );
}
