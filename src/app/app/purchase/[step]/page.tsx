"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { StatusBar, Wordmark, Photo, LionWatermark } from "@/components/ds";
import { FakeQR } from "@/components/FakeQR";
import { useApp } from "@/lib/AppState";
import { t, fmtTSh, PHOTO } from "@/lib/copy";
import { getTier } from "@/lib/tiers";

export default function PurchasePage() {
  const params = useParams<{ step: string }>();
  const router = useRouter();
  const step = Math.max(1, Math.min(4, parseInt(params.step ?? "1", 10) || 1));
  const { lang } = useApp();

  return (
    <div className="phone-stage">
      <div className="phone">
        <StatusBar invert={step === 4} />
        {step === 1 && <Step1 lang={lang} onNext={() => router.push("/app/purchase/2")} onBack={() => router.back()} />}
        {step === 2 && <Step2 lang={lang} onNext={() => router.push("/app/purchase/3")} onBack={() => router.push("/app/purchase/1")} />}
        {step === 3 && <Step3 lang={lang} onNext={() => router.push("/app/purchase/4")} onBack={() => router.push("/app/purchase/2")} />}
        {step === 4 && <Step4 lang={lang} onDone={() => router.push("/app/home")} />}
      </div>
    </div>
  );
}

function StepHeader({
  step,
  lang,
  onBack,
}: {
  step: number;
  lang: "sw" | "en";
  onBack?: () => void;
}) {
  return (
    <div style={{ padding: "6px 22px 16px" }}>
      <div className="row between" style={{ marginBottom: 14 }}>
        <button
          onClick={onBack}
          style={{
            background: "transparent",
            border: 0,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
            padding: 0,
            color: "inherit",
          }}
        >
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
            {lang === "sw" ? "NUNUA KINGA" : "BUY COVER"}
          </div>
        </button>
        <div className="eyebrow tabular">
          {t(lang, "step")} {step} {t(lang, "of")} 4
        </div>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: (step / 4) * 100 + "%" }} />
      </div>
    </div>
  );
}

function Step1({
  lang,
  onNext,
  onBack,
}: {
  lang: "sw" | "en";
  onNext: () => void;
  onBack: () => void;
}) {
  const { name, setName, nida, setNida, phone, setPhone, region, baseTier, motorAddOn, weeklyPremium } = useApp();
  const base = getTier(baseTier);
  const motor = motorAddOn ? getTier(motorAddOn) : null;
  return (
    <>
      <StepHeader step={1} lang={lang} onBack={onBack} />
      <div className="scroll-area px-22">
        <div
          className="display"
          style={{ fontSize: 28, lineHeight: 0.95, marginBottom: 6 }}
        >
          {t(lang, "confirm_details").toUpperCase()}
        </div>
        <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 24 }}>
          {lang === "sw"
            ? "Tutathibitisha kupitia NIDA otomatiki."
            : "We'll verify via NIDA automatically."}
        </div>

        <div className="col gap-20">
          <div>
            <div className="label-up" style={{ marginBottom: 2 }}>
              {t(lang, "full_name")}
            </div>
            <input className="field" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <div className="label-up" style={{ marginBottom: 2 }}>
              {t(lang, "nida")}
            </div>
            <div className="row" style={{ borderBottom: "1.5px solid var(--line-2)" }}>
              <input
                className="field tabular"
                style={{ borderBottom: 0 }}
                value={nida}
                onChange={(e) => setNida(e.target.value)}
              />
              <div className="chip pitch" style={{ marginBottom: 6 }}>
                ● VERIFIED
              </div>
            </div>
          </div>
          <div>
            <div className="label-up" style={{ marginBottom: 2 }}>
              {t(lang, "mpesa_no")}
            </div>
            <input className="field tabular" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div>
            <div className="label-up" style={{ marginBottom: 2 }}>
              {lang === "sw" ? "Mahali pa makazi" : "Region"}
            </div>
            <input className="field" defaultValue={region} />
          </div>
        </div>

        <div
          style={{
            marginTop: 22,
            padding: "12px 14px",
            background: "var(--paper-2)",
            borderLeft: "3px solid var(--brick)",
          }}
        >
          <div className="eyebrow" style={{ fontSize: 9, marginBottom: 4 }}>
            {lang === "sw" ? "BUNDLE YAKO" : "YOUR BUNDLE"}
          </div>
          <div className="display" style={{ fontSize: 15, marginBottom: 4 }}>
            {[base?.badge.en, motor?.badge.en].filter(Boolean).join(" + ")}
          </div>
          <div className="row between" style={{ alignItems: "baseline" }}>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>
              {lang === "sw" ? "Jumla kwa wiki" : "Weekly total"}
            </div>
            <div
              className="display tabular"
              style={{ fontSize: 18, color: "var(--brick)" }}
            >
              TSh {fmtTSh(weeklyPremium)}
            </div>
          </div>
        </div>
        <div style={{ height: 20 }} />
      </div>
      <div
        className="px-22"
        style={{ padding: "12px 22px 22px", borderTop: "1px solid var(--line)" }}
      >
        <button className="btn btn-primary btn-display" onClick={onNext}>
          <span>{t(lang, "continue")}</span>
        </button>
      </div>
    </>
  );
}

