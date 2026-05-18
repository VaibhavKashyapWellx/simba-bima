"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Lang } from "./copy";
import { issuePolicy, type Policy, generateClaimId } from "./policy";

export type Aesthetic = "bold" | "soft";
export type Hero = "stadium" | "flat" | "dark";
export type CardStyle = "patch" | "shield" | "stripe";
export type LionDensity = "restrained" | "moderate" | "expressive";
export type Theme = "light" | "dark";

export type Segment = "rider" | "driver" | "neither";

export type Vehicle = {
  reg: string;
  make: string;
  cc: string;
  colour: string;
};

export type Dependent = { name: string; relation: string };

export type ClaimDraft = {
  category: string;
  photos: number;
  voiceSeconds: number;
  gps: string;
  datetime: string;
};

export type ClaimRecord = {
  id: string;
  category: string;
  status: "submitted" | "review" | "approved" | "paid";
  filedAt: string;
  paidAt?: string;
  payout: number;
  summary: string;
};

export type PaymentRow = {
  date: string;
  week: string;
  amount: number;
  status: "paid" | "due";
};

export type AppState = {
  // UI
  lang: Lang;
  aesthetic: Aesthetic;
  hero: Hero;
  cardStyle: CardStyle;
  lionDensity: LionDensity;
  theme: Theme;

  // Identity
  name: string;
  phone: string;
  nida: string;
  region: string;
  segment: Segment;
  fanId: string;
  fanPoints: number;
  streak: number; // weeks paid in a row

  // Cover selection (pre-purchase) and issued policy
  baseTier: string;
  motorAddOn: string | null;
  weeklyPremium: number;
  autoDeduct: boolean;
  paused: boolean;
  vehicle: Vehicle | null;
  dependents: Dependent[];
  policy: Policy | null;

  // Claims
  claimDraft: ClaimDraft;
  claims: ClaimRecord[];
  currentClaimId: string | null;

  // Payments
  payments: PaymentRow[];

  // Referrals
  referralCode: string;
  invited: number;
  signedUp: number;

  // Setters
  setLang: (l: Lang) => void;
  setAesthetic: (a: Aesthetic) => void;
  setHero: (h: Hero) => void;
  setCardStyle: (c: CardStyle) => void;
  setLionDensity: (d: LionDensity) => void;
  setTheme: (t: Theme) => void;
  setSegment: (s: Segment) => void;
  setBaseTier: (id: string) => void;
  setMotorAddOn: (id: string | null) => void;
  setVehicle: (v: Vehicle | null) => void;
  setAutoDeduct: (b: boolean) => void;
  setPaused: (b: boolean) => void;
  setClaimCategory: (c: string) => void;
  setClaimMeta: (m: Partial<ClaimDraft>) => void;
  submitClaim: () => ClaimRecord;
  setName: (n: string) => void;
  setPhone: (n: string) => void;
  setNida: (n: string) => void;
  setRegion: (r: string) => void;
  addDependent: (d: Dependent) => void;
  removeDependent: (idx: number) => void;
  issueCurrentPolicy: () => Policy;
  resetAll: () => void;
};

const Ctx = createContext<AppState | null>(null);

const STORAGE_KEY = "simba-bima:state:v2";

function defaultPayments(weekly: number): PaymentRow[] {
  return [
    { date: "12 May", week: "Wiki hii", amount: weekly, status: "due" },
    { date: "05 May", week: "Wk 19", amount: weekly, status: "paid" },
    { date: "28 Apr", week: "Wk 18", amount: weekly, status: "paid" },
    { date: "21 Apr", week: "Wk 17", amount: weekly, status: "paid" },
    { date: "14 Apr", week: "Wk 16", amount: weekly, status: "paid" },
    { date: "07 Apr", week: "Wk 15", amount: weekly, status: "paid" },
  ];
}

