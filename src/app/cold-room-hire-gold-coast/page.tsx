import type { Metadata } from "next";
import { ContentPage } from "@/components/site/ContentPage";

export const metadata: Metadata = {
  title: "Cold Room Hire Gold Coast | Koolacube",
  description: "Cold room hire across the Gold Coast for restaurants, kitchens, caterers and food businesses. Monthly hire with maintenance backed by ACRO Refrigeration.",
  openGraph: {
    title: "Cold Room Hire Gold Coast | Koolacube",
    description: "Cold room hire across the Gold Coast for restaurants, kitchens, caterers and food businesses. Monthly hire with maintenance backed by ACRO Refrigeration.",
  },
};

export default function Page() {
  return (
    <ContentPage
      eyebrow={"Koolacube"}
      crumb={"Locations"}
      title={"Cold Room Hire Gold Coast"}
      intro={"Cold room hire across the Gold Coast for restaurants, kitchens, caterers and food businesses. Monthly hire with maintenance backed by ACRO Refrigeration."}
      bullets={["Gold Coast wide","Monthly hire","Tested before delivery","Delivery from Deception Bay","Suitable for hospitality","Hire or buy options"]}
    />
  );
}
