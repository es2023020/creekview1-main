import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import logo from "@/assets/mountain-view-logo.png";
import { CONTACT_INTEREST_FORM_HASH } from "@/components/creekview/SiteFooter";
import { MV_FIGURES, MV_MILESTONES, MV_PROJECTS, MV_PARTNERS } from "@/data/mountainView";
import { mountainViewSeo } from "@/lib/seo";

export const Route = createFileRoute("/mountain-view")({
  head: () => mountainViewSeo(logo),
  component: MountainViewPage,
});

function MountainViewPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="text-xs tracking-[0.3em] uppercase text-gold mb-4">The Company</div>
            <h1 className="font-display text-5xl sm:text-7xl leading-[1.05]">
              Experience Happiness.
            </h1>
            <p className="mt-6 text-white/80 text-lg max-w-xl leading-relaxed">
              Mountain View has been building Egypt's most loved communities since 2005 — ranked
              among the country's top 3 developers for four consecutive years. CreekView is the
              latest expression of a philosophy that has shaped 18+ projects across Egypt.
            </p>
            <div className="mt-8 flex gap-3">
              <Link to="/project">
                <Button size="lg" className="bg-gradient-gold text-primary hover:opacity-90">
                  Explore CreekView
                </Button>
              </Link>
              <Link hash={CONTACT_INTEREST_FORM_HASH} to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                >
                  Speak to sales
                </Button>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 flex justify-center">
            <div className="bg-white/10 rounded-3xl p-10 backdrop-blur border border-white/15">
              <img
                src={logo}
                alt="Mountain View logo"
                className="h-48 w-48 object-contain mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key figures */}
      <section className="py-20 border-b">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs tracking-[0.3em] uppercase text-gold mb-3">Key figures</div>
            <h2 className="font-display text-4xl sm:text-5xl">Mountain View today</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MV_FIGURES.map((f) => (
              <div
                key={f.k}
                className="rounded-2xl border bg-card p-6 text-center hover:shadow-card transition-all hover:-translate-y-1"
              >
                <div className="font-display text-3xl text-primary">{f.v}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-2">
                  {f.k}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-muted/40">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-8">
          <article className="rounded-2xl border bg-card p-8">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-primary text-primary-foreground grid place-items-center font-display text-lg">
                AS
              </div>
              <div>
                <h3 className="text-xl">Eng. Amr Soliman</h3>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  Founder & Executive Chairman
                </div>
              </div>
            </div>
            <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
              Architect who started his career in 1989 at Dar Al-Mimar Group. Featured in Forbes
              Middle East (2024) as one of MENA's most impactful real estate developers. Founded
              Mountain View on four pillars: beauty, comfort, efficiency and cost-effectiveness.
            </p>
          </article>
          <article className="rounded-2xl border bg-card p-8">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-primary text-primary-foreground grid place-items-center font-display text-lg">
                WE
              </div>
              <div>
                <h3 className="text-xl">Eng. Wael Ezz</h3>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Co-CEO</div>
              </div>
            </div>
            <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
              Leads construction and delivery operations across the group. Oversees EGP 18B in 2025
              construction investments and partnerships with 100+ major contracting and supply
              companies to deliver projects on schedule.
            </p>
          </article>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-14">
            <div className="text-xs tracking-[0.3em] uppercase text-gold mb-3">Timeline</div>
            <h2 className="font-display text-4xl sm:text-5xl">From DMG to Mountain View</h2>
          </div>
          <ol className="relative border-l-2 border-gold/40 pl-8 space-y-7">
            {MV_MILESTONES.map((m) => (
              <li key={m.y} className="relative">
                <span className="absolute -left-[42px] top-1 h-4 w-4 rounded-full bg-gold ring-4 ring-background" />
                <div className="font-display text-2xl text-primary">{m.y}</div>
                <p className="text-muted-foreground mt-1 leading-relaxed">{m.t}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Projects portfolio */}
      <section className="py-20 bg-muted/40">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs tracking-[0.3em] uppercase text-gold mb-3">Portfolio</div>
            <h2 className="font-display text-4xl sm:text-5xl">18+ projects across Egypt</h2>
          </div>
          <div className="overflow-x-auto rounded-2xl border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-primary text-primary-foreground">
                <tr className="text-left">
                  <th className="py-3 px-5">Project</th>
                  <th className="py-3 px-5">Location</th>
                  <th className="py-3 px-5">Area</th>
                  <th className="py-3 px-5">Starting price</th>
                </tr>
              </thead>
              <tbody>
                {MV_PROJECTS.map((p) => (
                  <tr key={p.name} className="border-b last:border-0 hover:bg-muted/40">
                    <td className="py-3 px-5 font-medium">{p.name}</td>
                    <td className="py-3 px-5 text-muted-foreground">{p.loc}</td>
                    <td className="py-3 px-5 text-muted-foreground">{p.area}</td>
                    <td className="py-3 px-5">{p.from}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Partnerships */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs tracking-[0.3em] uppercase text-gold mb-3">Partnerships</div>
            <h2 className="font-display text-4xl sm:text-5xl">A network of world-class partners</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MV_PARTNERS.map((p) => (
              <div
                key={p.name}
                className="rounded-2xl border bg-card p-6 hover:shadow-card transition-all hover:-translate-y-1"
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg">{p.name}</h3>
                  <span className="text-xs text-gold font-medium">{p.year}</span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <div className="text-xs tracking-[0.3em] uppercase text-gold mb-3">Brand identity</div>
          <h2 className="font-display text-4xl sm:text-5xl">
            Red mailboxes. Blue bricks. One community.
          </h2>
          <p className="mt-5 text-white/80 leading-relaxed">
            Every Mountain View compound carries the same signature visual elements — used
            deliberately to unify communities across the country. Our five project criteria:
            strategic location, innovative design, livable & integrated communities, customized
            residential options, and competitive pricing.
          </p>
          <div className="mt-9">
            <Link hash={CONTACT_INTEREST_FORM_HASH} search={{ interest: "eoi" }} to="/contact">
              <Button
                size="lg"
                className="h-12 bg-gradient-gold px-8 text-primary hover:opacity-90"
              >
                Reserve Your Interest
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
