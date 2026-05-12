"use client";

import { useRouter } from "next/navigation";
import { LionMark, StatusBar, Photo } from "@/components/ds";
import { useApp, type Segment } from "@/lib/AppState";
import { t, PHOTO } from "@/lib/copy";

export default function RiderPage() {
  const router = useRouter();
  const { lang, lionDensity, segment, setSegment, setBaseTier, setMotorAddOn } =
    useApp();

  const options: {
    id: Segment;
    label: string;
    sub: string;
    photo: string | null;
    recommend: string;
  }[] = [
    {
      id: "rider",
      label: t(lang, "rider"),
      sub: t(lang, "rider_sub"),
      photo: PHOTO.rider,
      recommend: "Bronze + Boda Shield",
    },
    {
      id: "driver",
      label: t(lang, "driver"),
      sub: t(lang, "driver_sub"),
      photo: PHOTO.match,
      recommend: "Silver + Gari TPL",
    },
    {
      id: "neither",
      label: t(lang, "neither"),
      sub: t(lang, "neither_sub"),
      photo: null,
      recommend: "Bronze",
    },
  ];

  const onContinue = () => {
    if (segment === "rider") {
      setBaseTier("bronze");
      setMotorAddOn("boda");
    } else if (segment === "driver") {
      setBaseTier("silver");
      setMotorAddOn("gari-tpl");
    } else {
      setBaseTier("bronze");
      setMotorAddOn(null);
    }
    router.push("/onboarding/phone");
  };

  return (
    <div className="phone-stage">
      <div className="phone">
        <StatusBar />
        <div className="scroll-area px-22" style={{ paddingTop: 8 }}>
          <div className="row between" style={{ marginBottom: 22 }}>
            <div className="row gap-8">
              <LionMark size={26} color="var(--ink)" density={lionDensity} />
              <div
                className="display"
                style={{ fontSize: 15, letterSpacing: "0.06em" }}
              >
                SIMBA · BIMA
              </div>
            </div>
            <div className="eyebrow">3 / 4</div>
          </div>
          <div className="progress-track" style={{ marginBottom: 24 }}>
            <div className="progress-fill" style={{ width: "75%" }} />
          </div>

          <div
            className="display"
            style={{ fontSize: 32, marginBottom: 8, lineHeight: 0.95 }}
          >
            {t(lang, "ob_q1").toUpperCase()}
          </div>
          <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 22 }}>
            {t(lang, "ob_q1_sub")}
          </div>

          <div className="col gap-12">
            {options.map((opt) => {
              const picked = segment === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setSegment(opt.id)}
                  style={{
                    display: "flex",
                    textAlign: "left",
                    padding: 0,
                    background: "var(--white)",
                    border: picked
                      ? "2px solid var(--brick)"
                      : "1px solid var(--line)",
                    cursor: "pointer",
                    borderRadius: 2,
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: 88,
                      flexShrink: 0,
                      position: "relative",
                    }}
                  >
                    {opt.photo ? (
                      <Photo src={opt.photo} h={92} label={opt.id} />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: 92,
                          background: "var(--paper-2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <svg
                          width="38"
                          height="38"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="var(--muted)"
                          strokeWidth="1.4"
                        >
                          <circle cx="12" cy="8" r="3" />
                          <path d="M5 20c0-4 3-7 7-7s7 3 7 7" />
                        </svg>
                      </div>
                    )}
                    {picked && (
                      <div
                        style={{
                          position: "absolute",
                          top: 6,
                          left: 6,
                          background: "var(--brick)",
                          color: "#fff",
                          width: 20,
                          height: 20,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 10,
                          fontSize: 12,
                        }}
                      >
                        ✓
                      </div>
                    )}
                  </div>
                  <div
                    className="col"
                    style={{
                      padding: "12px 14px",
                      flex: 1,
                      justifyContent: "center",
                    }}
                  >
                    <div
                      className="display"
                      style={{
                        fontSize: 19,
                        lineHeight: 1,
                        marginBottom: 6,
                      }}
                    >
                      {opt.label.toUpperCase()}
                    </div>
                    <div
                      style={{
                        fontSize: 11.5,
                        color: "var(--muted)",
                        marginBottom: 4,
                      }}
                    >
                      {opt.sub}
                    </div>
                    {picked && (
                      <div
                        className="eyebrow"
                        style={{
                          fontSize: 9,
                          color: "var(--brick)",
                          marginTop: 2,
                        }}
                      >
                        → {opt.recommend}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div
            style={{
              marginTop: 22,
              padding: "14px 16px",
              background: "var(--paper-2)",
              borderLeft: "3px solid var(--pitch)",
            }}
          >
            <div
              className="eyebrow"
              style={{
                fontSize: 9,
                color: "var(--pitch)",
                marginBottom: 4,
              }}
            >
              {lang === "sw" ? "KWA MPANDA WA BODA" : "FOR THE RIDER"}
            </div>
            <div
              style={{
                fontSize: 12.5,
                color: "var(--ink-2)",
                lineHeight: 1.45,
              }}
            >
              {lang === "sw"
                ? "Tanzania ilirekodi vifo 722 vya pikipiki mwaka 2024. Boda Shield ni TIRA-compliant."
                : "Tanzania recorded 722 motorcycle fatalities in 2024. Boda Shield is TIRA-compliant TPL."}
            </div>
          </div>

          <div style={{ height: 20 }} />
        </div>

        <div
          className="px-22"
          style={{
            paddingTop: 14,
            paddingBottom: 22,
            background: "var(--paper)",
            borderTop: "1px solid var(--line)",
          }}
        >
          <button className="btn btn-primary btn-display" onClick={onContinue}>
            <span>{t(lang, "continue")}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
