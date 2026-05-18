"use client";

import { useRouter } from "next/navigation";
import {
  LionMark,
  StatusBar,
  BottomNav,
  Photo,
} from "@/components/ds";
import { useApp } from "@/lib/AppState";
import { t, PHOTO } from "@/lib/copy";
import { FakeQR } from "@/components/FakeQR";

export default function ProfilePage() {
  const router = useRouter();
  const { lang, lionDensity, name, phone, nida, vehicle, fanId, resetAll } = useApp();
  const firstName = name.split(" ")[0];

  const sections: { id: string; icon: string; label: string; count: string; sub: string }[] = [
    {
      id: "dep",
      icon: "👥",
      label: t(lang, "dependents"),
      count: "2",
      sub: lang === "sw" ? "Mke + 1 mtoto" : "Spouse + 1 child",
    },
    {
      id: "veh",
      icon: "🏍️",
      label: t(lang, "vehicles"),
      count: vehicle ? "1" : "0",
      sub: vehicle ? `${vehicle.reg} · ${vehicle.make}` : "—",
    },
    {
      id: "doc",
      icon: "📄",
      label: t(lang, "documents"),
      count: "4",
      sub: lang === "sw" ? "Hati & madai" : "Cover notes & claims",
    },
  ];

  return (
    <div className="phone-stage">
      <div className="phone">
        <StatusBar />
        <div className="scroll-area">
          <div className="px-22" style={{ paddingTop: 6 }}>
            <div className="row between" style={{ marginBottom: 18 }}>
              <div className="row gap-8">
                <LionMark size={22} color="var(--brick)" density={lionDensity} />
                <div
                  className="display"
                  style={{ fontSize: 14, letterSpacing: "0.06em" }}
                >
                  {t(lang, "profile").toUpperCase()}
                </div>
              </div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 01-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 010-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 014 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 010 4h-.1a1.7 1.7 0 00-1.5 1z" />
              </svg>
            </div>

            <div
              style={{
                background: "var(--ink)",
                color: "#fff",
                marginBottom: 14,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div className="flag-stripe" style={{ height: 3 }} />
              <div className="row" style={{ padding: 14, gap: 14 }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    position: "relative",
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <Photo src={PHOTO.portrait} h={64} tone="dark" />
                </div>
                <div className="col grow">
                  <div
                    className="eyebrow"
                    style={{
                      fontSize: 9,
                      color: "var(--gold)",
                      marginBottom: 2,
                    }}
                  >
                    MSHABIKI #{fanId}
                  </div>
                  <div className="display" style={{ fontSize: 18, lineHeight: 1 }}>
                    {name.toUpperCase()}
                  </div>
                  <div
                    className="tabular"
                    style={{
                      fontSize: 11,
                      color: "rgba(255,255,255,0.6)",
                      marginTop: 4,
                    }}
                  >
                    {phone}
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  borderTop: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                {[
                  { l: lang === "sw" ? "Tangu" : "Since", v: "Mar 25" },
                  { l: lang === "sw" ? "Madai" : "Claims", v: "1" },
                  { l: lang === "sw" ? "Marafiki" : "Referrals", v: "3" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="col"
                    style={{
                      padding: "10px 12px",
                      alignItems: "center",
                      borderRight: i < 2 ? "1px solid rgba(255,255,255,0.15)" : 0,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 9,
                        color: "rgba(255,255,255,0.55)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {s.l.toUpperCase()}
                    </div>
                    <div
                      className="display tabular"
                      style={{ fontSize: 18, color: "var(--gold)", marginTop: 2 }}
                    >
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="row between"
              style={{
                padding: "10px 14px",
                background: "rgba(27,107,58,0.10)",
                marginBottom: 14,
                borderLeft: "3px solid var(--pitch)",
              }}
            >
              <div className="col">
                <div
                  className="eyebrow"
                  style={{ fontSize: 9, color: "var(--pitch)" }}
                >
                  {t(lang, "nida_status").toUpperCase()}
                </div>
                <div
                  className="display tabular"
                  style={{ fontSize: 13, marginTop: 2 }}
                >
                  {nida.slice(0, 14)}
                </div>
              </div>
              <div className="chip pitch">● {t(lang, "verified").toUpperCase()}</div>
            </div>

            <div className="eyebrow" style={{ marginBottom: 10 }}>
              {t(lang, "cover_note")} · QR
            </div>
            <div
              className="row"
              style={{
                background: "var(--white)",
                border: "1px solid var(--line)",
                padding: 14,
                gap: 14,
                marginBottom: 16,
              }}
            >
              <div style={{ position: "relative" }}>
                <FakeQR size={96} />
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    width: 20,
                    height: 20,
                    background: "var(--brick)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <LionMark size={14} color="#fff" />
                </div>
              </div>
              <div className="col grow gap-4">
                <div className="eyebrow" style={{ fontSize: 9 }}>
                  BODA SHIELD · {vehicle?.reg ?? "—"}
                </div>
                <div style={{ fontSize: 11, color: "var(--ink-2)", lineHeight: 1.4 }}>
                  {t(lang, "verify_at_roadside")}
                </div>
                <div className="row gap-6" style={{ marginTop: 4 }}>
                  <div className="chip dark" style={{ fontSize: 9 }}>
                    TIRA · MVIS
                  </div>
                  <div className="chip pitch" style={{ fontSize: 9 }}>
                    ● ACTIVE
                  </div>
                </div>
              </div>
            </div>

            {sections.map((r) => (
              <div
                key={r.id}
                className="row between"
                style={{
                  padding: "13px 14px",
                  background: "var(--white)",
                  borderTop: "1px solid var(--line)",
                  borderBottom: "1px solid var(--line)",
                  marginBottom: -1,
                }}
              >
                <div className="row gap-12">
                  <div style={{ fontSize: 18, width: 24, textAlign: "center" }}>
                    {r.icon}
                  </div>
                  <div className="col">
                    <div
                      className="display"
                      style={{ fontSize: 14, letterSpacing: "0.02em" }}
                    >
                      {r.label.toUpperCase()}
                    </div>
                    <div
                      style={{ fontSize: 11, color: "var(--muted)", marginTop: 1 }}
                    >
                      {r.sub}
                    </div>
                  </div>
                </div>
                <div className="row gap-10">
                  <div
                    className="display tabular"
                    style={{ fontSize: 18, color: "var(--brick)" }}
                  >
                    {r.count}
                  </div>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--muted)"
                    strokeWidth="2"
                  >
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </div>
              </div>
            ))}

            <div style={{ marginTop: 18, marginBottom: 14 }}>
              <button
                className="btn btn-ghost"
                style={{ borderColor: "var(--brick)", color: "var(--brick)" }}
                onClick={() => {
                  resetAll();
                  router.push("/onboarding/splash");
                }}
              >
                {t(lang, "logout")}
              </button>
            </div>

            <div className="compliance" style={{ paddingLeft: 0, paddingRight: 0 }}>
              {t(lang, "underwriter")}
              <br />
              {t(lang, "tira_no")}
            </div>
          </div>
        </div>
        <BottomNav active="more" lang={lang} />
      </div>
    </div>
  );
}
