import { CONTACT_EMAIL, CONTACT_PHONE } from "@/components/creekview/SiteFooter";
import {
  DELIVERY_TIMELINE,
  MILLENNIAL_LINE,
  PAYMENT_TERMS,
  SIGNATURE_UNITS,
} from "@/data/creekview";
import { SITE_URL } from "@/lib/site";

export { SITE_URL };

export const SITE = {
  name: "CreekView New Cairo",
  brand: "Mountain View",
  legalName: "Mountain View Egypt",
  tagline: "Waterfront low-rise living in the 5th Settlement, New Cairo",
  locale: "en_US",
  localeAlt: "ar_EG",
  region: "EG",
  placename: "5th Settlement, New Cairo, Egypt",
  defaultOgImage: `${SITE_URL}/og-default.jpg`,
} as const;

/** Invisible — merged into meta keywords on every page. Never render in UI. */
const GLOBAL_KEYWORDS = [
  "creek view",
  "creek",
  "creekview",
  "CreekView",
  "CreekView New Cairo",
  "Mountain View",
  "mountain view",
  "view",
  "mountain",
  "Mountain View Egypt",
  "Mountain View New Cairo",
  "ماونتن فيو",
  "launch",
  "لونش",
  "new launch New Cairo",
  "التجمع الخامس",
  "التجمع",
  "5th settlement",
  "5th Settlement",
  "tagamo3",
  "Tagamo3",
  "hyde park",
  "Hyde Park",
  "MV Hyde Park",
  "شقق",
  "apartments New Cairo",
  "villas",
  "i villas",
  "I-Villa",
  "I-Villa Garden",
  "Sky Villa",
  "bedroom",
  "1 bedroom",
  "2 bedroom",
  "3 bedroom",
  "Millennial",
  "waterfront",
  "New Cairo real estate",
  "low-rise compound",
  "payment plan 14 years",
  "5% down payment",
  "EOI",
  "كريك فيو",
  "عقارات التجمع الخامس",
  "فيلات",
  "شقق التجمع",
].join(", ");

type JsonLd = Record<string, unknown>;

type PageSeoInput = {
  path: string;
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  image?: string;
  ogType?: "website" | "article";
  jsonLd?: JsonLd | JsonLd[];
  extraLinks?: { rel: string; href: string; [key: string]: string | undefined }[];
};

export function absUrl(pathOrAsset: string): string {
  if (pathOrAsset.startsWith("http://") || pathOrAsset.startsWith("https://")) {
    return pathOrAsset;
  }
  const path = pathOrAsset.startsWith("/") ? pathOrAsset : `/${pathOrAsset}`;
  return `${SITE_URL}${path}`;
}

function jsonLdScripts(...graphs: (JsonLd | JsonLd[] | undefined)[]): {
  type: string;
  children: string;
}[] {
  const flat = graphs.flatMap((g) => (g == null ? [] : Array.isArray(g) ? g : [g]));
  return flat.map((data) => ({
    type: "application/ld+json",
    children: JSON.stringify(data),
  }));
}

export function postalAddress() {
  return {
    "@type": "PostalAddress",
    addressLocality: "5th Settlement",
    addressRegion: "New Cairo",
    addressCountry: "EG",
  };
}

export function organizationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${SITE_URL}/#organization`,
    name: SITE.brand,
    legalName: SITE.legalName,
    url: "https://www.mountainviewegypt.com",
    logo: absUrl("/assets/mountain-view-logo.png"),
    sameAs: [
      "https://www.mountainviewegypt.com",
      "https://www.facebook.com/MountainViewEgypt",
      "https://www.linkedin.com/company/mountain-view-egypt",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: CONTACT_PHONE,
      email: CONTACT_EMAIL,
      contactType: "sales",
      areaServed: { "@type": "Country", name: "Egypt" },
      availableLanguage: ["English", "Arabic"],
    },
  };
}

