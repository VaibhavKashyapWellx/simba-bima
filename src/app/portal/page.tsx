"use client";

import Link from "next/link";
import {
  LionMark,
  Wordmark,
  Photo,
  LangPill,
} from "@/components/ds";
import { useApp } from "@/lib/AppState";
import { t, fmtTSh, PHOTO } from "@/lib/copy";
import { FakeQR } from "@/components/FakeQR";
import { useState } from "react";

export default function PortalPage() {
  const { lang, lionDensity, aesthetic, name, phone, weeklyPremium, referralCode, invited, signedUp } =
    useApp();
  const [copied, setCopied] = useState(false);
  const soft = aesthetic === "soft";
  const firstName = name.split(" ")[0];

  return (
    <div
      className="web-shell web-grid-portal"
      style={{
        minHeight: "100dvh",
        background: "var(--paper)",
        color: "var(--ink)",
        display: "grid",
        gridTemplateColumns: "240px 1fr",
      }}
    >
      <aside
        className="web-sidenav"
        style={{
          background: "var(--ink)",
          color: "rgba(255,255,255,0.7)",
          padding: "26px 0",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="row gap-10" style={{ padding: "0 22px 28px" }}>
          <LionMark size={22} color="var(--brick)" density="restrained" />
          <Wordmark color="#FFF" size={13} />
        </div>
        {[
          { l: lang === "sw" ? "Dashibodi" : "Dashboard", active: true, icon: "▦", href: "/portal" },
          { l: lang === "sw" ? "Kinga zangu" : "My cover", icon: "🛡", href: "/app/tiers" },
          { l: lang === "sw" ? "Madai" : "Claims", icon: "📋", badge: "1", href: "/app/claims/status" },
          { l: lang === "sw" ? "Wallet" : "Wallet", icon: "💳", href: "/app/wallet" },
          { l: lang === "sw" ? "Marafiki" : "Referrals", icon: "👥", href: "#" },
          { l: lang === "sw" ? "Hati" : "Documents", icon: "📄", href: "/app/profile" },
        ].map((it, i) => (
          <Link
            href={it.href}
            key={i}
            className="row between"
            style={{
              padding: "13px 22px",
              background: it.active ? "var(--brick)" : "transparent",
              color: it.active ? "#fff" : "rgba(255,255,255,0.7)",
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            <div className="row gap-12">
              <span style={{ width: 18, opacity: 0.8 }}>{it.icon}</span>
              <span>{it.l}</span>
            </div>
            {it.badge && (
              <div
                style={{
                  background: "var(--gold)",
                  color: "var(--ink)",
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "2px 8px",
                  borderRadius: 999,
                }}
              >
                {it.badge}
              </div>
            )}
          </Link>
        ))}
        <div style={{ marginTop: "auto", padding: "20px 22px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <div className="row gap-10">
            <div style={{ width: 32, height: 32, borderRadius: soft ? 16 : 2, overflow: "hidden" }}>
              <Photo src={PHOTO.portrait} h={32} tone="dark" />
            </div>
            <div className="col">
              <div style={{ fontSize: 12, color: "#fff", fontWeight: 600 }}>{name}</div>
              <div className="tabular" style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>
                {phone}
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div className="col">
        <div
          className="row between"
          style={{
            padding: "20px 40px",
            borderBottom: "1px solid var(--line)",
            background: "var(--paper)",
            flexWrap: "wrap",
            gap: 14,
          }}
        >
          <div>
            <div className="eyebrow" style={{ color: "var(--muted)" }}>
              {lang === "sw" ? "KARIBU TENA" : "WELCOME BACK"} · MSHABIKI #4287
            </div>
            <div className="display" style={{ fontSize: 28, marginTop: 4 }}>
              {lang === "sw" ? `Habari, ${firstName}.` : `Hello, ${firstName}.`}
            </div>
          </div>
          <div className="row gap-12">
            <LangPill />
            <Link href="/app/claims">
              <button
                className="btn btn-primary btn-auto"
                style={{ padding: "11px 20px", fontSize: 13, fontWeight: 600 }}
              >
                <span>{lang === "sw" ? "Weka madai" : "File a claim"}</span>
              </button>
            </Link>
          </div>
        </div>

        <div
          className="web-portal-content"
          style={{
            padding: "32px 40px",
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: 24,
          }}
        >
          <div className="col gap-20">
            <div
              style={{
                background: "var(--ink)",
                color: "#fff",
                padding: 0,
                borderRadius: soft ? 18 : 2,
                overflow: "hidden",
                position: "relative",
              }}
            >
              {!soft && <div className="flag-stripe" style={{ height: 3 }} />}
              {soft && <div style={{ height: 4, background: "var(--brick)" }} />}
              <div style={{ padding: "26px 28px", position: "relative" }}>
                <div style={{ position: "absolute", right: -40, top: -20, opacity: 0.08 }}>
                  <LionMark size={220} color="var(--brick)" density={lionDensity} />
                </div>
                <div className="row between" style={{ marginBottom: 18 }}>
                  <div className="eyebrow" style={{ color: "var(--gold)" }}>
                    {lang === "sw" ? "KINGA HAI" : "ACTIVE COVER"}
                  </div>
                  <div
                    className="chip pitch"
                    style={{ background: "rgba(78,153,104,0.2)", color: "var(--pitch-2)" }}
                  >
                    ● {lang === "sw" ? "INALINDA" : "PROTECTED"}
                  </div>
                </div>
                <div className="row gap-32" style={{ flexWrap: "wrap" }}>
                  <div className="col">
                    <div className="display" style={{ fontSize: 38, marginBottom: 4 }}>
                      BRONZE + BODA
                    </div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
                      {lang === "sw"
                        ? "Kinga ya msingi + nyongeza ya pikipiki"
                        : "Base cover + motor add-on"}
                    </div>
                  </div>
                  <div className="col" style={{ alignItems: "flex-end" }}>
                    <div
                      style={{
                        fontSize: 11,
                        color: "rgba(255,255,255,0.6)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {lang === "sw" ? "WIKI HII" : "THIS WEEK"}
                    </div>
                    <div className="display tabular" style={{ fontSize: 32, marginTop: 4 }}>
                      TSh {fmtTSh(weeklyPremium)}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    marginTop: 18,
                    paddingTop: 18,
                    borderTop: "1px solid rgba(255,255,255,0.12)",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: 24,
                  }}
                >
                  {[
                    { l: lang === "sw" ? "Inakomeshwa" : "Renews", v: "Sat 18 May", c: "#fff" },
                    { l: lang === "sw" ? "Cover note" : "Cover note", v: "T 426 ACX", c: "var(--gold)" },
                    { l: lang === "sw" ? "Madai mwaka huu" : "Claims YTD", v: "1 · paid", c: "var(--pitch-2)" },
                  ].map((s, i) => (
                    <div key={i} className="col">
                      <div
                        style={{
                          fontSize: 10,
                          color: "rgba(255,255,255,0.5)",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                        }}
                      >
                        {s.l}
                      </div>
                      <div
                        className="display tabular"
                        style={{ fontSize: 18, color: s.c, marginTop: 4 }}
                      >
                        {s.v}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              style={{
                background: "var(--white)",
                border: "1px solid var(--line)",
                borderRadius: soft ? 16 : 2,
                padding: 0,
                overflow: "hidden",
              }}
            >
              <div
                className="row between"
                style={{ padding: "14px 22px", borderBottom: "1px solid var(--line)" }}
              >
                <div className="eyebrow">
                  {lang === "sw" ? "SIKU YA MECHI" : "MATCH DAY"}
                </div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>
                  Premier League · Wk 28
                </div>
              </div>
              <div className="row" style={{ padding: "22px 22px" }}>
                <div className="col" style={{ flex: 1, alignItems: "center" }}>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      background: "var(--brick)",
                      color: "#fff",
                      borderRadius: soft ? 14 : 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <LionMark size={34} color="#fff" density="moderate" />
                  </div>
                  <div className="display" style={{ fontSize: 14, marginTop: 8 }}>
                    SIMBA
                  </div>
                </div>
                <div className="col" style={{ alignItems: "center" }}>
                  <div className="display tabular" style={{ fontSize: 32 }}>
                    VS
                  </div>
                  <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>
                    Sat · 16:00 · Benjamin Mkapa
                  </div>
                </div>
                <div className="col" style={{ flex: 1, alignItems: "center" }}>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      background: "var(--paper-2)",
                      color: "var(--ink)",
                      borderRadius: soft ? 14 : 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid var(--line)",
                      fontFamily: "var(--display)",
                      fontSize: 22,
                    }}
                  >
                    YA
                  </div>
                  <div className="display" style={{ fontSize: 14, marginTop: 8 }}>
                    YANGA
                  </div>
                </div>
              </div>
              <div
                style={{
                  padding: "12px 22px",
                  background: "var(--paper-2)",
                  fontSize: 12,
                  color: "var(--muted)",
                  textAlign: "center",
                }}
              >
                🏆{" "}
                {lang === "sw"
                  ? "Simba ikishinda, Gold/Captain mnapata punguzo wiki ijayo."
                  : "If Simba wins, Gold/Captain get a discount next week."}
              </div>
            </div>

            <div
              style={{
                background: "var(--white)",
                border: "1px solid var(--line)",
                borderRadius: soft ? 16 : 2,
              }}
            >
              <div
                className="row between"
                style={{ padding: "14px 22px", borderBottom: "1px solid var(--line)" }}
              >
                <div className="eyebrow">
                  {lang === "sw" ? "SHUGHULI ZA HIVI KARIBUNI" : "RECENT ACTIVITY"}
                </div>
                <Link
                  href="/app/wallet"
                  style={{ fontSize: 11, color: "var(--brick)", fontWeight: 600 }}
                >
                  {lang === "sw" ? "Yote" : "View all"}
                </Link>
              </div>
              {[
                {
                  icon: "🏍️",
                  l: lang === "sw" ? "Madai #088421 yamelipwa" : "Claim #088421 paid",
                  d: "Mon 13 May",
                  amt: "+ TSh 850,000",
                  c: "var(--pitch)",
                },
                {
                  icon: "💳",
                  l: lang === "sw" ? "Malipo ya wiki — M-Pesa" : "Weekly premium — M-Pesa",
                  d: "Sat 11 May",
                  amt: "− TSh 1,270",
                  c: "var(--muted)",
                },
                {
                  icon: "🛡",
                  l: lang === "sw" ? "Boda Shield iliongezwa" : "Boda Shield added",
                  d: "Fri 03 May",
                  amt: "T 426 ACX",
                  c: "var(--ink-2)",
                },
              ].map((a, i) => (
                <div
                  key={i}
                  className="row between"
                  style={{
                    padding: "14px 22px",
                    borderBottom: i < 2 ? "1px solid var(--line)" : 0,
                  }}
                >
                  <div className="row gap-14">
                    <div style={{ fontSize: 20 }}>{a.icon}</div>
                    <div className="col">
                      <div style={{ fontSize: 13.5, fontWeight: 500 }}>{a.l}</div>
                      <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>
                        {a.d}
                      </div>
                    </div>
                  </div>
                  <div
                    className="display tabular"
                    style={{ fontSize: 14, color: a.c }}
                  >
                    {a.amt}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col gap-20">
            <div
              style={{
                background: "var(--white)",
                border: "1px solid var(--line)",
                borderRadius: soft ? 16 : 2,
                padding: 0,
                overflow: "hidden",
              }}
            >
              <div style={{ padding: "14px 18px", background: "var(--brick)", color: "#fff" }}>
                <div className="eyebrow" style={{ color: "rgba(255,255,255,0.85)" }}>
                  COVER NOTE · BODA SHIELD
                </div>
                <div className="display tabular" style={{ fontSize: 18, marginTop: 4 }}>
                  T 426 ACX
                </div>
              </div>
              <div style={{ padding: 18, display: "flex", justifyContent: "center" }}>
                <div style={{ position: "relative" }}>
                  <FakeQR size={156} />
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%,-50%)",
                      width: 28,
                      height: 28,
                      background: "var(--brick)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <LionMark size={20} color="#fff" />
                  </div>
                </div>
              </div>
              <div
                style={{
                  padding: "0 18px 16px",
                  textAlign: "center",
                  fontSize: 11,
                  color: "var(--muted)",
                }}
              >
                {lang === "sw" ? "Onyesha kwa askari · TIRA MVIS" : "Show at roadside · TIRA MVIS"}
              </div>
              <div
                style={{
                  padding: "10px 18px",
                  borderTop: "1px solid var(--line)",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                }}
              >
                <button
                  style={{
                    background: "transparent",
                    border: 0,
                    fontSize: 12,
                    fontWeight: 600,
                    color: "var(--brick)",
                    cursor: "pointer",
                  }}
                >
                  {lang === "sw" ? "Pakua" : "Download"}
                </button>
                <button
                  style={{
                    background: "transparent",
                    border: 0,
                    fontSize: 12,
                    fontWeight: 600,
                    color: "var(--pitch)",
                    cursor: "pointer",
                  }}
                >
                  {lang === "sw" ? "WhatsApp" : "Share"}
                </button>
              </div>
            </div>

            <div
              style={{
                background: "var(--gold)",
                color: "var(--ink)",
                borderRadius: soft ? 16 : 2,
                padding: "22px 22px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", right: -30, bottom: -30, opacity: 0.15 }}>
                <LionMark size={140} color="var(--ink)" density="moderate" />
              </div>
              <div className="eyebrow" style={{ color: "var(--gold-deep)", marginBottom: 8 }}>
                12TH MAN · MSHABIKI
              </div>
              <div className="display" style={{ fontSize: 22, lineHeight: 1, marginBottom: 8 }}>
                {lang === "sw"
                  ? "Karibisha mshabiki, pata wiki bure."
                  : "Refer a fan, get a free week."}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--ink-2)",
                  marginBottom: 14,
                  position: "relative",
                }}
              >
                {lang === "sw"
                  ? `Umealika ${invited} · ${signedUp} amejisajili. Wiki ${invited - signedUp} bure zinangoja.`
                  : `Invited ${invited} · ${signedUp} signed up. ${invited - signedUp} free weeks waiting.`}
              </div>
              <button
                onClick={async () => {
                  try {
                    await navigator.clipboard?.writeText(referralCode);
                  } catch {}
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1400);
                }}
                className="row between"
                style={{
                  position: "relative",
                  padding: "10px 14px",
                  background: "rgba(0,0,0,0.08)",
                  borderRadius: soft ? 10 : 0,
                  border: 0,
                  width: "100%",
                  cursor: "pointer",
                }}
              >
                <span
                  className="tabular"
                  style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.08em" }}
                >
                  {referralCode}
                </span>
                <span style={{ fontSize: 11, fontWeight: 600 }}>
                  {copied
                    ? lang === "sw"
                      ? "IMENAKILIWA ✓"
                      : "COPIED ✓"
                    : lang === "sw"
                    ? "NAKILI"
                    : "COPY"}
                </span>
              </button>
            </div>

            <div className="compliance" style={{ paddingLeft: 0, paddingRight: 0, textAlign: "left" }}>
              {t(lang, "underwriter")}
              <br />
              {t(lang, "tira_no")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
