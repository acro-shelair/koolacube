import { PageHero, CtaStrip } from "./PageHero";
import { Check } from "lucide-react";

export function ContentPage({
  eyebrow,
  crumb,
  title,
  intro,
  bullets,
  body,
}: {
  eyebrow?: string;
  crumb?: string;
  title: string;
  intro: string;
  bullets?: string[];
  body?: React.ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} crumb={crumb} title={title} intro={intro} />
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4">
          {bullets && bullets.length > 0 && (
            <ul className="grid gap-3 sm:grid-cols-2">
              {bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 rounded border border-border bg-muted/30 p-4 text-sm"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-cold-blue" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
          {body && <div className="prose prose-slate mt-10 max-w-none">{body}</div>}
        </div>
      </section>
      <CtaStrip />
    </>
  );
}