export function websiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE.name,
    alternateName: ["Creek View New Cairo", "CreekView by Mountain View"],
    url: SITE_URL,
    description: SITE.tagline,
    inLanguage: ["en", "ar"],
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/units?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absUrl(item.path),
    })),
  };
}

export function residentialComplexSchema(image?: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ResidentialComplex",
    "@id": `${SITE_URL}/#creekview`,
    name: SITE.name,
    description:
      "Waterfront, low-rise community by Mountain View in the 5th Settlement — 50% waterfront, 70% open space, delivery in 2.5 years.",
    url: SITE_URL,
    image: image ? absUrl(image) : SITE.defaultOgImage,
    address: postalAddress(),
    developer: { "@id": `${SITE_URL}/#organization` },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Waterfront living", value: true },
      { "@type": "LocationFeatureSpecification", name: "Low-rise living", value: true },
      { "@type": "LocationFeatureSpecification", name: "Three landscaped parks", value: true },
    ],
  };
}

export function unitsItemListSchema(): JsonLd {
  const items = [
    {
      name: `${MILLENNIAL_LINE.name} (1–3 bedroom)`,
      price: MILLENNIAL_LINE.basePrice,
      category: MILLENNIAL_LINE.category,
    },
    ...SIGNATURE_UNITS.map((u) => ({
      name: `${u.name} · ${u.bedrooms}`,
      price: u.basePrice,
      category: u.category,
    })),
  ];

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "CreekView New Cairo — homes & pricing",
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: item.name,
        category: item.category,
        brand: { "@type": "Brand", name: SITE.brand },
        offers: {
          "@type": "Offer",
          price: item.price,
          priceCurrency: "EGP",
          availability: "https://schema.org/PreOrder",
          priceValidUntil: "2027-12-31",
          seller: { "@id": `${SITE_URL}/#organization` },
        },
      },
    })),
  };
}

export function faqSchema(entries: { question: string; answer: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((e) => ({
      "@type": "Question",
      name: e.question,
      acceptedAnswer: { "@type": "Answer", text: e.answer },
    })),
  };
}

export function contactPageSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${SITE_URL}/contact#webpage`,
    name: "Contact CreekView Sales",
    url: `${SITE_URL}/contact`,
    description: "Contact Mountain View sales for CreekView New Cairo — brochure, callback or EOI.",
    mainEntity: { "@id": `${SITE_URL}/#organization` },
  };
}

/** Global head tags shared on every page (no page title). */
export function globalHead() {
  return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: SITE.brand },
      { name: "publisher", content: SITE.brand },
      { name: "copyright", content: `© ${new Date().getFullYear()} ${SITE.brand}` },
      { name: "application-name", content: SITE.name },
      { name: "apple-mobile-web-app-title", content: "CreekView" },
      { name: "theme-color", content: "#0f1b3d" },
      { name: "color-scheme", content: "light" },
      { name: "format-detection", content: "telephone=yes" },
      { name: "geo.region", content: "EG-C" },
      { name: "geo.placename", content: SITE.placename },
      { name: "ICBM", content: "30.0280, 31.4650" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: SITE.name },
      { property: "og:site_name", content: SITE.name },
      { property: "og:locale", content: SITE.locale },
      { property: "og:locale:alternate", content: SITE.localeAlt },
    ],
    links: [
      { rel: "sitemap", type: "application/xml", href: `${SITE_URL}/sitemap.xml` },
      { rel: "alternate", hreflang: "en", href: SITE_URL },
      { rel: "alternate", hreflang: "ar-eg", href: SITE_URL },
      { rel: "alternate", hreflang: "x-default", href: SITE_URL },
    ],
    scripts: jsonLdScripts(organizationSchema(), websiteSchema()),
  };
}

type PageSeoInputWithRobots = PageSeoInput & { robots?: string };

