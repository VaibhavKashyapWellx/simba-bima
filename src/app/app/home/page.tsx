"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  LionMark,
  Wordmark,
  StatusBar,
  BottomNav,
  Photo,
  LangPill,
} from "@/components/ds";
import { useApp } from "@/lib/AppState";
import { t, PHOTO, fmtTSh } from "@/lib/copy";
import { getTier } from "@/lib/tiers";
import { formatDate, tiers as tiersOf } from "@/lib/policy";
import type { ReactNode } from "react";

export default function HomePage() {
  const router = useRouter();
  const {
    lang,
    hero,
    lionDensity,
    name,
    policy,
    weeklyPremium,
    fanPoints,
    streak,
  } = useApp();

  // If they got here without buying, send them through onboarding
  useEffect(() => {
    if (!policy) router.replace("/onboarding/splash");
  }, [policy, router]);

  if (!policy) return null;

  const { base, motor } = tiersOf(policy);
  const firstName = (name || "Mshabiki").split(" ")[0];

  return (
    <div className="phone-stage">
      <div className="phone">
        <StatusBar invert={hero !== "flat"} />
        <div className="scroll-area">
          <HeroHeader firstName={firstName} fanPoints={fanPoints} />

          {/* Active cover card */}
          <div
            className="px-22"
            style={{ marginTop: -42, position: "relative", zIndex: 2 }}
          >
            <button
              onClick={() => router.push("/app/cover")}
              className="card"
              style={{
                background: "var(--white)",
                padding: 0,
                width: "100%",
                textAlign: "left",
                border: "1px solid var(--line)",
                cursor: "pointer",
              }}
            >
              <div className="row between" style={{ padding: "14px 16px 8px" }}>
                <div className="eyebrow">{t(lang, "active_cover")}</div>
                <div className="chip pitch">● {t(lang, "policy_active").toUpperCase()}</div>
              </div>
              <div style={{ padding: "0 16px 12px" }}>
                <div
                  className="display tabular"
                  style={{ fontSize: 26, lineHeight: 1 }}
                >
                  {[base?.badge.en, motor?.badge.en].filter(Boolean).join(" + ")}
                </div>
                <div
                  className="tabular"
                  style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}
                >
                  {policy.policyNumber}
                </div>
              </div>
              <div style={{ height: 1, background: "var(--line)" }} />
              <div className="row" style={{ padding: "12px 16px" }}>
                <div className="col grow">
                  <div className="eyebrow" style={{ fontSize: 9 }}>
                    {t(lang, "weekly_premium")}
                  </div>
                  <div
                    className="display tabular"
                    style={{ fontSize: 22, lineHeight: 1, color: "var(--ink)" }}
                  >
                    TSh {fmtTSh(weeklyPremium)}
                  </div>
                  <div style={{ fontSize: 10.5, color: "var(--muted)", marginTop: 4 }}>
                    {lang === "sw" ? "Inakomeshwa" : "Renews"}{" "}
                    {formatDate(policy.expiresAt, lang)}
                  </div>
                </div>
                <div className="col" style={{ alignItems: "flex-end" }}>
                  <div className="eyebrow" style={{ fontSize: 9 }}>
                    {lang === "sw" ? "Mfululizo" : "Streak"}
                  </div>
                  <div
                    className="display tabular"
                    style={{ fontSize: 22, lineHeight: 1, color: "var(--pitch)" }}
                  >
                    {streak} 🔥
                  </div>
                  <div style={{ fontSize: 10.5, color: "var(--muted)", marginTop: 4 }}>
                    {lang === "sw" ? "wiki" : "weeks"}
                  </div>
                </div>
              </div>
            </button>
          </div>

          {/* Streak grid M-T-W-T-F-S-S */}
          <div className="px-22" style={{ marginTop: 18 }}>
            <div className="eyebrow" style={{ marginBottom: 8 }}>
              {lang === "sw" ? "WIKI HII" : "THIS WEEK"}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: 6,
              }}
            >
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => {
                const paid = i < 4;
                const today = i === 4;
                return (
                  <div
                    key={i}
                    style={{
                      aspectRatio: "1",
                      background: paid
                        ? "var(--pitch)"
                        : today
                        ? "var(--brick)"
                        : "var(--paper-2)",
                      color: paid || today ? "#fff" : "var(--muted)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--display)",
                      fontSize: 14,
                      letterSpacing: "0.04em",
                      position: "relative",
                    }}
                  >
                    <span style={{ position: "absolute", top: 4, left: 6, fontSize: 9, opacity: 0.7 }}>
                      {d}
                    </span>
                    <span style={{ fontSize: 18 }}>{paid ? "✓" : today ? "●" : ""}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Match day widget */}
          <div className="px-22" style={{ marginTop: 22 }}>
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                background: "var(--ink)",
                color: "#fff",
              }}
            >
              <div className="flag-stripe" style={{ height: 4 }} />
              <div className="row" style={{ padding: "14px 16px", gap: 14 }}>
                <div
                  className="col"
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    borderRight: "1px solid rgba(255,255,255,0.15)",
                    paddingRight: 14,
                  }}
                >
                  <div
                    className="eyebrow"
                    style={{
                      fontSize: 8.5,
                      color: "var(--brick)",
                      letterSpacing: "0.18em",
                    }}
                  >
                    SAT
                  </div>
                  <div
                    className="display tabular"
                    style={{ fontSize: 32, lineHeight: 1, marginTop: 2 }}
                  >
                    17
                  </div>
                  <div
                    className="eyebrow"
                    style={{
                      fontSize: 8.5,
                      color: "rgba(255,255,255,0.55)",
                      marginTop: 4,
                    }}
                  >
                    MAY
                  </div>
                </div>
                <div className="col grow">
                  <div
                    className="eyebrow"
                    style={{ fontSize: 9, color: "var(--gold)", marginBottom: 4 }}
                  >
                    {t(lang, "match_day").toUpperCase()}
                  </div>
                  <div className="display" style={{ fontSize: 18, lineHeight: 1.05 }}>
                    WEKUNDU{" "}
                    <span style={{ color: "var(--muted-2)", fontSize: 12 }}>
                      {t(lang, "vs")}
                    </span>{" "}
                    YANGA
                  </div>
                  <div
                    style={{
                      fontSize: 10.5,
                      color: "rgba(255,255,255,0.6)",
                      marginTop: 4,
                    }}
                  >
                    16:00 ·{" "}
                    {lang === "sw" ? "Uwanja wa Taifa" : "Benjamin Mkapa Stadium"}
                  </div>
                </div>
                <div className="col" style={{ alignItems: "flex-end" }}>
                  <div
                    className="eyebrow"
                    style={{ fontSize: 8, color: "rgba(255,255,255,0.55)" }}
                  >
                    +50 PTS
                  </div>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--brick)"
                    strokeWidth="2"
                  >
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="px-22" style={{ marginTop: 22 }}>
            <div className="eyebrow" style={{ marginBottom: 10 }}>
              {t(lang, "quick_actions")}
            </div>
            <div className="grid-2-4">
              <QuickAction
                label={t(lang, "file_claim")}
                icon="claim"
                emphasis
                onClick={() => router.push("/app/claims")}
              />
              <QuickAction
                label={t(lang, "cover_note")}
                icon="qr"
                onClick={() => router.push("/app/cover")}
              />
              <QuickAction
                label={t(lang, "upgrade")}
                icon="up"
                onClick={() => router.push("/app/tiers")}
              />
              <QuickAction
                label={t(lang, "refer")}
                icon="refer"
                onClick={() => router.push("/app/profile")}
              />
            </div>
          </div>

          {/* 12th Man teaser */}
          <div className="px-22" style={{ marginTop: 22, marginBottom: 24 }}>
            <button
              onClick={() => router.push("/app/profile")}
              style={{
                position: "relative",
                overflow: "hidden",
                border: "1px solid var(--line)",
                background: "var(--white)",
                padding: 0,
                width: "100%",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              <div style={{ position: "absolute", right: -30, top: -30, opacity: 0.08 }}>
                <LionMark size={180} color="var(--brick)" density="moderate" />
              </div>
              <div style={{ padding: "14px 16px", position: "relative" }}>
                <div
                  className="row between"
                  style={{ marginBottom: 6 }}
                >
                  <div className="eyebrow" style={{ color: "var(--brick)" }}>
                    MSHABIKI · 12th MAN
                  </div>
                  <div className="display tabular" style={{ fontSize: 18, color: "var(--gold-deep)" }}>
                    ★ {fanPoints.toLocaleString()}
                  </div>
                </div>
                <div
                  className="display"
                  style={{ fontSize: 18, lineHeight: 1, marginBottom: 4 }}
                >
                  {lang === "sw"
                    ? "MUITE MSHABIKI, PATA WIKI BURE."
                    : "REFER A FAN, GET A FREE WEEK."}
                </div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>
                  {lang === "sw"
                    ? "Pointi zako zinazidi. Anza."
                    : "Your points grow. Start now."}
                </div>
              </div>
            </button>
          </div>
        </div>
        <BottomNav active="home" lang={lang} />
      </div>
    </div>
  );
}

