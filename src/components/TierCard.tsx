"use client";

import type { Tier } from "@/lib/tiers";
import { priceFor } from "@/lib/tiers";
import type { Lang } from "@/lib/copy";
import { t, fmtTSh } from "@/lib/copy";
import type { CardStyle } from "@/lib/AppState";

export function TierCard({
  tier,
  lang,
  cycle,
  variant,
  popular,
  onChoose,
}: {
  tier: Tier;
  lang: Lang;
  cycle: "weekly" | "monthly" | "yearly";
  variant: CardStyle;
  popular?: boolean;
  onChoose?: () => void;
}) {
  const price = priceFor(tier, cycle);
  const cycleLabel =
    cycle === "weekly"
      ? t(lang, "per_week")
      : cycle === "monthly"
      ? "/mo"
      : t(lang, "per_year");
  const isGold = tier.accent === "gold" || tier.id === "captain";

  if (variant === "patch") {
    const accentBg =
      tier.id === "captain"
        ? "var(--ink)"
        : tier.accent === "gold"
        ? "var(--ink)"
        : tier.accent === "brick"
        ? "var(--brick)"
        : "var(--ink)";
    const accentFg = isGold ? "var(--gold)" : "#fff";
    return (
      <div
        style={{
          background: "var(--white)",
          border: "1px solid var(--line)",
          display: "flex",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {popular && (
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              background: "var(--brick)",
              color: "#fff",
              padding: "4px 10px 5px 14px",
              fontFamily: "var(--display)",
              fontSize: 10,
              letterSpacing: "0.12em",
              clipPath: "polygon(8px 0, 100% 0, 100% 100%, 0 100%)",
              zIndex: 1,
            }}
          >
            {t(lang, "popular")}
          </div>
        )}
        <div
          style={{
            width: 78,
            background: accentBg,
            color: accentFg,
            padding: "16px 8px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div className="diag" style={{ position: "absolute", inset: 0 }} />
          <div
            className="display tabular"
            style={{ fontSize: 26, lineHeight: 0.95, position: "relative" }}
          >
            {String(tier.weekly).slice(0, 2)}
          </div>
          <div
            className="display"
            style={{
              fontSize: 11,
              lineHeight: 1,
              letterSpacing: "0.06em",
              position: "relative",
            }}
          >
            {tier.badge[lang]}
          </div>
        </div>
        <div className="col grow" style={{ padding: "14px 14px" }}>
          <div
            className="row between"
            style={{ alignItems: "baseline", marginBottom: 4 }}
          >
            <div className="eyebrow" style={{ fontSize: 9 }}>
              {tier.tag[lang]}
            </div>
            <div className="row gap-4" style={{ alignItems: "baseline" }}>
              <div
                className="display tabular"
                style={{ fontSize: 22, color: "var(--brick)" }}
              >
                {fmtTSh(price)}
              </div>
              <div style={{ fontSize: 10, color: "var(--muted)" }}>
                TSh{cycleLabel}
              </div>
            </div>
          </div>
          <div
            style={{
              fontSize: 12,
              color: "var(--ink-2)",
              lineHeight: 1.4,
              marginBottom: 8,
            }}
          >
            {tier.tagline[lang]}
          </div>
          <ul
            className="col gap-4"
            style={{ margin: 0, padding: 0, listStyle: "none" }}
          >
            {tier.bullets.map((b, i) => (
              <li
                key={i}
                className="row gap-6"
                style={{
                  fontSize: 11,
                  color: "var(--ink-2)",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: 4,
                    height: 4,
                    background: "var(--brick)",
                    marginTop: 6,
                    flexShrink: 0,
                  }}
                />
                <span>{b[lang]}</span>
              </li>
            ))}
          </ul>
          {tier.note_sw && (
            <div
              style={{
                marginTop: 8,
                padding: "5px 8px",
                background: "rgba(201,162,74,0.15)",
                color: "var(--gold-deep)",
                fontSize: 9.5,
                fontWeight: 600,
                letterSpacing: "0.04em",
              }}
            >
              ⓘ {lang === "sw" ? tier.note_sw : tier.note_en}
            </div>
          )}
          {onChoose && (
            <button
              className="btn btn-primary"
              style={{ marginTop: 10, padding: "10px", fontSize: 12 }}
              onClick={onChoose}
            >
              <span>{t(lang, "choose").toUpperCase()} →</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  if (variant === "shield") {
    return (
      <div
        style={{
          background: "var(--white)",
          border: "1px solid var(--line)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {popular && (
          <div
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              background: "var(--brick)",
              color: "#fff",
              padding: "3px 8px",
              fontFamily: "var(--display)",
              fontSize: 9.5,
              letterSpacing: "0.12em",
              zIndex: 1,
            }}
          >
            {t(lang, "popular")}
          </div>
        )}
        <div
          style={{
            background: isGold
              ? "var(--ink)"
              : tier.accent === "brick"
              ? "var(--brick)"
              : "var(--ink)",
            color: isGold ? "var(--gold)" : "#fff",
            padding: "16px 16px 22px",
            clipPath:
              "polygon(0 0, 100% 0, 100% calc(100% - 14px), 50% 100%, 0 calc(100% - 14px))",
            position: "relative",
          }}
        >
          <div className="row between" style={{ alignItems: "flex-start" }}>
            <div>
              <div
                className="eyebrow"
                style={{
                  fontSize: 9,
                  color: isGold ? "var(--gold)" : "rgba(255,255,255,0.6)",
                }}
              >
                {tier.tag[lang]}
              </div>
              <div
                className="display"
                style={{ fontSize: 32, lineHeight: 0.95, marginTop: 4 }}
              >
                {tier.badge[lang]}
              </div>
            </div>
            <div className="col" style={{ alignItems: "flex-end" }}>
              <div
                className="display tabular"
                style={{ fontSize: 26, lineHeight: 1 }}
              >
                {fmtTSh(price)}
              </div>
              <div style={{ fontSize: 10, opacity: 0.7 }}>TSh{cycleLabel}</div>
            </div>
          </div>
        </div>
        <div style={{ padding: "16px 16px 14px" }}>
          <div
            style={{
              fontSize: 13,
              color: "var(--ink-2)",
              marginBottom: 10,
              lineHeight: 1.4,
            }}
          >
            {tier.tagline[lang]}
          </div>
          <ul
            className="col gap-5"
            style={{ margin: 0, padding: 0, listStyle: "none" }}
          >
            {tier.bullets.map((b, i) => (
              <li
                key={i}
                className="row gap-8"
                style={{
                  fontSize: 12,
                  color: "var(--ink-2)",
                  alignItems: "flex-start",
                }}
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke={
                    tier.accent === "brick"
                      ? "var(--brick)"
                      : isGold
                      ? "var(--gold-deep)"
                      : "var(--ink)"
                  }
                  strokeWidth="2"
                  style={{ marginTop: 3, flexShrink: 0 }}
                >
                  <path d="M2 6l3 3 5-6" />
                </svg>
                <span>{b[lang]}</span>
              </li>
            ))}
          </ul>
          {tier.note_sw && (
            <div
              style={{
                marginTop: 10,
                fontSize: 10,
                color: "var(--gold-deep)",
                padding: "4px 8px",
                background: "rgba(201,162,74,0.12)",
              }}
            >
              ⓘ {lang === "sw" ? tier.note_sw : tier.note_en}
            </div>
          )}
          {onChoose && (
            <button
              className="btn btn-primary"
              style={{ marginTop: 12, padding: "12px", fontSize: 13 }}
              onClick={onChoose}
            >
              <span>{t(lang, "choose").toUpperCase()} →</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  // stripe
  return (
    <div
      style={{
        background: "var(--white)",
        border: "1px solid var(--line)",
        borderLeft:
          "4px solid " +
          (tier.accent === "brick"
            ? "var(--brick)"
            : isGold
            ? "var(--gold)"
            : "var(--ink)"),
        padding: "14px 14px",
        position: "relative",
      }}
    >
      {popular && (
        <div
          style={{
            position: "absolute",
            top: -1,
            right: -1,
            background: "var(--brick)",
            color: "#fff",
            padding: "3px 8px",
            fontFamily: "var(--display)",
            fontSize: 9,
            letterSpacing: "0.12em",
          }}
        >
          {t(lang, "popular")}
        </div>
      )}
      <div
        className="row between"
        style={{ alignItems: "flex-start", marginBottom: 6 }}
      >
        <div className="col">
          <div className="eyebrow" style={{ fontSize: 9, color: "var(--muted)" }}>
            {tier.tag[lang]}
          </div>
          <div
            className="display"
            style={{ fontSize: 22, lineHeight: 1, marginTop: 3 }}
          >
            {tier.badge[lang]}
          </div>
        </div>
        <div className="col" style={{ alignItems: "flex-end" }}>
          <div
            className="display tabular"
            style={{ fontSize: 22, lineHeight: 1, color: "var(--brick)" }}
          >
            {fmtTSh(price)}
          </div>
          <div style={{ fontSize: 9.5, color: "var(--muted)" }}>
            TSh{cycleLabel}
          </div>
        </div>
      </div>
      <div
        style={{
          fontSize: 12,
          color: "var(--ink-2)",
          marginBottom: 8,
          fontStyle: "italic",
        }}
      >
        “{tier.tagline[lang]}”
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {tier.bullets.map((b, i) => (
          <div
            key={i}
            style={{
              fontSize: 10.5,
              color: "var(--ink-2)",
              padding: "3px 7px",
              background: "var(--paper-2)",
            }}
          >
            {b[lang]}
          </div>
        ))}
      </div>
      {tier.note_sw && (
        <div style={{ marginTop: 8, fontSize: 9.5, color: "var(--gold-deep)" }}>
          ⓘ {lang === "sw" ? tier.note_sw : tier.note_en}
        </div>
      )}
      {onChoose && (
        <button
          className="btn btn-primary"
          style={{ marginTop: 12, padding: "10px", fontSize: 12 }}
          onClick={onChoose}
        >
          <span>{t(lang, "choose").toUpperCase()} →</span>
        </button>
      )}
    </div>
  );
}
