import type { Metadata } from "next";
import { ContentPage } from "@/components/site/ContentPage";

export const metadata: Metadata = {
  alternates: { canonical: "/service-areas" },
  title: "Service Areas | Koolacube",
  description: "Koolacube services SE Queensland from our Deception Bay depot. Maintenance and breakdown support included within 50km — outside 50km available by agreement.",
  openGraph: {
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    title: "Service Areas | Koolacube",
    description: "Koolacube services SE Queensland from our Deception Bay depot. Maintenance and breakdown support included within 50km — outside 50km available by agreement.",
  },
};

export default function Page() {
  return (
    <ContentPage
      eyebrow={"Koolacube"}
      crumb={"Service Areas"}
      title={"Service Areas"}
      intro={"Koolacube services SE Queensland from our Deception Bay depot. Maintenance and breakdown support included within 50km — outside 50km available by agreement."}
      bullets={["Brisbane","Gold Coast","Sunshine Coast","Moreton Bay","Ipswich","Logan","Within 50km: support included","Outside 50km: by agreement"]}
    />
  );
}
