import type { Metadata } from "next";
import { ContentPage } from "@/components/site/ContentPage";

export const metadata: Metadata = {
  title: "Cold Room Hire Brisbane | Koolacube",
  description: "Long-term commercial cold room hire across greater Brisbane. Monthly hire from $440 + GST, delivery and maintenance backed by ACRO Refrigeration.",
  openGraph: {
    title: "Cold Room Hire Brisbane | Koolacube",
    description: "Long-term commercial cold room hire across greater Brisbane. Monthly hire from $440 + GST, delivery and maintenance backed by ACRO Refrigeration.",
  },
};

export default function Page() {
  return (
    <ContentPage
      eyebrow={"Koolacube"}
      crumb={"Locations"}
      title={"Cold Room Hire Brisbane"}
      intro={"Long-term commercial cold room hire across greater Brisbane. Monthly hire from $440 + GST, delivery and maintenance backed by ACRO Refrigeration."}
      bullets={["Within 50km of Deception Bay depot","Maintenance support included","240V standard units available","Suits CBD, north, west, south","Delivery & setup quoted","Monthly hire"]}
    />
  );
}
