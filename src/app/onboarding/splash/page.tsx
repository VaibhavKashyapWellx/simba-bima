"use client";

import { useRouter } from "next/navigation";
import { LionMark, Wordmark, Photo, LionWatermark } from "@/components/ds";
import { useApp } from "@/lib/AppState";
import { t, PHOTO } from "@/lib/copy";

export default function SplashPage() {
  const router = useRouter();
  const { lang, hero, lionDensity, setLang } = useApp();
  const accentColor = hero === "flat" ? "var(--ink)" : "var(--brick)";

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100dvh",
        overflow: "hidden",
        background: hero === "flat" ? "var(--brick)" : "var(--ink)",
        color: "#fff",
      }}
    >
      {/* Full-bleed background */}
      {hero === "stadium" && (
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Photo src={PHOTO.stadiumCrowd} h="100%" tone="dark" fill />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(15,15,15,0.5) 0%, rgba(142,14,21,0.78) 60%, rgba(15,15,15,0.92) 100%)",
            }}
          />
        </div>
      )}
      {hero === "flat" && (
        <div className="diag" style={{ position: "absolute", inset: 0 }} />
      )}
      {lionDensity === "expressive" && (
        <div
          style={{
            position: "absolute",
            right: "-10%",
            top: "-10%",
            zIndex: 0,
          }}
        >
          <LionWatermark size={520} opacity={0.08} color="#FFF" />
        </div>
      )}

      {/* Content column */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100dvh",
          maxWidth: 880,
          margin: "0 auto",
          padding: "40px 28px 36px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div className="row gap-12">
          <LionMark size={44} color="#FFF" density={lionDensity} />
          <Wordmark
            color="#FFF"
            size={22}
            sub={lang === "sw" ? "Bima Rasmi" : "Official Insurance"}
          />
        </div>

        <div style={{ maxWidth: 640 }}>
          <div
            className="kicker"
            style={{
              fontSize: 12,
              opacity: 0.75,
              marginBottom: 18,
              letterSpacing: "0.22em",
            }}
          >
            {lang === "sw" ? "KARIBU MSHABIKI" : "WELCOME, FAN"}
          </div>
          <h1
            className="display"
            style={{
              fontSize: "clamp(64px, 11vw, 128px)",
              lineHeight: 0.88,
              marginBottom: 22,
              margin: "0 0 22px",
            }}
          >
            {lang === "sw" ? "NGUVU" : "ONE"}
            <br />
            {lang === "sw" ? "MOJA." : "STRENGTH."}
            <br />
            <span style={{ color: accentColor }}>
              {lang === "sw" ? "KINGA" : "ONE"}
            </span>
            <br />
            <span style={{ color: accentColor }}>
              {lang === "sw" ? "MOJA." : "PROTECTION."}
            </span>
          </h1>
          <p
            style={{
              fontSize: "clamp(15px, 1.5vw, 18px)",
              opacity: 0.85,
              lineHeight: 1.5,
              maxWidth: 480,
              margin: 0,
            }}
          >
            {t(lang, "tagline_sub")}.
          </p>
        </div>

        <div className="col gap-14" style={{ maxWidth: 480 }}>
          <button
            className="btn btn-primary btn-display"
            style={{
              background: hero === "flat" ? "var(--ink)" : "var(--brick)",
            }}
            onClick={() => router.push("/onboarding/value")}
          >
            <span>{t(lang, "get_started")}</span>
          </button>
          <div className="row between" style={{ fontSize: 13, opacity: 0.75 }}>
            <span>
              {lang === "sw"
                ? "Tayari una akaunti? Ingia"
                : "Already have an account? Sign in"}
            </span>
            <div className="row gap-8" style={{ fontFamily: "var(--mono)" }}>
              <button
                onClick={() => setLang("sw")}
                style={{
                  background: "transparent",
                  border: 0,
                  color: lang === "sw" ? "#fff" : "rgba(255,255,255,0.45)",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  fontSize: 12,
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                SW
              </button>
              <span style={{ opacity: 0.4 }}>·</span>
              <button
                onClick={() => setLang("en")}
                style={{
                  background: "transparent",
                  border: 0,
                  color: lang === "en" ? "#fff" : "rgba(255,255,255,0.45)",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  fontSize: 12,
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
