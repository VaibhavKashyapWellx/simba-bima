"use client";

import {
  LionMark,
  StatusBar,
  BottomNav,
  LangPill,
} from "@/components/ds";
import { useApp } from "@/lib/AppState";
import { t, fmtTSh } from "@/lib/copy";
import { getTier } from "@/lib/tiers";

export default function WalletPage() {
  const {
    lang,
    lionDensity,
    payments,
    autoDeduct,
    setAutoDeduct,
    paused,
    setPaused,
    weeklyPremium,
    baseTier,
    motorAddOn,
  } = useApp();

  const base = getTier(baseTier);
  const motor = motorAddOn ? getTier(motorAddOn) : null;
  const total6 = payments.reduce((s, p) => s + (p.status === "paid" ? p.amount : 0), 0);

  return (
    <div className="phone-stage">
      <div className="phone">
        <StatusBar />
        <div className="scroll-area">
          <div className="px-22" style={{ paddingTop: 6 }}>
            <div className="row between" style={{ marginBottom: 18 }}>
              <div className="row gap-8">
                <LionMark size={22} color="var(--brick)" density={lionDensity} />
                <div className="display" style={{ fontSize: 14, letterSpacing: "0.06em" }}>
                  {t(lang, "wallet").toUpperCase()}
                </div>
              </div>
              <LangPill />
            </div>

            <div
              style={{
                background: "var(--ink)",
                color: "#fff",
                padding: "16px 16px",
                marginBottom: 14,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", right: -20, top: -20, opacity: 0.08 }}>
                <LionMark size={180} color="var(--brick)" density="moderate" />
              </div>
              <div className="eyebrow" style={{ color: "var(--gold)", marginBottom: 4 }}>
                {t(lang, "weekly_premium").toUpperCase()}
              </div>
              <div className="row gap-6" style={{ alignItems: "baseline" }}>
                <div
                  className="display tabular"
                  style={{ fontSize: 36, lineHeight: 1 }}
                >
                  TSh {fmtTSh(weeklyPremium)}
                </div>
                <div style={{ fontSize: 11, opacity: 0.6 }}>{t(lang, "per_week")}</div>
              </div>
              <div
                className="row"
                style={{
                  marginTop: 10,
                  paddingTop: 10,
                  borderTop: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <div className="col grow">
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.55)" }}>
                    {t(lang, "base_tier")}
                  </div>
                  <div className="display tabular" style={{ fontSize: 14, marginTop: 2 }}>
                    {base ? `${base.badge.en} · ${fmtTSh(base.weekly)}` : "—"}
                  </div>
                </div>
                <div className="col" style={{ alignItems: "flex-end" }}>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.55)" }}>
                    {t(lang, "add_on")}
                  </div>
                  <div className="display tabular" style={{ fontSize: 14, marginTop: 2 }}>
                    {motor ? `${motor.badge.en} · ${fmtTSh(motor.weekly)}` : "—"}
                  </div>
                </div>
              </div>
            </div>

            <div className="eyebrow" style={{ marginBottom: 10 }}>
              {t(lang, "pay_method")}
            </div>
            <div className="col gap-6" style={{ marginBottom: 18 }}>
              <PayMethod icon="M" name="M-PESA" no="+255 754 *** 456" primary lang={lang} />
              <PayMethod icon="A" name="AIRTEL MONEY" no="+255 786 *** 902" lang={lang} />
              <PayMethod
                icon="Y"
                name="YAS MIXX"
                no={lang === "sw" ? "Si imeunganishwa" : "Not connected"}
                lang={lang}
                disabled
              />
            </div>

            <div
              className="col gap-2"
              style={{
                background: "var(--white)",
                border: "1px solid var(--line)",
                marginBottom: 16,
              }}
            >
              <ToggleRow
                label={t(lang, "auto_deduct")}
                sub={lang === "sw" ? "Kila Jumamosi asubuhi" : "Every Saturday morning"}
                on={autoDeduct}
                onToggle={() => setAutoDeduct(!autoDeduct)}
              />
              <div style={{ height: 1, background: "var(--line)" }} />
              <ToggleRow
                label={t(lang, "pause_cover")}
                sub={t(lang, "pause_sub")}
                on={paused}
                onToggle={() => setPaused(!paused)}
              />
            </div>

            {paused && motorAddOn && (
              <div
                style={{
                  padding: "10px 14px",
                  background: "rgba(215,38,56,0.08)",
                  border: "1px solid rgba(215,38,56,0.2)",
                  marginBottom: 16,
                  fontSize: 11.5,
                  color: "var(--brick-deep)",
                }}
              >
                ⚠{" "}
                {lang === "sw"
                  ? "Kusimamisha Boda Shield kunaweza kuwa kinyume na sheria ya barabarani."
                  : "Pausing Boda Shield may breach Tanzanian road TPL law."}
              </div>
            )}

            <div className="row between" style={{ marginBottom: 10 }}>
              <div className="eyebrow">{t(lang, "history")}</div>
              <div className="eyebrow tabular" style={{ color: "var(--muted)" }}>
                TSh {fmtTSh(total6)} · 6 {lang === "sw" ? "wiki" : "wks"}
              </div>
            </div>
            <div
              className="col"
              style={{
                background: "var(--white)",
                border: "1px solid var(--line)",
                marginBottom: 14,
              }}
            >
              {payments.map((p, i) => (
                <div
                  key={i}
                  className="row between"
                  style={{
                    padding: "11px 14px",
                    borderBottom:
                      i < payments.length - 1 ? "1px solid var(--line)" : 0,
                  }}
                >
                  <div className="col">
                    <div
                      className="display tabular"
                      style={{ fontSize: 13, letterSpacing: "0.04em" }}
                    >
                      {p.date.toUpperCase()}
                    </div>
                    <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 1 }}>
                      {p.week}
                    </div>
                  </div>
                  <div className="row gap-8" style={{ alignItems: "center" }}>
                    <div className="tabular" style={{ fontSize: 14, fontWeight: 600 }}>
                      TSh {p.amount.toLocaleString()}
                    </div>
                    <div
                      className="chip"
                      style={{
                        background:
                          p.status === "paid"
                            ? "rgba(27,107,58,0.12)"
                            : "rgba(215,38,56,0.12)",
                        color:
                          p.status === "paid" ? "var(--pitch)" : "var(--brick)",
                        fontSize: 9,
                      }}
                    >
                      ● {p.status === "paid" ? t(lang, "paid_label") : t(lang, "due")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ height: 14 }} />
          </div>
        </div>
        <BottomNav active="wallet" lang={lang} />
      </div>
    </div>
  );
}

function PayMethod({
  icon,
  name,
  no,
  primary,
  disabled,
  lang,
}: {
  icon: "M" | "A" | "Y";
  name: string;
  no: string;
  primary?: boolean;
  disabled?: boolean;
  lang: "sw" | "en";
}) {
  const bgMap: Record<string, string> = {
    M: "var(--pitch)",
    A: "var(--brick)",
    Y: "var(--ink)",
  };
  return (
    <div
      className="row between"
      style={{
        padding: "10px 12px",
        background: "var(--white)",
        border: primary ? "1.5px solid var(--ink)" : "1px solid var(--line)",
        opacity: disabled ? 0.55 : 1,
      }}
    >
      <div className="row gap-10">
        <div
          style={{
            width: 30,
            height: 30,
            background: bgMap[icon],
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--display)",
            fontSize: 14,
          }}
        >
          {icon}
        </div>
        <div className="col">
          <div className="display" style={{ fontSize: 12, letterSpacing: "0.04em" }}>
            {name}
          </div>
          <div className="tabular" style={{ fontSize: 11, color: "var(--muted)" }}>
            {no}
          </div>
        </div>
      </div>
      {primary && (
        <div className="chip dark" style={{ fontSize: 9 }}>
          {t(lang, "primary").toUpperCase()}
        </div>
      )}
    </div>
  );
}

function ToggleRow({
  label,
  sub,
  on,
  onToggle,
}: {
  label: string;
  sub: string;
  on: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="row between"
      style={{
        padding: "12px 14px",
        background: "transparent",
        border: 0,
        textAlign: "left",
        cursor: "pointer",
        width: "100%",
      }}
    >
      <div className="col">
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{label}</div>
        <div style={{ fontSize: 10.5, color: "var(--muted)", marginTop: 2 }}>{sub}</div>
      </div>
      <div
        style={{
          width: 36,
          height: 22,
          borderRadius: 11,
          background: on ? "var(--pitch)" : "var(--line-2)",
          position: "relative",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 2,
            left: on ? 16 : 2,
            width: 18,
            height: 18,
            borderRadius: 9,
            background: "#fff",
            transition: "left .2s",
          }}
        />
      </div>
    </button>
  );
}
