import type { Metadata } from "next";
import { ContentPage } from "@/components/site/ContentPage";

export const metadata: Metadata = {
  alternates: { canonical: "/cold-room-hire-during-renovations" },
  title: "Cold Room Hire During Renovations | Koolacube",
  description: "Keep operating while you renovate. Hire a temporary cold room or freezer for the duration of your build.",
  openGraph: {
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    title: "Cold Room Hire During Renovations | Koolacube",
    description: "Keep operating while you renovate. Hire a temporary cold room or freezer for the duration of your build.",
  },
};

export default function Page() {
  return (
    <ContentPage
      eyebrow={"Koolacube"}
      crumb={"Solutions"}
      title={"Cold Room Hire During Renovations"}
      intro={"Keep operating while you renovate. Hire a temporary cold room or freezer for the duration of your build."}
      bullets={["Project-length hire","Cold or freezer","Skid mount on site","Tested before delivery","Monthly billing","Reduces business interruption"]}
    />
  );
}
