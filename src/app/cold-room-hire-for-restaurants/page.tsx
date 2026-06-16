import type { Metadata } from "next";
import { ContentPage } from "@/components/site/ContentPage";

export const metadata: Metadata = {
  title: "Cold Room Hire for Restaurants | Koolacube",
  description: "Restaurant cold room hire across SE QLD — for renovations, expansion, overflow stock and seasonal demand.",
  openGraph: {
    title: "Cold Room Hire for Restaurants | Koolacube",
    description: "Restaurant cold room hire across SE QLD — for renovations, expansion, overflow stock and seasonal demand.",
  },
};

export default function Page() {
  return (
    <ContentPage
      eyebrow={"Koolacube"}
      crumb={"Industries"}
      title={"Cold Room Hire for Restaurants"}
      intro={"Restaurant cold room hire across SE QLD — for renovations, expansion, overflow stock and seasonal demand."}
      bullets={["Cold or dual temp","Tested before delivery","Renovation cover","Maintenance backed","Long-term hire","Suits hospitality"]}
    />
  );
}
