import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/creekview-hero.jpg";
import creekImg from "@/assets/creekview-creek.jpg";
import nightImg from "@/assets/creekview-night.jpg";
import aerialImg from "@/assets/creekview-aerial.jpg";
import logo from "@/assets/mountain-view-logo.png";
import { Button } from "@/components/ui/button";
import { HIGHLIGHTS, LOCATION } from "@/data/creekview";
import {
  MapPin,
  Sparkle,
  ChevronDown,
  Waves,
  Trees,
  Building2,
  Phone,
  MessageCircle,
} from "lucide-react";
import {
  CONTACT_INTEREST_FORM_HASH,
  CONTACT_PHONE,
  CONTACT_WHATSAPP_LINK,
} from "@/components/creekview/SiteFooter";
import { homeSeo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => homeSeo(heroImg),
  component: Index,
});

function Index() {
  return (
    <div className="bg-background text-foreground -mt-16 min-h-screen">
      {/* HERO */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        <img
          src={heroImg}
          alt="CreekView New Cairo waterfront residences at golden hour"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pb-20 pt-32 w-full">
          <div className="max-w-3xl text-primary-foreground">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 backdrop-blur px-3 py-1 text-xs tracking-wider uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
              New Launch · 5th Settlement, New Cairo
            </div>
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl mt-6 leading-[0.95]">
              Live where the
              <br />
              creek meets the city.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/85 sm:text-xl leading-relaxed">
              CreekView by Mountain View — a low-rise waterfront community in the heart of the 5th
              Settlement — Millennial one- to three-bedroom homes, Sky Villas and I-Villas.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/contact" search={{ interest: "eoi" }} hash={CONTACT_INTEREST_FORM_HASH}>
                <Button
                  size="lg"
                  className="h-11 bg-gradient-gold px-7 text-primary hover:opacity-90 sm:h-12"
                >
                  Reserve Your Interest
                </Button>
              </Link>
              <Link to="/units">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-11 bg-white/10 px-7 text-white hover:bg-white/20 hover:text-white border-white/40 sm:h-12"
                >
                  See Units &amp; Pricing
                </Button>
              </Link>
            </div>
            <div className="max-w-2xl grid grid-cols-2 pt-6 border-t gap-6 sm:grid-cols-4 sm:gap-8 border-white/20">
              <Stat k="50%" v="Waterfront" />
              <Stat k="70%" v="Open spaces" />
              <Stat k="G+5" v="Low-rise" />
              <Stat k="14 yrs" v="Payment plan" />
            </div>
          </div>
          <ChevronDown
            className="-translate-x-1/2 absolute bottom-8 left-1/2 hidden h-5 w-5 text-white/55 motion-safe:animate-bounce sm:block md:bottom-10"
            aria-hidden
          />
        </div>
      </section>

      {/* DEVELOPER STRIP */}
      <section className="border-b bg-muted/30">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 flex flex-wrap items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
            <img
              src={logo}
              alt="Mountain View"
              className="object-contain h-9 w-9 sm:h-10 sm:w-10"
            />
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                A development by
              </div>
              <div className="font-display text-xl">Mountain View · Top 3 Developer in Egypt</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="px-2 py-1 rounded-full border">Since 2005</span>
            <span className="px-2 py-1 rounded-full border">EGP 105B+ 2024 sales</span>
            <span className="px-2 py-1 rounded-full border">18+ projects</span>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl px-5 sm:px-8 mx-auto gap-12 grid items-center lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="text-xs tracking-[0.3em] uppercase text-gold mb-4">The Project</div>
            <h2 className="font-display text-4xl sm:text-5xl leading-tight">
              A masterplan designed around water and quiet light.
            </h2>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
              Two distinct neighborhoods — Islands and Valleys — woven together by creeks,
              footbridges and three landscaped parks. At the center, The Lighthouse: a walkable
              district of cafés, shops and wellness.
            </p>
            <div className="mt-7 flex gap-3 flex-wrap">
              <Link to="/project">
                <Button size="lg" className="h-11 sm:h-12">
                  Discover the Project
                </Button>
              </Link>
              <Link to="/units">
                <Button size="lg" variant="outline" className="h-11 sm:h-12">
                  Units &amp; Pricing
                </Button>
              </Link>
              <Link
                className="self-center ml-1"
                hash={CONTACT_INTEREST_FORM_HASH}
                search={{ interest: "eoi" }}
                to="/contact"
              >
                <span className="text-muted-foreground text-sm underline-offset-4 transition hover:text-foreground underline decoration-gold/50">
                  Enquire →
                </span>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-7">
            <img
              src={creekImg}
              alt="Creek running through CreekView New Cairo"
              className="rounded-2xl shadow-card aspect-[4/3] object-cover w-full"
              loading="lazy"
            />
          </div>
        </div>

        <div className="max-w-7xl px-5 sm:px-8 mx-auto mt-16 gap-5 grid sm:grid-cols-2 lg:grid-cols-3 sm:mt-20">
          {HIGHLIGHTS.map((h, i) => {
            const Icon = [MapPin, Waves, Trees, Building2, Sparkle, Sparkle][i] ?? Sparkle;
            return (
              <div
                key={h.title}
                className="rounded-2xl border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-card sm:p-7"
              >
                <Icon
                  className="mb-4 h-[1.0625rem] w-[1.0625rem] text-gold"
                  strokeWidth={2}
                  aria-hidden
                />
                <h3 className="text-xl">{h.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{h.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* LOCATION */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs tracking-[0.3em] uppercase text-gold mb-3">
              Strategic Location
            </div>
            <h2 className="font-display text-4xl sm:text-5xl">
              In the heart of the 5th Settlement.
            </h2>
            <p className="text-white/75 mt-5 max-w-md leading-relaxed">
              CreekView sits at one of New Cairo's most connected addresses — just 2 minutes from
              the Middle Ring Road and minutes away from MV Hyde Park, North 90 and the wider 5th
              Settlement.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-4">
              {LOCATION.map((l) => (
                <div key={l.to} className="border border-white/15 rounded-xl p-5 bg-white/5">
                  <div className="font-display text-3xl text-gold">{l.mins} min</div>
                  <div className="text-sm text-white/75 mt-1">to {l.to}</div>
                </div>
              ))}
            </div>
          </div>
          <img
            src={aerialImg}
            alt="Aerial view of CreekView in the 5th Settlement"
            className="rounded-2xl shadow-elegant aspect-[4/3] object-cover w-full"
            loading="lazy"
          />
        </div>
      </section>

      {/* GALLERY BAND */}
      <section className="relative h-[min(52vh,32rem)] overflow-hidden">
        <img
          src={nightImg}
          alt="CreekView marina at dusk"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 p-8 sm:p-16">
          <div className="max-w-7xl mx-auto">
            <p className="font-display text-3xl sm:text-5xl text-primary-foreground max-w-2xl">
              "Boats on the creek, light on the water, the quiet of low-rise homes."
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center sm:py-28">
        <div className="mx-auto max-w-xl px-5 sm:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gold">
            Next step
          </p>
          <h2 className="font-display mt-3 text-[2rem] leading-tight sm:text-5xl">
            Begin with the homes, or reserve your slot.
          </h2>
          <p className="mt-4 text-muted-foreground text-[15px] leading-relaxed">
            One short form connects you with CreekView sales — brochures, callbacks and EOIs handled
            in order of receipt.
          </p>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center">
            <Link hash={CONTACT_INTEREST_FORM_HASH} search={{ interest: "eoi" }} to="/contact">
              <Button
                size="lg"
                className="h-11 w-full bg-gradient-gold px-8 text-primary hover:opacity-90 sm:h-12 sm:w-auto"
              >
                Reserve your interest
              </Button>
            </Link>
            <Link to="/units">
              <Button size="lg" variant="outline" className="h-11 w-full sm:h-12 sm:w-auto">
                View units first
              </Button>
            </Link>
          </div>
          <p className="mt-10 text-muted-foreground text-xs uppercase tracking-wider">
            Prefer a direct line?
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px]">
            <a
              href={`tel:${CONTACT_PHONE}`}
              className="inline-flex items-center gap-2 text-foreground underline decoration-gold/40 underline-offset-4 hover:decoration-gold"
            >
              <Phone className="size-3.5 opacity-75" aria-hidden strokeWidth={2} />
              Call sales
            </a>
            <span className="text-border hidden select-none sm:inline" aria-hidden>
              ·
            </span>
            <a
              className="inline-flex items-center gap-2 text-foreground underline decoration-gold/40 underline-offset-4 hover:decoration-gold"
              href={CONTACT_WHATSAPP_LINK}
              rel="noopener noreferrer"
              target="_blank"
            >
              <MessageCircle className="size-3.5 opacity-75" aria-hidden strokeWidth={2} />
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="font-display text-3xl sm:text-4xl text-gold">{k}</div>
      <div className="text-xs uppercase tracking-wider text-white/70 mt-1">{v}</div>
    </div>
  );
}
