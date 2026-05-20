import { Link } from "@tanstack/react-router";
import logo from "@/assets/mountain-view-logo.png";
import { Phone, Mail, MapPin } from "lucide-react";

export const CONTACT_PHONE = "+201014681993";
/** Shown where a human-readable dial string is intentional (schemas, debugging). Prefer actions without exposing in UI copy. */
export const CONTACT_PHONE_DISPLAY = "+20 101 468 1993";
export const CONTACT_EMAIL = "sayed.shoeip@addressinv.com";
export const CONTACT_WHATSAPP_LINK = "https://wa.me/201014681993";
/** Anchors reservation links to the enquiry form section on `/contact`. */
export const CONTACT_INTEREST_FORM_HASH = "interest-form";

export function SiteFooter() {
  return (
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Mountain View"
              className="h-12 w-12 object-contain bg-white/95 rounded-lg p-1"
            />
            <div>
              <div className="text-[10px] tracking-[0.25em] uppercase text-white/60">
                Mountain View
              </div>
              <div className="font-display text-xl">CreekView · New Cairo</div>
            </div>
          </div>
          <p className="mt-5 text-sm text-white/75 max-w-md leading-relaxed">
            A waterfront, low-rise community in the heart of the 5th Settlement — by Mountain View,
            one of Egypt's top real estate developers since 2005.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-gold mb-4">Explore</div>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/project" className="hover:text-gold">
                The Project
              </Link>
            </li>
            <li>
              <Link to="/units" className="hover:text-gold">
                Units & Pricing
              </Link>
            </li>
            <li>
              <Link to="/mountain-view" className="hover:text-gold">
                Mountain View Group
              </Link>
            </li>
            <li>
              <Link to="/contact" hash={CONTACT_INTEREST_FORM_HASH} className="hover:text-gold">
                Contact Sales
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-gold mb-4">Get in touch</div>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold opacity-90" strokeWidth={2} />
              <a href={`tel:${CONTACT_PHONE}`} className="leading-snug hover:text-gold">
                Call sales<span className="sr-only"> (opens phone dialer)</span>
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold opacity-90" strokeWidth={2} />
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=CreekView%20New%20Cairo%20enquiry`}
                className="leading-snug hover:text-gold"
              >
                Email sales<span className="sr-only"> (opens mail app)</span>
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin
                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold opacity-90"
                strokeWidth={2}
              />
              <span className="text-white/80">5th Settlement, New Cairo</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/60">
        © {new Date().getFullYear()} Mountain View · CreekView New Cairo. Pricing indicative; final
        terms confirmed by the sales team.
      </div>
    </footer>
  );
}
