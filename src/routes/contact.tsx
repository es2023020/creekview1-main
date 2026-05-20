import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { z } from "zod";
import { LeadForm } from "@/components/creekview/LeadForm";
import { Mail, Phone, MapPin, MessageCircle, ArrowRight } from "lucide-react";
import {
  CONTACT_PHONE,
  CONTACT_EMAIL,
  CONTACT_WHATSAPP_LINK,
  CONTACT_INTEREST_FORM_HASH,
} from "@/components/creekview/SiteFooter";
import { contactSeo } from "@/lib/seo";

const search = z
  .object({
    unit: z.string().optional(),
    interest: z.enum(["more_info", "eoi", "call_back"]).optional(),
  })
  .optional();

export const Route = createFileRoute("/contact")({
  validateSearch: search,
  head: () => contactSeo(),
  component: ContactPage,
});

function ContactPage() {
  const sp = Route.useSearch();
  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });
  const hash = useRouterState({
    select: (s) => s.location.hash,
  });

  useEffect(() => {
    const h = (hash ?? "").replace(/^#/, "");
    if (h !== CONTACT_INTEREST_FORM_HASH) return;
    const timer = window.setTimeout(() => {
      document.getElementById(CONTACT_INTEREST_FORM_HASH)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 120);
    return () => window.clearTimeout(timer);
  }, [pathname, hash, sp]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Ambient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `radial-gradient(ellipse 80% 50% at 50% -20%, oklch(0.72 0.1 85 / 0.18), transparent 55%),
            radial-gradient(ellipse 55% 40% at 100% 0%, oklch(0.4 0.08 260 / 0.08), transparent 50%)`,
        }}
      />

      {/* Intro — concise; no raw phone/email */}
      <header className="relative border-b border-border/60">
        <div className="mx-auto max-w-3xl px-5 pt-10 pb-12 text-center sm:px-8 sm:pt-14 sm:pb-14">
          <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-gold">Contact</p>
          <h1 className="font-display mt-3 text-[2.125rem] leading-[1.08] tracking-tight text-foreground sm:text-5xl">
            We’re here when you’re ready
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            Send one short request below — brochure, scheduled call or EOI — and our team picks it
            up straight away.
          </p>
          <nav
            aria-label="On this page"
            className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3"
          >
            <a
              href={`#${CONTACT_INTEREST_FORM_HASH}`}
              className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-gradient-to-b from-gold/25 to-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary shadow-card transition hover:border-gold/60 hover:from-gold/35"
            >
              Interest form <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
            </a>
            <Link
              to="/units"
              className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/80 px-4 py-2 text-xs font-medium uppercase tracking-wider text-foreground backdrop-blur-sm transition hover:border-primary/35 hover:bg-accent/40"
            >
              Units &amp; pricing
            </Link>
          </nav>
        </div>
      </header>

      <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:pb-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)] lg:items-start lg:gap-14">
          {/* Form first — reservation flows land here */}
          <section id={CONTACT_INTEREST_FORM_HASH} className="scroll-mt-[5.75rem]">
            <LeadForm presetUnit={sp?.unit} presetInterest={sp?.interest} />
          </section>

          {/* Quiet side channel — clicks open native apps without exposing digits */}
          <aside className="space-y-6 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-border/80 bg-card/90 p-5 shadow-card backdrop-blur-sm sm:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Prefer to speak first?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Tap once — your phone or email app opens with our sales team. We never paste numbers
                or addresses on-screen.
              </p>
              <ul className="mt-5 flex flex-col gap-2">
                <ChannelRow
                  href={`tel:${CONTACT_PHONE}`}
                  icon={Phone}
                  label="Call sales"
                  hint="Opens your phone app"
                  accentClass="bg-gold/12 text-gold"
                />
                <ChannelRow
                  href={CONTACT_WHATSAPP_LINK}
                  icon={MessageCircle}
                  label="WhatsApp chat"
                  hint="Opens WhatsApp Web or app"
                  accentClass="bg-[#25D366]/15 text-[#15803d]"
                  external
                />
                <ChannelRow
                  href={`mailto:${CONTACT_EMAIL}?subject=CreekView%20New%20Cairo%20enquiry`}
                  icon={Mail}
                  label="Email the team"
                  hint="Opens your mail app"
                  accentClass="bg-primary/[0.08] text-primary"
                />
              </ul>
            </div>

            <div className="rounded-2xl border border-border/60 bg-muted/35 p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <span
                  className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/90 text-primary-foreground"
                  aria-hidden
                >
                  <MapPin className="h-3.5 w-3.5" strokeWidth={2} />
                </span>
                <div className="min-w-0">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Sales gallery
                  </div>
                  <p className="mt-2 text-sm font-medium leading-snug text-foreground">
                    5th Settlement · New Cairo
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    About two minutes from the Middle Ring Road. Book a visit via the form and
                    we&apos;ll coordinate a slot.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function ChannelRow({
  href,
  icon: Icon,
  label,
  hint,
  accentClass,
  external,
}: {
  href: string;
  icon: typeof Phone;
  label: string;
  hint: string;
  accentClass: string;
  external?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="group flex items-center gap-3 rounded-xl border border-transparent bg-background/55 px-3 py-3 transition-colors hover:border-gold/30 hover:bg-accent/30"
      >
        <span
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${accentClass}`}
          aria-hidden
        >
          <Icon className="h-4 w-4" strokeWidth={2} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-medium text-foreground transition group-hover:text-primary">
            {label}
          </span>
          <span className="text-xs text-muted-foreground">{hint}</span>
        </span>
      </a>
    </li>
  );
}
