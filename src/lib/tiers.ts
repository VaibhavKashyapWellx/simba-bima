import type { Lang } from "./copy";

export type Bilingual = { sw: string; en: string };

export type Tier = {
  id: string;
  badge: Bilingual;
  tag: Bilingual;
  weekly: number;
  monthly: number;
  yearly: number;
  tagline: Bilingual;
  bullets: Bilingual[];
  accent: "ink" | "brick" | "gold" | "captain";
  note_sw?: string;
  note_en?: string;
};

export const TIERS_BASE: Tier[] = [
  {
    id: "bronze",
    badge: { sw: "BRONZE", en: "BRONZE" },
    tag: { sw: "Mshabiki", en: "The Fan" },
    weekly: 350,
    monthly: 1500,
    yearly: 18000,
    tagline: {
      sw: "Kwa kila mshabiki. Daima umefunikwa.",
      en: "For every fan. Always covered.",
    },
    bullets: [
      { sw: "Ajali — kifo TSh 5M", en: "Accidental death TSh 5M" },
      { sw: "Ulemavu wa kudumu TSh 2.5M", en: "Permanent disability TSh 2.5M" },
      { sw: "Hospitali ya dharura TSh 1M", en: "Emergency hospital TSh 1M" },
    ],
    accent: "ink",
  },
  {
    id: "silver",
    badge: { sw: "SILVER", en: "SILVER" },
    tag: { sw: "Familia", en: "The Family" },
    weekly: 920,
    monthly: 3960,
    yearly: 47500,
    tagline: { sw: "Simba watatu, kinga moja.", en: "Three lions, one protection." },
    bullets: [
      { sw: "Funika wewe + mke + mtoto", en: "Covers fan + spouse + 1 child" },
      { sw: "Mazishi TSh 2M", en: "Funeral TSh 2M" },
      { sw: "Hospitali TSh 1.5M", en: "Hospital lump TSh 1.5M" },
    ],
    accent: "brick",
  },
  {
    id: "gold",
    badge: { sw: "GOLD", en: "GOLD" },
    tag: { sw: "Yasiyotarajiwa", en: "The Unexpected" },
    weekly: 2070,
    monthly: 8960,
    yearly: 107500,
    tagline: { sw: "Wakati filimbi inapopigwa.", en: "When the whistle blows." },
    bullets: [
      { sw: "Yote ya Silver", en: "Everything in Silver" },
      { sw: "Hospital Cash TSh 15,000/siku × 5", en: "Hospital cash TSh 15k/day × 5" },
      { sw: "Mazishi TSh 3M", en: "Funeral raised to TSh 3M" },
    ],
    accent: "gold",
    note_sw: "Lazima ukae hospitali saa 48+",
    note_en: "Requires 48hr+ hospital stay",
  },
  {
    id: "captain",
    badge: { sw: "CAPTAIN", en: "CAPTAIN" },
    tag: { sw: "Familia nzima", en: "Whole family" },
    weekly: 8080,
    monthly: 35000,
    yearly: 420000,
    tagline: {
      sw: "Kinga kamili kwa nyumba yote.",
      en: "Total protection, whole house.",
    },
    bullets: [
      { sw: "Hadi watu 5 wa familia", en: "Up to 5 family members" },
      { sw: "Hospital Cash TSh 25k/siku × 10", en: "Hospital TSh 25k/day × 10" },
      { sw: "Critical illness TSh 5M", en: "Critical illness TSh 5M" },
      { sw: "Madai ya kipaumbele 24h", en: "24-hour claims SLA" },
    ],
    accent: "captain",
  },
];

export const TIERS_MOTOR: Tier[] = [
  {
    id: "boda",
    badge: { sw: "BODA SHIELD", en: "BODA SHIELD" },
    tag: { sw: "Mpanda pikipiki", en: "The Rider" },
    weekly: 920,
    monthly: 3960,
    yearly: 47500,
    tagline: { sw: "Kwa mpanda. Kwa barabara.", en: "For the rider. For the road." },
    bullets: [
      { sw: "Bima ya watu wengine (TPL) — TIRA", en: "Statutory third-party liability" },
      { sw: "Uharibifu wa mali TSh 5M", en: "Property damage up to TSh 5M" },
      { sw: "Hati yenye QR — kwa ukaguzi", en: "Digital cover note with QR" },
    ],
    accent: "brick",
  },
  {
    id: "gari-tpl",
    badge: { sw: "GARI TPL", en: "GARI TPL" },
    tag: { sw: "Kima cha chini", en: "The Minimum" },
    weekly: 2310,
    monthly: 10000,
    yearly: 120000,
    tagline: { sw: "Sheria, kwa urahisi.", en: "The minimum the law requires." },
    bullets: [
      { sw: "TPL — TIRA compliant", en: "Statutory third-party liability" },
      { sw: "Uharibifu wa mali TSh 10M", en: "Property damage up to TSh 10M" },
      { sw: "Hati ya kidijitali", en: "Digital cover note" },
    ],
    accent: "ink",
  },
  {
    id: "gari-comp",
    badge: { sw: "GARI COMPLETE", en: "GARI COMPLETE" },
    tag: { sw: "Amani ya akili", en: "Peace of mind" },
    weekly: 6730,
    monthly: 29200,
    yearly: 350000,
    tagline: { sw: "Kwa gari lako. Amani kamili.", en: "For your car. Total peace." },
    bullets: [
      { sw: "Yote ya Gari TPL", en: "Everything in Gari TPL" },
      { sw: "Uharibifu wako — ajali, moto, wizi", en: "Own damage — accident / fire / theft" },
      { sw: "4% ya thamani ya gari", en: "4% of declared vehicle value" },
    ],
    accent: "gold",
    note_sw: "Magari chini ya TSh 8.5M (v1)",
    note_en: "Vehicles ≤ TSh 8.5M (v1 launch)",
  },
];

export function priceFor(tier: Tier, cycle: "weekly" | "monthly" | "yearly"): number {
  return cycle === "weekly" ? tier.weekly : cycle === "monthly" ? tier.monthly : tier.yearly;
}

export function getTier(id: string): Tier | undefined {
  return [...TIERS_BASE, ...TIERS_MOTOR].find((x) => x.id === id);
}

export function tierLabel(t: Tier, lang: Lang): string {
  return t.badge[lang];
}
