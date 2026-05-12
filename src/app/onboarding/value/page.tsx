"use client";

import { useRouter } from "next/navigation";
import { LionMark, StatusBar, Photo } from "@/components/ds";
import { useApp } from "@/lib/AppState";
import { t, PHOTO } from "@/lib/copy";

export default function ValuePropPage() {
  const router = useRouter();
  const { lang, lionDensity } = useApp();

  const stats = [
    {
      n: "350",
      l: lang === "sw" ? "TSh / wiki" : "TSh / week",
      k: lang === "sw" ? "Bei ya kuanzia" : "Starting from",
    },
    {
      n: "48h",
      l: lang === "sw" ? "Madai kulipwa" : "Claim payout",
      k: "SLA",
    },
    {
      n: "M-PESA",
      l: lang === "sw" ? "Malipo" : "Payment",
      k: lang === "sw" ? "Otomatiki" : "Auto",
    },
    {
      n: "TIRA",
      l: lang === "sw" ? "Imedhibitiwa" : "Regulated",
      k: "MO Assurance",
    },
  ];

  return (
    <div className="phone-stage">
      <div className="phone">
        <StatusBar />
        <div className="scroll-area px-22" style={{ paddingTop: 8 }}>
          <div className="row between" style={{ marginBottom: 24 }}>
            <div className="row gap-8">
              <LionMark size={26} color="var(--ink)" density={lionDensity} />
              <div
                className="display"
                style={{ fontSize: 15, letterSpacing: "0.06em" }}
              >
                SIMBA · BIMA
              </div>
            </div>
            <div className="eyebrow">2 / 4</div>
          </div>

          <Photo src={PHOTO.family} h={280} label="family at home, dar es salaam" />

          <div style={{ marginTop: 26 }}>
            <div
              className="kicker"
              style={{ color: "var(--brick)", fontSize: 11, marginBottom: 12 }}
            >
              {lang === "sw" ? "JINSI INAVYOFANYA KAZI" : "HOW IT WORKS"}
            </div>
            <div
              className="display"
              style={{ fontSize: 36, marginBottom: 16, color: "var(--ink)" }}
            >
              {lang === "sw" ? (
                <>
                  LIPA KIDOGO.
                  <br />
                  FUNIKA SANA.
                </>
              ) : (
                <>
                  PAY A LITTLE.
                  <br />
                  COVER A LOT.
                </>
              )}
            </div>
            <div style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.55 }}>
              {t(lang, "ob_body")}
            </div>
          </div>

          <div
            style={{
              marginTop: 28,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 0,
              border: "1px solid var(--line)",
            }}
          >
            {stats.map((s, i) => (
              <div
                key={i}
                style={{
                  padding: "16px 14px",
                  borderRight: i % 2 === 0 ? "1px solid var(--line)" : 0,
                  borderTop: i > 1 ? "1px solid var(--line)" : 0,
                }}
              >
                <div className="eyebrow" style={{ fontSize: 9, marginBottom: 6 }}>
                  {s.k}
                </div>
                <div
                  className="display tabular"
                  style={{ fontSize: 28, color: "var(--brick)", lineHeight: 1 }}
                >
                  {s.n}
                </div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>

          <div style={{ height: 20 }} />
        </div>

        <div
          className="px-22"
          style={{
            paddingTop: 12,
            paddingBottom: 22,
            background: "var(--paper)",
            borderTop: "1px solid var(--line)",
          }}
        >
          <button
            className="btn btn-primary btn-display"
            onClick={() => router.push("/onboarding/rider")}
          >
            <span>{t(lang, "continue")}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
