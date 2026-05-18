"use client";

import { useRouter } from "next/navigation";
import { LionMark, StatusBar } from "@/components/ds";
import { useApp } from "@/lib/AppState";
import { t, fmtTSh } from "@/lib/copy";
import { TIERS_BASE, TIERS_MOTOR, requiresMotor } from "@/lib/tiers";

export default function KitPage() {
  const router = useRouter();
  const {
    lang,
    lionDensity,
    baseTier,
    motorAddOn,
    setBaseTier,
    setMotorAddOn,
    weeklyPremium,
  } = useApp();

  const onContinue = () => {
    if (!baseTier && !motorAddOn) return;
    router.push("/onboarding/about");
  };

  return (
    <div className="phone-stage">
      <div className="phone">
        <StatusBar />
        <div className="scroll-area px-22" style={{ paddingTop: 8, paddingBottom: 120 }}>
          <div className="row between" style={{ marginBottom: 18 }}>
            <div className="row gap-8">
              <LionMark size={26} color="var(--ink)" density={lionDensity} />
              <div className="display" style={{ fontSize: 15, letterSpacing: "0.06em" }}>
                SIMBA · BIMA
              </div>
            </div>
            <div className="eyebrow">STEP 1 / 3</div>
          </div>
          <div className="progress-track" style={{ marginBottom: 22 }}>
            <div className="progress-fill" style={{ width: "33%" }} />
          </div>

          <div
            className="kicker"
            style={{ color: "var(--brick)", fontSize: 11, marginBottom: 12 }}
          >
            {lang === "sw" ? "HATUA YA 1 / 3" : "STEP 1 OF 3"}
          </div>
          <h1
            className="display"
            style={{ fontSize: 36, lineHeight: 0.95, marginBottom: 10 }}
          >
            {t(lang, "choose_kit").toUpperCase()}
          </h1>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.55,
              color: "var(--muted)",
              margin: "0 0 22px",
            }}
          >
            {t(lang, "choose_kit_sub")}
          </p>

          <div className="tier-grid" style={{ marginBottom: 24 }}>
            {TIERS_BASE.map((tier) => {
              const selected = baseTier === tier.id;
              return (
                <KitCard
                  key={tier.id}
                  tier={tier}
                  lang={lang}
                  selected={selected}
                  popular={tier.id === "gold"}
                  onSelect={() => {
                    setBaseTier(tier.id);
                    // Captain bundles comp; Silver bundles TPL. Don't double-add motor.
                    if (tier.id === "captain" || tier.id === "silver") {
                      setMotorAddOn(null);
                    }
                  }}
                />
              );
            })}
          </div>

          {/* Standalone motor / add-on */}
          {baseTier !== "captain" && baseTier !== "silver" && (
            <>
              <div
                className="eyebrow"
                style={{ marginBottom: 10, color: "var(--brick)" }}
              >
                {baseTier
                  ? lang === "sw"
                    ? "ONGEZA MOTOR (HIARI)"
                    : "ADD MOTOR (OPTIONAL)"
                  : lang === "sw"
                  ? "AU CHAGUA MOTOR PEKE YAKE"
                  : "OR PICK MOTOR ONLY"}
              </div>
              <div className="tier-grid" style={{ marginBottom: 24 }}>
                {TIERS_MOTOR.map((m) => {
                  const selected = motorAddOn === m.id;
                  return (
                    <KitCard
                      key={m.id}
                      tier={m}
                      lang={lang}
                      selected={selected}
                      onSelect={() =>
                        setMotorAddOn(selected ? null : m.id)
                      }
                      small
                    />
                  );
                })}
              </div>
            </>
          )}

          {(baseTier === "silver" || baseTier === "captain") && (
            <div
              style={{
                padding: "12px 14px",
                background: "rgba(27,107,58,0.10)",
                borderLeft: "3px solid var(--pitch)",
                fontSize: 12,
                color: "var(--ink-2)",
                lineHeight: 1.45,
                marginBottom: 14,
              }}
            >
              {baseTier === "silver"
                ? lang === "sw"
                  ? "Silver inajumuisha Motor TPL (Boda). Hauhitaji kuongeza."
                  : "Silver already includes Motor TPL (Boda). No need to add motor."
                : lang === "sw"
                ? "Captain inajumuisha Motor Comprehensive."
                : "Captain already includes Comprehensive Motor."}
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
            zIndex: 5,
          }}
        >
          {(baseTier || motorAddOn) && (
            <div
              className="row between"
              style={{
                marginBottom: 10,
                padding: "8px 12px",
                background: "var(--paper-2)",
                fontSize: 12,
              }}
            >
              <span style={{ color: "var(--muted)" }}>
                {lang === "sw" ? "Jumla kwa wiki" : "Weekly total"}
              </span>
              <span
                className="display tabular"
                style={{ fontSize: 18, color: "var(--brick)" }}
              >
                TSh {fmtTSh(weeklyPremium)}
              </span>
            </div>
          )}
          <button
            className="btn btn-primary btn-display"
            onClick={onContinue}
            disabled={!baseTier && !motorAddOn}
            style={{ opacity: !baseTier && !motorAddOn ? 0.5 : 1 }}
          >
            <span>
              {lang === "sw"
                ? requiresMotor(baseTier, motorAddOn)
                  ? "ENDELEA · GARI"
                  : "ENDELEA"
                : requiresMotor(baseTier, motorAddOn)
                ? "CONTINUE · VEHICLE"
                : "CONTINUE"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

function KitCard({
  tier,
  lang,
  selected,
  popular,
  small,
  onSelect,
}: {
  tier: (typeof TIERS_BASE)[0];
  lang: "sw" | "en";
  selected: boolean;
  popular?: boolean;
  small?: boolean;
  onSelect: () => void;
}) {
  const isGold = tier.accent === "gold" || tier.id === "captain";
  const headerBg =
    tier.accent === "brick"
      ? "var(--brick)"
      : isGold
      ? "var(--ink)"
      : "var(--ink)";
  const headerFg = isGold ? "var(--gold)" : "#fff";

  return (
    <button
      onClick={onSelect}
      style={{
        display: "flex",
        flexDirection: "column",
        background: "var(--white)",
        border: selected ? "2px solid var(--brick)" : "1px solid var(--line)",
        cursor: "pointer",
        padding: 0,
        textAlign: "left",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {popular && !selected && (
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            padding: "3px 9px",
            background: "var(--gold)",
            color: "var(--ink)",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.14em",
            zIndex: 1,
          }}
        >
          {(lang === "sw"
            ? t(lang, "most_pick")
            : t(lang, "most_pick")
          ).toUpperCase()}
        </div>
      )}
      {selected && (
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "var(--brick)",
            color: "#fff",
            width: 24,
            height: 24,
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            zIndex: 1,
          }}
        >
          ✓
        </div>
      )}
      <div
        style={{
          background: headerBg,
          color: headerFg,
          padding: small ? "12px 14px" : "14px 16px",
          position: "relative",
        }}
      >
        <div
          className="eyebrow"
          style={{ fontSize: 9, opacity: 0.75, color: headerFg, marginBottom: 4 }}
        >
          {tier.tag[lang]}
        </div>
        <div
          className="display"
          style={{
            fontSize: small ? 22 : 28,
            letterSpacing: "0.03em",
            lineHeight: 1,
          }}
        >
          {tier.badge[lang]}
        </div>
        <div
          className="row gap-4"
          style={{ alignItems: "baseline", marginTop: 6 }}
        >
          <span style={{ fontSize: 11, opacity: 0.7 }}>TSh</span>
          <span
            className="display tabular"
            style={{ fontSize: small ? 22 : 28 }}
          >
            {tier.weekly.toLocaleString()}
          </span>
          <span style={{ fontSize: 11, opacity: 0.7 }}>
            /{lang === "sw" ? "wiki" : "wk"}
          </span>
        </div>
      </div>
      <div style={{ padding: small ? "12px 14px 14px" : "14px 16px 16px" }}>
        <ul className="col gap-6" style={{ padding: 0, margin: 0, listStyle: "none" }}>
          {tier.bullets.slice(0, small ? 2 : 4).map((b, i) => (
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
                stroke={tier.accent === "brick" ? "var(--brick)" : "var(--ink)"}
                strokeWidth="2"
                style={{ marginTop: 3, flexShrink: 0 }}
              >
                <path d="M2 6l3 3 5-6" />
              </svg>
              <span>{b[lang]}</span>
            </li>
          ))}
        </ul>
        {tier.note_en && !small && (
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
      </div>
    </button>
  );
}