/** Per-route head — meta, canonical, Open Graph, Twitter, JSON-LD. Invisible in UI. */
export function pageHead(input: PageSeoInputWithRobots) {
  const url = absUrl(input.path);
  const image = input.image ? absUrl(input.image) : SITE.defaultOgImage;
  const keywords = [input.keywords, GLOBAL_KEYWORDS].filter(Boolean).join(", ");
  const ogTitle = input.ogTitle ?? input.title;
  const ogDescription = input.ogDescription ?? input.description;
  const ogType = input.ogType ?? "website";

  const ld = input.jsonLd ? (Array.isArray(input.jsonLd) ? input.jsonLd : [input.jsonLd]) : [];

  return {
    meta: [
      { title: input.title },
      { name: "description", content: input.description },
      { name: "keywords", content: keywords },
      {
        name: "robots",
        content:
          input.robots ??
          "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      { name: "googlebot", content: "index, follow" },
      { name: "bingbot", content: "index, follow" },
      { property: "og:title", content: ogTitle },
      { property: "og:description", content: ogDescription },
      { property: "og:url", content: url },
      { property: "og:type", content: ogType },
      { property: "og:image", content: image },
      { property: "og:image:alt", content: `${SITE.name} by ${SITE.brand}` },
      { name: "twitter:title", content: ogTitle },
      { name: "twitter:description", content: ogDescription },
      { name: "twitter:image", content: image },
      { name: "twitter:image:alt", content: `${SITE.name} by ${SITE.brand}` },
    ],
    links: [
      { rel: "canonical", href: url },
      { rel: "alternate", hreflang: "en", href: url },
      { rel: "alternate", hreflang: "ar-eg", href: url },
      { rel: "alternate", hreflang: "x-default", href: url },
      ...(input.extraLinks ?? []),
    ],
    scripts: jsonLdScripts(...ld),
  };
}

// ——— Route presets (invisible SEO only) ———

export const homeSeo = (heroImage: string) =>
  pageHead({
    path: "/",
    title: `${SITE.name} by ${SITE.brand} · Waterfront Homes in the 5th Settlement`,
    description: `CreekView by ${SITE.brand} — low-rise waterfront homes in New Cairo's 5th Settlement. Millennial, Sky Villa & I-Villa from EGP 5.4M. ${PAYMENT_TERMS.maxYears}-year plans, ${PAYMENT_TERMS.downPaymentPercent}% down, delivery in ${DELIVERY_TIMELINE}. 2 min to Middle Ring Road & MV Hyde Park.`,
    keywords:
      "CreekView launch, New Cairo compound, waterfront apartments, EGP 5.4 million, real estate investment Egypt",
    image: heroImage,
    jsonLd: [
      residentialComplexSchema(heroImage),
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: SITE.name,
        description: SITE.tagline,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#creekview` },
        breadcrumb: breadcrumbSchema([{ name: "Home", path: "/" }]),
      },
      faqSchema([
        {
          question: "Where is CreekView located?",
          answer:
            "CreekView is in the 5th Settlement, New Cairo — about 2 minutes from the Middle Ring Road, 2 minutes from MV Hyde Park, and 3 minutes from North 90.",
        },
        {
          question: "What is the starting price at CreekView?",
          answer: `Millennial homes start from EGP 5,400,000. Sky Villas from EGP 11,500,000 and I-Villas from EGP 12,900,000, with payment plans up to ${PAYMENT_TERMS.maxYears} years and ${PAYMENT_TERMS.downPaymentPercent}% down.`,
        },
        {
          question: "When is delivery at CreekView?",
          answer: `Indicative delivery is in ${DELIVERY_TIMELINE} from contract, subject to final sales terms.`,
        },
      ]),
    ],
    extraLinks: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
  });

