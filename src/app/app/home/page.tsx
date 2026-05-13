"use client";

import { useRouter } from "next/navigation";
import {
  LionMark,
  Wordmark,
  StatusBar,
  BottomNav,
  Photo,
  LangPill,
} from "@/components/ds";
import { TierPatch } from "@/components/TierPatch";
import { useApp } from "@/lib/AppState";
import { t, PHOTO, fmtTSh } from "@/lib/copy";
import { TIERS_BASE, TIERS_MOTOR, getTier } from "@/lib/tiers";
import type { ReactNode } from "react";

export default function HomePage() {
  const router = useRouter();
  const {
    lang,
    hero,
    cardStyle,
    lionDensity,
    name,
    baseTier,
    motorAddOn,
    weeklyPremium,
  } = useApp();

  const base = getTier(baseTier) ?? TIERS_BASE[0];
  const motor = motorAddOn ? getTier(motorAddOn) ?? TIERS_MOTOR[0] : null;

  return (
    <div className="phone-stage">
      <div className="phone">
        <StatusBar invert={hero !== undefined && hero !== "flat"} />
        <div className="scroll-area">
          <HeroHeader name={name} />

          <div
            className="px-22"
            style={{ marginTop: -38, position: "relative", zIndex: 2 }}
          >
            <div className="card" style={{ background: "var(--white)", padding: 0 }}>
              <div className="row between" style={{ padding: "14px 16px 10px" }}>
                <div className="eyebrow">{t(lang, "active_cover")}</div>
                <div className="chip pitch">● {t(lang, "verified").toUpperCase()}</div>
              </div>
              <div className="row" style={{ padding: "0 16px 16px", gap: 10 }}>
                <TierPatch
                  tier={base}
                  lang={lang}
                  small
                  accent="brick"
                  style={cardStyle}
                />
                {motor && (
                  <TierPatch
                    tier={motor}
                    lang={lang}
                    small
                    accent="ink"
                    style={cardStyle}
                  />
                )}
              </div>
              <div style={{ height: 1, background: "var(--line)" }} />
              <div className="row" style={{ padding: "12px 16px" }}>
                <div className="col grow">
                  <div className="eyebrow" style={{ fontSize: 9 }}>
                    {t(lang, "weekly_premium")}
                  </div>
                  <div className="row gap-6" style={{ alignItems: "baseline" }}>
                    <div
                      className="display tabular"
                      style={{ fontSize: 28, lineHeight: 1, color: "var(--ink)" }}
                    >
                      TSh {fmtTSh(weeklyPremium)}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--muted)" }}>
                      {t(lang, "per_week")}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 10.5,
                      color: "var(--muted)",
                      marginTop: 4,
                    }}
                  >
                    <span style={{ color: "var(--brick)" }}>
                      {base.badge.en} {fmtTSh(base.weekly)}
                    </span>
                    {motor && (
                      <>
                        {" + "}
                        <span style={{ color: "var(--ink)" }}>
                          {motor.badge.en} {fmtTSh(motor.weekly)}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="col" style={{ alignItems: "flex-end" }}>
                  <div className="eyebrow" style={{ fontSize: 9 }}>
                    {t(lang, "days_left")}
                  </div>
                  <div
                    className="display tabular"
                    style={{ fontSize: 28, lineHeight: 1, color: "var(--pitch)" }}
                  >
                    3
                  </div>
                  <div
                    style={{ fontSize: 10.5, color: "var(--muted)", marginTop: 4 }}
                  >
                    {lang === "sw" ? "wiki hii" : "this week"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Match day widget */}
          <div className="px-22" style={{ marginTop: 18 }}>
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
                    style={{
                      fontSize: 8,
                      color: "rgba(255,255,255,0.55)",
                    }}
                  >
                    {t(lang, "match_kicker")}
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
                onClick={() => router.push("/app/profile")}
              />
              <QuickAction
                label={t(lang, "upgrade")}
                icon="up"
                onClick={() => router.push("/app/tiers")}
              />
              <QuickAction
                label={t(lang, "add_motor")}
                icon="moto"
                onClick={() => router.push("/app/tiers")}
              />
            </div>
          </div>

          {/* Motor banner upsell */}
          {!motor && (
            <div className="px-22" style={{ marginTop: 18, marginBottom: 18 }}>
              <button
                onClick={() => router.push("/app/tiers")}
                style={{
                  width: "100%",
                  background: "var(--paper-2)",
                  border: "1px solid var(--line)",
                  borderLeft: "3px solid var(--brick)",
                  padding: "12px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--brick)"
                  strokeWidth="1.6"
                >
                  <circle cx="5.5" cy="17.5" r="3.5" />
                  <circle cx="18.5" cy="17.5" r="3.5" />
                  <path d="M5.5 17.5L9 9h6l3.5 8.5M9 9l-1-3h3M15 9h3" />
                </svg>
                <div className="col grow">
                  <div
                    style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}
                  >
                    {t(lang, "motor_banner_title")}
                  </div>
                  <div
                    style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}
                  >
                    {t(lang, "motor_banner_sub")}
                  </div>
                </div>
                <div
                  className="display"
                  style={{
                    fontSize: 13,
                    color: "var(--brick)",
                    letterSpacing: "0.08em",
                  }}
                >
                  →
                </div>
              </button>
            </div>
          )}

          {/* Mshabiki teaser */}
          <div className="px-22" style={{ marginBottom: 24, marginTop: 18 }}>
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                border: "1px solid var(--line)",
              }}
            >
              <div style={{ position: "absolute", right: -30, top: -30, opacity: 0.08 }}>
                <LionMark size={180} color="var(--brick)" density="moderate" />
              </div>
              <div style={{ padding: "16px 16px", position: "relative" }}>
                <div
                  className="eyebrow"
                  style={{ color: "var(--brick)", marginBottom: 6 }}
                >
                  MSHABIKI · 12th MAN
                </div>
                <div
                  className="display"
                  style={{ fontSize: 22, lineHeight: 1, marginBottom: 6 }}
                >
                  {lang === "sw" ? "MUITE MSHABIKI." : "REFER A FAN."}
                </div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>
                  {lang === "sw"
                    ? "Wote mpate wiki moja bure."
                    : "Both of you get one week free."}
                </div>
              </div>
            </div>
          </div>
        </div>
        <BottomNav active="home" lang={lang} />
      </div>
    </div>
  );
}

