import type { Metadata } from "next";
import { ContentPage } from "@/components/site/ContentPage";

export const metadata: Metadata = {
  title: "Cold Room Sales Queensland | Koolacube",
  description: "Buy new or ex-hire cold rooms across Queensland. Commercial grade, supported by ACRO Refrigeration.",
  openGraph: {
    title: "Cold Room Sales Queensland | Koolacube",
    description: "Buy new or ex-hire cold rooms across Queensland. Commercial grade, supported by ACRO Refrigeration.",
  },
};

export default function Page() {
  return (
    <ContentPage
      eyebrow={"Koolacube"}
      crumb={"Sales"}
      title={"Cold Room Sales Queensland"}
      intro={"Buy new or ex-hire cold rooms across Queensland. Commercial grade, supported by ACRO Refrigeration."}
      bullets={["New & ex-hire stock","Cold, freezer, dual temp","Custom builds available","Delivery state-wide","Commercial spec","Optional service plans"]}
    />
  );
}
