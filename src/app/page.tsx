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
      <Hero />
      <Promise />
      <HowItWorks />
      <Plans soft={soft} lang={lang} />
      <FanStory />
      <RiderReality soft={soft} lang={lang} />
      <FinalCTA />
      <Footer lang={lang} lionDensity={lionDensity} />
    </div>
  );
}

/* ─── HEADER ─── */
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
        position: "sticky",
        top: 0,
        zIndex: 40,
        flexWrap: "wrap",
        gap: 14,
        backdropFilter: "saturate(140%) blur(8px)",
      }}
      className="web-padding"
    >
      <Link href="/" className="row gap-12">
        <LionMark size={26} color="var(--brick)" density="restrained" />
        <Wordmark color="var(--ink)" size={15} />
      </Link>
      <nav
        className="row gap-28"
        style={{ fontSize: 14, fontWeight: 500, color: "var(--ink-2)" }}
      >
        <a href="#promise">{lang === "sw" ? "Ahadi" : "Promise"}</a>
        <a href="#how">{lang === "sw" ? "Jinsi" : "How"}</a>
        <a href="#plans">{lang === "sw" ? "Mipango" : "Plans"}</a>
        <Link href="/portal">{lang === "sw" ? "Mshabiki" : "12th Man"}</Link>
      </nav>
      <div className="row gap-12">
        <LangPill />
        <Link href="/onboarding/splash">
          <button
            className="btn btn-primary btn-auto"
            style={{ padding: "11px 20px", fontSize: 13, fontWeight: 600 }}
          >
            <span>{lang === "sw" ? "Anza" : "Get started"}</span>
          </button>
        </Link>
      </div>
    </header>
  );
}