function Step2({
  lang,
  onNext,
  onBack,
}: {
  lang: "sw" | "en";
  onNext: () => void;
  onBack: () => void;
}) {
  const { vehicle, setVehicle, motorAddOn } = useApp();
  // If no motor add-on, skip to Step3
  if (!motorAddOn) {
    return (
      <>
        <StepHeader step={2} lang={lang} onBack={onBack} />
        <div className="scroll-area px-22">
          <div className="display" style={{ fontSize: 28, lineHeight: 0.95, marginBottom: 6 }}>
            {lang === "sw" ? "HAUNA GARI." : "NO VEHICLE."}
          </div>
          <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 18 }}>
            {lang === "sw"
              ? "Hatua hii ni kwa wenye pikipiki au gari. Endelea."
              : "This step is for motor add-ons. Skip to review."}
          </div>
        </div>
        <div className="px-22" style={{ padding: "12px 22px 22px", borderTop: "1px solid var(--line)" }}>
          <button className="btn btn-primary btn-display" onClick={onNext}>
            <span>{t(lang, "continue")}</span>
          </button>
        </div>
      </>
    );
  }

  const v = vehicle ?? { reg: "", make: "", cc: "", colour: "" };
  const update = (field: keyof typeof v, value: string) =>
    setVehicle({ ...v, [field]: value });

  return (
    <>
      <StepHeader step={2} lang={lang} onBack={onBack} />
      <div className="scroll-area px-22">
        <div className="display" style={{ fontSize: 28, lineHeight: 0.95, marginBottom: 6 }}>
          {t(lang, "vehicle_details").toUpperCase()}
        </div>
        <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 18 }}>
          {lang === "sw" ? "Kwa Boda Shield — pikipiki yako." : "For Boda Shield — your motorcycle."}
        </div>

        <div
          style={{
            position: "relative",
            border: "1.5px dashed var(--line-2)",
            padding: "24px 18px",
            textAlign: "center",
            marginBottom: 16,
            background: "var(--paper-2)",
          }}
        >
          <svg
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--brick)"
            strokeWidth="1.5"
            style={{ marginBottom: 10 }}
          >
            <rect x="3" y="6" width="18" height="13" rx="1.5" />
            <circle cx="12" cy="12.5" r="3.5" />
            <path d="M9 3h6l1 3" />
          </svg>
          <div className="display" style={{ fontSize: 14, letterSpacing: "0.04em", marginBottom: 4 }}>
            {t(lang, "scan_reg")}
          </div>
          <div style={{ fontSize: 11, color: "var(--muted)" }}>
            {t(lang, "scan_hint")}
          </div>
        </div>

        <div className="col gap-20">
          <div>
            <div className="label-up" style={{ marginBottom: 2 }}>
              {t(lang, "reg_no")}
            </div>
            <input
              className="field tabular"
              value={v.reg}
              onChange={(e) => update("reg", e.target.value)}
            />
          </div>
          <div>
            <div className="label-up" style={{ marginBottom: 2 }}>
              {t(lang, "make_model")}
            </div>
            <input
              className="field"
              value={v.make}
              onChange={(e) => update("make", e.target.value)}
            />
          </div>
          <div className="row gap-12">
            <div style={{ flex: 1 }}>
              <div className="label-up" style={{ marginBottom: 2 }}>
                {lang === "sw" ? "CC" : "Engine cc"}
              </div>
              <input
                className="field tabular"
                value={v.cc}
                onChange={(e) => update("cc", e.target.value)}
              />
            </div>
            <div style={{ flex: 1 }}>
              <div className="label-up" style={{ marginBottom: 2 }}>
                {lang === "sw" ? "Rangi" : "Colour"}
              </div>
              <input
                className="field"
                value={v.colour}
                onChange={(e) => update("colour", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div style={{ marginTop: 18, padding: "10px 14px", background: "rgba(27,107,58,0.08)" }}>
          <div className="row gap-8">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--pitch)" strokeWidth="2">
              <path d="M5 12l5 5 9-12" />
            </svg>
            <div style={{ fontSize: 11, color: "var(--pitch)", fontWeight: 600 }}>
              {lang === "sw"
                ? "Inakidhi sheria ya TIRA — TPL ya msingi."
                : "TIRA-compliant statutory TPL minimum."}
            </div>
          </div>
        </div>
        <div style={{ height: 20 }} />
      </div>
      <div className="px-22" style={{ padding: "12px 22px 22px", borderTop: "1px solid var(--line)" }}>
        <button className="btn btn-primary btn-display" onClick={onNext}>
          <span>{t(lang, "continue")}</span>
        </button>
      </div>
    </>
  );
}