function HeroHeader({ name }: { name: string }) {
  const { hero, lionDensity, lang } = useApp();
  const firstName = name.split(" ")[0] ?? "";

  if (hero === "stadium") {
    return (
      <div
        className="home-hero"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <Photo src={PHOTO.stadiumCrowd} h="100%" tone="dark" />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(15,15,15,0.5) 0%, rgba(142,14,21,0.7) 50%, var(--paper) 100%)",
          }}
        />
        <div style={{ position: "absolute", inset: 0, padding: "0 22px" }}>
          <div className="row between" style={{ paddingTop: 12 }}>
            <div className="row gap-8">
              <LionMark size={28} color="#FFF" density={lionDensity} />
              <Wordmark color="#FFF" size={14} />
            </div>
            <LangPill invert />
          </div>
          <div style={{ marginTop: 16, color: "#fff" }}>
            <div className="eyebrow" style={{ opacity: 0.75 }}>
              {t(lang, "hi")}, {firstName.toUpperCase()}
            </div>
            <div className="display" style={{ fontSize: 32, lineHeight: 1, marginTop: 4 }}>
              {lang === "sw" ? "UMEFUNIKWA." : "YOU'RE COVERED."}
            </div>
          </div>
        </div>
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
        <div
          style={{ position: "absolute", right: -20, top: -20, opacity: 0.18 }}
        >
          <LionMark size={220} color="#FFF" density={lionDensity} />
        </div>
        <div style={{ position: "relative", padding: "0 22px" }}>
          <div className="row between" style={{ paddingTop: 12 }}>
            <div className="row gap-8">
              <LionMark size={28} color="#FFF" density={lionDensity} />
              <Wordmark color="#FFF" size={14} />
            </div>
            <LangPill invert />
          </div>
          <div style={{ marginTop: 16 }}>
            <div className="eyebrow" style={{ opacity: 0.75 }}>
              {t(lang, "hi")}, {firstName.toUpperCase()}
            </div>
            <div
              className="display"
              style={{ fontSize: 30, lineHeight: 1, marginTop: 4 }}
            >
              {lang === "sw" ? "UMEFUNIKWA." : "YOU'RE COVERED."}
            </div>
          </div>
        </div>
      </div>
    );
  }
  // dark
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
      <div style={{ position: "relative", padding: "0 22px" }}>
        <div className="row between" style={{ paddingTop: 12 }}>
          <div className="row gap-8">
            <LionMark size={28} color="var(--brick)" density={lionDensity} />
            <Wordmark color="#FFF" size={14} />
          </div>
          <LangPill invert />
        </div>
        <div style={{ marginTop: 16 }}>
          <div
            className="eyebrow"
            style={{ opacity: 0.75, color: "var(--gold)" }}
          >
            {t(lang, "hi")}, {firstName.toUpperCase()}
          </div>
          <div
            className="display"
            style={{ fontSize: 30, lineHeight: 1, marginTop: 4 }}
          >
            {lang === "sw" ? "UMEFUNIKWA." : "YOU'RE COVERED."}
          </div>
        </div>
      </div>
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
  icon: "claim" | "qr" | "up" | "moto";
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
        style={{ fontSize: 14, letterSpacing: "0.04em", lineHeight: 1 }}
      >
        {label}
      </div>
    </button>
  );
}
