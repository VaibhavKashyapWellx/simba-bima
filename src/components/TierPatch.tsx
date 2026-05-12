"use client";

import type { Tier } from "@/lib/tiers";
import type { Lang } from "@/lib/copy";
import type { CardStyle } from "@/lib/AppState";

type Accent = "ink" | "brick" | "gold" | "captain";

export function TierPatch({
  tier,
  lang,
  small,
  accent,
}: {
  tier: Tier;
  lang: Lang;
  small?: boolean;
  accent: Accent;
  style?: CardStyle;
}) {
  const isMoto = ["boda", "gari-tpl", "gari-comp"].includes(tier.id);

  const bgMap: Record<Accent, string> = {
    brick: "var(--brick)",
    ink: "var(--ink)",
    gold: "var(--ink)",
    captain: "var(--ink)",
  };
  const fgMap: Record<Accent, string> = {
    brick: "#FFF",
    ink: "var(--paper)",
    gold: "var(--gold)",
    captain: "var(--gold)",
  };
  const bg = bgMap[accent];
  const fg = fgMap[accent];

  if (small) {
    return (
      <div
        style={{
          flex: 1,
          padding: "10px 12px",
          background: bg,
          color: fg,
          border:
            "1px solid " +
            (accent === "brick" ? "var(--brick-deep)" : "var(--ink)"),
          position: "relative",
          overflow: "hidden",
          minHeight: 64,
        }}
      >
        <div
          className="eyebrow"
          style={{
            fontSize: 8.5,
            color: accent === "gold" ? "var(--gold)" : fg,
            opacity: accent === "gold" ? 1 : 0.7,
          }}
        >
          {isMoto
            ? lang === "sw"
              ? "GARI"
              : "MOTOR"
            : lang === "sw"
            ? "KINGA"
            : "BASE"}
        </div>
        <div
          className="display"
          style={{
            fontSize: 18,
            marginTop: 2,
            lineHeight: 1,
            letterSpacing: "0.03em",
          }}
        >
          {tier.badge[lang]}
        </div>
        <div style={{ position: "absolute", right: 6, bottom: 6 }}>
          {isMoto ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            >
              <circle cx="5.5" cy="17.5" r="3" />
              <circle cx="18.5" cy="17.5" r="3" />
              <path d="M5.5 17.5L9 9h6l3.5 8.5" />
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2L3 6v6c0 5 4 9 9 10 5-1 9-5 9-10V6z" />
            </svg>
          )}
        </div>
      </div>
    );
  }

  return null;
}
