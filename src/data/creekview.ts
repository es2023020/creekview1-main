import millennialImg from "@/assets/units/millennial.png";
import skyvillaImg from "@/assets/units/skyvilla.jpg";
import ivillaImg from "@/assets/units/ivilla.png";

export type UnitCategory = "Millennial" | "Sky Villa" | "I-Villa";

export type Unit = {
  id: string;
  name: string;
  bedrooms: string;
  config: string;
  builtUp: string;
  basePrice: number;
  category: UnitCategory;
  eoiAmount: number;
};

export type MillennialVariant = {
  id: string;
  bedrooms: string;
  config: string;
  builtUp: string;
};

/** Indicative — confirmed at contract with sales. */
export const DELIVERY_TIMELINE = "2.5 years";

export const PAYMENT_TERMS = {
  maxYears: 14,
  downPaymentPercent: 5,
  label: "Payment plans up to 14 years · 5% down payment",
} as const;

/** One Millennial line — all bedroom types share the same starting price. */
export const MILLENNIAL_LINE = {
  id: "millennial",
  name: "Millennial",
  category: "Millennial" as const,
  basePrice: 5_400_000,
  eoiAmount: 50_000,
  image: skyvillaImg,
  variants: [
    { id: "mil-1br", bedrooms: "1 bedroom", config: "1 BR", builtUp: "65 – 80 m²" },
    { id: "mil-2br", bedrooms: "2 bedrooms", config: "2 BR", builtUp: "110 – 125 m²" },
    { id: "mil-3br", bedrooms: "3 bedrooms", config: "3 BR", builtUp: "140 – 155 m²" },
  ] satisfies MillennialVariant[],
};

export const SIGNATURE_UNITS: (Unit & { image: string })[] = [
  {
    id: "skyvilla",
    name: "Sky Villa",
    bedrooms: "3 bedrooms",
    config: "3 BR",
    builtUp: "160 – 165 m²",
    basePrice: 11_500_000,
    category: "Sky Villa",
    eoiAmount: 70_000,
    image: millennialImg,
  },
  {
    id: "ivilla",
    name: "I-Villa",
    bedrooms: "3 bedrooms",
    config: "3 BR",
    builtUp: "180 – 205 m²",
    basePrice: 12_900_000,
    category: "I-Villa",
    eoiAmount: 70_000,
    image: ivillaImg,
  },
];

/** Flat list for contact form & lookups (Millennial variants + signature homes). */
export const UNITS: Unit[] = [
  ...MILLENNIAL_LINE.variants.map((v) => ({
    id: v.id,
    name: MILLENNIAL_LINE.name,
    bedrooms: v.bedrooms,
    config: v.config,
    builtUp: v.builtUp,
    basePrice: MILLENNIAL_LINE.basePrice,
    category: MILLENNIAL_LINE.category,
    eoiAmount: MILLENNIAL_LINE.eoiAmount,
  })),
  ...SIGNATURE_UNITS.map(({ image: _img, ...u }) => u),
];

export const HIGHLIGHTS = [
  {
    title: "Strategic 5th Settlement Location",
    body: "In the heart of New Cairo — 2 minutes from the Middle Ring Road and minutes from MV Hyde Park and South 90.",
  },
  {
    title: "50% Waterfront",
    body: "Half of the masterplan opens onto water — creeks, lagoons, natural waterfalls.",
  },
  {
    title: "70% Open Spaces",
    body: "Three parks, shaded pathways, wellness retreats and quiet walking trails.",
  },
  { title: "Low-Rise Living", body: "Low-rise homes throughout — light, air and views, never towers." },
  {
    title: "The Lighthouse",
    body: "A dedicated commercial and amenities district at the heart of CreekView.",
  },
  {
    title: "Flexible Payment Plans",
    body: `Attractive plans up to ${PAYMENT_TERMS.maxYears} years with ${PAYMENT_TERMS.downPaymentPercent}% down — tailored to each unit.`,
  },
];

export const LOCATION = [
  { mins: "2", to: "Middle Ring Road" },
  { mins: "2", to: "MV Hyde Park" },
  { mins: "3", to: "North 90 Road" },
  { mins: "5", to: "Golden Square & 5th Settlement" },
];

export const formatEGP = (n: number) =>
  new Intl.NumberFormat("en-EG", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 0,
  }).format(n);

export const unitById = (id: string) => UNITS.find((u) => u.id === id);

export const unitSelectLabel = (u: Unit) => {
  if (u.category === "Millennial") {
    return `${u.name} · ${u.bedrooms} · from ${formatEGP(MILLENNIAL_LINE.basePrice)}`;
  }
  return `${u.name} · ${u.bedrooms} · from ${formatEGP(u.basePrice)}`;
};
