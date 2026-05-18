"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  LionMark,
  StatusBar,
  BottomNav,
  LangPill,
} from "@/components/ds";
import {
  CoverNote,
  downloadCoverNote,
  shareCoverNoteViaWhatsApp,
} from "@/components/CoverNote";
import { useApp } from "@/lib/AppState";
import { t, fmtTSh } from "@/lib/copy";
import { formatDate, tiers as tiersOf } from "@/lib/policy";

export default function CoverPage() {
  const router = useRouter();
  const {
    lang,
    lionDensity,
    policy,
    weeklyPremium,
    streak,
    autoDeduct,
  } = useApp();

  useEffect(() => {
    if (!policy) {
      // No policy yet — send to tier catalog
      router.replace("/app/tiers");
    }
  }, [policy, router]);

  if (!policy) return null;

  const { base, motor } = tiersOf(policy);

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
                  {lang === "sw" ? "KINGA YANGU" : "MY COVER"}
                </div>
              </div>
              <LangPill />
            </div>

            {/* Active policy hero card */}
            <div
              style={{
                background: "var(--ink)",
                color: "#fff",
                marginBottom: 18,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div className="flag-stripe" style={{ height: 3 }} />
              <div style={{ padding: "20px 18px", position: "relative" }}>
                <div
                  style={{ position: "absolute", right: -30, top: -30, opacity: 0.08 }}
                >
                  <LionMark size={180} color="var(--brick)" density="moderate" />
                </div>
                <div className="row between" style={{ marginBottom: 12 }}>
                  <div className="eyebrow" style={{ color: "var(--gold)" }}>
                    {lang === "sw" ? "KINGA HAI" : "ACTIVE COVER"}
                  </div>
                  <div className="chip pitch">
                    ● {t(lang, "policy_active").toUpperCase()}
                  </div>
                </div>
                <div
                  className="display tabular"
                  style={{ fontSize: 28, lineHeight: 1, marginBottom: 6 }}
                >
                  {[base?.badge.en, motor?.badge.en].filter(Boolean).join(" + ")}
                </div>
                <div
                  className="tabular"
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.55)",
                    marginBottom: 18,
                  }}
                >
                  {policy.policyNumber}
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                    paddingTop: 14,
                    borderTop: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  <Cell
                    label={t(lang, "inception_date")}
                    value={formatDate(policy.inceptionAt, lang)}
                  />
                  <Cell
                    label={t(lang, "expiry_date")}
                    value={formatDate(policy.expiresAt, lang)}
                  />
                  <Cell
                    label={t(lang, "weekly_premium")}
                    value={"TSh " + fmtTSh(weeklyPremium)}
                  />
                  <Cell
                    label={lang === "sw" ? "Mfululizo" : "Streak"}
                    value={`${streak} ${
                      lang === "sw" ? "wiki" : "wks"
                    }${autoDeduct ? " · 🔥" : ""}`}
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
                marginBottom: 22,
              }}
            >
              <ActionButton
                label={t(lang, "download_cover_note")}
                emphasis
                onClick={() => downloadCoverNote(policy, lang)}
                icon={
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M12 3v12m-5-5l5 5 5-5M4 21h16" />
                  </svg>
                }
              />
              <ActionButton
                label={t(lang, "share_whatsapp_short")}
                onClick={() => shareCoverNoteViaWhatsApp(policy, lang)}
                icon={
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2a10 10 0 00-8.6 15l-1.4 5 5.1-1.3A10 10 0 1012 2zm5 14.1c-.3.7-1.4 1.4-2 1.4-.5 0-1 .2-3.5-1-2.6-1.3-4.3-3.9-4.4-4.1-.1-.2-1-1.3-1-2.5 0-1.2.6-1.8.8-2 .2-.2.5-.3.7-.3h.4c.2 0 .4 0 .5.5l.7 1.7c.1.3 0 .5-.1.6l-.4.4c-.1.1-.3.2-.1.5l.9 1.3a8 8 0 002 1.7c.3.1.4 0 .5-.1l.6-.7c.2-.2.4-.2.7-.1l1.6.7c.2.1.4.2.4.3 0 .1 0 .8-.3 1.5z" />
                  </svg>
                }
              />
              <ActionButton
                label={lang === "sw" ? "Weka madai" : "File a claim"}
                onClick={() => router.push("/app/claims")}
                icon={
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M12 3v18M3 12h18" />
                  </svg>
                }
              />
              <ActionButton
                label={t(lang, "upgrade")}
                onClick={() => router.push("/app/tiers")}
                icon={
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M5 14l7-7 7 7M12 7v14" />
                  </svg>
                }
              />
            </div>

            {/* Cover note (full schedule + QR) */}
            <div
              className="eyebrow"
              style={{ marginBottom: 10, color: "var(--brick)" }}
            >
              {t(lang, "cover_note")} · TIRA · MVIS
            </div>
            <CoverNote policy={policy} lang={lang} />

            <div style={{ height: 18 }} />

            {/* Beneficiaries */}
            <div
              className="eyebrow"
              style={{ marginBottom: 10, marginTop: 18, color: "var(--brick)" }}
            >
              {t(lang, "beneficiaries").toUpperCase()}
            </div>
            <div
              style={{ background: "var(--white)", border: "1px solid var(--line)" }}
            >
              {policy.beneficiaries.map((b, i) => (
                <div
                  key={i}
                  className="row between"
                  style={{
                    padding: "12px 14px",
                    borderBottom:
                      i < policy.beneficiaries.length - 1
                        ? "1px solid var(--line)"
                        : 0,
                  }}
                >
                  <div className="col">
                    <div
                      className="display"
                      style={{ fontSize: 14, letterSpacing: "0.02em" }}
                    >
                      {b.name.toUpperCase()}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--muted)" }}>
                      {b.relation}
                    </div>
                  </div>
                  <div
                    className="display tabular"
                    style={{ fontSize: 18, color: "var(--brick)" }}
                  >
                    {b.share}%
                  </div>
                </div>
              ))}
            </div>

            <div className="compliance" style={{ paddingLeft: 0, paddingRight: 0 }}>
              {t(lang, "underwriter")}
              <br />
              {t(lang, "tira_no")}
            </div>
          </div>
        </div>
        <BottomNav active="cover" lang={lang} />
      </div>
    </div>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="col">
      <div
        style={{
          fontSize: 9,
          color: "rgba(255,255,255,0.55)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
      <div
        className="display tabular"
        style={{ fontSize: 14, color: "var(--gold)", marginTop: 4 }}
      >
        {value}
      </div>
    </div>
  );
}

function ActionButton({
  label,
  icon,
  emphasis,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  emphasis?: boolean;
  onClick: () => void;
}) {
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
        minHeight: 80,
        textAlign: "left",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {emphasis && (
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 24,
            height: 24,
            background: "var(--brick-deep)",
            clipPath: "polygon(100% 0, 100% 100%, 0 0)",
          }}
        />
      )}
      <div
        style={{
          width: 22,
          height: 22,
          color: emphasis ? "#fff" : "var(--brick)",
        }}
      >
        {icon}
      </div>
      <div
        className="display"
        style={{ fontSize: 12.5, letterSpacing: "0.04em", lineHeight: 1.1 }}
      >
        {label}
      </div>
    </button>
  );
}
