"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LionMark, Wordmark, Photo, LionWatermark } from "@/components/ds";
import { CoverNote, downloadCoverNote } from "@/components/CoverNote";
import { useApp } from "@/lib/AppState";
import { t, PHOTO } from "@/lib/copy";

export default function IssuedPage() {
  const router = useRouter();
  const { lang, lionDensity, policy } = useApp();

  useEffect(() => {
    if (!policy) router.replace("/onboarding/splash");
  }, [policy, router]);

  if (!policy) return null;

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100dvh",
        background: "var(--ink)",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0, opacity: 0.1 }}>
        <Photo src={PHOTO.stadiumCrowd} h="100%" tone="dark" fill />
      </div>
      <div style={{ position: "absolute", right: "-8%", top: "-4%", opacity: 0.08 }}>
        <LionWatermark size={520} color="var(--brick)" opacity={0.1} />
      </div>

      <div
        style={{
          position: "relative",
          maxWidth: 860,
          margin: "0 auto",
          padding: "36px 28px 40px",
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="row between" style={{ marginBottom: 28 }}>
          <Wordmark color="#FFF" size={14} />
          <button
            onClick={() => router.push("/app/home")}
            style={{
              width: 30,
              height: 30,
              border: "1px solid rgba(255,255,255,0.3)",
              background: "transparent",
              color: "#fff",
              fontSize: 18,
              cursor: "pointer",
            }}
            aria-label="close"
          >
            ×
          </button>
        </div>

        <div style={{ marginBottom: 32 }}>
          <div
            className="confetti"
            style={{
              width: 80,
              height: 80,
              border: "2.5px solid var(--pitch-2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 24,
              background: "rgba(27,107,58,0.18)",
            }}
          >
            <svg
              width="42"
              height="42"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--pitch-2)"
              strokeWidth="2.5"
            >
              <path d="M5 12l5 5 9-12" />
            </svg>
          </div>
          <div
            className="eyebrow"
            style={{ color: "var(--gold)", marginBottom: 10, letterSpacing: "0.2em" }}
          >
            🦁 NGUVU MOJA · KINGA MOJA
          </div>
          <h1
            className="display"
            style={{
              fontSize: "clamp(46px, 8vw, 88px)",
              lineHeight: 0.92,
              margin: "0 0 14px",
            }}
          >
            {t(lang, "covered")}.
          </h1>
          <p
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.75)",
              maxWidth: 480,
              lineHeight: 1.55,
              margin: 0,
            }}
          >
            {lang === "sw"
              ? "Karibu Mshabiki Wengi. Hati yako iko hapa chini — pakua au tuma WhatsApp."
              : "Welcome to the 12th Man. Your cover note is below — download or share via WhatsApp."}
          </p>
        </div>

        {/* Policy summary line */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            marginBottom: 22,
          }}
        >
          <Stat
            label={t(lang, "policy_no")}
            value={policy.policyNumber}
          />
          <Stat
            label={t(lang, "cover_note_id")}
            value={policy.coverNoteId}
          />
        </div>

        {/* The cover note itself */}
        <div style={{ marginBottom: 24 }}>
          <CoverNote policy={policy} lang={lang} />
        </div>

        <div className="col gap-10" style={{ marginBottom: 24 }}>
          <button
            className="btn btn-primary btn-display"
            onClick={() => downloadCoverNote(policy, lang)}
          >
            <span>{t(lang, "download_cover_note")}</span>
          </button>
          <button
            onClick={() => router.push("/app/home")}
            style={{
              background: "rgba(255,255,255,0.08)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.2)",
              padding: "16px",
              fontFamily: "var(--display)",
              fontSize: 16,
              letterSpacing: "0.06em",
              cursor: "pointer",
            }}
          >
            {t(lang, "enter_app")} →
          </button>
        </div>

        <div
          style={{
            textAlign: "center",
            fontSize: 10,
            color: "rgba(255,255,255,0.4)",
            lineHeight: 1.5,
          }}
        >
          {t(lang, "underwriter")} · {t(lang, "tira_no")}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.1)",
        padding: "12px 14px",
      }}
    >
      <div
        className="eyebrow"
        style={{ color: "rgba(255,255,255,0.6)", fontSize: 9 }}
      >
        {label}
      </div>
      <div
        className="display tabular"
        style={{ fontSize: 15, color: "var(--gold)", marginTop: 4, wordBreak: "break-all" }}
      >
        {value}
      </div>
    </div>
  );
}
