"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  LionMark,
  StatusBar,
  BottomNav,
  LangPill,
} from "@/components/ds";
import { TierCard } from "@/components/TierCard";
import { useApp } from "@/lib/AppState";
import { TIERS_BASE, TIERS_MOTOR } from "@/lib/tiers";
import { t } from "@/lib/copy";

export default function TiersPage() {
  const router = useRouter();
  const { lang, cardStyle, lionDensity, setBaseTier, setMotorAddOn } = useApp();
  const [tab, setTab] = useState<"family" | "motor">("family");
  const [cycle, setCycle] = useState<"weekly" | "monthly" | "yearly">("weekly");

  const tiers = tab === "family" ? TIERS_BASE : TIERS_MOTOR;

  const onChoose = (id: string) => {
    if (tab === "family") setBaseTier(id);
    else setMotorAddOn(id);
    router.push("/app/purchase/1");
  };

  return (
    <div className="phone-stage">
      <div className="phone">
        <StatusBar />
        <div className="scroll-area">
          <div className="px-22" style={{ paddingTop: 6, paddingBottom: 12 }}>
            <div className="row between" style={{ marginBottom: 14 }}>
              <div className="row gap-8">
                <LionMark size={22} color="var(--brick)" density={lionDensity} />
                <div
                  className="display"
                  style={{ fontSize: 13, letterSpacing: "0.06em" }}
                >
                  SIMBA · BIMA
                </div>
              </div>
              <LangPill />
            </div>
            <div
              className="display"
              style={{ fontSize: 30, lineHeight: 0.95, marginBottom: 4 }}
            >
              {lang === "sw" ? "CHAGUA KINGA." : "CHOOSE COVER."}
            </div>
            <div style={{ fontSize: 12.5, color: "var(--muted)" }}>
              {lang === "sw"
                ? "Unaweza kuwa na msingi mmoja + nyongeza moja."
                : "Hold one base + one motor add-on at a time."}
            </div>
          </div>

          <div className="px-22" style={{ marginBottom: 12 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                border: "1px solid var(--ink)",
              }}
            >
              {[
                { id: "family" as const, label: t(lang, "tab_family") },
                { id: "motor" as const, label: t(lang, "tab_motor") },
              ].map((x) => (
                <button
                  key={x.id}
                  onClick={() => setTab(x.id)}
                  style={{
                    background: tab === x.id ? "var(--ink)" : "transparent",
                    color: tab === x.id ? "var(--paper)" : "var(--ink)",
                    border: 0,
                    padding: "11px 6px",
                    fontFamily: "var(--display)",
                    fontSize: 13,
                    letterSpacing: "0.06em",
                    cursor: "pointer",
                  }}
                >
                  {x.label}
                </button>
              ))}
            </div>
          </div>

          <div className="px-22 row" style={{ gap: 6, marginBottom: 14 }}>
            {[
              { id: "weekly" as const, label: t(lang, "weekly") },
              { id: "monthly" as const, label: t(lang, "monthly") },
              { id: "yearly" as const, label: t(lang, "yearly") },
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => setCycle(c.id)}
                style={{
                  flex: 1,
                  padding: "8px 6px",
                  background: cycle === c.id ? "var(--brick)" : "var(--paper-2)",
                  color: cycle === c.id ? "#fff" : "var(--ink)",
                  border: 0,
                  fontSize: 11.5,
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="px-22 col gap-12" style={{ paddingBottom: 18 }}>
            {tiers.map((tier) => (
              <TierCard
                key={tier.id}
                tier={tier}
                lang={lang}
                cycle={cycle}
                variant={cardStyle}
                popular={
                  (tab === "family" && tier.id === "silver") ||
                  (tab === "motor" && tier.id === "boda")
                }
                onChoose={() => onChoose(tier.id)}
              />
            ))}
          </div>

          {tab === "family" && (
            <div className="px-22" style={{ paddingBottom: 18 }}>
              <div className="eyebrow" style={{ marginBottom: 10 }}>
                {lang === "sw" ? "BUNDLE MAARUFU" : "POPULAR BUNDLES"}
              </div>
              <div className="col gap-8">
                <BundleRow
                  label="Bronze + Boda Shield"
                  sub={lang === "sw" ? "MSHABIKI WENGI" : "MOST POPULAR"}
                  total="1,270"
                  lang={lang}
                  accent="brick"
                />
                <BundleRow
                  label="Silver + Gari TPL"
                  sub={lang === "sw" ? "FAMILIA" : "FAMILY"}
                  total="3,230"
                  lang={lang}
                  accent="ink"
                />
                <BundleRow
                  label="Captain + Gari Complete"
                  sub="TOTAL"
                  total="14,800"
                  lang={lang}
                  accent="gold"
                />
              </div>
            </div>
          )}

          <div className="compliance">
            {t(lang, "underwriter")}
            <br />
            {t(lang, "tira_no")}
          </div>
        </div>
        <BottomNav active="cover" lang={lang} />
      </div>
    </div>
  );
}

function BundleRow({
  label,
  sub,
  total,
  lang,
  accent,
}: {
  label: string;
  sub: string;
  total: string;
  lang: "sw" | "en";
  accent: "brick" | "ink" | "gold";
}) {
  const border =
    accent === "brick"
      ? "var(--brick)"
      : accent === "gold"
      ? "var(--gold)"
      : "var(--ink)";
  return (
    <div
      className="row between"
      style={{
        background: "var(--white)",
        border: "1px solid var(--line)",
        padding: "10px 12px",
        borderLeft: "3px solid " + border,
      }}
    >
      <div className="col">
        <div
          className="eyebrow"
          style={{ fontSize: 9, color: "var(--brick)", marginBottom: 2 }}
        >
          {sub}
        </div>
        <div className="display" style={{ fontSize: 14, letterSpacing: "0.02em" }}>
          {label.toUpperCase()}
        </div>
      </div>
      <div className="col" style={{ alignItems: "flex-end" }}>
        <div
          className="display tabular"
          style={{ fontSize: 18, color: "var(--ink)" }}
        >
          {total}
        </div>
        <div style={{ fontSize: 9, color: "var(--muted)" }}>
          TSh/{lang === "sw" ? "wiki" : "wk"}
        </div>
      </div>
    </div>
  );
}
