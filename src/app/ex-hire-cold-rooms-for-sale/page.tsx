import type { Metadata } from "next";
import { ContentPage } from "@/components/site/ContentPage";

export const metadata: Metadata = {
  title: "Ex-Hire Cold Rooms for Sale | Koolacube",
  description: "Refurbished ex-hire cold rooms available for sale. Tested before sale. Stock changes regularly.",
  openGraph: {
    title: "Ex-Hire Cold Rooms for Sale | Koolacube",
    description: "Refurbished ex-hire cold rooms available for sale. Tested before sale. Stock changes regularly.",
  },
};

export default function Page() {
  return (
    <ContentPage
      eyebrow={"Koolacube"}
      crumb={"Sales"}
      title={"Ex-Hire Cold Rooms for Sale"}
      intro={"Refurbished ex-hire cold rooms available for sale. Tested before sale. Stock changes regularly."}
      bullets={["Tested ex-hire units","Refurbished as required","Limited availability","Cold & freezer units","Cost-effective","Inspection welcome"]}
    />
  );
}
