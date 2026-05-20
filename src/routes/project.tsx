import { createFileRoute, Link } from "@tanstack/react-router";
import creekImg from "@/assets/creekview-creek.jpg";
import loungeImg from "@/assets/creekview-lounge.jpg";
import aerialImg from "@/assets/creekview-aerial.jpg";
import nightImg from "@/assets/creekview-night.jpg";
import { Button } from "@/components/ui/button";
import { HIGHLIGHTS, LOCATION } from "@/data/creekview";
import { Waves, Trees, Building2, Sparkle, MapPin } from "lucide-react";
import { CONTACT_INTEREST_FORM_HASH } from "@/components/creekview/SiteFooter";
import { projectSeo } from "@/lib/seo";

export const Route = createFileRoute("/project")({
  head: () => projectSeo(aerialImg),
  component: ProjectPage,
});

function ProjectPage() {
  return (
    <div className="bg-background">
      {/* Header band */}
      <section className="relative h-[55vh] overflow-hidden">
        <img
          src={aerialImg}
          alt="Aerial view of CreekView"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/20 to-primary/80" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 h-full flex items-end pb-14 text-primary-foreground">
          <div>
            <div className="text-xs tracking-[0.3em] uppercase text-gold mb-3">The Project</div>
            <h1 className="font-display text-5xl sm:text-7xl">CreekView · New Cairo</h1>
            <p className="mt-4 max-w-xl text-white/85">
              A waterfront masterplan by Mountain View — two neighborhoods, three parks, one creek
              that holds it all together.
            </p>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <div className="text-xs tracking-[0.3em] uppercase text-gold mb-4">Vision</div>
            <h2 className="font-display text-4xl sm:text-5xl leading-tight">
              Designed around water, walking trails and quiet light.
            </h2>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
              CreekView is split into two distinct neighborhoods —{" "}
              <em className="text-foreground not-italic">Islands</em> and{" "}
              <em className="text-foreground not-italic">Valleys</em> — woven together by creeks,
              footbridges and landscaped promenades. Half of the masterplan opens directly onto
              water, and seven in ten square meters are open space. Buildings are kept low-rise
              throughout, so the sky, the water and the light remain the main characters.
            </p>
          </div>
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <img
              src={creekImg}
              alt="Creek view"
              className="rounded-2xl shadow-card aspect-[4/5] object-cover"
              loading="lazy"
            />
            <img
              src={loungeImg}
              alt="Lounge"
              className="rounded-2xl shadow-card aspect-[4/5] object-cover mt-10"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Location — above Why CreekView */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs tracking-[0.3em] uppercase text-gold mb-3">Location</div>
            <h2 className="font-display text-4xl sm:text-5xl">In the heart of New Cairo</h2>
            <p className="text-primary-foreground/70 mt-5 max-w-md">
              Set between Mountain View Hyde Park and South 90, with quick access to AUC, the Westin
              and Golden Square.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-4">
              {LOCATION.map((l) => (
                <div key={l.to} className="border border-white/15 rounded-xl p-5 bg-white/5">
                  <div className="font-display text-3xl text-gold">{l.mins} min</div>
                  <div className="text-sm text-white/75 mt-1">from {l.to}</div>
                </div>
              ))}
            </div>
          </div>
          <img
            src={aerialImg}
            alt="Aerial of CreekView"
            className="rounded-2xl shadow-elegant aspect-[4/3] object-cover w-full"
            loading="lazy"
          />
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20 bg-muted/40">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs tracking-[0.3em] uppercase text-gold mb-3">Why CreekView</div>
            <h2 className="font-display text-4xl sm:text-5xl">Six reasons to call it home</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {HIGHLIGHTS.map((h, i) => {
              const Icon = [Waves, Trees, Building2, Sparkle, MapPin, Sparkle][i] ?? Sparkle;
              return (
                <div
                  key={h.title}
                  className="rounded-2xl border bg-card p-7 hover:shadow-card transition-all hover:-translate-y-1"
                >
                  <Icon className="h-6 w-6 text-gold mb-5" />
                  <h3 className="text-xl">{h.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{h.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quote band */}
      <section className="relative h-[50vh] overflow-hidden">
        <img
          src={nightImg}
          alt="CreekView at dusk"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 p-8 sm:p-16">
          <div className="max-w-7xl mx-auto">
            <p className="font-display text-3xl sm:text-5xl text-primary-foreground max-w-3xl">
              "Half waterfront. Seven-tenths open. Zero towers."
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 text-center">
        <div className="max-w-2xl mx-auto px-5 sm:px-8">
          <h2 className="font-display text-3xl sm:text-5xl">Next: explore your home</h2>
          <p className="mt-4 text-muted-foreground">
            See all unit types and starting prices, or talk to a Mountain View advisor.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link to="/units">
              <Button size="lg">Units & Pricing</Button>
            </Link>
            <Link hash={CONTACT_INTEREST_FORM_HASH} search={{ interest: "eoi" }} to="/contact">
              <Button size="lg" variant="outline">
                Reserve Your Interest
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
