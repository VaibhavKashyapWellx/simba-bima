import type { Lang } from "./copy";
import { getTier, type Tier } from "./tiers";

export type Policy = {
  policyNumber: string;
  coverNoteId: string;
  baseTierId: string;
  motorAddOnId: string | null;
  weeklyPremium: number;
  issuedAt: string; // ISO
  inceptionAt: string;
  expiresAt: string;
  status: "active" | "lapsed" | "paused";
  insured: {
    name: string;
    nida: string;
    phone: string;
    region: string;
  };
  vehicle: {
    reg: string;
    make: string;
    cc: string;
    colour: string;
  } | null;
  dependents: { name: string; relation: string }[];
  beneficiaries: { name: string; relation: string; share: number }[];
  underwriter: string;
  tiraLicence: string;
};

const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTUVWXYZ";
function genId(len: number): string {
  let s = "";
  for (let i = 0; i < len; i++) s += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  return s;
}

export function generatePolicyNumber(baseTierId: string, motorAddOnId: string | null): string {
  const yy = new Date().getFullYear().toString().slice(-2);
  const base = (baseTierId || "MOT").slice(0, 2).toUpperCase();
  const motor = motorAddOnId ? "-" + motorAddOnId.slice(0, 3).toUpperCase() : "";
  return `SB-${yy}-${base}${motor}-${genId(6)}`;
}

export function generateCoverNoteId(): string {
  const yy = new Date().getFullYear().toString().slice(-2);
  return `CN-${yy}-${genId(7)}`;
}

export function generateClaimId(): string {
  const yy = new Date().getFullYear().toString().slice(-2);
  return `SB-CL-${yy}-${genId(6)}`;
}

export function issuePolicy(input: {
  baseTierId: string;
  motorAddOnId: string | null;
  weeklyPremium: number;
  insured: Policy["insured"];
  vehicle: Policy["vehicle"];
  dependents?: Policy["dependents"];
  beneficiaries?: Policy["beneficiaries"];
}): Policy {
  const now = new Date();
  const expires = new Date(now);
  expires.setFullYear(expires.getFullYear() + 1);
  return {
    policyNumber: generatePolicyNumber(input.baseTierId, input.motorAddOnId),
    coverNoteId: generateCoverNoteId(),
    baseTierId: input.baseTierId,
    motorAddOnId: input.motorAddOnId,
    weeklyPremium: input.weeklyPremium,
    issuedAt: now.toISOString(),
    inceptionAt: now.toISOString(),
    expiresAt: expires.toISOString(),
    status: "active",
    insured: input.insured,
    vehicle: input.vehicle,
    dependents: input.dependents ?? [],
    beneficiaries:
      input.beneficiaries ?? [
        { name: input.insured.name, relation: "Self", share: 100 },
      ],
    underwriter: "MO Assurance Limited",
    tiraLicence: "UWB/0427/24",
  };
}

export function policyTitle(p: Policy, lang: Lang): string {
  const base = getTier(p.baseTierId);
  const motor = p.motorAddOnId ? getTier(p.motorAddOnId) : null;
  const parts: string[] = [];
  if (base) parts.push(base.badge[lang]);
  if (motor) parts.push(motor.badge[lang]);
  return parts.join(" + ");
}

export function tiers(p: Policy): { base: Tier | undefined; motor: Tier | undefined } {
  return {
    base: getTier(p.baseTierId),
    motor: p.motorAddOnId ? getTier(p.motorAddOnId) : undefined,
  };
}

export function formatDate(iso: string, lang: Lang = "en"): string {
  const d = new Date(iso);
  return d.toLocaleDateString(lang === "sw" ? "sw-TZ" : "en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function fmtTSh(n: number): string {
  return n.toLocaleString("en-US");
}
