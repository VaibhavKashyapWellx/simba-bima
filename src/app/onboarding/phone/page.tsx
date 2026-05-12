"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LionMark, StatusBar } from "@/components/ds";
import { useApp } from "@/lib/AppState";
import { t } from "@/lib/copy";

export default function PhonePage() {
  const router = useRouter();
  const { lang, lionDensity, setLang, phone, setPhone } = useApp();
  const [stage, setStage] = useState<"phone" | "otp">("phone");
  const [otp, setOtp] = useState(["", "", "", ""]);

  const localPart = phone.replace(/^\+255\s?/, "");

  const onSend = () => setStage("otp");
  const onVerify = () => router.push("/app/home");

  return (
    <div className="phone-stage">
      <div className="phone">
        <StatusBar />
        <div className="scroll-area px-22" style={{ paddingTop: 8 }}>
          <div className="row between" style={{ marginBottom: 22 }}>
            <div className="row gap-8">
              <LionMark size={26} color="var(--ink)" density={lionDensity} />
              <div
                className="display"
                style={{ fontSize: 15, letterSpacing: "0.06em" }}
              >
                SIMBA · BIMA
              </div>
            </div>
            <div className="eyebrow">4 / 4</div>
          </div>
          <div className="progress-track" style={{ marginBottom: 26 }}>
            <div className="progress-fill" style={{ width: "100%" }} />
          </div>

          {stage === "phone" ? (
            <>
              <div
                className="display"
                style={{ fontSize: 32, marginBottom: 8, lineHeight: 0.95 }}
              >
                {lang === "sw" ? (
                  <>
                    NAMBA YAKO
                    <br />
                    YA M-PESA.
                  </>
                ) : (
                  <>
                    YOUR M-PESA
                    <br />
                    NUMBER.
                  </>
                )}
              </div>
              <div
                style={{ fontSize: 13, color: "var(--muted)", marginBottom: 28 }}
              >
                {t(lang, "phone_hint")}
              </div>

              <div className="label-up" style={{ marginBottom: 4 }}>
                {t(lang, "phone_login")}
              </div>
              <div
                className="row"
                style={{
                  borderBottom: "1.5px solid var(--ink)",
                  paddingBottom: 8,
                }}
              >
                <div
                  className="display tabular"
                  style={{
                    fontSize: 22,
                    marginRight: 12,
                    color: "var(--muted)",
                  }}
                >
                  +255
                </div>
                <input
                  className="field tabular"
                  style={{
                    borderBottom: 0,
                    fontSize: 22,
                    fontFamily: "var(--display)",
                    letterSpacing: "0.03em",
                    padding: 0,
                  }}
                  value={localPart}
                  onChange={(e) => setPhone("+255 " + e.target.value)}
                />
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    background: "var(--brick)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
                  ✓
                </div>
              </div>

              <div
                style={{ marginTop: 24, padding: 14, background: "var(--paper-2)" }}
              >
                <div className="row gap-10">
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      background: "var(--pitch)",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--display)",
                      fontSize: 13,
                      letterSpacing: "0.04em",
                    }}
                  >
                    M
                  </div>
                  <div className="col">
                    <div
                      className="display"
                      style={{ fontSize: 14, letterSpacing: "0.04em" }}
                    >
                      M-PESA
                    </div>
                    <div style={{ fontSize: 11, color: "var(--muted)" }}>
                      {lang === "sw"
                        ? "Tutatumia namba hii kwa malipo na utambulisho."
                        : "We'll use this for payments and identity."}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 18 }}>
                <div className="label-up" style={{ marginBottom: 8 }}>
                  {t(lang, "language")}
                </div>
                <div className="row gap-6">
                  {[
                    { id: "sw" as const, label: "Kiswahili" },
                    { id: "en" as const, label: "English" },
                  ].map((l) => (
                    <button
                      key={l.id}
                      onClick={() => setLang(l.id)}
                      style={{
                        flex: 1,
                        padding: "10px 12px",
                        textAlign: "center",
                        background:
                          lang === l.id ? "var(--ink)" : "transparent",
                        color: lang === l.id ? "var(--paper)" : "var(--ink)",
                        border: "1px solid var(--ink)",
                        fontFamily: "var(--display)",
                        fontSize: 14,
                        letterSpacing: "0.06em",
                        cursor: "pointer",
                      }}
                    >
                      {l.label.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div
                className="display"
                style={{ fontSize: 32, marginBottom: 8, lineHeight: 0.95 }}
              >
                {lang === "sw" ? "NAMBA YA SIRI." : "ONE-TIME CODE."}
              </div>
              <div
                style={{ fontSize: 13, color: "var(--muted)", marginBottom: 28 }}
              >
                {t(lang, "enter_otp")} → {phone}
              </div>
              <div className="row gap-12" style={{ marginBottom: 26 }}>
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
                      height: 56,
                      textAlign: "center",
                      fontSize: 28,
                      fontFamily: "var(--display)",
                      border: 0,
                      borderBottom: "2px solid var(--ink)",
                      background: "transparent",
                      outline: "none",
                    }}
                  />
                ))}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--muted)",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>
                  {lang === "sw" ? "Hujapokea?" : "Didn't get it?"}
                </span>
                <button
                  onClick={() => setOtp(["", "", "", ""])}
                  style={{
                    background: "transparent",
                    border: 0,
                    color: "var(--brick)",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {t(lang, "resend")}
                </button>
              </div>
            </>
          )}
        </div>

        <div
          className="px-22"
          style={{
            paddingTop: 14,
            paddingBottom: 22,
            background: "var(--paper)",
            borderTop: "1px solid var(--line)",
          }}
        >
          <button
            className="btn btn-primary btn-display"
            onClick={stage === "phone" ? onSend : onVerify}
          >
            <span>
              {stage === "phone" ? t(lang, "send_otp") : t(lang, "verify")}
            </span>
          </button>
          <div
            style={{
              textAlign: "center",
              fontSize: 10,
              color: "var(--muted-2)",
              marginTop: 10,
              lineHeight: 1.4,
            }}
          >
            {t(lang, "underwriter")}
            <br />
            {t(lang, "tira_no")}
          </div>
        </div>
      </div>
    </div>
  );
}
