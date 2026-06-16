import type { Metadata } from "next";
import { ContentPage } from "@/components/site/ContentPage";

export const metadata: Metadata = {
  title: "Cold Room Hire for Butchers | Koolacube",
  description: "Cold rooms and freezers built for butchers needing reliable temperature, extra capacity or cover during renovation.",
  openGraph: {
    title: "Cold Room Hire for Butchers | Koolacube",
    description: "Cold rooms and freezers built for butchers needing reliable temperature, extra capacity or cover during renovation.",
  },
};

export default function Page() {
  return (
    <ContentPage
      eyebrow={"Koolacube"}
      crumb={"Industries"}
      title={"Cold Room Hire for Butchers"}
      intro={"Cold rooms and freezers built for butchers needing reliable temperature, extra capacity or cover during renovation."}
      bullets={["Sub-zero freezer rooms","Cold + freezer dual temp","Renovation cover","Maintenance support","Skid mount on site","Backed by ACRO Refrigeration"]}
    />
  );
}
