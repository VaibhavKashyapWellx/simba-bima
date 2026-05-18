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
  // Schedule-level details for the policy document
  sumInsured?: {
    pa_death: number;
    pa_disability?: number;
    hospital_lump?: number;
    funeral?: number;
    hospital_cash_daily?: number;
    hospital_cash_days?: number;
    critical_illness?: number;
    motor_tpl_property?: number;
    motor_own_damage?: boolean;
  };
};

export const TIERS_BASE: Tier[] = [
  {
    id: "bronze",
    badge: { sw: "BRONZE", en: "BRONZE" },
    tag: { sw: "Solo", en: "Solo" },
    weekly: 350,
    monthly: 1500,
    yearly: 18000,
    tagline: {
      sw: "Kwa kila mshabiki. Daima umefunikwa.",
      en: "For every fan. Always covered.",
    },
    bullets: [
      { sw: "Personal Accident — kifo TSh 5M", en: "PA Death cover up to TSh 5M" },
      { sw: "Ulemavu wa kudumu TSh 2.5M", en: "Permanent disability TSh 2.5M" },
      { sw: "Hospitali ya dharura TSh 1M", en: "Emergency hospital lump TSh 1M" },
    ],
    accent: "ink",
    sumInsured: {
      pa_death: 5_000_000,
      pa_disability: 2_500_000,
      hospital_lump: 1_000_000,
    },
  },
  {
    id: "silver",
    badge: { sw: "SILVER", en: "SILVER" },
    tag: { sw: "Familia ya 3", en: "Family of 3" },
    weekly: 920,
    monthly: 3960,
    yearly: 47500,
    tagline: { sw: "Simba watatu, kinga moja.", en: "Three lions, one protection." },
    bullets: [
      { sw: "Wewe + mke/mume + mtoto", en: "You + spouse + 1 child" },
      { sw: "PA Death TSh 5M kwa kila mtu", en: "PA Death TSh 5M per insured" },
      { sw: "Mazishi TSh 2M", en: "Funeral cover TSh 2M" },
      { sw: "Boda TPL imejumuishwa", en: "Motor TPL (Boda) included" },
    ],
    accent: "brick",
    sumInsured: {
      pa_death: 5_000_000,
      pa_disability: 2_500_000,
      funeral: 2_000_000,
      motor_tpl_property: 3_000_000,
    },
  },
  {
    id: "gold",
    badge: { sw: "GOLD", en: "GOLD" },
    tag: { sw: "Familia + Afya", en: "Family + Health" },
    weekly: 2070,
    monthly: 8960,
    yearly: 107500,
    tagline: { sw: "Wakati filimbi inapopigwa.", en: "When the whistle blows." },
    bullets: [
      { sw: "Yote ya Silver", en: "Everything in Silver" },
      { sw: "Hospital Cash TSh 15,000/siku × 5", en: "Hospital Cash TSh 15k/day × 5 days" },
      { sw: "Mazishi TSh 3M", en: "Funeral raised to TSh 3M" },
    ],
    accent: "gold",
    note_sw: "Lazima ukae hospitali saa 48+",
    note_en: "Requires 48hr+ hospital stay",
    sumInsured: {
      pa_death: 5_000_000,
      pa_disability: 2_500_000,
      funeral: 3_000_000,
      hospital_cash_daily: 15_000,
      hospital_cash_days: 5,
      motor_tpl_property: 3_000_000,
    },
  },
  {
    id: "captain",
    badge: { sw: "CAPTAIN", en: "CAPTAIN" },
    tag: { sw: "Familia ya 5 + VIP", en: "Family of 5 + VIP" },
    weekly: 8080,
    monthly: 35000,
    yearly: 420000,
    tagline: {
      sw: "Kinga kamili kwa nyumba yote.",
      en: "Total protection, whole house.",
    },
    bullets: [
      { sw: "Hadi watu 5 wa familia", en: "Up to 5 family members" },
      { sw: "Hospital Cash TSh 25k/siku × 10", en: "Hospital Cash TSh 25k/day × 10 days" },
      { sw: "Magonjwa makubwa TSh 5M", en: "Critical illness TSh 5M" },
      { sw: "Motor Comprehensive imejumuishwa", en: "Comprehensive Motor included" },
      { sw: "Match-day VIP perks", en: "Match-day VIP perks" },
    ],
    accent: "captain",
    sumInsured: {
      pa_death: 5_000_000,
      pa_disability: 2_500_000,
      funeral: 3_000_000,
      hospital_cash_daily: 25_000,
      hospital_cash_days: 10,
      critical_illness: 5_000_000,
      motor_own_damage: true,
    },
  },
];

// Standalone motor — for fans who already have life cover or just want wheels protected.
export const TIERS_MOTOR: Tier[] = [
  {
    id: "boda",
    badge: { sw: "BODA SHIELD", en: "BODA SHIELD" },
    tag: { sw: "Mpanda pikipiki", en: "The Rider" },
    weekly: 500,
    monthly: 2150,
    yearly: 26000,
    tagline: { sw: "Kwa mpanda. Kwa barabara.", en: "For the rider. For the road." },
    bullets: [
      { sw: "Motor TPL — TIRA compliant", en: "Statutory Motor TPL — TIRA compliant" },
      { sw: "Uharibifu wa mali hadi TSh 3M", en: "Third-party property damage up to TSh 3M" },
      { sw: "Hati ya kidijitali yenye QR", en: "Digital cover note with QR" },
      { sw: "Kwa pikipiki tu", en: "Motorcycle only" },
    ],
    accent: "brick",
    sumInsured: {
      pa_death: 0,
      motor_tpl_property: 3_000_000,
    },
  },
  {
    id: "motor-comp",
    badge: { sw: "MOTOR COMP", en: "MOTOR COMP" },
    tag: { sw: "Comprehensive standalone", en: "Comprehensive standalone" },
    weekly: 3800,
    monthly: 16500,
    yearly: 200000,
    tagline: { sw: "Kinga kamili ya gari.", en: "Total cover for your car." },
    bullets: [
      { sw: "Uharibifu wako — ajali, moto, wizi", en: "Own damage — accident, fire, theft" },
      { sw: "Motor TPL imejumuishwa", en: "Motor TPL included" },
      { sw: "Msaada wa barabarani", en: "Roadside assist & tow" },
      { sw: "4% ya thamani ya gari (Y1)", en: "4% of declared vehicle value (v1)" },
    ],
    accent: "gold",
    note_sw: "Magari chini ya TSh 8.5M (v1)",
    note_en: "Vehicles ≤ TSh 8.5M (v1 launch)",
    sumInsured: {
      pa_death: 0,
      motor_tpl_property: 5_000_000,
      motor_own_damage: true,
    },
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

export function requiresMotor(baseTierId: string, motorAddOnId: string | null): boolean {
  // Standalone motor (boda / motor-comp) requires vehicle details.
  if (motorAddOnId === "boda" || motorAddOnId === "motor-comp") return true;
  // Silver bundles Motor TPL; Captain bundles Comp Motor — also vehicle details.
  if (baseTierId === "silver" || baseTierId === "captain") return true;
  return false;
}

export function isPureMotor(baseTierId: string | null, motorAddOnId: string | null): boolean {
  return !baseTierId && !!motorAddOnId;
}

export function bundledMotor(baseTierId: string): "tpl" | "comp" | null {
  if (baseTierId === "silver") return "tpl";
  if (baseTierId === "captain") return "comp";
  return null;
}
