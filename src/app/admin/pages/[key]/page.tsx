import { notFound } from "next/navigation";
import Link from "next/link";
import { pageByKey } from "@/lib/content/registry";
import { getContentPage } from "@/lib/content/render-content";
import { getIntroPage } from "@/lib/content/render-intro";
import { getHirePage } from "@/lib/content/render-hire";
import { getBuyPage } from "@/lib/content/render-buy";
import { getAboutPage, getContactPage } from "@/lib/content/render-simple";
import { getHomePage } from "@/lib/content/render-home";
import ContentPageEditor from "./ContentPageEditor";
import IntroPageEditor from "./IntroPageEditor";
import HirePageEditor from "./HirePageEditor";
import BuyPageEditor from "./BuyPageEditor";
import AboutPageEditor from "./AboutPageEditor";
import ContactPageEditor from "./ContactPageEditor";
import HomePageEditor from "./HomePageEditor";
import { ArrowLeft, ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function EditPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;
  const entry = pageByKey(key);
  if (!entry) notFound();

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/pages"
            className="rounded-lg border border-border p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
            title="Back to pages"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{entry.label}</h1>
            <p className="text-xs text-muted-foreground">{entry.path}</p>
          </div>
        </div>
        <Link
          href={entry.path}
          target="_blank"
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium transition hover:bg-muted"
        >
          <ExternalLink className="h-3.5 w-3.5" /> View page
        </Link>
      </div>

      {entry.key === "home" ? (
        <HomePageEditor path={entry.path} initial={await getHomePage()} />
      ) : entry.template === "content" ? (
        <ContentPageEditor path={entry.path} initial={await getContentPage(entry.path)} />
      ) : entry.template === "intro" ? (
        <IntroPageEditor path={entry.path} initial={await getIntroPage(entry.path)} />
      ) : entry.template === "hire" ? (
        <HirePageEditor path={entry.path} initial={await getHirePage(entry.path)} />
      ) : entry.template === "buy" ? (
        <BuyPageEditor path={entry.path} initial={await getBuyPage(entry.path)} />
      ) : entry.key === "about" ? (
        <AboutPageEditor path={entry.path} initial={await getAboutPage()} />
      ) : entry.key === "contact" ? (
        <ContactPageEditor path={entry.path} initial={await getContactPage()} />
      ) : (
        <div className="rounded-xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          The editor for this page type is coming in the next update.
        </div>
      )}
    </div>
  );
}
