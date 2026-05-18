"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LionMark, StatusBar } from "@/components/ds";
import { useApp } from "@/lib/AppState";
import { t } from "@/lib/copy";
import { requiresMotor } from "@/lib/tiers";

export default function AboutPage() {
  const router = useRouter();
  const {
    lang,
    lionDensity,
    name,
    setName,
    phone,
    setPhone,
    nida,
    setNida,
    region,
    setRegion,
    baseTier,
    motorAddOn,
  } = useApp();

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);

  const canSend = name.trim().length > 1 && phone.replace(/\D/g, "").length >= 9 && nida.trim().length >= 6;
  const canVerify = otp.every((c) => c.length === 1);

  const onContinue = () => {
    if (requiresMotor(baseTier, motorAddOn)) {
      router.push("/onboarding/motor");
    } else {
      router.push("/onboarding/pay");
    }
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
            >
              <LionMark size={26} color="var(--ink)" density={lionDensity} />
              <div
                className="display"
                style={{ fontSize: 15, letterSpacing: "0.06em" }}
              >
                SIMBA · BIMA
              </div>
            </button>
            <div className="eyebrow">STEP 2 / 3</div>
          </div>
          <div className="progress-track" style={{ marginBottom: 22 }}>
            <div className="progress-fill" style={{ width: "66%" }} />
          </div>

          <div
            className="kicker"
            style={{ color: "var(--brick)", fontSize: 11, marginBottom: 12 }}
          >
            {lang === "sw" ? "HATUA YA 2 / 3" : "STEP 2 OF 3"}
          </div>
          <h1
            className="display"
            style={{ fontSize: 36, lineHeight: 0.95, marginBottom: 10 }}
          >
            {t(lang, "about_you").toUpperCase()}
          </h1>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.55,
              color: "var(--muted)",
              margin: "0 0 24px",
            }}
          >
            {t(lang, "about_you_sub")}
          </p>

          <div className="col gap-22">
            <div>
              <div className="label-up" style={{ marginBottom: 4 }}>
                {t(lang, "full_name")}
              </div>
              <input
                className="field"
                value={name}
                placeholder={lang === "sw" ? "Jina lako kamili" : "Your full name"}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <div className="label-up" style={{ marginBottom: 4 }}>
                {t(lang, "mpesa_no")}
              </div>
              <div className="row" style={{ borderBottom: "1.5px solid var(--ink)", paddingBottom: 4 }}>
                <div
                  className="display tabular"
                  style={{ fontSize: 18, marginRight: 12, color: "var(--muted)" }}
                >
                  +255
                </div>
                <input
                  className="field tabular"
                  style={{
                    borderBottom: 0,
                    fontSize: 18,
                    fontFamily: "var(--display)",
                    letterSpacing: "0.03em",
                    padding: 0,
                  }}
                  placeholder="754 123 456"
                  value={phone.replace(/^\+255\s?/, "")}
                  onChange={(e) => setPhone("+255 " + e.target.value)}
                />
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--muted)",
                  marginTop: 6,
                  lineHeight: 1.4,
                }}
              >
                {t(lang, "mpesa_hint_long")}
              </div>
            </div>

            <div>
              <div className="label-up" style={{ marginBottom: 4 }}>
                {t(lang, "nida")}
              </div>
              <div
                className="row"
                style={{ borderBottom: "1.5px solid var(--line-2)", paddingBottom: 4 }}
              >
                <input
                  className="field tabular"
                  style={{ borderBottom: 0 }}
                  placeholder="19890514-12345-67890-12"
                  value={nida}
                  onChange={(e) => setNida(e.target.value)}
                />
                {nida.trim().length >= 6 && (
                  <div className="chip pitch" style={{ marginBottom: 6 }}>
                    ● {lang === "sw" ? "IMETHIBITISHWA" : "VERIFIED"}
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="label-up" style={{ marginBottom: 4 }}>
                {t(lang, "region_label")}
              </div>
              <input
                className="field"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              />
            </div>
          </div>

          {/* OTP appears inline once sent */}
          {otpSent && (
            <div
              style={{
                marginTop: 24,
                padding: "16px 16px",
                background: "var(--paper-2)",
                border: "1px solid var(--line)",
              }}
            >
              <div
                className="eyebrow"
                style={{ color: "var(--brick)", marginBottom: 8 }}
              >
                {lang === "sw" ? "TUMETUMA NAMBA YA SIRI" : "ONE-TIME CODE SENT"}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--muted)",
                  marginBottom: 12,
                }}
              >
                {t(lang, "enter_otp")} → {phone}
              </div>
              <div className="row gap-10">
                {otp.map((v, i) => (
                  <input
                    key={i}
                    inputMode="numeric"
                    maxLength={1}
                    value={v}
                    onChange={(e) => {
                      const next = [...otp];
                      next[i] = e.target.value.replace(/\D/g, "").slice(0, 1);
                      setOtp(next);
                      const el = document.getElementById(
                        `otp-${i + 1}`,
                      ) as HTMLInputElement | null;
                      if (next[i] && el) el.focus();
                    }}
                    id={`otp-${i}`}
                    style={{
                      flex: 1,
                      height: 48,
                      textAlign: "center",
                      fontSize: 24,
                      fontFamily: "var(--display)",
                      border: "1.5px solid var(--ink)",
                      background: "var(--white)",
                      outline: "none",
                    }}
                  />
                ))}
              </div>
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
          {!otpSent ? (
            <button
              className="btn btn-primary btn-display"
              onClick={() => setOtpSent(true)}
              disabled={!canSend}
              style={{ opacity: canSend ? 1 : 0.5 }}
            >
              <span>{t(lang, "send_otp")}</span>
            </button>
          ) : (
            <button
              className="btn btn-primary btn-display"
              onClick={onContinue}
              disabled={!canVerify}
              style={{ opacity: canVerify ? 1 : 0.5 }}
            >
              <span>
                {lang === "sw" ? "THIBITISHA & ENDELEA" : "VERIFY & CONTINUE"}
              </span>
            </button>
          )}
          <div
            style={{
              textAlign: "center",
              fontSize: 10,
              color: "var(--muted-2)",
              marginTop: 8,
              lineHeight: 1.4,
            }}
          >
            {t(lang, "underwriter")} · {t(lang, "tira_no")}
          </div>
        </div>
      </div>
    </div>
  );
}
