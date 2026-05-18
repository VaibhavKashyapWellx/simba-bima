"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { StatusBar, BottomNav, LionMark } from "@/components/ds";
import { useApp } from "@/lib/AppState";
import { t, fmtTSh } from "@/lib/copy";
import type { ReactNode } from "react";

type Cat = { id: string; label: string; icon: ReactNode };

export default function ClaimsPage() {
  const router = useRouter();
  const { lang, lionDensity, claims, claimDraft, setClaimCategory, policy } =
    useApp();
  const [picking, setPicking] = useState(false);

  const cats: Cat[] = [
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

  const ytdPaid = claims
    .filter((c) => c.status === "paid")
    .reduce((s, c) => s + c.payout, 0);
  const ANNUAL_CAP = 5_000_000;

  return (
    <div className="phone-stage">
      <div className="phone">
        <StatusBar />
        <div className="scroll-area">
          <div className="px-22" style={{ paddingTop: 8 }}>
            <div className="row between" style={{ marginBottom: 18 }}>
              <div className="row gap-8">
                <LionMark size={22} color="var(--brick)" density={lionDensity} />
                <div
                  className="display"
                  style={{ fontSize: 14, letterSpacing: "0.06em" }}
                >
                  {lang === "sw" ? "MADAI" : "CLAIMS"}
                </div>
              </div>
            </div>

            {/* YTD card */}
            <div
              style={{
                background: "var(--ink)",
                color: "#fff",
                padding: "16px 16px",
                marginBottom: 16,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div className="flag-stripe" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3 }} />
              <div className="row between">
                <div className="col grow">
                  <div className="eyebrow" style={{ color: "var(--gold)" }}>
                    {t(lang, "ytd_paid").toUpperCase()}
                  </div>
                  <div
                    className="display tabular"
                    style={{ fontSize: 28, marginTop: 4 }}
                  >
                    TSh {fmtTSh(ytdPaid)}
                  </div>
                  <div
                    style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: 2 }}
                  >
                    {claims.filter((c) => c.status === "paid").length}{" "}
                    {lang === "sw" ? "madai yamelipwa" : "claims paid"}
                  </div>
                </div>
                <div className="col" style={{ alignItems: "flex-end" }}>
                  <div
                    style={{
                      fontSize: 10,
                      color: "rgba(255,255,255,0.55)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {t(lang, "annual_cap_left").toUpperCase()}
                  </div>
                  <div
                    className="display tabular"
                    style={{ fontSize: 18, color: "var(--pitch-2)", marginTop: 2 }}
                  >
                    TSh {fmtTSh(Math.max(0, ANNUAL_CAP - ytdPaid))}
                  </div>
                </div>
              </div>
            </div>

            {/* Claims list */}
            <div className="eyebrow" style={{ marginBottom: 10, color: "var(--brick)" }}>
              {claims.length
                ? t(lang, "claims_history").toUpperCase()
                : t(lang, "claims_open").toUpperCase()}
            </div>
            {claims.length === 0 ? (
              <div
                style={{
                  background: "var(--paper-2)",
                  border: "1px solid var(--line)",
                  padding: "20px 18px",
                  textAlign: "center",
                  marginBottom: 18,
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 6 }}>🛡</div>
                <div className="display" style={{ fontSize: 16, marginBottom: 4 }}>
                  {lang === "sw" ? "HAUNA MADAI." : "NO CLAIMS YET."}
                </div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>
                  {t(lang, "no_claims")}
                </div>
              </div>
            ) : (
              <div
                className="col"
                style={{
                  background: "var(--white)",
                  border: "1px solid var(--line)",
                  marginBottom: 18,
                }}
              >
                {claims.map((c, i) => (
                  <button
                    key={c.id}
                    onClick={() => router.push("/app/claims/status")}
                    className="row between"
                    style={{
                      padding: "14px 14px",
                      borderBottom:
                        i < claims.length - 1 ? "1px solid var(--line)" : 0,
                      background: "transparent",
                      border: 0,
                      width: "100%",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <div className="col grow">
                      <div className="row gap-8">
                        <div
                          className="display tabular"
                          style={{ fontSize: 13, letterSpacing: "0.04em" }}
                        >
                          {c.id}
                        </div>
                        <div
                          className="chip"
                          style={{
                            fontSize: 9,
                            background:
                              c.status === "paid"
                                ? "rgba(27,107,58,0.12)"
                                : c.status === "approved"
                                ? "rgba(201,162,74,0.18)"
                                : "rgba(215,38,56,0.12)",
                            color:
                              c.status === "paid"
                                ? "var(--pitch)"
                                : c.status === "approved"
                                ? "var(--gold-deep)"
                                : "var(--brick)",
                          }}
                        >
                          ● {c.status.toUpperCase()}
                        </div>
                      </div>
                      <div
                        style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}
                      >
                        {c.summary} · {new Date(c.filedAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div
                      className="display tabular"
                      style={{ fontSize: 14, color: "var(--ink)" }}
                    >
                      TSh {fmtTSh(c.payout)}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Category picker — toggles */}
            <button
              className="btn btn-primary btn-display"
              onClick={() => setPicking((p) => !p)}
            >
              <span>
                {picking
                  ? lang === "sw"
                    ? "FUNGA"
                    : "CLOSE"
                  : t(lang, "file_new_claim")}
              </span>
            </button>

            {picking && (
              <div style={{ marginTop: 16 }}>
                <div
                  className="eyebrow"
                  style={{ marginBottom: 8, color: "var(--brick)" }}
                >
                  {t(lang, "what_happened").toUpperCase()}
                </div>
                <div className="grid-3">
                  {cats.map((c) => {
                    const primary = claimDraft.category === c.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => {
                          setClaimCategory(c.id);
                          router.push("/app/claims/photos");
                        }}
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
                            fontSize: 13,
                            letterSpacing: "0.04em",
                            lineHeight: 1,
                            marginTop: 12,
                          }}
                        >
                          {c.label.toUpperCase()}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div
              style={{
                marginTop: 20,
                padding: "12px 14px",
                background: "var(--paper-2)",
                borderLeft: "3px solid var(--pitch)",
                fontSize: 11.5,
                color: "var(--ink-2)",
                lineHeight: 1.5,
                marginBottom: 12,
              }}
            >
              <div
                className="eyebrow"
                style={{ color: "var(--pitch)", marginBottom: 4 }}
              >
                {lang === "sw" ? "SAA 48 — KILA MARA" : "PAID IN 48 HOURS"}
              </div>
              {lang === "sw"
                ? "Captain na Boda Shield wanapokea kipaumbele cha saa 24."
                : "Captain and Boda Shield get 24-hour priority SLA."}
            </div>
          </div>
        </div>
        <BottomNav active="claims" lang={lang} />
      </div>
    </div>
  );
}
