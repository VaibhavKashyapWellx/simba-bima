"use client";

import { useRouter } from "next/navigation";
import { LionMark, Wordmark, StatusBar, Photo, LionWatermark } from "@/components/ds";
import { useApp } from "@/lib/AppState";
import { t, PHOTO } from "@/lib/copy";

export default function SplashPage() {
  const router = useRouter();
  const { lang, hero, lionDensity } = useApp();
  const accentColor =
    hero === "flat" ? "var(--ink)" : "var(--brick)";

  return (
    <div className="phone-stage">
      <div
        className="phone"
        style={{
          background: hero === "flat" ? "var(--brick)" : "var(--ink)",
          color: "#fff",
          position: "relative",
        }}
      >
        <StatusBar invert />
        {hero === "stadium" && (
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <Photo src={PHOTO.stadiumCrowd} h="100%" tone="dark" />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(15,15,15,0.45) 0%, rgba(142,14,21,0.85) 100%)",
              }}
            />
          </div>
        )}
        {hero === "flat" && (
          <div
            style={{ position: "absolute", inset: 0, zIndex: 0 }}
            className="diag"
          />
        )}
        <div
          className="scroll-area"
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "40px 22px 28px",
          }}
        >
          <div className="row gap-12" style={{ marginTop: 8 }}>
            <LionMark size={44} color="#FFF" density={lionDensity} />
            <Wordmark
              color="#FFF"
              size={20}
              sub={lang === "sw" ? "Bima Rasmi" : "Official Insurance"}
            />
          </div>

          <div style={{ marginBottom: 8, position: "relative" }}>
            {lionDensity === "expressive" && (
              <div style={{ position: "absolute", right: -40, top: -100 }}>
                <LionWatermark size={260} opacity={0.08} color="#FFF" />
              </div>
            )}
            <div
              className="kicker"
              style={{ fontSize: 11, opacity: 0.75, marginBottom: 14 }}
            >
              {lang === "sw" ? "KARIBU MSHABIKI" : "WELCOME, FAN"}
            </div>
            <div
              className="display"
              style={{ fontSize: 64, lineHeight: 0.88, marginBottom: 18 }}
            >
              NGUVU
              <br />
              MOJA.
              <br />
              <span style={{ color: accentColor }}>KINGA</span>
              <br />
              <span style={{ color: accentColor }}>MOJA.</span>
            </div>
            <div
              style={{
                fontSize: 14,
                opacity: 0.85,
                lineHeight: 1.45,
                maxWidth: 280,
              }}
            >
              {t(lang, "tagline_sub")}.
            </div>
          </div>

          <div className="col gap-12">
            <button
              className="btn btn-primary btn-display"
              style={{ background: hero === "flat" ? "var(--ink)" : "var(--brick)" }}
              onClick={() => router.push("/onboarding/value")}
            >
              <span>{t(lang, "get_started")}</span>
            </button>
            <div className="row between" style={{ fontSize: 12, opacity: 0.7 }}>
              <span>
                {lang === "sw"
                  ? "Tayari una akaunti? Ingia"
                  : "Already have an account? Sign in"}
              </span>
              <span
                style={{
                  fontFamily: "var(--mono)",
                  letterSpacing: "0.1em",
                }}
              >
                SW · EN
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
