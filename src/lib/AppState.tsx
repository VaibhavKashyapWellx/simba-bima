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

export type ClaimDraft = {
  category: string;
  photos: number;
  voiceSeconds: number;
  gps: string;
  datetime: string;
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

  // User
  name: string;
  phone: string;
  nida: string;
  region: string;
  segment: Segment;
  fanId: string;

  // Cover
  baseTier: string; // e.g. "bronze"
  motorAddOn: string | null; // "boda" | null
  weeklyPremium: number;
  autoDeduct: boolean;
  paused: boolean;
  vehicle: Vehicle | null;

  // Claims
  claimDraft: ClaimDraft;
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
  finalizeClaim: () => string;
  setName: (n: string) => void;
  setPhone: (n: string) => void;
  setNida: (n: string) => void;
};

const Ctx = createContext<AppState | null>(null);

const STORAGE_KEY = "simba-bima:state:v1";

type Persisted = Partial<
  Pick<
    AppState,
    | "lang"
    | "aesthetic"
    | "hero"
    | "cardStyle"
    | "lionDensity"
    | "theme"
    | "segment"
    | "baseTier"
    | "motorAddOn"
    | "autoDeduct"
    | "paused"
    | "name"
    | "phone"
    | "nida"
    | "vehicle"
  >
>;

function defaultPayments(): PaymentRow[] {
  return [
    { date: "12 May", week: "Wiki hii", amount: 1270, status: "due" },
    { date: "05 May", week: "Wk 19", amount: 1270, status: "paid" },
    { date: "28 Apr", week: "Wk 18", amount: 1270, status: "paid" },
    { date: "21 Apr", week: "Wk 17", amount: 1270, status: "paid" },
    { date: "14 Apr", week: "Wk 16", amount: 1270, status: "paid" },
    { date: "07 Apr", week: "Wk 15", amount: 1270, status: "paid" },
  ];
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [aesthetic, setAesthetic] = useState<Aesthetic>("bold");
  const [hero, setHero] = useState<Hero>("stadium");
  const [cardStyle, setCardStyle] = useState<CardStyle>("patch");
  const [lionDensity, setLionDensity] = useState<LionDensity>("moderate");
  const [theme, setTheme] = useState<Theme>("light");

  const [name, setName] = useState("John Mwakasege");
  const [phone, setPhone] = useState("+255 754 123 456");
  const [nida, setNida] = useState("19890514-12345-67890-12");
  const [region, _setRegion] = useState("Dar es Salaam · Kinondoni");
  const [segment, setSegment] = useState<Segment>("rider");
  const [fanId] = useState("4287");

  const [baseTier, setBaseTier] = useState("bronze");
  const [motorAddOn, setMotorAddOn] = useState<string | null>("boda");
  const [autoDeduct, setAutoDeduct] = useState(true);
  const [paused, setPaused] = useState(false);
  const [vehicle, setVehicle] = useState<Vehicle | null>({
    reg: "T 426 ACX",
    make: "Boxer 150 · 2023",
    cc: "150",
    colour: "Red",
  });

  const [claimDraft, setClaimDraft] = useState<ClaimDraft>({
    category: "moto",
    photos: 3,
    voiceSeconds: 34,
    gps: "Morogoro Rd · Kinondoni",
    datetime: "12 May 2026 · 18:24",
  });
  const [currentClaimId, setCurrentClaimId] = useState<string | null>(
    "SB-CL-26-088421",
  );

  const [payments] = useState<PaymentRow[]>(defaultPayments());
  const [referralCode] = useState("SIMBA-J4287");
  const [invited] = useState(3);
  const [signedUp] = useState(1);

  // Load persisted state
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const p = JSON.parse(raw) as Persisted;
      if (p.lang) setLang(p.lang);
      if (p.aesthetic) setAesthetic(p.aesthetic);
      if (p.hero) setHero(p.hero);
      if (p.cardStyle) setCardStyle(p.cardStyle);
      if (p.lionDensity) setLionDensity(p.lionDensity);
      if (p.theme) setTheme(p.theme);
      if (p.segment) setSegment(p.segment);
      if (p.baseTier) setBaseTier(p.baseTier);
      if (p.motorAddOn !== undefined) setMotorAddOn(p.motorAddOn);
      if (p.autoDeduct !== undefined) setAutoDeduct(p.autoDeduct);
      if (p.paused !== undefined) setPaused(p.paused);
      if (p.name) setName(p.name);
      if (p.phone) setPhone(p.phone);
      if (p.nida) setNida(p.nida);
      if (p.vehicle !== undefined) setVehicle(p.vehicle ?? null);
    } catch {
      // ignore
    }
  }, []);

  // Persist
  useEffect(() => {
    if (typeof window === "undefined") return;
    const p: Persisted = {
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
      vehicle,
    };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
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
    vehicle,
  ]);

  // Apply theme classes to <html>
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.classList.toggle("soft-theme", aesthetic === "soft");
    root.classList.toggle("dark-theme", theme === "dark");
  }, [aesthetic, theme]);

  // Compute weekly premium from selected tiers
  const weeklyPremium = useMemo(() => {
    const base: Record<string, number> = {
      bronze: 350,
      silver: 920,
      gold: 2070,
      captain: 8080,
    };
    const motor: Record<string, number> = {
      boda: 920,
      "gari-tpl": 2310,
      "gari-comp": 6730,
    };
    return (base[baseTier] ?? 0) + (motorAddOn ? motor[motorAddOn] ?? 0 : 0);
  }, [baseTier, motorAddOn]);

  const setClaimCategory = useCallback(
    (c: string) => setClaimDraft((d) => ({ ...d, category: c })),
    [],
  );
  const setClaimMeta = useCallback(
    (m: Partial<ClaimDraft>) => setClaimDraft((d) => ({ ...d, ...m })),
    [],
  );
  const finalizeClaim = useCallback((): string => {
    const id =
      "SB-CL-26-" + Math.floor(Math.random() * 900000 + 100000).toString();
    setCurrentClaimId(id);
    return id;
  }, []);

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
    baseTier,
    motorAddOn,
    weeklyPremium,
    autoDeduct,
    paused,
    vehicle,
    claimDraft,
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
    finalizeClaim,
    setName,
    setPhone,
    setNida,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp(): AppState {
  const v = useContext(Ctx);
  if (!v) throw new Error("useApp must be used within <AppStateProvider />");
  return v;
}
