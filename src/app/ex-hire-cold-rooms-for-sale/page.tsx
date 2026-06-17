import type { Metadata } from "next";
import { ContentPage } from "@/components/site/ContentPage";

export const metadata: Metadata = {
  alternates: { canonical: "/ex-hire-cold-rooms-for-sale" },
  title: "Ex-Hire Cold Rooms for Sale | Koolacube",
  description: "Refurbished ex-hire cold rooms available for sale. Tested before sale. Stock changes regularly.",
  openGraph: {
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
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
