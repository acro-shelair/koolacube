import type { Metadata } from "next";
import { ContentPage } from "@/components/site/ContentPage";

export const metadata: Metadata = {
  title: "Emergency Cold Storage | Koolacube",
  description: "When your existing cold room fails, Koolacube can supply replacement cold storage. Subject to availability — call 1300 561 030 anytime.",
  openGraph: {
    title: "Emergency Cold Storage | Koolacube",
    description: "When your existing cold room fails, Koolacube can supply replacement cold storage. Subject to availability — call 1300 561 030 anytime.",
  },
};

export default function Page() {
  return (
    <ContentPage
      eyebrow={"Koolacube"}
      crumb={"Solutions"}
      title={"Emergency Cold Storage"}
      intro={"When your existing cold room fails, Koolacube can supply replacement cold storage. Subject to availability — call 1300 561 030 anytime."}
      bullets={["Subject to availability","Call 1300 561 030 24/7","Depot in Deception Bay","Tested unit before delivery","Maintenance support 50km","Hire continues monthly"]}
    />
  );
}
