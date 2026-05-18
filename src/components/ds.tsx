"use client";

import type { CSSProperties, ReactNode } from "react";
import type { Lang } from "@/lib/copy";
import type { LionDensity } from "@/lib/AppState";

// ─── Lion mark ───────────────────────────────────────────────
export function LionMark({
  size = 40,
  color = "#FFF",
  density = "restrained",
}: {
  size?: number;
  color?: string;
  density?: LionDensity;
}) {
  const innerColor =
    color === "#FFF" || color === "#FAF8F4" ? "var(--brick)" : "#FAF8F4";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M32 4 L58 12 L58 32 C58 47 47 56 32 60 C17 56 6 47 6 32 L6 12 Z"
        fill={color}
      />
      <path
        d="M32 14 L20 22 L24 28 L18 30 L26 34 L20 40 L30 40 L32 50 L34 40 L44 40 L38 34 L46 30 L40 28 L44 22 Z"
        fill={innerColor}
      />
      <circle cx="32" cy="32" r="2.4" fill={color} />
      <path d="M30 36 L32 40 L34 36 Z" fill={color} />
      {density === "expressive" && (
        <g opacity="0.18" stroke={color} strokeWidth="0.6">
          <circle cx="32" cy="32" r="28" />
          <circle cx="32" cy="32" r="24" />
        </g>
      )}
    </svg>
  );
}

