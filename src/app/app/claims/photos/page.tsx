"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { StatusBar } from "@/components/ds";
import { useApp } from "@/lib/AppState";
import { t } from "@/lib/copy";

export default function ClaimsPhotosPage() {
  const router = useRouter();
  const { lang, claimDraft, setClaimMeta, finalizeClaim } = useApp();
  const [photoCount, setPhotoCount] = useState(claimDraft.photos);
  const [recording, setRecording] = useState(false);
  const [voiceSec, setVoiceSec] = useState(claimDraft.voiceSeconds);

  const labels = ["scene", "bike", "injury", "doc", "extra", "extra"];

  const onSubmit = () => {
    setClaimMeta({ photos: photoCount, voiceSeconds: voiceSec });
    finalizeClaim();
    router.push("/app/claims/status");
  };

  return (
    <div className="phone-stage">
      <div className="phone">
        <StatusBar />
        <div className="scroll-area px-22" style={{ paddingTop: 6 }}>
          <div className="row between" style={{ marginBottom: 20 }}>
            <button
              onClick={() => router.back()}
              style={{
                background: "transparent",
                border: 0,
                display: "inline-flex",
                gap: 8,
                cursor: "pointer",
                padding: 0,
                color: "inherit",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 5l-7 7 7 7" />
              </svg>
              <div className="display" style={{ fontSize: 14, letterSpacing: "0.06em" }}>
                {lang === "sw" ? "AJALI YA PIKIPIKI" : "MOTORCYCLE ACCIDENT"}
              </div>
            </button>
            <div className="eyebrow tabular">2 / 3</div>
          </div>
          <div className="progress-track" style={{ marginBottom: 18 }}>
            <div className="progress-fill" style={{ width: "66%" }} />
          </div>

          <div className="display" style={{ fontSize: 26, lineHeight: 0.95, marginBottom: 4 }}>
            {t(lang, "add_photos").toUpperCase()}
          </div>
          <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 14 }}>
            {t(lang, "photos_hint")}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 6,
              marginBottom: 14,
            }}
          >
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const filled = i < photoCount;
              return (
                <button
                  key={i}
                  onClick={() => {
                    if (filled && i === photoCount - 1)
                      setPhotoCount(photoCount - 1);
                    else if (!filled) setPhotoCount(i + 1);
                  }}
                  style={{
                    aspectRatio: "1",
                    background: filled ? "var(--paper-2)" : "var(--paper)",
                    border: filled ? "1px solid var(--line)" : "1.5px dashed var(--line-2)",
                    position: "relative",
                    overflow: "hidden",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  {filled ? (
                    <div className="photo-placeholder" style={{ width: "100%", height: "100%" }}>
                      <div className="lbl">{labels[i] ?? "photo"}</div>
                    </div>
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--muted)"
                        strokeWidth="1.5"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div
            style={{
              background: "var(--white)",
              border: "1px solid var(--line)",
              padding: 12,
              marginBottom: 14,
            }}
          >
            <div className="row between" style={{ marginBottom: 8 }}>
              <div className="row gap-8">
                <button
                  onClick={() => {
                    setRecording((r) => !r);
                    if (!recording) {
                      const id = window.setInterval(() => {
                        setVoiceSec((s) => {
                          if (s >= 60) {
                            window.clearInterval(id);
                            setRecording(false);
                            return 60;
                          }
                          return s + 1;
                        });
                      }, 1000);
                    }
                  }}
                  style={{
                    width: 28,
                    height: 28,
                    background: recording ? "var(--ink)" : "var(--brick)",
                    color: "#fff",
                    border: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    {recording ? (
                      <rect x="6" y="6" width="12" height="12" />
                    ) : (
                      <path d="M12 2a3 3 0 013 3v6a3 3 0 01-6 0V5a3 3 0 013-3zM5 11a7 7 0 0014 0M12 18v3" />
                    )}
                  </svg>
                </button>
                <div className="col">
                  <div className="display" style={{ fontSize: 13, letterSpacing: "0.04em" }}>
                    {t(lang, "voice_note").toUpperCase()}
                  </div>
                  <div style={{ fontSize: 10.5, color: "var(--muted)" }}>
                    {t(lang, "voice_hint")}
                  </div>
                </div>
              </div>
              <div className="tabular" style={{ fontSize: 13, color: "var(--brick)" }}>
                {Math.floor(voiceSec / 60)}:{String(voiceSec % 60).padStart(2, "0")}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 2, height: 24 }}>
              {Array.from({ length: 38 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: 2,
                    height: 4 + Math.abs(Math.sin(i * 1.3)) * 18,
                    background:
                      i < Math.min(38, Math.round(voiceSec * 0.63))
                        ? "var(--brick)"
                        : "var(--line-2)",
                  }}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="label-up" style={{ marginBottom: 8 }}>
              {lang === "sw" ? "Mahali" : "Location"}
            </div>
            <div className="row between" style={{ padding: "10px 12px", background: "var(--paper-2)", marginBottom: 10 }}>
              <div className="row gap-8">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--brick)" strokeWidth="1.8">
                  <path d="M12 2c4 0 7 3 7 7 0 5-7 13-7 13S5 14 5 9c0-4 3-7 7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                <div style={{ fontSize: 12.5 }}>{claimDraft.gps}</div>
              </div>
              <div className="eyebrow" style={{ fontSize: 9, color: "var(--brick)" }}>● GPS</div>
            </div>
            <div className="label-up" style={{ marginBottom: 4 }}>
              {lang === "sw" ? "Tarehe & saa" : "Date & time"}
            </div>
            <div className="tabular" style={{ fontSize: 14, fontWeight: 500, marginBottom: 14 }}>
              {claimDraft.datetime}
            </div>
          </div>
          <div style={{ height: 20 }} />
        </div>
        <div className="px-22" style={{ padding: "12px 22px 22px", borderTop: "1px solid var(--line)" }}>
          <button className="btn btn-primary btn-display" onClick={onSubmit}>
            <span>{t(lang, "submit_claim")}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
