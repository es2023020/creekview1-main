import { Link, useRouterState } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/mountain-view-logo.png";
import { CONTACT_INTEREST_FORM_HASH } from "@/components/creekview/SiteFooter";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/project", label: "The Project" },
  { to: "/units", label: "Units & Pricing" },
  { to: "/mountain-view", label: "Mountain View" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();
  const onHome = location.pathname === "/";

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 backdrop-blur-md border-b transition-colors ${onHome ? "bg-primary/40 border-white/10" : "bg-background/90 border-border/60"}`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Mountain View" className="h-10 w-10 object-contain" />
          <div className="leading-tight">
            <div
              className={`text-[10px] tracking-[0.25em] uppercase ${onHome ? "text-white/70" : "text-muted-foreground"}`}
            >
              Mountain View
            </div>
            <div className={`font-display text-lg ${onHome ? "text-white" : "text-foreground"}`}>
              CreekView
            </div>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-7 text-sm">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`${onHome ? "text-white/85 hover:text-gold" : "text-foreground/80 hover:text-primary"} transition`}
              activeProps={{
                className: onHome ? "text-gold font-medium" : "text-primary font-medium",
              }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/contact"
            search={{ interest: "eoi" }}
            hash={CONTACT_INTEREST_FORM_HASH}
            className="hidden sm:block"
          >
            <Button size="sm" className="bg-gradient-gold text-primary hover:opacity-90">
              Reserve Interest
            </Button>
          </Link>
          <button
            className={`lg:hidden p-2 -mr-2 ${onHome ? "text-white" : ""}`}
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t bg-background">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex flex-col gap-3">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-2 text-sm"
                activeProps={{ className: "text-primary font-medium" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/contact"
              search={{ interest: "eoi" }}
              hash={CONTACT_INTEREST_FORM_HASH}
              onClick={() => setOpen(false)}
              className="mt-4"
            >
              <Button size="sm" className="w-full bg-gradient-gold text-primary hover:opacity-90">
                Reserve interest
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