function HeroHeader({
  firstName,
  fanPoints,
}: {
  firstName: string;
  fanPoints: number;
}) {
  const { hero, lionDensity, lang } = useApp();

  const overlay = (
    <div
      style={{
        position: "relative",
        height: "100%",
        padding: "0 22px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: 14,
        paddingBottom: 56,
      }}
    >
      <div className="row between">
        <div className="row gap-10">
          <LionMark
            size={28}
            color={hero === "stadium" ? "#FFF" : hero === "flat" ? "#FFF" : "var(--brick)"}
            density={lionDensity}
          />
          <Wordmark color="#FFF" size={14} />
        </div>
        <LangPill invert />
      </div>
      <div>
        <div className="eyebrow" style={{ opacity: 0.75, color: "var(--gold)" }}>
          {lang === "sw" ? "MAMBO" : "HEY"}, {firstName.toUpperCase()}
        </div>
        <div className="row between" style={{ alignItems: "flex-end", marginTop: 4 }}>
          <div className="display" style={{ fontSize: 28, lineHeight: 1 }}>
            {lang === "sw" ? "MSHABIKI" : "12TH MAN"}
            <span style={{ color: "var(--brick)" }}>.</span>
          </div>
          <div className="col" style={{ alignItems: "flex-end" }}>
            <div
              className="eyebrow"
              style={{ fontSize: 9, color: "rgba(255,255,255,0.7)" }}
            >
              {t(lang, "fan_points").toUpperCase()}
            </div>
            <div
              className="display tabular"
              style={{ fontSize: 22, color: "var(--gold)", lineHeight: 1 }}
            >
              ★ {fanPoints.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (hero === "stadium") {
    return (
      <div
        className="home-hero"
        style={{ position: "relative", overflow: "hidden", color: "#fff" }}
      >
        <Photo src={PHOTO.stadiumCrowd} h="100%" tone="dark" />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(15,15,15,0.55) 0%, rgba(142,14,21,0.75) 60%, var(--paper) 100%)",
          }}
        />
        <div style={{ position: "absolute", inset: 0 }}>{overlay}</div>
      </div>
    );
  }
  if (hero === "flat") {
    return (
      <div
        className="home-hero"
        style={{
          position: "relative",
          background: "var(--brick)",
          color: "#fff",
          overflow: "hidden",
        }}
      >
        <div className="diag" style={{ position: "absolute", inset: 0 }} />
        <div style={{ position: "absolute", right: -20, top: -20, opacity: 0.18 }}>
          <LionMark size={220} color="#FFF" density={lionDensity} />
        </div>
        <div style={{ position: "relative", height: "100%" }}>{overlay}</div>
      </div>
    );
  }
  return (
    <div
      className="home-hero"
      style={{
        position: "relative",
        background: "var(--ink)",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", right: -10, top: -10, opacity: 0.1 }}>
        <LionMark size={220} color="var(--brick)" density={lionDensity} />
      </div>
      <div style={{ position: "relative", height: "100%" }}>{overlay}</div>
    </div>
  );
}

function QuickAction({
  label,
  icon,
  emphasis,
  onClick,
}: {
  label: string;
  icon: "claim" | "qr" | "up" | "moto" | "refer";
  emphasis?: boolean;
  onClick?: () => void;
}) {
  const icons: Record<string, ReactNode> = {
    claim: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M12 3v18M3 12h18" />
      </svg>
    ),
    qr: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <path d="M14 14h3v3M21 14v3M17 21h4M14 19v2" />
      </svg>
    ),
    up: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M5 14l7-7 7 7M12 7v14" />
      </svg>
    ),
    moto: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="5.5" cy="17.5" r="3.5" />
        <circle cx="18.5" cy="17.5" r="3.5" />
        <path d="M5.5 17.5L9 9h6l3.5 8.5" />
      </svg>
    ),
    refer: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="9" cy="9" r="3.5" />
        <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
        <circle cx="17" cy="11" r="2.5" />
        <path d="M21 19c0-2.2-1.8-4-4-4" />
      </svg>
    ),
  };
  return (
    <button
      onClick={onClick}
      style={{
        padding: "14px 14px",
        background: emphasis ? "var(--brick)" : "var(--white)",
        color: emphasis ? "#fff" : "var(--ink)",
        border: emphasis ? 0 : "1px solid var(--line)",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        minHeight: 86,
        position: "relative",
        overflow: "hidden",
        textAlign: "left",
        cursor: "pointer",
      }}
    >
      {emphasis && (
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 28,
            height: 28,
            background: "var(--brick-deep)",
            clipPath: "polygon(100% 0, 100% 100%, 0 0)",
          }}
        />
      )}
      <div
        style={{
          width: 24,
          height: 24,
          color: emphasis ? "#fff" : "var(--brick)",
        }}
      >
        {icons[icon]}
      </div>
      <div
        className="display"
        style={{ fontSize: 13, letterSpacing: "0.04em", lineHeight: 1.05 }}
      >
        {label}
      </div>
    </button>
  );
}
