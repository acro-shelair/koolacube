import type { Metadata } from "next";
import { ContentPage } from "@/components/site/ContentPage";

export const metadata: Metadata = {
  alternates: { canonical: "/freezer-room-hire-brisbane" },
  title: "Freezer Room Hire Brisbane | Koolacube",
  description: "Commercial freezer room hire in Brisbane down to -22°C. Ideal for butchers, food manufacturers and caterers needing extra frozen capacity.",
  openGraph: {
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    title: "Freezer Room Hire Brisbane | Koolacube",
    description: "Commercial freezer room hire in Brisbane down to -22°C. Ideal for butchers, food manufacturers and caterers needing extra frozen capacity.",
  },
};

export default function Page() {
  return (
    <ContentPage
      eyebrow={"Koolacube"}
      crumb={"Locations"}
      title={"Freezer Room Hire Brisbane"}
      intro={"Commercial freezer room hire in Brisbane down to -22°C. Ideal for butchers, food manufacturers and caterers needing extra frozen capacity."}
      bullets={["Monthly hire","Down to -22°C","Tested before delivery","Brisbane metro coverage","Maintenance backed","Long-term focus"]}
    />
  );
}
