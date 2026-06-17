import type { Metadata } from "next";
import { ContentPage } from "@/components/site/ContentPage";

export const metadata: Metadata = {
  alternates: { canonical: "/cold-room-hire-sunshine-coast" },
  title: "Cold Room Hire Sunshine Coast | Koolacube",
  description: "Sunshine Coast cold room hire for businesses needing reliable cold storage. Talk to us about coverage outside the 50km zone.",
  openGraph: {
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    title: "Cold Room Hire Sunshine Coast | Koolacube",
    description: "Sunshine Coast cold room hire for businesses needing reliable cold storage. Talk to us about coverage outside the 50km zone.",
  },
};

export default function Page() {
  return (
    <ContentPage
      eyebrow={"Koolacube"}
      crumb={"Locations"}
      title={"Cold Room Hire Sunshine Coast"}
      intro={"Sunshine Coast cold room hire for businesses needing reliable cold storage. Talk to us about coverage outside the 50km zone."}
      bullets={["Sunshine Coast region","Monthly hire","Travel may apply outside 50km","Cold, freezer, dual temp","Backed by refrigeration techs","Long-term hire"]}
    />
  );
}
