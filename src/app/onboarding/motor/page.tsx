"use client";

import { useRouter } from "next/navigation";
import { LionMark, StatusBar } from "@/components/ds";
import { useApp } from "@/lib/AppState";
import { t } from "@/lib/copy";
import { useEffect } from "react";
import { requiresMotor } from "@/lib/tiers";

export default function MotorPage() {
  const router = useRouter();
  const { lang, lionDensity, vehicle, setVehicle, baseTier, motorAddOn } =
    useApp();

  useEffect(() => {
    if (!requiresMotor(baseTier, motorAddOn)) {
      router.replace("/onboarding/pay");
    }
  }, [baseTier, motorAddOn, router]);

  const v = vehicle ?? { reg: "", make: "", cc: "", colour: "" };
  const update = (field: keyof typeof v, value: string) =>
    setVehicle({ ...v, [field]: value });

  const canContinue = v.reg.trim().length >= 4 && v.make.trim().length >= 2;

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
            <div className="eyebrow">
              {lang === "sw" ? "TAARIFA YA GARI" : "VEHICLE DETAILS"}
            </div>
          </div>

          <div
            className="kicker"
            style={{ color: "var(--brick)", fontSize: 11, marginBottom: 12 }}
          >
            {lang === "sw" ? "JAZA MARA MOJA" : "FILL ONCE"}
          </div>
          <h1
            className="display"
            style={{ fontSize: 34, lineHeight: 0.95, marginBottom: 10 }}
          >
            {t(lang, "vehicle_details").toUpperCase()}
          </h1>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.55,
              color: "var(--muted)",
              margin: "0 0 22px",
            }}
          >
            {lang === "sw"
              ? "Piga picha ya kadi ya usajili — tutajaza fomu otomatiki. Au andika kwa mkono."
              : "Snap the registration card and we'll auto-fill. Or type it in."}
          </p>

          <button
            style={{
              border: "1.5px dashed var(--line-2)",
              padding: "26px 18px",
              textAlign: "center",
              marginBottom: 22,
              background: "var(--paper-2)",
              cursor: "pointer",
              width: "100%",
            }}
            onClick={() => {
              // Simulated OCR auto-fill
              setVehicle({
                reg: "T 426 ACX",
                make: "Boxer 150 · 2023",
                cc: "150",
                colour: lang === "sw" ? "Nyekundu" : "Red",
              });
            }}
          >
            <svg
              width="40"
              height="40"
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
            <div
              className="display"
              style={{ fontSize: 14, letterSpacing: "0.04em", marginBottom: 4 }}
            >
              {t(lang, "scan_reg")}
            </div>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>
              {t(lang, "scan_hint")}
            </div>
          </button>

          <div className="col gap-22">
            <div>
              <div className="label-up" style={{ marginBottom: 4 }}>
                {t(lang, "reg_no")}
              </div>
              <input
                className="field tabular"
                placeholder="T 426 ACX"
                value={v.reg}
                onChange={(e) => update("reg", e.target.value.toUpperCase())}
              />
            </div>
            <div>
              <div className="label-up" style={{ marginBottom: 4 }}>
                {t(lang, "make_model")}
              </div>
              <input
                className="field"
                placeholder="Boxer 150 · 2023"
                value={v.make}
                onChange={(e) => update("make", e.target.value)}
              />
            </div>
            <div className="row gap-12">
              <div style={{ flex: 1 }}>
                <div className="label-up" style={{ marginBottom: 4 }}>
                  {lang === "sw" ? "CC" : "Engine cc"}
                </div>
                <input
                  className="field tabular"
                  placeholder="150"
                  value={v.cc}
                  onChange={(e) => update("cc", e.target.value)}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div className="label-up" style={{ marginBottom: 4 }}>
                  {lang === "sw" ? "Rangi" : "Colour"}
                </div>
                <input
                  className="field"
                  placeholder={lang === "sw" ? "Nyekundu" : "Red"}
                  value={v.colour}
                  onChange={(e) => update("colour", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: 22,
              padding: "10px 14px",
              background: "rgba(27,107,58,0.10)",
              borderLeft: "3px solid var(--pitch)",
              fontSize: 12,
              color: "var(--ink-2)",
            }}
          >
            <span style={{ color: "var(--pitch)", fontWeight: 700 }}>
              {lang === "sw" ? "TIRA · MVIS" : "TIRA · MVIS"}
            </span>{" "}
            ·{" "}
            {lang === "sw"
              ? "Hati ya QR itatengenezwa kwa ukaguzi wa barabarani."
              : "QR cover note will be issued for roadside checks."}
          </div>
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
          <button
            className="btn btn-primary btn-display"
            onClick={() => router.push("/onboarding/pay")}
            disabled={!canContinue}
            style={{ opacity: canContinue ? 1 : 0.5 }}
          >
            <span>{t(lang, "continue")}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
