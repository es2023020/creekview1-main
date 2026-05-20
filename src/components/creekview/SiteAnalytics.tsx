import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

function GoogleAnalytics() {
  useEffect(() => {
    if (!GA_ID || typeof window === "undefined") return;

    const scriptId = "ga4-script";
    if (document.getElementById(scriptId)) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer ?? [];
    function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", GA_ID, { anonymize_ip: true });
  }, []);

  return null;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Vercel Web Analytics + Speed Insights + optional GA4 (set VITE_GA_MEASUREMENT_ID). */
export function SiteAnalytics() {
  return (
    <>
      <Analytics />
      <SpeedInsights />
      <GoogleAnalytics />
    </>
  );
}