// ─── Wordmark ───────────────────────────────────────────────
export function Wordmark({
  color = "var(--ink)",
  size = 18,
  sub,
}: {
  color?: string;
  size?: number;
  sub?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
      <div
        className="display"
        style={{ fontSize: size, color, letterSpacing: "0.04em" }}
      >
        SIMBA · BIMA
      </div>
      {sub && (
        <div
          className="kicker"
          style={{
            fontSize: 8.5,
            color,
            opacity: 0.7,
            marginTop: 4,
            letterSpacing: "0.24em",
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

// ─── Status bar (iOS-style, 44px) ───────────────────────────
export function StatusBar({
  time = "9:41",
  invert = false,
}: {
  time?: string;
  invert?: boolean;
}) {
  const color = invert ? "#FFF" : "var(--ink)";
  return (
    <div className={"statusbar" + (invert ? " invert" : "")}>
      <span className="tabular">{time}</span>
      <div className="icons">
        <svg width="17" height="11" viewBox="0 0 17 11" fill={color}>
          <rect x="0" y="6" width="3" height="5" rx="0.5" />
          <rect x="5" y="4" width="3" height="7" rx="0.5" />
          <rect x="10" y="2" width="3" height="9" rx="0.5" />
          <rect x="15" y="0" width="2" height="11" rx="0.5" />
        </svg>
        <svg
          width="15"
          height="11"
          viewBox="0 0 15 11"
          fill="none"
          stroke={color}
          strokeWidth="1.2"
        >
          <path d="M1 4 C 4 1.5, 11 1.5, 14 4" />
          <path d="M3 6 C 5 4.5, 10 4.5, 12 6" />
          <circle cx="7.5" cy="8.5" r="1" fill={color} />
        </svg>
        <svg
          width="26"
          height="12"
          viewBox="0 0 26 12"
          fill="none"
          stroke={color}
          strokeWidth="1"
        >
          <rect x="0.5" y="0.5" width="22" height="11" rx="2.5" />
          <rect x="2" y="2" width="17" height="8" rx="1" fill={color} />
          <rect x="23" y="3.5" width="2" height="5" rx="1" fill={color} />
        </svg>
      </div>
    </div>
  );
}

// ─── Bottom nav ───────────────────────────────────────────────
import { useRouter, usePathname } from "next/navigation";

const NAV_ITEMS: {
  id: string;
  label_sw: string;
  label_en: string;
  href: string;
  icon: ReactNode;
}[] = [
  {
    id: "home",
    label_sw: "Nyumbani",
    label_en: "Home",
    href: "/app/home",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-7h-6v7H4a1 1 0 01-1-1z" />
      </svg>
    ),
  },
  {
    id: "cover",
    label_sw: "Kinga",
    label_en: "Cover",
    href: "/app/cover",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
      </svg>
    ),
  },
  {
    id: "claims",
    label_sw: "Madai",
    label_en: "Claims",
    href: "/app/claims",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 4h11l3 3v13H5z" />
        <path d="M9 12h6M9 16h6M9 8h3" />
      </svg>
    ),
  },
  {
    id: "wallet",
    label_sw: "Pochi",
    label_en: "Wallet",
    href: "/app/wallet",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 7h15a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2zM3 7V5a2 2 0 012-2h11v4" />
        <circle cx="17" cy="13" r="1.4" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "more",
    label_sw: "Zaidi",
    label_en: "More",
    href: "/app/profile",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <circle cx="5" cy="12" r="1.6" />
        <circle cx="12" cy="12" r="1.6" />
        <circle cx="19" cy="12" r="1.6" />
      </svg>
    ),
  },
];

export function BottomNav({
  active,
  lang = "en",
}: {
  active: string;
  lang?: Lang;
}) {
  const router = useRouter();
  return (
    <div className="bottomnav">
      {NAV_ITEMS.map((it) => (
        <button
          key={it.id}
          className={"nav-item" + (active === it.id ? " active" : "")}
          onClick={() => router.push(it.href)}
        >
          {it.icon}
          <span>{lang === "sw" ? it.label_sw : it.label_en}</span>
        </button>
      ))}
    </div>
  );
}

// ─── Photo ───────────────────────────────────────────────
export function Photo({
  src,
  alt,
  h = 200,
  label,
  tone = "warm",
  fill,
}: {
  src?: string;
  alt?: string;
  h?: number | string;
  label?: string;
  tone?: "warm" | "dark" | "brick" | "pitch";
  fill?: boolean;
}) {
  const bg =
    tone === "dark"
      ? "linear-gradient(135deg, #2A2826 0%, #0F0F0F 100%)"
      : tone === "brick"
      ? "linear-gradient(135deg, var(--brick) 0%, var(--brick-deep) 100%)"
      : tone === "pitch"
      ? "linear-gradient(135deg, #2A8A4F 0%, #1B6B3A 100%)"
      : undefined;

  if (src) {
    const style: CSSProperties = fill
      ? { position: "absolute", inset: 0, background: bg ?? "var(--paper-2)" }
      : {
          width: "100%",
          height: h,
          position: "relative",
          overflow: "hidden",
          background: bg ?? "var(--paper-2)",
        };
    return (
      <div style={style}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt ?? label ?? ""}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
    );
  }
  return (
    <div
      className="photo-placeholder"
      style={{ width: "100%", height: h, background: bg }}
    >
      <div className="lbl">{label ?? "image"}</div>
    </div>
  );
}

// ─── Lion silhouette as decorative watermark ──
export function LionWatermark({
  size = 200,
  opacity = 0.06,
  color = "var(--ink)",
}: {
  size?: number;
  opacity?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ opacity, position: "absolute", pointerEvents: "none" }}
      aria-hidden
    >
      <path
        d="M50 8 L80 18 L80 50 C80 72 67 86 50 92 C33 86 20 72 20 50 L20 18 Z"
        fill="none"
        stroke={color}
        strokeWidth="1.2"
      />
      <path
        d="M50 24 L34 36 L40 44 L30 48 L42 54 L34 62 L46 62 L50 78 L54 62 L66 62 L58 54 L70 48 L60 44 L66 36 Z"
        fill={color}
      />
    </svg>
  );
}

// ─── Language pill ───────────────────────────────────────────
import { useApp } from "@/lib/AppState";

export function LangPill({
  invert = false,
}: {
  invert?: boolean;
}) {
  const { lang, setLang } = useApp();
  const border = invert ? "rgba(255,255,255,0.4)" : "var(--line-2)";
  const baseColor = invert ? "rgba(255,255,255,0.7)" : "var(--muted)";
  const activeBg = invert ? "rgba(255,255,255,0.18)" : "var(--ink)";
  const activeFg = invert ? "#fff" : "var(--paper)";

  return (
    <div
      style={{
        display: "inline-flex",
        border: `1px solid ${border}`,
        fontFamily: "var(--mono)",
        fontSize: 10.5,
        letterSpacing: "0.1em",
        borderRadius: 999,
        padding: 2,
      }}
    >
      {(["sw", "en"] as const).map((l) => {
        const active = lang === l;
        return (
          <button
            key={l}
            onClick={() => setLang(l)}
            style={{
              padding: "4px 10px",
              background: active ? activeBg : "transparent",
              color: active ? activeFg : baseColor,
              border: 0,
              borderRadius: 999,
              cursor: "pointer",
              fontWeight: 600,
              letterSpacing: "0.08em",
            }}
          >
            {l.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