function Step3({
  lang,
  onNext,
  onBack,
}: {
  lang: "sw" | "en";
  onNext: () => void;
  onBack: () => void;
}) {
  const { baseTier, motorAddOn, weeklyPremium, phone } = useApp();
  const base = getTier(baseTier);
  const motor = motorAddOn ? getTier(motorAddOn) : null;
  const maskedPhone = useMemo(() => phone.replace(/(\d{3})\s?(\d{3})$/, "*** $2"), [phone]);

  return (
    <>
      <StepHeader step={3} lang={lang} onBack={onBack} />
      <div className="scroll-area px-22">
        <div className="display" style={{ fontSize: 28, lineHeight: 0.95, marginBottom: 6 }}>
          {t(lang, "review_bundle").toUpperCase()}
        </div>
        <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 18 }}>
          {lang === "sw" ? "Hakikisha kabla ya kulipa." : "Review before paying."}
        </div>

        <div style={{ background: "var(--ink)", color: "#fff", marginBottom: 12, position: "relative", overflow: "hidden" }}>
          <div className="flag-stripe" style={{ height: 3 }} />
          <div style={{ padding: "16px 16px" }}>
            <div className="eyebrow" style={{ color: "var(--gold)", marginBottom: 4 }}>
              BUNDLE · MSHABIKI WENGI
            </div>
            <div className="display" style={{ fontSize: 22, marginBottom: 14 }}>
              {[base?.badge.en, motor?.badge.en].filter(Boolean).join(" + ")}
            </div>
            {base && (
              <div className="row between" style={{ paddingBottom: 8, borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
                <div>
                  <div className="display" style={{ fontSize: 14 }}>{base.badge.en}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.55)" }}>
                    {lang === "sw" ? "Kinga ya msingi" : "Base"}
                  </div>
                </div>
                <div className="display tabular" style={{ fontSize: 16 }}>{fmtTSh(base.weekly)}</div>
              </div>
            )}
            {motor && (
              <div className="row between" style={{ paddingTop: 8 }}>
                <div>
                  <div className="display" style={{ fontSize: 14 }}>{motor.badge.en}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.55)" }}>
                    {lang === "sw" ? "Nyongeza ya pikipiki" : "Motor add-on"}
                  </div>
                </div>
                <div className="display tabular" style={{ fontSize: 16 }}>{fmtTSh(motor.weekly)}</div>
              </div>
            )}
          </div>
          <div style={{ background: "var(--brick)", padding: "12px 16px" }}>
            <div className="row between" style={{ alignItems: "baseline" }}>
              <div className="display" style={{ fontSize: 14, letterSpacing: "0.06em" }}>
                {t(lang, "total_weekly").toUpperCase()}
              </div>
              <div className="row gap-4" style={{ alignItems: "baseline" }}>
                <div className="display tabular" style={{ fontSize: 26 }}>
                  TSh {fmtTSh(weeklyPremium)}
                </div>
                <div style={{ fontSize: 11, opacity: 0.85 }}>{t(lang, "per_week")}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="row between" style={{ padding: "10px 12px", background: "var(--paper-2)", marginBottom: 6 }}>
          <div className="row gap-10">
            <div
              style={{
                width: 28,
                height: 28,
                background: "var(--pitch)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--display)",
                fontSize: 13,
              }}
            >
              M
            </div>
            <div className="col">
              <div className="display" style={{ fontSize: 12, letterSpacing: "0.04em" }}>
                M-PESA
              </div>
              <div className="tabular" style={{ fontSize: 11, color: "var(--muted)" }}>
                {maskedPhone}
              </div>
            </div>
          </div>
          <div className="eyebrow" style={{ fontSize: 9, color: "var(--pitch)" }}>
            {t(lang, "primary").toUpperCase()}
          </div>
        </div>

        <div style={{ fontSize: 10.5, color: "var(--muted)", lineHeight: 1.5, marginBottom: 8 }}>
          {lang === "sw"
            ? "Kwa kuendelea, unakubali masharti. Kipindi cha kuchunguza: siku 14."
            : "By continuing you accept the terms. 14-day cooling-off period applies."}
        </div>
        <div style={{ fontSize: 10, color: "var(--muted-2)" }}>
          {t(lang, "hospital_disclosure")}
        </div>
        <div style={{ height: 20 }} />
      </div>
      <div className="px-22" style={{ padding: "12px 22px 22px", borderTop: "1px solid var(--line)" }}>
        <button className="btn btn-primary btn-display" onClick={onNext}>
          <span>{t(lang, "pay_now")}</span>
        </button>
        <div style={{ textAlign: "center", fontSize: 10, color: "var(--muted)", marginTop: 8 }}>
          {t(lang, "stk_hint")}
        </div>
      </div>
    </>
  );
}

