"use client";

import { useRouter } from "next/navigation";
import { LionMark, StatusBar, Photo } from "@/components/ds";
import { useApp } from "@/lib/AppState";
import { t, PHOTO } from "@/lib/copy";

export default function ValuePropPage() {
  const router = useRouter();
  const { lang, lionDensity } = useApp();

  const promises: { icon: string; title: string; body: string }[] = [
    {
      icon: "💸",
      title:
        lang === "sw" ? "Lipa kidogo. Wiki kwa wiki." : "Pay a little. Each week.",
      body:
        lang === "sw"
          ? "Kuanzia TSh 350. Hakuna mkataba mrefu — simamisha wakati wowote."
          : "From TSh 350. No long contract — pause whenever you need to.",
    },
    {
      icon: "📸",
      title: lang === "sw" ? "Madai kwa picha." : "Claim with a photo.",
      body:
        lang === "sw"
          ? "Piga picha, eleza kifupi, tutafanya iliyobaki. Hakuna fomu za hospitali."
          : "Snap a photo, say what happened, we do the rest. No hospital paperwork.",
    },
    {
      icon: "⚡",
      title:
        lang === "sw"
          ? "Pesa M-Pesa ndani ya saa 24."
          : "Money on M-Pesa in 24 hours.",
      body:
        lang === "sw"
          ? "Madai yameidhinishwa? Pesa zinakuwa simuni mwako kabla ya kesho."
          : "Once approved, the money lands on your phone before tomorrow.",
    },
  ];

  return (
    <div className="phone-stage">
      <div className="phone">
        <StatusBar />
        <div className="scroll-area px-22" style={{ paddingTop: 8 }}>
          <div className="row between" style={{ marginBottom: 18 }}>
            <div className="row gap-8">
              <LionMark size={26} color="var(--ink)" density={lionDensity} />
              <div
                className="display"
                style={{ fontSize: 15, letterSpacing: "0.06em" }}
              >
                SIMBA · BIMA
              </div>
            </div>
            <div className="eyebrow">2 / 4</div>
          </div>

          <div className="progress-track" style={{ marginBottom: 24 }}>
            <div className="progress-fill" style={{ width: "50%" }} />
          </div>

          <div
            className="kicker"
            style={{ color: "var(--brick)", fontSize: 11, marginBottom: 14 }}
          >
            {lang === "sw" ? "AHADI YETU KWAKO" : "OUR PROMISE TO YOU"}
          </div>
          <h1
            className="display"
            style={{
              fontSize: 38,
              lineHeight: 0.95,
              marginBottom: 14,
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
                Plain language.
              </>
            )}
          </h1>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.55,
              color: "var(--muted)",
              marginBottom: 24,
              marginTop: 0,
            }}
          >
            {lang === "sw"
              ? "Tunajua kwa nini ulikuwa unaepuka bima. Sisi tumefanya jambo tofauti."
              : "We know why you've been putting off insurance. We've done the opposite."}
          </p>

          <div style={{ marginBottom: 24, position: "relative", overflow: "hidden" }}>
            <Photo
              src={PHOTO.family}
              h={220}
              label="family at home, dar es salaam"
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, transparent 50%, rgba(15,15,15,0.7) 100%)",
              }}
            />
            <div
              className="display"
              style={{
                position: "absolute",
                left: 16,
                bottom: 12,
                color: "#fff",
                fontSize: 14,
                letterSpacing: "0.05em",
              }}
            >
              {lang === "sw" ? "FAMILIA. KILA WIKI." : "FAMILY. EVERY WEEK."}
            </div>
          </div>

          <div className="col gap-14" style={{ paddingBottom: 8 }}>
            {promises.map((p, i) => (
              <article
                key={i}
                className="row gap-14"
                style={{
                  alignItems: "flex-start",
                  padding: "16px 16px",
                  background: "var(--white)",
                  border: "1px solid var(--line)",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    background: "var(--paper-2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    flexShrink: 0,
                  }}
                >
                  {p.icon}
                </div>
                <div className="col" style={{ paddingTop: 2 }}>
                  <div
                    className="display"
                    style={{
                      fontSize: 17,
                      lineHeight: 1.1,
                      letterSpacing: "0.02em",
                      marginBottom: 6,
                    }}
                  >
                    {p.title}
                  </div>
                  <div
                    style={{
                      fontSize: 12.5,
                      color: "var(--muted)",
                      lineHeight: 1.5,
                    }}
                  >
                    {p.body}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div
            style={{
              marginTop: 22,
              padding: "12px 14px",
              background: "rgba(27,107,58,0.10)",
              borderLeft: "3px solid var(--pitch)",
              fontSize: 11.5,
              color: "var(--ink-2)",
              lineHeight: 1.5,
            }}
          >
            <span style={{ fontWeight: 700, color: "var(--pitch)" }}>
              {lang === "sw" ? "TIRA · MO ASSURANCE" : "TIRA · MO ASSURANCE"}
            </span>{" "}
            ·{" "}
            {lang === "sw"
              ? "Tunashika hatari, MO Assurance inalipa, na TIRA inadhibiti."
              : "We hold the risk, MO Assurance pays the claim, TIRA regulates the lot."}
          </div>

          <div style={{ height: 20 }} />
        </div>

        <div
          className="px-22"
          style={{
            paddingTop: 12,
            paddingBottom: 22,
            background: "var(--paper)",
            borderTop: "1px solid var(--line)",
          }}
        >
          <button
            className="btn btn-primary btn-display"
            onClick={() => router.push("/onboarding/rider")}
          >
            <span>{t(lang, "continue")}</span>
          </button>
          <div
            style={{
              textAlign: "center",
              fontSize: 11,
              color: "var(--muted)",
              marginTop: 8,
            }}
          >
            {lang === "sw" ? "Hatua moja ya dakika 2 imebaki" : "One 2-minute step to go"}
          </div>
        </div>
      </div>
    </div>
  );
}