/* ─── 1. HERO — one promise, one CTA ─── */
function Hero() {
  const { lang, lionDensity, aesthetic } = useApp();
  const soft = aesthetic === "soft";
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: soft ? "var(--paper-2)" : "var(--ink)",
        color: soft ? "var(--ink)" : "#fff",
      }}
    >
      <div style={{ position: "absolute", inset: 0, opacity: soft ? 0.18 : 0.4 }}>
        <Photo src={PHOTO.stadiumCrowd} h="100%" tone={soft ? "warm" : "dark"} />
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: soft
            ? "linear-gradient(180deg, rgba(251,247,241,0.4) 0%, rgba(251,247,241,0.92) 100%)"
            : "linear-gradient(180deg, rgba(15,15,15,0.4) 0%, rgba(15,15,15,0.92) 100%)",
        }}
      />
      <div style={{ position: "absolute", right: -120, top: 40, opacity: soft ? 0.06 : 0.08 }}>
        <LionMark size={560} color="var(--brick)" density={lionDensity} />
      </div>
      <div
        className="web-padding"
        style={{
          position: "relative",
          padding: "120px 56px 140px",
          maxWidth: 1100,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div
          className="eyebrow"
          style={{
            color: "var(--gold)",
            marginBottom: 28,
            letterSpacing: "0.22em",
          }}
        >
          🦁 SIMBA BIMA · WEKUNDU WA MSIMBAZI
        </div>
        <h1
          className="display"
          style={{
            fontSize: "clamp(56px, 9vw, 120px)",
            lineHeight: 0.9,
            marginBottom: 32,
            margin: "0 auto 32px",
            maxWidth: 900,
          }}
        >
          {lang === "sw" ? "Nguvu moja." : "One strength."}
          <br />
          <span style={{ color: "var(--brick)" }}>
            {lang === "sw" ? "Kinga moja." : "One protection."}
          </span>
        </h1>
        <p
          style={{
            fontSize: "clamp(17px, 1.6vw, 20px)",
            lineHeight: 1.55,
            color: soft ? "var(--muted)" : "rgba(255,255,255,0.78)",
            maxWidth: 640,
            margin: "0 auto 40px",
          }}
        >
          {lang === "sw"
            ? "Bima rasmi ya Mshabiki — kuanzia TSh 350 kwa wiki, kupitia M-Pesa, na simamisha wakati wowote."
            : "The fan's insurance. From TSh 350 a week, paid through M-Pesa, pause whenever you need."}
        </p>
        <Link href="/onboarding/splash">
          <button
            className="btn btn-primary btn-display btn-auto"
            style={{ padding: "20px 36px", fontSize: 18 }}
          >
            <span>
              {lang === "sw" ? "Anza kinga yako →" : "Start your protection →"}
            </span>
          </button>
        </Link>
        <div
          style={{
            marginTop: 18,
            fontSize: 13,
            color: soft ? "var(--muted)" : "rgba(255,255,255,0.55)",
          }}
        >
          {lang === "sw"
            ? "Tayari una akaunti? "
            : "Already a fan? "}
          <Link
            href="/portal"
            style={{ color: "var(--gold)", fontWeight: 600 }}
          >
            {lang === "sw" ? "Ingia →" : "Sign in →"}
          </Link>
        </div>
      </div>

      {/* Compliance whisper */}
      <div
        className="web-padding"
        style={{
          position: "relative",
          padding: "16px 56px",
          background: soft ? "rgba(15,15,15,0.04)" : "rgba(255,255,255,0.06)",
          fontSize: 11,
          color: soft ? "var(--muted)" : "rgba(255,255,255,0.6)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        {t("en" as const, "underwriter")} · {t("en" as const, "tira_no")} ·{" "}
        {lang === "sw" ? "Siku 14 za kuchunguza" : "14-day cooling-off"}
      </div>
    </section>
  );
}

/* ─── 2. THE PROMISE — three plain-language pillars ─── */
function Promise() {
  const { lang } = useApp();
  const items: { title: string; body: string; icon: string }[] = [
    {
      icon: "💸",
      title: lang === "sw" ? "Lipa kidogo kila wiki." : "Pay a little each week.",
      body:
        lang === "sw"
          ? "Kuanzia TSh 350. Hakuna mkataba mrefu. Simamisha wakati wowote."
          : "From TSh 350. No long contract. Pause anytime, no fuss.",
    },
    {
      icon: "📸",
      title: lang === "sw" ? "Madai kwa picha." : "Claim with a photo.",
      body:
        lang === "sw"
          ? "Piga picha, eleza kifupi, tutafanya iliyobaki. Hakuna fomu za hospitali."
          : "Snap a photo, tell us what happened, and we do the rest. No hospital paperwork.",
    },
    {
      icon: "⚡",
      title:
        lang === "sw" ? "Pesa kwa M-Pesa ndani ya 24h." : "Money on M-Pesa in 24h.",
      body:
        lang === "sw"
          ? "Madai yameidhinishwa? Pesa zinakuwa simuni mwako kabla ya kesho."
          : "Claim approved? The money lands on your phone before tomorrow.",
    },
  ];

  return (
    <section
      id="promise"
      style={{
        background: "var(--paper)",
        padding: "120px 56px",
      }}
      className="web-padding"
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ maxWidth: 720, marginBottom: 64 }}>
          <div
            className="eyebrow"
            style={{ color: "var(--brick)", marginBottom: 16 }}
          >
            {lang === "sw" ? "AHADI YETU" : "OUR PROMISE"}
          </div>
          <h2
            className="display"
            style={{
              fontSize: "clamp(40px, 5.5vw, 64px)",
              lineHeight: 0.95,
              marginBottom: 18,
            }}
          >
            {lang === "sw" ? (
              <>
                Bima rahisi. <br />
                Kwa lugha yako.
              </>
            ) : (
              <>
                Real cover. <br />
                Plain English. <br />
                <span style={{ color: "var(--brick)" }}>
                  Kiswahili rasmi.
                </span>
              </>
            )}
          </h2>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.55,
              color: "var(--muted)",
              maxWidth: 560,
            }}
          >
            {lang === "sw"
              ? "Tunajua kwa nini ulikuwa unaepuka bima. Iko ngumu. Iko ghali. Inakulazimisha karatasi. Sisi tumefanya jambo tofauti."
              : "We know why you've been putting off insurance. It's hard. It's expensive. It needs paperwork. We've done the opposite."}
          </p>
        </div>

        <div className="promise-grid">
          {items.map((it, i) => (
            <article
              key={i}
              style={{
                background: "var(--white)",
                border: "1px solid var(--line)",
                padding: "36px 32px",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  background: "var(--paper-2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 30,
                  marginBottom: 22,
                }}
              >
                {it.icon}
              </div>
              <h3
                className="display"
                style={{
                  fontSize: 26,
                  lineHeight: 1.05,
                  marginBottom: 12,
                }}
              >
                {it.title}
              </h3>
              <p
                style={{
                  fontSize: 14.5,
                  lineHeight: 1.6,
                  color: "var(--muted)",
                  margin: 0,
                }}
              >
                {it.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 3. HOW IT WORKS — three numbered steps ─── */
function HowItWorks() {
  const { lang } = useApp();
  const steps = [
    {
      title: lang === "sw" ? "Chagua kinga yako." : "Pick your protection.",
      body:
        lang === "sw"
          ? "Solo, familia au mpanda boda? Tuna kinga inayokufaa."
          : "Solo, family, or rider? We meet you where you are.",
    },
    {
      title: lang === "sw" ? "Lipa kwa M-Pesa." : "Pay with M-Pesa.",
      body:
        lang === "sw"
          ? "Hakuna kadi. Hakuna karatasi. Lipa wiki kwa wiki, otomatiki."
          : "No cards. No paperwork. Pay weekly, auto-deduct on Saturdays.",
    },
    {
      title:
        lang === "sw" ? "Tutakulinda kila wakati." : "We've got your back.",
      body:
        lang === "sw"
          ? "Ajali ikitokea, piga simu au tuma picha. Pesa zinakuja saa 24."
          : "When something happens, send us a photo. The money lands in 24h.",
    },
  ];

  return (
    <section
      id="how"
      style={{
        background: "var(--ink)",
        color: "#fff",
        padding: "120px 56px",
        position: "relative",
        overflow: "hidden",
      }}
      className="web-padding"
    >
      <div style={{ position: "absolute", inset: 0, opacity: 0.07 }}>
        <Photo src={PHOTO.boda} h="100%" tone="dark" />
      </div>
      <div
        style={{
          position: "relative",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <div style={{ maxWidth: 640, marginBottom: 64 }}>
          <div
            className="eyebrow"
            style={{ color: "var(--gold)", marginBottom: 16 }}
          >
            {lang === "sw" ? "INAVYOFANYA KAZI" : "HOW IT WORKS"}
          </div>
          <h2
            className="display"
            style={{
              fontSize: "clamp(40px, 5.5vw, 64px)",
              lineHeight: 0.95,
            }}
          >
            {lang === "sw" ? "Hatua tatu. Ndio yote." : "Three steps. That's it."}
          </h2>
        </div>

        <ol
          className="steps-grid"
          style={{ padding: 0, margin: 0, listStyle: "none" }}
        >
          {steps.map((s, i) => (
            <li
              key={i}
              style={{
                position: "relative",
                paddingTop: 36,
                borderTop: "1px solid rgba(255,255,255,0.18)",
              }}
            >
              <div
                className="display tabular"
                style={{
                  position: "absolute",
                  top: -22,
                  left: 0,
                  fontSize: 48,
                  color: "var(--brick)",
                  background: "var(--ink)",
                  paddingRight: 12,
                }}
              >
                0{i + 1}
              </div>
              <h3
                className="display"
                style={{ fontSize: 26, lineHeight: 1.05, marginBottom: 12 }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.7)",
                  margin: 0,
                  maxWidth: 320,
                }}
              >
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ─── 4. PLANS — simplified, recommendation-led ─── */
function Plans({ soft, lang }: { soft: boolean; lang: "sw" | "en" }) {
  const plans: {
    tier: string;
    price: string;
    line: string;
    bullets: string[];
    popular?: boolean;
    dark?: boolean;
    badge: string;
  }[] = [
    {
      tier: "BRONZE",
      price: "350",
      line: lang === "sw" ? "Wewe pekee yako" : "Just you",
      bullets:
        lang === "sw"
          ? ["Ajali — kifo TSh 5M", "Ulemavu TSh 2.5M", "Hospitali TSh 1M"]
          : ["Accidental death TSh 5M", "Disability TSh 2.5M", "Hospital lump TSh 1M"],
      badge: "var(--ink)",
    },
    {
      tier: "SILVER",
      price: "920",
      line: lang === "sw" ? "Wewe + mke + mtoto" : "You + spouse + 1 child",
      bullets:
        lang === "sw"
          ? ["Yote ya Bronze", "Mazishi TSh 2M", "Hospitali TSh 1.5M"]
          : ["Everything in Bronze", "Funeral TSh 2M", "Hospital lump TSh 1.5M"],
      popular: true,
      badge: "var(--brick)",
    },
    {
      tier: "GOLD",
      price: "2,070",
      line: lang === "sw" ? "Familia + hospital cash" : "Family + hospital cash",
      bullets:
        lang === "sw"
          ? ["Yote ya Silver", "Hospital Cash TSh 15k × 5 siku", "Mazishi TSh 3M"]
          : ["Everything in Silver", "Hospital Cash TSh 15k × 5 days", "Funeral TSh 3M"],
      badge: "var(--gold)",
    },
    {
      tier: "CAPTAIN",
      price: "8,080",
      line: lang === "sw" ? "Familia 5 + kipaumbele" : "Family 5 + priority claims",
      bullets:
        lang === "sw"
          ? ["Hadi watu 5", "Hospital Cash TSh 25k × 10", "Magonjwa makubwa TSh 5M"]
          : ["Up to 5 family", "Hospital Cash TSh 25k × 10", "Critical illness TSh 5M"],
      dark: true,
      badge: "var(--gold)",
    },
  ];

  return (
    <section
      id="plans"
      className="web-padding"
      style={{ padding: "120px 56px", maxWidth: 1100, margin: "0 auto" }}
    >
      <div style={{ maxWidth: 640, marginBottom: 56 }}>
        <div
          className="eyebrow"
          style={{ color: "var(--brick)", marginBottom: 16 }}
        >
          {lang === "sw" ? "CHAGUA KINGA" : "PICK YOUR PROTECTION"}
        </div>
        <h2
          className="display"
          style={{
            fontSize: "clamp(40px, 5.5vw, 64px)",
            lineHeight: 0.95,
            marginBottom: 18,
          }}
        >
          {lang === "sw" ? "Anza kidogo. Kua nasi." : "Start small. Grow with us."}
        </h2>
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.55,
            color: "var(--muted)",
            margin: 0,
            maxWidth: 540,
          }}
        >
          {lang === "sw"
            ? "Una pikipiki au gari? Tunaweka Boda Shield au Gari TPL juu ya kinga yako ya familia."
            : "Got a motorbike or car? Add Boda Shield or Gari TPL on top of your family cover."}
        </p>
      </div>

      <div
        className="web-plan-grid"
        style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}
      >
        {plans.map((p, i) => (
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
                  padding: "4px 10px",
                  background: "var(--gold)",
                  color: "var(--ink)",
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  borderRadius: soft ? 999 : 0,
                }}
              >
                {lang === "sw" ? "PENDEKEZO LETU" : "WE RECOMMEND"}
              </div>
            )}
            <div style={{ height: 5, background: p.badge }} />
            <div style={{ padding: "26px 22px 22px" }}>
              <div className="display" style={{ fontSize: 26, marginBottom: 6 }}>
                {p.tier}
              </div>
              <div
                style={{
                  fontSize: 12.5,
                  color: p.dark ? "rgba(255,255,255,0.6)" : "var(--muted)",
                  marginBottom: 22,
                  lineHeight: 1.4,
                }}
              >
                {p.line}
              </div>
              <div className="row" style={{ alignItems: "baseline", gap: 4, marginBottom: 22 }}>
                <div
                  style={{
                    fontSize: 12,
                    color: p.dark ? "rgba(255,255,255,0.6)" : "var(--muted)",
                  }}
                >
                  TSh
                </div>
                <div
                  className="display tabular"
                  style={{
                    fontSize: 40,
                    color: p.dark ? "var(--gold)" : "var(--brick)",
                  }}
                >
                  {p.price}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: p.dark ? "rgba(255,255,255,0.55)" : "var(--muted)",
                  }}
                >
                  /{lang === "sw" ? "wiki" : "wk"}
                </div>
              </div>
              <ul
                className="col gap-10"
                style={{
                  marginBottom: 24,
                  fontSize: 13.5,
                  padding: 0,
                  listStyle: "none",
                  lineHeight: 1.4,
                }}
              >
                {p.bullets.map((b, j) => (
                  <li
                    key={j}
                    className="row gap-8"
                    style={{ alignItems: "flex-start" }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke={p.dark ? "var(--gold)" : "var(--brick)"}
                      strokeWidth="2"
                      style={{ marginTop: 4, flexShrink: 0 }}
                    >
                      <path d="M2 6l3 3 5-6" />
                    </svg>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <Link href="/onboarding/splash">
                <button
                  className="btn btn-primary"
                  style={{ fontSize: 13, padding: "13px 18px", fontWeight: 600 }}
                >
                  <span>{lang === "sw" ? "Chagua hii" : "Choose this"}</span>
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 48,
          padding: "24px 28px",
          background: "var(--paper-2)",
          borderRadius: soft ? 16 : 2,
          borderLeft: soft ? 0 : "3px solid var(--brick)",
        }}
      >
        <div className="row between" style={{ flexWrap: "wrap", gap: 14 }}>
          <div className="row gap-16">
            <div style={{ fontSize: 32 }}>🏍️</div>
            <div>
              <div
                className="display"
                style={{ fontSize: 20, marginBottom: 4, lineHeight: 1.1 }}
              >
                {lang === "sw"
                  ? "Una pikipiki? Ongeza Boda Shield."
                  : "On two wheels? Add Boda Shield."}
              </div>
              <div style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.5 }}>
                {lang === "sw"
                  ? "TPL inakidhi sheria — TSh 920 kwa wiki. Cover note ya QR kwa ukaguzi wa barabarani."
                  : "Statutory TPL — TSh 920 a week. QR cover note for roadside checks."}
              </div>
            </div>
          </div>
          <Link href="/onboarding/splash">
            <button
              className="btn btn-ghost btn-auto"
              style={{ padding: "12px 22px", fontSize: 13 }}
            >
              {lang === "sw" ? "Jifunze zaidi" : "Learn more"}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── 5. FAN STORY — a real quote ─── */
function FanStory() {
  const { lang } = useApp();
  return (
    <section
      className="web-padding"
      style={{
        background: "var(--paper-2)",
        padding: "120px 56px",
      }}
    >
      <div
        style={{
          maxWidth: 880,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div
          className="eyebrow"
          style={{ color: "var(--brick)", marginBottom: 22 }}
        >
          {lang === "sw" ? "MSHABIKI ANAONGEA" : "A FAN'S STORY"}
        </div>
        <blockquote
          className="display"
          style={{
            fontSize: "clamp(28px, 4vw, 44px)",
            lineHeight: 1.12,
            color: "var(--ink)",
            margin: "0 0 32px",
            fontStyle: "normal",
            letterSpacing: "0.01em",
          }}
        >
          {lang === "sw"
            ? `"Boda Shield ililipa TSh 850,000 siku iliyofuata baada ya ajali yangu. Hakuna mtu aliuliza maswali magumu — niliwapelekea picha tu."`
            : `"Boda Shield paid me TSh 850,000 the day after my accident. Nobody asked hard questions — I just sent them photos."`}
        </blockquote>
        <div
          className="row gap-14"
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              overflow: "hidden",
              border: "2px solid var(--brick)",
            }}
          >
            <Photo src={PHOTO.portrait} h={56} tone="dark" />
          </div>
          <div className="col" style={{ alignItems: "flex-start" }}>
            <div
              className="display"
              style={{ fontSize: 15, letterSpacing: "0.04em" }}
            >
              JOHN MWAKASEGE
            </div>
            <div
              className="eyebrow"
              style={{ fontSize: 10, color: "var(--muted)" }}
            >
              DAR ES SALAAM · BODA RIDER
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 6. RIDER REALITY ─── */
function RiderReality({ soft, lang }: { soft: boolean; lang: "sw" | "en" }) {
  return (
    <section
      style={{
        background: "var(--ink)",
        color: "#fff",
        padding: "100px 56px",
        position: "relative",
        overflow: "hidden",
      }}
      className="web-padding"
    >
      <div style={{ position: "absolute", inset: 0, opacity: 0.16 }}>
        <Photo src={PHOTO.boda} h="100%" tone="dark" />
      </div>
      <div
        className="web-rider-grid"
        style={{
          position: "relative",
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "center",
        }}
      >
        <div>
          <div className="eyebrow" style={{ color: "var(--gold)", marginBottom: 14 }}>
            {lang === "sw" ? "MSHABIKI RIDER" : "BUILT FOR THE RIDER"}
          </div>
          <h2
            className="display"
            style={{
              fontSize: "clamp(40px, 5vw, 56px)",
              lineHeight: 0.95,
              marginBottom: 22,
            }}
          >
            {lang === "sw"
              ? "Kwa mpanda boda — barabara ni yetu."
              : "For the rider — the road is ours."}
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.78)",
              lineHeight: 1.6,
              maxWidth: 460,
              margin: 0,
            }}
          >
            {lang === "sw"
              ? "47% ya vifo barabarani Tanzania ni pikipiki. Tumeunda Boda Shield kwa hili: cover note ya QR, madai kwa picha, na malipo ndani ya saa 24."
              : "47% of road fatalities in Tanzania involve motorcycles. Boda Shield is built for that reality — QR cover note, photo-first claims, 24-hour payouts."}
          </p>
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
                minWidth: 130,
                padding: "26px 20px",
                background: "rgba(255,255,255,0.06)",
                borderRadius: soft ? 14 : 0,
                borderTop: "2px solid var(--brick)",
              }}
            >
              <div className="display tabular" style={{ fontSize: 44 }}>{s.v}</div>
              <div
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.6)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginTop: 8,
                }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 7. FINAL CTA ─── */
function FinalCTA() {
  const { lang } = useApp();
  return (
    <section
      className="web-padding"
      style={{
        background: "var(--brick)",
        color: "#fff",
        padding: "120px 56px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="diag" style={{ position: "absolute", inset: 0 }} />
      <div
        style={{
          position: "relative",
          maxWidth: 880,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div
          className="eyebrow"
          style={{ color: "var(--gold)", marginBottom: 18 }}
        >
          {lang === "sw" ? "TAYARI?" : "READY?"}
        </div>
        <h2
          className="display"
          style={{
            fontSize: "clamp(44px, 6.5vw, 80px)",
            lineHeight: 0.95,
            marginBottom: 22,
          }}
        >
          {lang === "sw"
            ? "Jiunge na Mshabiki Wengi."
            : "Join the 12th Man."}
        </h2>
        <p
          style={{
            fontSize: 17,
            lineHeight: 1.55,
            color: "rgba(255,255,255,0.85)",
            marginBottom: 36,
            maxWidth: 540,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {lang === "sw"
            ? "TSh 350 itakulinda wiki nzima. Onboarding inachukua dakika 2."
            : "TSh 350 covers you for a week. Onboarding takes 2 minutes."}
        </p>
        <Link href="/onboarding/splash">
          <button
            className="btn btn-display btn-auto"
            style={{
              padding: "20px 36px",
              fontSize: 18,
              background: "var(--ink)",
              color: "#fff",
            }}
          >
            <span>
              {lang === "sw" ? "Anza kwa TSh 350 / wiki" : "Start at TSh 350/wk"}
            </span>
          </button>
        </Link>
      </div>
    </section>
  );
}

/* ─── 8. FOOTER ─── */
function Footer({
  lang,
  lionDensity,
}: {
  lang: "sw" | "en";
  lionDensity: "restrained" | "moderate" | "expressive";
}) {
  return (
    <footer
      className="web-padding"
      id="footer"
      style={{ padding: "56px", maxWidth: 1100, margin: "0 auto" }}
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
              fontSize: 12.5,
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
  );
}