function Step4({ lang, onDone }: { lang: "sw" | "en"; onDone: () => void }) {
  const { lionDensity, vehicle, motorAddOn } = useApp();
  const motor = motorAddOn ? getTier(motorAddOn) : null;

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: "var(--ink)",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0, opacity: 0.07 }}>
        <Photo src={PHOTO.stadiumCrowd} h="100%" tone="dark" />
      </div>
      <div style={{ position: "absolute", right: -40, top: 40, opacity: 0.1 }}>
        <LionWatermark size={300} color="var(--brick)" opacity={0.1} />
      </div>
      <div
        className="scroll-area px-22"
        style={{ position: "relative", zIndex: 1, paddingTop: 12 }}
      >
        <div className="row between" style={{ marginBottom: 60 }}>
          <Wordmark color="#FFF" size={13} />
          <button
            onClick={onDone}
            style={{
              width: 28,
              height: 28,
              border: "1px solid rgba(255,255,255,0.3)",
              background: "transparent",
              color: "#fff",
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div
            className="confetti"
            style={{
              width: 76,
              height: 76,
              border: "2px solid var(--pitch-2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 24,
              background: "rgba(27,107,58,0.18)",
            }}
          >
            <svg
              width="38"
              height="38"
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
            style={{ color: "var(--gold)", marginBottom: 8 }}
          >
            🦁 NGUVU MOJA
          </div>
          <div className="display" style={{ fontSize: 44, lineHeight: 0.92 }}>
            {t(lang, "covered")}.
          </div>
          <div
            style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: 8 }}
          >
            {t(lang, "covered_sub")}
          </div>
        </div>

        {motor && (
          <div style={{ background: "#fff", color: "var(--ink)", marginBottom: 16 }}>
            <div style={{ background: "var(--brick)", padding: "10px 14px", color: "#fff" }}>
              <div className="row between" style={{ alignItems: "baseline" }}>
                <div className="display" style={{ fontSize: 12, letterSpacing: "0.06em" }}>
                  COVER NOTE · {motor.badge.en}
                </div>
                <div className="tabular" style={{ fontSize: 10 }}>SB-24-1057829</div>
              </div>
            </div>
            <div className="row" style={{ padding: 14, gap: 14 }}>
              <FakeQR size={78} />
              <div className="col grow gap-4">
                <div className="eyebrow" style={{ fontSize: 8.5 }}>VEHICLE</div>
                <div className="display tabular" style={{ fontSize: 16 }}>{vehicle?.reg ?? "T 426 ACX"}</div>
                <div style={{ fontSize: 10.5, color: "var(--muted)" }}>
                  {vehicle?.make ?? "Boxer 150 · 2023"}
                </div>
                <div style={{ fontSize: 9, color: "var(--muted-2)", marginTop: 2 }}>
                  {lang === "sw" ? "Inakubalika hadi" : "Valid until"} 12 May 2027
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="col gap-8" style={{ marginBottom: 24 }}>
          <button className="btn btn-primary btn-display" onClick={onDone}>
            <span>{t(lang, "download_note")}</span>
          </button>
          <button
            onClick={onDone}
            style={{
              background: "rgba(255,255,255,0.08)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.2)",
              padding: "14px",
              fontFamily: "var(--display)",
              fontSize: 16,
              letterSpacing: "0.06em",
              cursor: "pointer",
            }}
          >
            {t(lang, "share_whatsapp")}
          </button>
        </div>

        <div
          style={{
            textAlign: "center",
            fontSize: 10,
            color: "rgba(255,255,255,0.4)",
            marginBottom: 22,
          }}
        >
          {t(lang, "underwriter")} · {t(lang, "tira_no")}
        </div>
      </div>
    </div>
  );
}

