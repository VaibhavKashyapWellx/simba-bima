"use client";

import { useRouter } from "next/navigation";
import { StatusBar, BottomNav } from "@/components/ds";
import { useApp } from "@/lib/AppState";
import { t } from "@/lib/copy";
import type { ReactNode } from "react";

export default function ClaimsCategoryPage() {
  const router = useRouter();
  const { lang, claimDraft, setClaimCategory } = useApp();

  const cats: { id: string; label: string; icon: ReactNode }[] = [
    {
      id: "moto",
      label: t(lang, "c_moto"),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="5.5" cy="17.5" r="3.5" />
          <circle cx="18.5" cy="17.5" r="3.5" />
          <path d="M5.5 17.5L9 9h6l3.5 8.5M9 9l-1-3h3M15 9h3" />
        </svg>
      ),
    },
    {
      id: "car",
      label: t(lang, "c_car"),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M3 13l2-6h14l2 6M3 13v5h3v-2h12v2h3v-5M3 13h18" />
          <circle cx="7" cy="16" r="1.4" fill="currentColor" />
          <circle cx="17" cy="16" r="1.4" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: "hosp",
      label: t(lang, "c_hosp"),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="4" y="6" width="16" height="14" />
          <path d="M12 10v6M9 13h6M8 6V3h8v3" />
        </svg>
      ),
    },
    {
      id: "theft",
      label: t(lang, "c_theft"),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="8" cy="10" r="3" />
          <circle cx="16" cy="10" r="3" />
          <path d="M8 13l-2 6M16 13l2 6M11 10h2" />
        </svg>
      ),
    },
    {
      id: "death",
      label: t(lang, "c_death"),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M5 22v-9a7 7 0 0114 0v9" />
          <path d="M5 18h14" />
        </svg>
      ),
    },
    {
      id: "fire",
      label: t(lang, "c_fire"),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 22c-4 0-7-3-7-7 0-3 2-5 3-6 0 2 2 3 3 3-1-3 0-7 4-9-1 3 1 5 2 7 1 1 2 3 2 5 0 4-3 7-7 7z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="phone-stage">
      <div className="phone">
        <StatusBar />
        <div className="scroll-area">
          <div className="px-22" style={{ paddingTop: 6 }}>
            <div className="row between" style={{ marginBottom: 20 }}>
              <div className="row gap-8">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M15 5l-7 7 7 7" />
                </svg>
                <div className="display" style={{ fontSize: 14, letterSpacing: "0.06em" }}>
                  {lang === "sw" ? "WEKA MADAI" : "FILE A CLAIM"}
                </div>
              </div>
              <div className="eyebrow tabular">1 / 3</div>
            </div>
            <div className="progress-track" style={{ marginBottom: 22 }}>
              <div className="progress-fill" style={{ width: "33%" }} />
            </div>
            <div
              className="display"
              style={{ fontSize: 32, lineHeight: 0.95, marginBottom: 6 }}
            >
              {t(lang, "what_happened").toUpperCase()}
            </div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 18 }}>
              {t(lang, "pick_one")}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {cats.map((c) => {
                const primary = claimDraft.category === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setClaimCategory(c.id)}
                    style={{
                      padding: "16px 12px",
                      background: primary ? "var(--brick)" : "var(--white)",
                      color: primary ? "#fff" : "var(--ink)",
                      border: primary ? 0 : "1px solid var(--line)",
                      minHeight: 110,
                      position: "relative",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      textAlign: "left",
                      cursor: "pointer",
                    }}
                  >
                    {primary && (
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          width: 30,
                          height: 30,
                          background: "var(--brick-deep)",
                          clipPath: "polygon(100% 0, 100% 100%, 0 0)",
                        }}
                      />
                    )}
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        color: primary ? "#fff" : "var(--brick)",
                      }}
                    >
                      {c.icon}
                    </div>
                    <div
                      className="display"
                      style={{
                        fontSize: 14,
                        letterSpacing: "0.04em",
                        lineHeight: 1,
                        marginTop: 12,
                      }}
                    >
                      {c.label.toUpperCase()}
                    </div>
                    {primary && (
                      <div
                        className="eyebrow"
                        style={{
                          fontSize: 8.5,
                          color: "rgba(255,255,255,0.7)",
                          position: "absolute",
                          top: 8,
                          right: 36,
                        }}
                      >
                        {lang === "sw" ? "ILIYOPENDEKEZWA" : "RECOMMENDED"}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div
              style={{
                marginTop: 20,
                padding: "12px 14px",
                background: "var(--paper-2)",
                borderLeft: "3px solid var(--pitch)",
              }}
            >
              <div
                className="eyebrow"
                style={{ fontSize: 9, color: "var(--pitch)", marginBottom: 4 }}
              >
                {lang === "sw" ? "MADAI YANALIPWA NDANI YA SAA 48" : "PAID WITHIN 48 HOURS"}
              </div>
              <div style={{ fontSize: 11.5, color: "var(--ink-2)" }}>
                {lang === "sw"
                  ? "Boda Shield: Captain hupokea kwa kipaumbele cha saa 24."
                  : "Boda Shield & Captain get 24-hour priority SLA."}
              </div>
            </div>
            <div style={{ height: 18 }} />
          </div>
        </div>
        <div className="px-22" style={{ padding: "12px 22px 22px", borderTop: "1px solid var(--line)" }}>
          <button
            className="btn btn-primary btn-display"
            onClick={() => router.push("/app/claims/photos")}
          >
            <span>{t(lang, "continue")}</span>
          </button>
        </div>
        <BottomNav active="claims" lang={lang} />
      </div>
    </div>
  );
}
