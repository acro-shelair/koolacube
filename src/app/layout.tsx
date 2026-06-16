import type { Metadata } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://koolacube.com.au"),
  title: "Koolacube — Commercial Cold Room & Freezer Hire SE Queensland",
  description:
    "Long-term commercial cold room and freezer room hire and sales across Brisbane, Gold Coast and SE QLD. Monthly hire, delivery, setup and maintenance support.",
  authors: [{ name: "Koolacube" }],
  openGraph: {
    title: "Koolacube — Commercial Cold Room Hire SE Queensland",
    description:
      "Relocatable cold rooms and freezer rooms for businesses. Monthly hire from $440 + GST. Backed by ACRO Refrigeration.",
    type: "website",
  },
  twitter: {
    card: "summary",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${barlow.variable}`}>
      <body>
        <div className="flex min-h-screen flex-col bg-background">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