const BASE_WEEKLY: Record<string, number> = {
  bronze: 350,
  silver: 920,
  gold: 2070,
  captain: 8080,
};
const MOTOR_WEEKLY: Record<string, number> = {
  boda: 500,
  "motor-comp": 3800,
};

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [aesthetic, setAesthetic] = useState<Aesthetic>("bold");
  const [hero, setHero] = useState<Hero>("stadium");
  const [cardStyle, setCardStyle] = useState<CardStyle>("patch");
  const [lionDensity, setLionDensity] = useState<LionDensity>("moderate");
  const [theme, setTheme] = useState<Theme>("light");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nida, setNida] = useState("");
  const [region, setRegion] = useState("Dar es Salaam · Kinondoni");
  const [segment, setSegment] = useState<Segment>("neither");
  const [fanId] = useState(() => Math.floor(Math.random() * 9000 + 1000).toString());
  const [fanPoints, setFanPoints] = useState(0);
  const [streak, setStreak] = useState(0);

  const [baseTier, setBaseTier] = useState<string>("");
  const [motorAddOn, setMotorAddOn] = useState<string | null>(null);
  const [autoDeduct, setAutoDeduct] = useState(true);
  const [paused, setPaused] = useState(false);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [dependents, setDependents] = useState<Dependent[]>([]);
  const [policy, setPolicy] = useState<Policy | null>(null);

  const [claimDraft, setClaimDraft] = useState<ClaimDraft>({
    category: "moto",
    photos: 0,
    voiceSeconds: 0,
    gps: "Morogoro Rd · Kinondoni",
    datetime: new Date().toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  });
  const [claims, setClaims] = useState<ClaimRecord[]>([]);
  const [currentClaimId, setCurrentClaimId] = useState<string | null>(null);

  const [payments, setPayments] = useState<PaymentRow[]>(defaultPayments(0));
  const [referralCode, setReferralCode] = useState("SIMBA-NEW");
  const [invited] = useState(3);
  const [signedUp] = useState(1);

  // Load persisted state
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const p = JSON.parse(raw);
      if (p.lang) setLang(p.lang);
      if (p.aesthetic) setAesthetic(p.aesthetic);
      if (p.hero) setHero(p.hero);
      if (p.cardStyle) setCardStyle(p.cardStyle);
      if (p.lionDensity) setLionDensity(p.lionDensity);
      if (p.theme) setTheme(p.theme);
      if (p.segment) setSegment(p.segment);
      if (typeof p.baseTier === "string") setBaseTier(p.baseTier);
      if (p.motorAddOn !== undefined) setMotorAddOn(p.motorAddOn);
      if (p.autoDeduct !== undefined) setAutoDeduct(p.autoDeduct);
      if (p.paused !== undefined) setPaused(p.paused);
      if (p.name) setName(p.name);
      if (p.phone) setPhone(p.phone);
      if (p.nida) setNida(p.nida);
      if (p.region) setRegion(p.region);
      if (p.vehicle !== undefined) setVehicle(p.vehicle ?? null);
      if (Array.isArray(p.dependents)) setDependents(p.dependents);
      if (p.policy) setPolicy(p.policy);
      if (Array.isArray(p.claims)) setClaims(p.claims);
      if (typeof p.fanPoints === "number") setFanPoints(p.fanPoints);
      if (typeof p.streak === "number") setStreak(p.streak);
      if (p.referralCode) setReferralCode(p.referralCode);
      if (Array.isArray(p.payments)) setPayments(p.payments);
    } catch {
      // ignore
    }
  }, []);

  // Persist
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          lang,
          aesthetic,
          hero,
          cardStyle,
          lionDensity,
          theme,
          segment,
          baseTier,
          motorAddOn,
          autoDeduct,
          paused,
          name,
          phone,
          nida,
          region,
          vehicle,
          dependents,
          policy,
          claims,
          fanPoints,
          streak,
          referralCode,
          payments,
        }),
      );
    } catch {
      // ignore
    }
  }, [
    lang,
    aesthetic,
    hero,
    cardStyle,
    lionDensity,
    theme,
    segment,
    baseTier,
    motorAddOn,
    autoDeduct,
    paused,
    name,
    phone,
    nida,
    region,
    vehicle,
    dependents,
    policy,
    claims,
    fanPoints,
    streak,
    referralCode,
    payments,
  ]);

  // Apply theme classes to <html>
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.classList.toggle("soft-theme", aesthetic === "soft");
    root.classList.toggle("dark-theme", theme === "dark");
  }, [aesthetic, theme]);

  const weeklyPremium = useMemo(() => {
    return (
      (baseTier ? BASE_WEEKLY[baseTier] ?? 0 : 0) +
      (motorAddOn ? MOTOR_WEEKLY[motorAddOn] ?? 0 : 0)
    );
  }, [baseTier, motorAddOn]);

  const setClaimCategory = useCallback(
    (c: string) => setClaimDraft((d) => ({ ...d, category: c })),
    [],
  );
  const setClaimMeta = useCallback(
    (m: Partial<ClaimDraft>) => setClaimDraft((d) => ({ ...d, ...m })),
    [],
  );

  const submitClaim = useCallback((): ClaimRecord => {
    const id = generateClaimId();
    const record: ClaimRecord = {
      id,
      category: claimDraft.category,
      status: "review",
      filedAt: new Date().toISOString(),
      payout: 250_000,
      summary:
        claimDraft.category === "moto"
          ? "Motorcycle accident · Morogoro Rd"
          : claimDraft.category === "hosp"
          ? "Hospital admission"
          : "Claim filed",
    };
    setClaims((cs) => [record, ...cs]);
    setCurrentClaimId(id);
    return record;
  }, [claimDraft]);

  const issueCurrentPolicy = useCallback((): Policy => {
    const p = issuePolicy({
      baseTierId: baseTier,
      motorAddOnId: motorAddOn,
      weeklyPremium,
      insured: { name, nida, phone, region },
      vehicle,
      dependents,
    });
    setPolicy(p);
    setPayments(defaultPayments(weeklyPremium));
    setFanPoints(1500); // Welcome bonus
    setStreak(1);
    setReferralCode("SIMBA-" + (name.split(" ")[0]?.toUpperCase() ?? "FAN") + "-" + Math.floor(Math.random() * 9000 + 1000));
    return p;
  }, [baseTier, motorAddOn, weeklyPremium, name, nida, phone, region, vehicle, dependents]);

  const resetAll = useCallback(() => {
    if (typeof window !== "undefined") window.localStorage.removeItem(STORAGE_KEY);
    setName("");
    setPhone("");
    setNida("");
    setRegion("Dar es Salaam · Kinondoni");
    setBaseTier("");
    setMotorAddOn(null);
    setVehicle(null);
    setDependents([]);
    setPolicy(null);
    setClaims([]);
    setFanPoints(0);
    setStreak(0);
  }, []);

  const addDependent = useCallback(
    (d: Dependent) => setDependents((arr) => [...arr, d]),
    [],
  );
  const removeDependent = useCallback(
    (idx: number) => setDependents((arr) => arr.filter((_, i) => i !== idx)),
    [],
  );

  const value: AppState = {
    lang,
    aesthetic,
    hero,
    cardStyle,
    lionDensity,
    theme,
    name,
    phone,
    nida,
    region,
    segment,
    fanId,
    fanPoints,
    streak,
    baseTier,
    motorAddOn,
    weeklyPremium,
    autoDeduct,
    paused,
    vehicle,
    dependents,
    policy,
    claimDraft,
    claims,
    currentClaimId,
    payments,
    referralCode,
    invited,
    signedUp,
    setLang,
    setAesthetic,
    setHero,
    setCardStyle,
    setLionDensity,
    setTheme,
    setSegment,
    setBaseTier,
    setMotorAddOn,
    setVehicle,
    setAutoDeduct,
    setPaused,
    setClaimCategory,
    setClaimMeta,
    submitClaim,
    setName,
    setPhone,
    setNida,
    setRegion,
    addDependent,
    removeDependent,
    issueCurrentPolicy,
    resetAll,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp(): AppState {
  const v = useContext(Ctx);
  if (!v) throw new Error("useApp must be used within <AppStateProvider />");
  return v;
}