export const projectSeo = (image: string) =>
  pageHead({
    path: "/project",
    title: `The Project · ${SITE.name} by ${SITE.brand}`,
    description: `Explore CreekView New Cairo: 50% waterfront, 70% open spaces, low-rise homes, Islands & Valleys neighborhoods, The Lighthouse district, three parks. 5th Settlement, Hyde Park. Delivery in ${DELIVERY_TIMELINE}.`,
    keywords:
      "creekview project, creek view New Cairo, 5th settlement compound, hyde park, tagamo3, mountain view launch, villas, شقق التجمع الخامس",
    image,
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "The Project", path: "/project" },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        url: `${SITE_URL}/project`,
        name: "The Project · CreekView",
        description: "CreekView masterplan, amenities and vision.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#creekview` },
      },
      residentialComplexSchema(image),
    ],
  });

export const unitsSeo = () =>
  pageHead({
    path: "/units",
    title: `Units & Pricing · ${SITE.name} · Millennial, Sky Villa & I-Villa`,
    description: `CreekView units: Millennial 1–3 bedroom from EGP 5,400,000; Sky Villa from EGP 11,500,000; I-Villa from EGP 12,900,000. EOI from EGP 50K, ${PAYMENT_TERMS.downPaymentPercent}% down, plans up to ${PAYMENT_TERMS.maxYears} years, delivery ${DELIVERY_TIMELINE}.`,
    keywords:
      "creekview units, millennial bedroom, i villas price, sky villa, شقق creekview, villas 5th settlement, tagamo3 apartments",
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Units & Pricing", path: "/units" },
      ]),
      unitsItemListSchema(),
      faqSchema([
        {
          question: "How much do Millennial apartments cost at CreekView?",
          answer:
            "All Millennial configurations (1, 2 and 3 bedroom) start from EGP 5,400,000 with EOI from EGP 50,000.",
        },
        {
          question: "What payment plans are available?",
          answer: `Plans up to ${PAYMENT_TERMS.maxYears} years with ${PAYMENT_TERMS.downPaymentPercent}% down payment. Final schedules are confirmed with sales.`,
        },
      ]),
    ],
  });

export const mountainViewSeo = (logoImage: string) =>
  pageHead({
    path: "/mountain-view",
    title: `${SITE.brand} · Top Real Estate Developer in Egypt · CreekView`,
    description: `${SITE.brand} — Egypt's leading developer since 2005, top 3 for four consecutive years. EGP 105B+ 2024 sales, 18+ projects. Discover the developer behind ${SITE.name}.`,
    keywords:
      "Mountain View Egypt, Mountain View developer, top developer Egypt, CreekView developer",
    image: logoImage,
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Mountain View", path: "/mountain-view" },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        url: `${SITE_URL}/mountain-view`,
        name: `About ${SITE.brand}`,
        mainEntity: organizationSchema(),
      },
    ],
  });

export const contactSeo = () =>
  pageHead({
    path: "/contact",
    title: `Contact Sales · ${SITE.name} by ${SITE.brand}`,
    description:
      "Contact CreekView sales — request brochure on WhatsApp, schedule a call, or submit EOI online. Mountain View advisors respond within 24 hours.",
    keywords: "CreekView sales, Mountain View contact, book site visit New Cairo, EOI CreekView",
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
      ]),
      contactPageSchema(),
      faqSchema([
        {
          question: "How do I reserve interest at CreekView?",
          answer:
            "Use the online interest form for brochure, scheduled callback, or EOI. You can also call or WhatsApp the sales team directly.",
        },
        {
          question: "How can I speak with CreekView sales?",
          answer:
            "Call or WhatsApp the sales team using the contact page actions, or submit the online form for a callback.",
        },
      ]),
    ],
  });

export const notFoundSeo = () =>
  pageHead({
    path: "/404",
    title: `Page not found · ${SITE.name}`,
    description:
      "The page you requested could not be found. Explore CreekView New Cairo homes, pricing, and contact sales.",
    robots: "noindex, follow",
    jsonLd: breadcrumbSchema([{ name: "Home", path: "/" }]),
  });
