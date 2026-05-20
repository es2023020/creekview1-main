import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CONTACT_INTEREST_FORM_HASH } from "@/components/creekview/SiteFooter";
import {
  DELIVERY_TIMELINE,
  MILLENNIAL_LINE,
  PAYMENT_TERMS,
  SIGNATURE_UNITS,
  formatEGP,
  type Unit,
} from "@/data/creekview";
import { unitsSeo } from "@/lib/seo";
import { CalendarClock, Percent, Sparkles, Wallet } from "lucide-react";

export const Route = createFileRoute("/units")({
  head: () => unitsSeo(),
  component: UnitsPage,
});

function UnitsPage() {
  return (
    <div className="bg-background">
      <header className="border-b border-border/60">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 sm:py-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gold">
            Units &amp; pricing
          </p>
          <h1 className="font-display mt-3 text-[2.125rem] leading-[1.08] tracking-tight sm:text-6xl">
            Choose your home
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
            Millennial one-, two- and three-bedroom homes from one starting price, plus Sky Villas
            and I-Villas — with delivery in {DELIVERY_TIMELINE} and plans up to{" "}
            {PAYMENT_TERMS.maxYears} years.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <TermPill icon={CalendarClock} label={`Delivery in ${DELIVERY_TIMELINE}`} />
            <TermPill
              icon={Percent}
              label={`Up to ${PAYMENT_TERMS.maxYears} years · ${PAYMENT_TERMS.downPaymentPercent}% down`}
            />
            <TermPill icon={Wallet} label="EOI from EGP 50K–70K" />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        {/* Millennial — single card */}
        <section>
          <div className="mb-8 flex flex-col gap-2 border-b border-border/60 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-2xl tracking-tight sm:text-3xl">
                {MILLENNIAL_LINE.name}
              </h2>
              <p className="mt-1.5 max-w-md text-sm text-muted-foreground">
                One-, two- and three-bedroom low-rise homes — one starting price across the line.
              </p>
            </div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Indicative pricing · subject to plan
            </p>
          </div>
          <MillennialCard />
        </section>

        {/* Sky Villa & I-Villa */}
        <section className="mt-16 sm:mt-20">
          <div className="mb-8 border-b border-border/60 pb-6">
            <h2 className="font-display text-2xl tracking-tight sm:text-3xl">
              Sky Villas &amp; I-Villas
            </h2>
            <p className="mt-1.5 max-w-md text-sm text-muted-foreground">
              Elevated and garden-front homes with expanded terraces.
            </p>
          </div>
          <ul className="grid gap-6 sm:grid-cols-2">
            {SIGNATURE_UNITS.map((unit) => (
              <UnitCard key={unit.id} unit={unit} />
            ))}
          </ul>
        </section>

        <p className="mx-auto mt-14 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">
          Prices and EOI amounts are indicative. Final unit pricing, payment schedule and delivery
          milestones are confirmed with the Mountain View sales team at contract.
        </p>

        <div className="mt-10 flex justify-center">
          <Link hash={CONTACT_INTEREST_FORM_HASH} search={{ interest: "eoi" }} to="/contact">
            <Button size="lg" className="h-11 bg-gradient-gold px-8 text-primary hover:opacity-90">
              Reserve your interest
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function TermPill({ icon: Icon, label }: { icon: typeof CalendarClock; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card px-3.5 py-2 text-xs font-medium text-foreground shadow-sm">
      <Icon className="h-3.5 w-3.5 text-gold" strokeWidth={2} aria-hidden />
      {label}
    </span>
  );
}

function MillennialCard() {
  const line = MILLENNIAL_LINE;
  return (
    <article className="group overflow-hidden rounded-2xl border border-border/80 bg-card shadow-card transition hover:shadow-elegant lg:grid lg:grid-cols-2">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted lg:aspect-auto lg:min-h-[320px]">
        <img
          src={line.image}
          alt="Millennial homes at CreekView New Cairo"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/15 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-primary/10 lg:to-primary/50" />
        <div className="absolute bottom-0 left-0 right-0 p-5 text-primary-foreground lg:hidden">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
            {line.category}
          </p>
          <h3 className="font-display mt-1 text-2xl">{line.name}</h3>
          <p className="mt-0.5 text-sm text-white/85">1, 2 &amp; 3 bedroom configurations</p>
        </div>
      </div>

      <div className="flex flex-col p-6 sm:p-8">
        <div className="hidden lg:block">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
            {line.category}
          </p>
          <h3 className="font-display mt-1 text-3xl tracking-tight">{line.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">1, 2 &amp; 3 bedroom configurations</p>
        </div>

        <ul className="mt-6 space-y-3 border-y border-border/60 py-5">
          {line.variants.map((v) => (
            <li key={v.id} className="flex items-baseline justify-between gap-4 text-sm">
              <span className="font-medium text-foreground">{v.bedrooms}</span>
              <span className="text-muted-foreground tabular-nums">{v.builtUp}</span>
            </li>
          ))}
        </ul>

        <dl className="mt-5 grid grid-cols-2 gap-4">
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Starting price
            </dt>
            <dd className="font-display mt-0.5 text-2xl text-primary sm:text-3xl">
              {formatEGP(line.basePrice)}
            </dd>
            <p className="mt-1 text-[11px] text-muted-foreground">All Millennial bedroom types</p>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              EOI
            </dt>
            <dd className="mt-0.5 font-medium tabular-nums">{formatEGP(line.eoiAmount)}</dd>
          </div>
        </dl>

        <p className="mt-4 inline-flex items-start gap-2 rounded-lg bg-gold/10 px-3 py-2 text-[11px] leading-snug">
          <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={2} aria-hidden />
          {PAYMENT_TERMS.label}
        </p>
        <p className="mt-3 text-[11px] text-muted-foreground">
          Delivery in {DELIVERY_TIMELINE} · indicative timeline
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            hash={CONTACT_INTEREST_FORM_HASH}
            search={{ unit: "mil-1br", interest: "more_info" }}
            to="/contact"
          >
            <Button size="sm" variant="outline" className="h-9 text-xs">
              Request details
            </Button>
          </Link>
          <Link
            hash={CONTACT_INTEREST_FORM_HASH}
            search={{ unit: "mil-1br", interest: "eoi" }}
            to="/contact"
          >
            <Button
              size="sm"
              className="h-9 bg-gradient-gold text-xs text-primary hover:opacity-90"
            >
              Send EOI
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}

function UnitCard({ unit }: { unit: Unit & { image: string } }) {
  return (
    <li>
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-card transition hover:-translate-y-0.5 hover:shadow-elegant">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={unit.image}
            alt={`${unit.name} ${unit.bedrooms} at CreekView New Cairo`}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/75 via-primary/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-primary-foreground">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
              {unit.category}
            </p>
            <h3 className="font-display mt-1 text-xl leading-tight">
              {unit.name} · {unit.bedrooms}
            </h3>
            <p className="mt-0.5 text-xs text-white/80">{unit.builtUp} built-up</p>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Starting price
              </dt>
              <dd className="font-display mt-0.5 text-2xl text-primary">
                {formatEGP(unit.basePrice)}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                EOI
              </dt>
              <dd className="mt-0.5 font-medium tabular-nums">{formatEGP(unit.eoiAmount)}</dd>
            </div>
          </dl>

          <p className="mt-4 inline-flex items-start gap-2 rounded-lg bg-gold/10 px-3 py-2 text-[11px] leading-snug text-foreground">
            <Sparkles
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold"
              strokeWidth={2}
              aria-hidden
            />
            {PAYMENT_TERMS.label}
          </p>

          <p className="mt-3 text-[11px] text-muted-foreground">
            Delivery in {DELIVERY_TIMELINE} · indicative timeline
          </p>

          <div className="mt-5 flex gap-2 pt-1">
            <Link
              className="flex-1"
              hash={CONTACT_INTEREST_FORM_HASH}
              search={{ unit: unit.id, interest: "more_info" }}
              to="/contact"
            >
              <Button size="sm" variant="outline" className="h-9 w-full text-xs">
                Request details
              </Button>
            </Link>
            <Link
              className="flex-1"
              hash={CONTACT_INTEREST_FORM_HASH}
              search={{ unit: unit.id, interest: "eoi" }}
              to="/contact"
            >
              <Button
                size="sm"
                className="h-9 w-full bg-gradient-gold text-xs text-primary hover:opacity-90"
              >
                Send EOI
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </li>
  );
}
