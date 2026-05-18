"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LionMark, StatusBar } from "@/components/ds";
import { useApp } from "@/lib/AppState";
import { t, fmtTSh } from "@/lib/copy";
import { getTier } from "@/lib/tiers";

type Stage = "review" | "sending" | "waiting" | "approving";

export default function PayPage() {
  const router = useRouter();
  const {
    lang,
    lionDensity,
    baseTier,
    motorAddOn,
    weeklyPremium,
    phone,
    issueCurrentPolicy,
  } = useApp();
  const [stage, setStage] = useState<Stage>("review");
  const [secondsLeft, setSecondsLeft] = useState(60);
  const timerRef = useRef<number | null>(null);

  const base = baseTier ? getTier(baseTier) : null;
  const motor = motorAddOn ? getTier(motorAddOn) : null;
  const annual = weeklyPremium * 52;
  const maskedPhone = phone.replace(/(\d{3})\s?(\d{3})$/, "*** $2") || "+255 ***";

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  const requestStk = () => {
    setStage("sending");
    setSecondsLeft(60);
    window.setTimeout(() => {
      setStage("waiting");
      const id = window.setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            window.clearInterval(id);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
      timerRef.current = id;
    }, 900);
  };

  const approve = () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    setStage("approving");
    window.setTimeout(() => {
      issueCurrentPolicy();
      router.push("/onboarding/issued");
    }, 1100);
  };

  return (
    <div className="phone-stage">
      <div className="phone">
        <StatusBar />
        <div className="scroll-area px-22" style={{ paddingTop: 8, paddingBottom: 100 }}>
          <div className="row between" style={{ marginBottom: 18 }}>
            <button
              onClick={() => router.back()}
              style={{
                background: "transparent",
                border: 0,
                display: "inline-flex",
                gap: 6,
                cursor: "pointer",
                padding: 0,
                color: "inherit",
              }}
              disabled={stage === "approving"}
            >
              <LionMark size={26} color="var(--ink)" density={lionDensity} />
              <div
                className="display"
                style={{ fontSize: 15, letterSpacing: "0.06em" }}
              >
                SIMBA · BIMA
              </div>
            </button>
            <div className="eyebrow">STEP 3 / 3</div>
          </div>
          <div className="progress-track" style={{ marginBottom: 22 }}>
            <div className="progress-fill" style={{ width: "100%" }} />
          </div>

          <div
            className="kicker"
            style={{ color: "var(--brick)", fontSize: 11, marginBottom: 12 }}
          >
            {t(lang, "almost_there").toUpperCase()}
          </div>
          <h1
            className="display"
            style={{ fontSize: 36, lineHeight: 0.95, marginBottom: 22 }}
          >
            {stage === "review"
              ? lang === "sw"
                ? "IDHINISHA MALIPO."
                : "APPROVE PAYMENT."
              : t(lang, "stk_title").toUpperCase()}
          </h1>

          {/* Bundle summary */}
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
            <div style={{ padding: "16px 16px" }}>
              <div
                className="eyebrow"
                style={{ color: "var(--gold)", marginBottom: 4 }}
              >
                {lang === "sw" ? "KINGA YAKO" : "YOUR COVER"}
              </div>
              <div className="display" style={{ fontSize: 22, marginBottom: 14 }}>
                {[base?.badge.en, motor?.badge.en].filter(Boolean).join(" + ")}
              </div>
              {base && (
                <div
                  className="row between"
                  style={{
                    paddingBottom: 8,
                    borderBottom: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  <div>
                    <div className="display" style={{ fontSize: 13 }}>
                      {base.badge.en}
                    </div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.55)" }}>
                      {base.tag[lang]}
                    </div>
                  </div>
                  <div className="display tabular" style={{ fontSize: 15 }}>
                    {fmtTSh(base.weekly)}
                  </div>
                </div>
              )}
              {motor && (
                <div className="row between" style={{ paddingTop: 8 }}>
                  <div>
                    <div className="display" style={{ fontSize: 13 }}>
                      {motor.badge.en}
                    </div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.55)" }}>
                      {motor.tag[lang]}
                    </div>
                  </div>
                  <div className="display tabular" style={{ fontSize: 15 }}>
                    {fmtTSh(motor.weekly)}
                  </div>
                </div>
              )}
            </div>
            <div style={{ background: "var(--brick)", padding: "12px 16px" }}>
              <div className="row between" style={{ alignItems: "baseline" }}>
                <div>
                  <div
                    className="eyebrow"
                    style={{
                      fontSize: 9,
                      color: "rgba(255,255,255,0.85)",
                      marginBottom: 2,
                    }}
                  >
                    {t(lang, "first_week").toUpperCase()}
                  </div>
                  <div className="display tabular" style={{ fontSize: 26 }}>
                    TSh {fmtTSh(weeklyPremium)}
                  </div>
                </div>
                <div className="col" style={{ alignItems: "flex-end" }}>
                  <div
                    style={{
                      fontSize: 9.5,
                      color: "rgba(255,255,255,0.85)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {t(lang, "annual_cap")}
                  </div>
                  <div className="tabular" style={{ fontSize: 13, marginTop: 2 }}>
                    TSh {fmtTSh(annual)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* M-Pesa payment method */}
          <div
            className="row between"
            style={{
              padding: "12px 14px",
              background: "var(--paper-2)",
              marginBottom: 12,
            }}
          >
            <div className="row gap-10">
              <div
                style={{
                  width: 32,
                  height: 32,
                  background: "var(--pitch)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--display)",
                  fontSize: 15,
                }}
              >
                M
              </div>
              <div className="col">
                <div
                  className="display"
                  style={{ fontSize: 13, letterSpacing: "0.04em" }}
                >
                  M-PESA
                </div>
                <div
                  className="tabular"
                  style={{ fontSize: 12, color: "var(--muted)" }}
                >
                  {maskedPhone}
                </div>
              </div>
            </div>
            <div className="eyebrow" style={{ fontSize: 9, color: "var(--pitch)" }}>
              {t(lang, "primary").toUpperCase()}
            </div>
          </div>

          <div
            style={{ fontSize: 10.5, color: "var(--muted)", lineHeight: 1.5, marginBottom: 8 }}
          >
            {lang === "sw"
              ? "Kwa kuendelea, unakubali masharti. Kipindi cha kuchunguza: siku 14."
              : "By continuing you accept the terms. 14-day cooling-off period applies."}
          </div>

          {/* STK push card — visible only when sending/waiting/approving */}
          {stage !== "review" && (
            <div
              style={{
                marginTop: 14,
                padding: "16px 16px",
                background: "var(--white)",
                border: "1.5px solid var(--brick)",
                position: "relative",
              }}
            >
              <div className="row gap-12" style={{ alignItems: "center" }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    background: "var(--pitch)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--display)",
                    fontSize: 20,
                  }}
                >
                  M
                </div>
                <div className="col grow">
                  <div
                    className="display"
                    style={{ fontSize: 14, letterSpacing: "0.04em" }}
                  >
                    {stage === "sending"
                      ? lang === "sw"
                        ? "INATUMA…"
                        : "SENDING…"
                      : stage === "waiting"
                      ? lang === "sw"
                        ? "ANGALIA SIMU YAKO"
                        : "CHECK YOUR PHONE"
                      : lang === "sw"
                      ? "INAIDHINISHWA…"
                      : "APPROVING…"}
                  </div>
                  <div style={{ fontSize: 11.5, color: "var(--muted)", lineHeight: 1.4 }}>
                    {t(lang, "stk_long")}
                  </div>
                </div>
                {stage === "waiting" && (
                  <div
                    className="display tabular"
                    style={{ fontSize: 22, color: "var(--brick)" }}
                  >
                    {secondsLeft}s
                  </div>
                )}
              </div>
              {stage !== "approving" && (
                <div
                  className="progress-track"
                  style={{ marginTop: 14, height: 4 }}
                >
                  <div
                    className="progress-fill"
                    style={{
                      width:
                        stage === "sending"
                          ? "10%"
                          : `${Math.max(0, (60 - secondsLeft) / 60) * 100}%`,
                    }}
                  />
                </div>
              )}
              {stage === "waiting" && (
                <button
                  onClick={approve}
                  className="btn btn-primary"
                  style={{
                    marginTop: 14,
                    fontSize: 13,
                    padding: "12px",
                    fontWeight: 700,
                  }}
                >
                  <span>
                    {lang === "sw"
                      ? "▶ SIMULATE M-PESA APPROVE"
                      : "▶ SIMULATE M-PESA APPROVE"}
                  </span>
                </button>
              )}
              {stage === "approving" && (
                <div
                  className="row gap-8"
                  style={{
                    marginTop: 14,
                    color: "var(--pitch)",
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  <span className="confetti">●</span>
                  {lang === "sw" ? "Inalipa…" : "Confirming…"}
                </div>
              )}
            </div>
          )}
        </div>

        <div
          style={{
            position: "sticky",
            bottom: 0,
            padding: "14px 22px 22px",
            background: "var(--paper)",
            borderTop: "1px solid var(--line)",
          }}
        >
          {stage === "review" && (
            <button
              className="btn btn-primary btn-display"
              onClick={requestStk}
            >
              <span>{t(lang, "pay_now")}</span>
            </button>
          )}
          {stage === "waiting" && (
            <button
              onClick={requestStk}
              style={{
                background: "transparent",
                color: "var(--brick)",
                border: 0,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.08em",
                width: "100%",
                cursor: "pointer",
              }}
            >
              {t(lang, "resend_stk").toUpperCase()}
            </button>
          )}
          <div
            style={{
              textAlign: "center",
              fontSize: 10,
              color: "var(--muted-2)",
              marginTop: 10,
              lineHeight: 1.4,
            }}
          >
            {t(lang, "stk_hint")}
          </div>
        </div>
      </div>
    </div>
  );
}
