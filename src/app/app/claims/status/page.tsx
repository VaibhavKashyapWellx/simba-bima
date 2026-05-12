"use client";

import { StatusBar, BottomNav } from "@/components/ds";
import { useApp } from "@/lib/AppState";
import { t } from "@/lib/copy";

export default function ClaimsStatusPage() {
  const { lang, currentClaimId } = useApp();
  const events = [
    { ts: "Sun 12 May · 18:48", label: t(lang, "st_submitted"), state: "done", min: "0'" },
    { ts: "Sun 12 May · 19:31", label: t(lang, "st_review"), state: "done", min: "43'" },
    { ts: "Mon 13 May · 09:12", label: t(lang, "st_approved"), state: "active", min: "+14h" },
    { ts: "—", label: t(lang, "st_paid"), state: "pending", min: "" },
  ];
  return (
    <div className="phone-stage">
      <div className="phone">
        <StatusBar />
        <div className="scroll-area">
          <div className="px-22" style={{ paddingTop: 6 }}>
            <div className="row between" style={{ marginBottom: 18 }}>
              <div className="row gap-8">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 5l-7 7 7 7" />
                </svg>
                <div className="display" style={{ fontSize: 14, letterSpacing: "0.06em" }}>
                  {t(lang, "claim_filed")}
                </div>
              </div>
              <div className="chip pitch">● APPROVED</div>
            </div>

            <div style={{ background: "var(--ink)", color: "#fff", padding: "16px 16px", marginBottom: 16, position: "relative" }}>
              <div className="flag-stripe" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3 }} />
              <div className="eyebrow" style={{ color: "var(--gold)", marginBottom: 4 }}>
                {t(lang, "claim_id")}
              </div>
              <div className="display tabular" style={{ fontSize: 24, marginBottom: 10 }}>
                {currentClaimId ?? "SB-CL-26-088421"}
              </div>
              <div className="row between">
                <div className="col">
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.55)" }}>
                    {lang === "sw" ? "Aina" : "Type"}
                  </div>
                  <div className="display" style={{ fontSize: 13, marginTop: 2 }}>
                    BODA · TPL
                  </div>
                </div>
                <div className="col" style={{ alignItems: "flex-end" }}>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.55)" }}>
                    {lang === "sw" ? "Kiasi" : "Payout"}
                  </div>
                  <div className="display tabular" style={{ fontSize: 18, color: "var(--gold)", marginTop: 2 }}>
                    TSh 850,000
                  </div>
                </div>
              </div>
            </div>

            <div className="eyebrow" style={{ marginBottom: 10 }}>
              {t(lang, "status_timeline")} · {lang === "sw" ? "MUDA" : "MATCH TIMELINE"}
            </div>
            <div style={{ position: "relative", paddingLeft: 4, marginBottom: 16 }}>
              <div
                style={{
                  position: "absolute",
                  left: 11,
                  top: 6,
                  bottom: 6,
                  width: 1.5,
                  background: "var(--line)",
                }}
              />
              <div className="col gap-14" style={{ position: "relative" }}>
                {events.map((e, i) => {
                  const isPending = e.state === "pending";
                  const isActive = e.state === "active";
                  return (
                    <div
                      key={i}
                      className="row"
                      style={{ alignItems: "flex-start", gap: 12 }}
                    >
                      <div
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 12,
                          flexShrink: 0,
                          background: isPending
                            ? "var(--paper)"
                            : isActive
                            ? "var(--gold)"
                            : "var(--pitch)",
                          border: isPending ? "1.5px solid var(--line-2)" : 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          fontSize: 11,
                          fontWeight: 700,
                        }}
                      >
                        {isPending ? "" : isActive ? "⚽" : "✓"}
                      </div>
                      <div className="col grow" style={{ paddingTop: 2 }}>
                        <div className="row between">
                          <div
                            className="display"
                            style={{
                              fontSize: 14,
                              letterSpacing: "0.02em",
                              color: isPending ? "var(--muted)" : "var(--ink)",
                            }}
                          >
                            {e.label.toUpperCase()}
                          </div>
                          <div
                            className="tabular"
                            style={{ fontSize: 10.5, color: "var(--muted)" }}
                          >
                            {e.min}
                          </div>
                        </div>
                        <div
                          style={{
                            fontSize: 10.5,
                            color: "var(--muted)",
                            marginTop: 2,
                          }}
                        >
                          {e.ts}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className="confetti"
              style={{
                padding: 14,
                background: "rgba(201,162,74,0.12)",
                borderLeft: "3px solid var(--gold)",
                marginBottom: 14,
              }}
            >
              <div className="row gap-10">
                <span style={{ fontSize: 22 }}>🏆</span>
                <div className="col">
                  <div
                    className="display"
                    style={{
                      fontSize: 13,
                      letterSpacing: "0.04em",
                      color: "var(--gold-deep)",
                    }}
                  >
                    {lang === "sw" ? "MADAI YAMEIDHINISHWA" : "CLAIM APPROVED"}
                  </div>
                  <div style={{ fontSize: 11.5, color: "var(--ink-2)", marginTop: 2 }}>
                    {lang === "sw"
                      ? "Pesa zinawasili M-Pesa ndani ya saa 24."
                      : "Funds land on M-Pesa within 24 hours."}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ height: 20 }} />
          </div>
        </div>
        <BottomNav active="claims" lang={lang} />
      </div>
    </div>
  );
}
