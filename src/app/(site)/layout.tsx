import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessSchema, websiteSchema } from "@/lib/jsonld";
import { getSettings } from "@/lib/settings.server";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JsonLd data={[localBusinessSchema(settings), websiteSchema()]} />
      <SiteHeader
        telephone={settings.telephone}
        telephoneE164={settings.telephoneE164}
      />
      <main className="flex-1">{children}</main>
      <SiteFooter settings={settings} />
    </div>
  );
}
