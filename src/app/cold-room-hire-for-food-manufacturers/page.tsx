import type { Metadata } from "next";
import { ContentPage } from "@/components/site/ContentPage";

export const metadata: Metadata = {
  alternates: { canonical: "/cold-room-hire-for-food-manufacturers" },
  title: "Cold Room Hire for Food Manufacturers | Koolacube",
  description: "Extra cold and freezer capacity for food manufacturers — production overflow, NPD trials, or extended downtime cover.",
  openGraph: {
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    title: "Cold Room Hire for Food Manufacturers | Koolacube",
    description: "Extra cold and freezer capacity for food manufacturers — production overflow, NPD trials, or extended downtime cover.",
  },
};

export default function Page() {
  return (
    <ContentPage
      eyebrow={"Koolacube"}
      crumb={"Industries"}
      title={"Cold Room Hire for Food Manufacturers"}
      intro={"Extra cold and freezer capacity for food manufacturers — production overflow, NPD trials, or extended downtime cover."}
      bullets={["Skid-mount installs","Freezer to -22°C","Production overflow","Multiple units possible","Service-backed","Long-term hire"]}
    />
  );
}
