"use client";

import { useState } from "react";
import { useApp } from "@/lib/AppState";

export function Tweaks() {
  const [open, setOpen] = useState(false);
  const {
    lang,
    setLang,
    aesthetic,
    setAesthetic,
    hero,
    setHero,
    cardStyle,
    setCardStyle,
    lionDensity,
    setLionDensity,
    theme,
    setTheme,
  } = useApp();

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Tweaks"
        style={{
          position: "fixed",
          right: 12,
          bottom: 12,
          width: 44,
          height: 44,
          borderRadius: 22,
          background: "var(--ink)",
          color: "#fff",
          border: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 50,
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          fontSize: 18,
        }}
      >
        {open ? "×" : "✦"}
      </button>
      {open && (
        <div
          style={{
            position: "fixed",
            right: 12,
            bottom: 64,
            width: 240,
            background: "var(--white)",
            color: "var(--ink)",
            border: "1px solid var(--line)",
            padding: 14,
            zIndex: 49,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            fontSize: 12,
            boxShadow: "0 16px 40px rgba(0,0,0,0.18)",
            borderRadius: 8,
          }}
        >
          <div className="eyebrow" style={{ fontSize: 10 }}>
            Design Tweaks
          </div>
          <Pick
            label="Language"
            value={lang}
            options={["sw", "en"]}
            onChange={(v) => setLang(v as "sw" | "en")}
          />
          <Pick
            label="Aesthetic"
            value={aesthetic}
            options={["bold", "soft"]}
            onChange={(v) => setAesthetic(v as "bold" | "soft")}
          />
          <Pick
            label="Theme"
            value={theme}
            options={["light", "dark"]}
            onChange={(v) => setTheme(v as "light" | "dark")}
          />
          <Pick
            label="Hero"
            value={hero}
            options={["stadium", "flat", "dark"]}
            onChange={(v) => setHero(v as "stadium" | "flat" | "dark")}
          />
          <Pick
            label="Cards"
            value={cardStyle}
            options={["patch", "shield", "stripe"]}
            onChange={(v) => setCardStyle(v as "patch" | "shield" | "stripe")}
          />
          <Pick
            label="Lion"
            value={lionDensity}
            options={["restrained", "moderate", "expressive"]}
            onChange={(v) =>
              setLionDensity(v as "restrained" | "moderate" | "expressive")
            }
          />
        </div>
      )}
    </>
  );
}

function Pick({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div
        style={{
          fontSize: 9,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--muted)",
          fontWeight: 700,
        }}
      >
        {label}
      </div>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            style={{
              padding: "5px 9px",
              background: value === o ? "var(--ink)" : "var(--paper-2)",
              color: value === o ? "var(--paper)" : "var(--ink)",
              border: 0,
              fontSize: 11,
              fontWeight: 500,
              cursor: "pointer",
              borderRadius: 4,
            }}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
