"use client";

import Link from "next/link";
import { LionMark, Wordmark, Photo, LangPill } from "@/components/ds";
import { useApp } from "@/lib/AppState";
import { t, PHOTO } from "@/lib/copy";

export default function LandingPage() {
  const { lang, lionDensity, aesthetic } = useApp();
  const soft = aesthetic === "soft";

  return (
    <div className="web-shell">
      <Header />

      {/* HERO */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background: soft ? "var(--paper-2)" : "var(--ink)",
          color: soft ? "var(--ink)" : "#fff",
        }}
      >
        <div style={{ position: "absolute", inset: 0, opacity: soft ? 0.18 : 0.35 }}>
          <Photo src={PHOTO.stadiumCrowd} h="100%" tone={soft ? "warm" : "dark"} />
        </div>
        <div
          style={{
            position: "absolute",
            right: -80,
            top: 40,
            opacity: soft ? 0.06 : 0.1,
          }}
        >
          <LionMark size={520} color="var(--brick)" density={lionDensity} />
        </div>
        <div
          className="web-hero web-padding"
          style={{
            position: "relative",
            padding: "92px 56px 88px",
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: 64,
            alignItems: "center",
          }}
        >
          <div>
            <div
              className="eyebrow"
              style={{ color: "var(--gold)", marginBottom: 18 }}
            >
              🦁 SIMBA BIMA · MSIMBAZI
            </div>
            <div
              className="display"
              style={{ fontSize: soft ? 78 : 96, lineHeight: 0.92, marginBottom: 22 }}
            >
              {lang === "sw" ? "Nguvu moja." : "One strength."}
              <br />
              <span style={{ color: "var(--brick)" }}>
                {lang === "sw" ? "Kinga moja." : "One protection."}
              </span>
            </div>
            <div
              style={{
                fontSize: 18,
                lineHeight: 1.5,
                color: soft ? "var(--muted)" : "rgba(255,255,255,0.78)",
                maxWidth: 520,
                marginBottom: 30,
              }}
            >
              {lang === "sw"
                ? "Bima ya mshabiki. Lipa kidogo kila wiki kwa M-Pesa. Linda familia yako, pikipiki yako, na gari yako — sote pamoja."
                : "The fan's insurance. Pay a little each week via M-Pesa. Protect your family, your motorcycle, and your car — all together."}
            </div>
            <div className="row gap-12" style={{ flexWrap: "wrap" }}>
              <Link href="/onboarding/splash" style={{ display: "inline-block" }}>
                <button
                  className="btn btn-primary btn-display btn-auto"
                  style={{ padding: "16px 28px" }}
                >
                  <span>
                    {lang === "sw" ? "Anza kwa TSh 350/wiki" : "Start at TSh 350/wk"}
                  </span>
                </button>
              </Link>
              <Link href="#plans">
                <button
                  style={{
                    background: "transparent",
                    color: soft ? "var(--ink)" : "#fff",
                    border: `1.5px solid ${soft ? "var(--ink)" : "rgba(255,255,255,0.4)"}`,
                    padding: "16px 28px",
                    fontFamily: "var(--body)",
                    fontWeight: 600,
                    fontSize: 15,
                    cursor: "pointer",
                    borderRadius: soft ? 12 : 2,
                  }}
                >
                  {lang === "sw" ? "Tazama mipango" : "Compare plans"}
                </button>
              </Link>
            </div>
            <div className="row gap-24" style={{ marginTop: 32, flexWrap: "wrap" }}>
              {[
                { v: "22×", l: lang === "sw" ? "Mabingwa wa Ligi" : "League titles" },
                { v: "12K+", l: lang === "sw" ? "Mashabiki walioshikilia" : "Fans covered" },
                { v: "24h", l: lang === "sw" ? "Malipo ya madai" : "Claim payout" },
              ].map((s, i) => (
                <div key={i} className="col">
                  <div
                    className="display tabular"
                    style={{
                      fontSize: 32,
                      color: soft ? "var(--brick)" : "var(--gold)",
                    }}
                  >
                    {s.v}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: soft ? "var(--muted)" : "rgba(255,255,255,0.55)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="web-hero-cards" style={{ position: "relative", height: 480 }}>
            <div
              style={{
                position: "absolute",
                top: 24,
                right: 32,
                width: 280,
                padding: "20px 22px",
                background: "var(--brick)",
                color: "#fff",
                borderRadius: soft ? 18 : 2,
                boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
                transform: "rotate(-3deg)",
              }}
            >
              <div className="eyebrow" style={{ color: "var(--gold)", marginBottom: 8 }}>
                BRONZE · ACTIVE
              </div>
              <div className="display" style={{ fontSize: 28, marginBottom: 14 }}>
                {lang === "sw" ? "Umelindwa" : "You're covered"}
              </div>
              <div
                className="row between"
                style={{
                  alignItems: "baseline",
                  borderTop: "1px solid rgba(255,255,255,0.2)",
                  paddingTop: 10,
                }}
              >
                <div style={{ fontSize: 10, opacity: 0.75, letterSpacing: "0.08em" }}>
                  WEEKLY
                </div>
                <div className="display tabular" style={{ fontSize: 22 }}>
                  TSh 1,270
                </div>
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                top: 200,
                right: 96,
                width: 260,
                padding: "18px 20px",
                background: "#fff",
                color: "var(--ink)",
                borderRadius: soft ? 16 : 2,
                boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
                border: "1px solid var(--line)",
                transform: "rotate(4deg)",
              }}
            >
              <div className="row gap-10" style={{ marginBottom: 10 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    background: "var(--pitch)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--display)",
                    fontSize: 14,
                    borderRadius: soft ? 8 : 0,
                  }}
                >
                  M
                </div>
                <div className="col">
                  <div
                    style={{
                      fontSize: 10,
                      color: "var(--muted)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    M-PESA
                  </div>
                  <div className="tabular" style={{ fontSize: 12, fontWeight: 600 }}>
                    +255 754 *** 456
                  </div>
                </div>
              </div>
              <div
                className="display tabular"
                style={{ fontSize: 24, color: "var(--pitch)" }}
              >
                + TSh 850,000
              </div>
              <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>
                {lang === "sw" ? "Madai yamelipwa" : "Claim paid · Boda TPL"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPLIANCE BAR */}
      <div
        className="web-padding"
        style={{
          background: "var(--paper-2)",
          padding: "14px 56px",
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          justifyContent: "space-between",
          fontSize: 11,
          color: "var(--muted)",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        <span>{t(lang, "underwriter")}</span>
        <span>{t(lang, "tira_no")}</span>
        <span>
          {lang === "sw" ? "Kipindi cha kuchunguza: siku 14" : "14-day cooling-off"}
        </span>
      </div>

      {/* PLANS */}
      <section
        id="plans"
        className="web-padding"
        style={{ padding: "80px 56px", maxWidth: 1280, margin: "0 auto" }}
      >
        <div className="row between" style={{ alignItems: "flex-end", marginBottom: 36, flexWrap: "wrap", gap: 20 }}>
          <div>
            <div className="eyebrow" style={{ color: "var(--brick)", marginBottom: 10 }}>
              {lang === "sw" ? "BIDHAA · MIPANGO" : "COVER · PLANS"}
            </div>
            <div className="display" style={{ fontSize: 56, lineHeight: 0.95 }}>
              {lang === "sw" ? "Chagua kinga yako." : "Pick your protection."}
            </div>
          </div>
          <div style={{ maxWidth: 380, fontSize: 14, color: "var(--muted)", lineHeight: 1.5 }}>
            {lang === "sw"
              ? "Mpango wa msingi kwa familia + nyongeza ya pikipiki au gari. Lipa kila wiki, simamisha wakati wowote."
              : "A base plan for your family plus a motor add-on for your motorcycle or car. Pay weekly, pause anytime."}
          </div>
        </div>

        <div
          className="row gap-2"
          style={{ marginBottom: 24, borderBottom: "1px solid var(--line)" }}
        >
          {[
            {
              id: "fam",
              label: lang === "sw" ? "Mimi na Familia" : "Me & Family",
              active: true,
            },
            { id: "veh", label: lang === "sw" ? "Gari Yangu" : "My Vehicle" },
          ].map((tb) => (
            <div
              key={tb.id}
              style={{
                padding: "14px 22px",
                fontFamily: "var(--display)",
                fontSize: 16,
                letterSpacing: "0.04em",
                borderBottom: tb.active
                  ? "2.5px solid var(--brick)"
                  : "2.5px solid transparent",
                color: tb.active ? "var(--ink)" : "var(--muted)",
                marginBottom: -1,
              }}
            >
              {tb.label.toUpperCase()}
            </div>
          ))}
        </div>

        <div
          className="web-plan-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}
        >
          {[
            { tier: "BRONZE", price: "350", death: "5M", funeral: "—", hosp: "—", popular: false, badge: "var(--ink)" },
            { tier: "SILVER", price: "920", death: "5M", funeral: "2M", hosp: "—", popular: true, badge: "var(--muted)" },
            { tier: "GOLD", price: "2,070", death: "5M", funeral: "3M", hosp: "5d", popular: false, badge: "var(--brick)" },
            { tier: "CAPTAIN", price: "8,080", death: "5M", funeral: "3M", hosp: "10d", popular: false, badge: "var(--gold)", dark: true },
          ].map((p, i) => (
            <div
              key={i}
              style={{
                background: p.dark ? "var(--ink)" : "var(--white)",
                color: p.dark ? "var(--paper)" : "var(--ink)",
                border: p.dark ? 0 : "1px solid var(--line)",
                borderRadius: soft ? 18 : 2,
                padding: 0,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {p.popular && (
                <div
                  style={{
                    position: "absolute",
                    top: 14,
                    right: 14,
                    padding: "4px 8px",
                    background: "var(--gold)",
                    color: "var(--ink)",
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    borderRadius: soft ? 999 : 0,
                  }}
                >
                  {lang === "sw" ? "MAARUFU" : "POPULAR"}
                </div>
              )}
              <div style={{ height: 5, background: p.badge }} />
              <div style={{ padding: "24px 20px 20px" }}>
                <div className="display" style={{ fontSize: 26, marginBottom: 4 }}>
                  {p.tier}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: p.dark ? "rgba(255,255,255,0.55)" : "var(--muted)",
                    marginBottom: 18,
                  }}
                >
                  {p.tier === "BRONZE"
                    ? lang === "sw"
                      ? "Solo"
                      : "Solo"
                    : p.tier === "SILVER"
                    ? lang === "sw"
                      ? "Familia 3"
                      : "Family 3"
                    : p.tier === "GOLD"
                    ? lang === "sw"
                      ? "Familia + Hospitali"
                      : "Family + hospital"
                    : lang === "sw"
                    ? "Familia 5 + ya juu"
                    : "Family 5 + critical"}
                </div>
                <div className="row" style={{ alignItems: "baseline", gap: 4, marginBottom: 18 }}>
                  <div
                    style={{
                      fontSize: 11,
                      color: p.dark ? "rgba(255,255,255,0.6)" : "var(--muted)",
                    }}
                  >
                    TSh
                  </div>
                  <div
                    className="display tabular"
                    style={{ fontSize: 36, color: p.dark ? "var(--gold)" : "var(--brick)" }}
                  >
                    {p.price}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: p.dark ? "rgba(255,255,255,0.55)" : "var(--muted)",
                    }}
                  >
                    /{lang === "sw" ? "wk" : "wk"}
                  </div>
                </div>
                <div className="col gap-10" style={{ marginBottom: 22, fontSize: 12.5 }}>
                  <div className="row between">
                    <span style={{ color: p.dark ? "rgba(255,255,255,0.6)" : "var(--muted)" }}>
                      {lang === "sw" ? "Ajali" : "Death"}
                    </span>
                    <span className="tabular" style={{ fontWeight: 600 }}>{p.death}</span>
                  </div>
                  <div className="row between">
                    <span style={{ color: p.dark ? "rgba(255,255,255,0.6)" : "var(--muted)" }}>
                      {lang === "sw" ? "Mazishi" : "Funeral"}
                    </span>
                    <span className="tabular" style={{ fontWeight: 600 }}>{p.funeral}</span>
                  </div>
                  <div className="row between">
                    <span style={{ color: p.dark ? "rgba(255,255,255,0.6)" : "var(--muted)" }}>
                      {lang === "sw" ? "Hospitali" : "Hospital cash"}
                    </span>
                    <span className="tabular" style={{ fontWeight: 600 }}>{p.hosp}</span>
                  </div>
                </div>
                <Link href="/onboarding/splash">
                  <button className="btn btn-primary btn-display" style={{ fontSize: 14, padding: "13px 18px" }}>
                    <span>{lang === "sw" ? "Chagua" : "Choose"}</span>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 36,
            padding: "20px 26px",
            background: "var(--paper-2)",
            borderRadius: soft ? 16 : 2,
            borderLeft: soft ? 0 : "3px solid var(--brick)",
          }}
        >
          <div className="row between" style={{ flexWrap: "wrap", gap: 14 }}>
            <div className="row gap-16">
              <div style={{ fontSize: 28 }}>🏍️</div>
              <div>
                <div className="display" style={{ fontSize: 18, marginBottom: 2 }}>
                  {lang === "sw"
                    ? "Una pikipiki? Ongeza Boda Shield"
                    : "On two wheels? Add Boda Shield"}
                </div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>
                  {lang === "sw"
                    ? "TPL inakidhi sheria — TSh 920/wiki. Cover note ya QR kwa ukaguzi wa barabarani."
                    : "Statutory TPL — TSh 920/wk. QR cover note for roadside checks."}
                </div>
              </div>
            </div>
            <Link href="/onboarding/splash">
              <button className="btn btn-ghost btn-auto" style={{ padding: "12px 22px", fontSize: 13 }}>
                {lang === "sw" ? "Jifunze zaidi" : "Learn more"}
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* RIDER STRIP */}
      <section
        style={{
          background: "var(--ink)",
          color: "#fff",
          padding: "72px 56px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, opacity: 0.18 }}>
          <Photo src={PHOTO.boda} h="100%" tone="dark" />
        </div>
        <div
          className="web-rider-grid web-padding"
          style={{
            position: "relative",
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "center",
          }}
        >
          <div>
            <div className="eyebrow" style={{ color: "var(--gold)", marginBottom: 14 }}>
              {lang === "sw" ? "MSHABIKI RIDER" : "RIDER FIRST"}
            </div>
            <div
              className="display"
              style={{ fontSize: 56, lineHeight: 0.95, marginBottom: 18 }}
            >
              {lang === "sw"
                ? "Kwa mpanda boda — barabara ni yetu."
                : "For the rider — the road is ours."}
            </div>
            <div
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.6,
                maxWidth: 460,
              }}
            >
              {lang === "sw"
                ? "47% ya vifo barabarani Tanzania ni pikipiki. Tumeunda Boda Shield kwa hili: cover note ya QR, madai kwa picha, na malipo ndani ya saa 24."
                : "47% of Tanzanian road fatalities involve motorcycles. Boda Shield is built for that reality — QR cover note, photo-first claims, 24-hour payouts."}
            </div>
          </div>
          <div className="row gap-16" style={{ flexWrap: "wrap" }}>
            {[
              { v: "722", l: lang === "sw" ? "Vifo vya 2024" : "2024 deaths" },
              { v: "2,799", l: lang === "sw" ? "Ajali 2024" : "Accidents 2024" },
              { v: "24h", l: "SLA" },
            ].map((s, i) => (
              <div
                key={i}
                className="col"
                style={{
                  flex: 1,
                  minWidth: 110,
                  padding: "22px 18px",
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: soft ? 14 : 0,
                  borderTop: "2px solid var(--brick)",
                }}
              >
                <div className="display tabular" style={{ fontSize: 40 }}>{s.v}</div>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.6)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginTop: 6,
                  }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="web-padding"
        style={{
          padding: "56px",
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        <div
          className="web-footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 48,
          }}
        >
          <div>
            <div className="row gap-10" style={{ marginBottom: 12 }}>
              <LionMark size={24} color="var(--brick)" density={lionDensity} />
              <Wordmark color="var(--ink)" size={13} />
            </div>
            <div
              style={{
                fontSize: 12,
                color: "var(--muted)",
                lineHeight: 1.6,
                maxWidth: 280,
                marginBottom: 14,
              }}
            >
              {lang === "sw"
                ? "Bidhaa rasmi ya bima ya Simba Sports Club. Inasimamiwa kwenye karatasi ya TIRA."
                : "The official insurance brand of Simba Sports Club. Underwritten on TIRA paper."}
            </div>
            <div
              style={{ fontSize: 10, color: "var(--muted-2)", letterSpacing: "0.06em" }}
            >
              {t(lang, "underwriter")} · {t(lang, "tira_no")}
            </div>
            <div style={{ marginTop: 14 }}>
              <Link
                href="/portal"
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--brick)",
                }}
              >
                → {lang === "sw" ? "Ingia kwenye portal" : "Sign in to portal"}
              </Link>
            </div>
          </div>
          {[
            {
              h: lang === "sw" ? "Kinga" : "Cover",
              items: ["Bronze", "Silver", "Gold", "Captain", "Boda Shield", "Gari TPL"],
            },
            {
              h: lang === "sw" ? "Kampuni" : "Company",
              items: [
                lang === "sw" ? "Kuhusu" : "About",
                "MO Assurance",
                "TIRA",
                lang === "sw" ? "Mawakala" : "Agents",
              ],
            },
            {
              h: lang === "sw" ? "Karibu" : "Support",
              items: [
                "WhatsApp",
                lang === "sw" ? "Maswali" : "FAQ",
                lang === "sw" ? "Madai" : "Claims",
                lang === "sw" ? "Simu ya wapanda" : "Rider line",
              ],
            },
          ].map((col, i) => (
            <div key={i} className="col gap-10">
              <div className="eyebrow" style={{ marginBottom: 4 }}>
                {col.h}
              </div>
              {col.items.map((it) => (
                <div key={it} style={{ fontSize: 13, color: "var(--ink-2)" }}>
                  {it}
                </div>
              ))}
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}

function Header() {
  const { lang } = useApp();
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 56px",
        borderBottom: "1px solid var(--line)",
        background: "var(--paper)",
        position: "relative",
        flexWrap: "wrap",
        gap: 14,
      }}
      className="web-padding"
    >
      <Link href="/" className="row gap-12">
        <LionMark size={26} color="var(--brick)" density="restrained" />
        <Wordmark color="var(--ink)" size={15} />
      </Link>
      <nav
        className="row gap-28"
        style={{
          fontSize: 14,
          fontWeight: 500,
          color: "var(--ink-2)",
        }}
      >
        <Link href="#plans">{lang === "sw" ? "Bidhaa" : "Cover"}</Link>
        <Link href="/app/claims">{lang === "sw" ? "Madai" : "Claims"}</Link>
        <Link href="/portal">{lang === "sw" ? "Mshabiki" : "12th Man"}</Link>
        <a href="#footer">{lang === "sw" ? "Karibu" : "Support"}</a>
      </nav>
      <div className="row gap-12">
        <LangPill />
        <Link href="/onboarding/splash">
          <button
            className="btn btn-primary btn-auto"
            style={{ padding: "11px 20px", fontSize: 13, fontWeight: 600 }}
          >
            <span>{lang === "sw" ? "Pakua App" : "Get the app"}</span>
          </button>
        </Link>
      </div>
    </header>
  );
}
