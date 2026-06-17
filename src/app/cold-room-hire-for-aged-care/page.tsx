import type { Metadata } from "next";
import { ContentPage } from "@/components/site/ContentPage";

export const metadata: Metadata = {
  alternates: { canonical: "/cold-room-hire-for-aged-care" },
  title: "Cold Room Hire for Aged Care & Commercial Kitchens | Koolacube",
  description: "Cold room and freezer hire for aged care kitchens, schools and large institutional kitchens. Reliable cold storage backed by qualified refrigeration technicians.",
  openGraph: {
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    title: "Cold Room Hire for Aged Care & Commercial Kitchens | Koolacube",
    description: "Cold room and freezer hire for aged care kitchens, schools and large institutional kitchens. Reliable cold storage backed by qualified refrigeration technicians.",
  },
};

export default function Page() {
  return (
    <ContentPage
      eyebrow={"Koolacube"}
      crumb={"Industries"}
      title={"Cold Room Hire for Aged Care & Commercial Kitchens"}
      intro={"Cold room and freezer hire for aged care kitchens, schools and large institutional kitchens. Reliable cold storage backed by qualified refrigeration technicians."}
      bullets={["Institutional kitchens","Aged care facilities","Schools & clubs","Maintenance included*","Renovation cover","Long-term hire"]}
    />
  );
}
