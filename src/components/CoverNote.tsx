"use client";

import { LionMark } from "@/components/ds";
import { FakeQR } from "@/components/FakeQR";
import type { Policy } from "@/lib/policy";
import { formatDate, fmtTSh, tiers as tiersOf } from "@/lib/policy";
import type { Lang } from "@/lib/copy";

export function CoverNote({
  policy,
  lang,
  variant = "screen",
}: {
  policy: Policy;
  lang: Lang;
  variant?: "screen" | "compact";
}) {
  const { base, motor } = tiersOf(policy);
  const sums: { label: string; value: string }[] = [];
  const s = policy.baseTierId
    ? { ...base?.sumInsured, ...(motor?.sumInsured ?? {}) }
    : motor?.sumInsured ?? {};

  if (s?.pa_death)
    sums.push({
      label: lang === "sw" ? "PA — Kifo" : "PA Death",
      value: "TSh " + fmtTSh(s.pa_death),
    });
  if (s?.pa_disability)
    sums.push({
      label: lang === "sw" ? "Ulemavu wa kudumu" : "Permanent disability",
      value: "TSh " + fmtTSh(s.pa_disability),
    });
  if (s?.hospital_lump)
    sums.push({
      label: lang === "sw" ? "Hospitali — dharura" : "Emergency hospital",
      value: "TSh " + fmtTSh(s.hospital_lump),
    });
  if (s?.funeral)
    sums.push({
      label: lang === "sw" ? "Mazishi" : "Funeral",
      value: "TSh " + fmtTSh(s.funeral),
    });
  if (s?.hospital_cash_daily && s?.hospital_cash_days)
    sums.push({
      label: lang === "sw" ? "Hospital Cash" : "Hospital Cash",
      value:
        "TSh " +
        fmtTSh(s.hospital_cash_daily) +
        " × " +
        s.hospital_cash_days +
        (lang === "sw" ? " siku" : " days"),
    });
  if (s?.critical_illness)
    sums.push({
      label: lang === "sw" ? "Magonjwa makubwa" : "Critical illness",
      value: "TSh " + fmtTSh(s.critical_illness),
    });
  if (s?.motor_tpl_property)
    sums.push({
      label: lang === "sw" ? "Motor — Mali" : "Motor TPL property",
      value: "TSh " + fmtTSh(s.motor_tpl_property),
    });
  if (s?.motor_own_damage)
    sums.push({
      label: lang === "sw" ? "Motor — Comp" : "Motor own damage",
      value: lang === "sw" ? "Comprehensive" : "Comprehensive",
    });

  return (
    <div
      style={{
        background: "#fff",
        color: "var(--ink)",
        border: "1px solid var(--line)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "var(--brick)",
          color: "#fff",
          padding: "16px 18px",
          position: "relative",
        }}
      >
        <div className="row between" style={{ marginBottom: 6 }}>
          <div
            className="eyebrow"
            style={{ color: "rgba(255,255,255,0.85)", fontSize: 9.5 }}
          >
            {lang === "sw" ? "HATI YA KINGA" : "COVER NOTE"}
          </div>
          <div className="row gap-6">
            <LionMark size={20} color="#FFF" density="restrained" />
            <div
              className="display"
              style={{ fontSize: 11, letterSpacing: "0.06em" }}
            >
              SIMBA · BIMA
            </div>
          </div>
        </div>
        <div
          className="display tabular"
          style={{ fontSize: 22, letterSpacing: "0.03em", lineHeight: 1 }}
        >
          {[base?.badge.en, motor?.badge.en].filter(Boolean).join(" + ")}
        </div>
        <div
          className="tabular"
          style={{ fontSize: 11.5, opacity: 0.85, marginTop: 4 }}
        >
          {policy.policyNumber}
        </div>
      </div>

      {/* QR + identity */}
      <div className="row" style={{ padding: 18, gap: 16, alignItems: "flex-start" }}>
        <div style={{ position: "relative", flexShrink: 0 }}>
          <FakeQR size={120} />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: 26,
              height: 26,
              background: "var(--brick)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LionMark size={18} color="#fff" />
          </div>
        </div>
        <div className="col grow gap-6">
          <div>
            <div className="eyebrow" style={{ fontSize: 9 }}>
              {lang === "sw" ? "MWENYE BIMA" : "INSURED"}
            </div>
            <div className="display tabular" style={{ fontSize: 15, marginTop: 2 }}>
              {policy.insured.name || "—"}
            </div>
            <div className="tabular" style={{ fontSize: 11, color: "var(--muted)" }}>
              {policy.insured.phone}
            </div>
          </div>
          <div>
            <div className="eyebrow" style={{ fontSize: 9 }}>
              NIDA
            </div>
            <div className="tabular" style={{ fontSize: 11.5, color: "var(--ink-2)" }}>
              {policy.insured.nida}
            </div>
          </div>
          {policy.vehicle && (
            <div>
              <div className="eyebrow" style={{ fontSize: 9 }}>
                {lang === "sw" ? "GARI" : "VEHICLE"}
              </div>
              <div
                className="display tabular"
                style={{ fontSize: 14, marginTop: 2 }}
              >
                {policy.vehicle.reg}
              </div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>
                {policy.vehicle.make}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Schedule */}
      {variant !== "compact" && (
        <div style={{ padding: "0 18px 18px" }}>
          <div
            className="eyebrow"
            style={{ marginBottom: 8, color: "var(--brick)" }}
          >
            {lang === "sw" ? "RATIBA YA BIMA" : "POLICY SCHEDULE"}
          </div>
          <div
            style={{
              border: "1px solid var(--line)",
              padding: 0,
            }}
          >
            {sums.map((row, i) => (
              <div
                key={i}
                className="row between"
                style={{
                  padding: "10px 12px",
                  borderBottom:
                    i < sums.length - 1 ? "1px solid var(--line)" : 0,
                  fontSize: 12.5,
                }}
              >
                <span style={{ color: "var(--muted)" }}>{row.label}</span>
                <span className="tabular" style={{ fontWeight: 600 }}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          {/* Validity */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
              marginTop: 12,
            }}
          >
            <DateBlock
              label={lang === "sw" ? "INAANZA" : "INCEPTION"}
              value={formatDate(policy.inceptionAt, lang)}
            />
            <DateBlock
              label={lang === "sw" ? "INAISHA" : "EXPIRES"}
              value={formatDate(policy.expiresAt, lang)}
            />
          </div>

          <div
            className="row gap-6"
            style={{
              marginTop: 14,
              flexWrap: "wrap",
              fontSize: 11,
              color: "var(--muted)",
            }}
          >
            <span className="chip dark" style={{ fontSize: 9 }}>
              TIRA · MVIS
            </span>
            <span className="chip pitch" style={{ fontSize: 9 }}>
              ● ACTIVE
            </span>
            <span
              style={{
                fontSize: 9.5,
                color: "var(--muted-2)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {policy.underwriter} · {policy.tiraLicence}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function DateBlock({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        background: "var(--paper-2)",
        padding: "10px 12px",
      }}
    >
      <div
        style={{
          fontSize: 9,
          letterSpacing: "0.12em",
          color: "var(--muted)",
          fontWeight: 700,
        }}
      >
        {label}
      </div>
      <div
        className="display tabular"
        style={{ fontSize: 14, marginTop: 4 }}
      >
        {value}
      </div>
    </div>
  );
}

/* ─── Printable HTML for the download flow ─── */
export function buildCoverNoteHTML(policy: Policy, lang: Lang): string {
  const { base, motor } = tiersOf(policy);
  const s = policy.baseTierId
    ? { ...base?.sumInsured, ...(motor?.sumInsured ?? {}) }
    : motor?.sumInsured ?? {};
  const rows: { l: string; v: string }[] = [];
  const add = (l: string, v: string) => rows.push({ l, v });
  if (s?.pa_death) add("PA Death", "TSh " + fmtTSh(s.pa_death));
  if (s?.pa_disability) add("Permanent disability", "TSh " + fmtTSh(s.pa_disability));
  if (s?.hospital_lump) add("Emergency hospital", "TSh " + fmtTSh(s.hospital_lump));
  if (s?.funeral) add("Funeral", "TSh " + fmtTSh(s.funeral));
  if (s?.hospital_cash_daily && s?.hospital_cash_days)
    add(
      "Hospital Cash",
      "TSh " + fmtTSh(s.hospital_cash_daily) + " × " + s.hospital_cash_days + " days",
    );
  if (s?.critical_illness) add("Critical illness", "TSh " + fmtTSh(s.critical_illness));
  if (s?.motor_tpl_property)
    add("Motor TPL property", "TSh " + fmtTSh(s.motor_tpl_property));
  if (s?.motor_own_damage) add("Motor own damage", "Comprehensive");

  const title = [base?.badge.en, motor?.badge.en].filter(Boolean).join(" + ");

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8" />
<title>${policy.policyNumber} · Simba Bima Cover Note</title>
<style>
  @page { size: A4; margin: 24mm 20mm; }
  body { font-family: Inter, -apple-system, system-ui, sans-serif; color: #0F0F0F; margin: 0; padding: 40px; max-width: 720px; margin: 0 auto; }
  .display { font-family: "Anton", Impact, system-ui; letter-spacing: 0.02em; text-transform: uppercase; }
  .tabular { font-variant-numeric: tabular-nums; }
  h1 { font-family: Anton, Impact, sans-serif; font-size: 36px; letter-spacing: 0.03em; margin: 0 0 4px; text-transform: uppercase; }
  .brick { color: #D72638; }
  .ink { color: #0F0F0F; }
  .muted { color: #6B655B; }
  .eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #6B655B; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .card { background: #FAF8F4; border: 1px solid #DFD9CC; padding: 16px; }
  table { width: 100%; border-collapse: collapse; margin-top: 8px; }
  td { padding: 10px 12px; font-size: 13px; border-bottom: 1px solid #DFD9CC; }
  td:first-child { color: #6B655B; }
  td:last-child { text-align: right; font-weight: 600; font-variant-numeric: tabular-nums; }
  .header { border-bottom: 4px solid #D72638; padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-end; }
  .qr { width: 140px; height: 140px; background: repeating-linear-gradient(0deg, transparent 0 6px, #0F0F0F 6px 7px), repeating-linear-gradient(90deg, transparent 0 6px, #0F0F0F 6px 7px); image-rendering: pixelated; border: 1px solid #DFD9CC; padding: 4px; box-sizing: border-box; position: relative; }
  .footer { margin-top: 32px; font-size: 10px; color: #6B655B; line-height: 1.5; border-top: 1px solid #DFD9CC; padding-top: 16px; }
  .chip { display: inline-block; padding: 3px 8px; font-size: 10px; letter-spacing: 0.06em; font-weight: 700; text-transform: uppercase; background: rgba(27,107,58,0.12); color: #1B6B3A; margin-right: 6px; }
</style>
</head>
<body>
<div class="header">
  <div>
    <div class="eyebrow brick">SIMBA · BIMA · OFFICIAL COVER NOTE</div>
    <h1>${title}</h1>
    <div class="muted tabular">${policy.policyNumber} · ${policy.coverNoteId}</div>
  </div>
  <div class="qr"></div>
</div>

<div class="grid">
  <div class="card">
    <div class="eyebrow">Insured</div>
    <div class="display" style="font-size: 18px; margin-top: 4px;">${escape(
      policy.insured.name,
    )}</div>
    <div class="muted tabular" style="font-size: 12px;">${escape(
      policy.insured.phone,
    )}</div>
    <div class="muted tabular" style="font-size: 11px; margin-top: 6px;">NIDA · ${escape(
      policy.insured.nida,
    )}</div>
    <div class="muted" style="font-size: 11px;">${escape(policy.insured.region)}</div>
  </div>
  <div class="card">
    <div class="eyebrow">Validity</div>
    <div class="display tabular" style="font-size: 18px; margin-top: 4px;">${formatDate(
      policy.inceptionAt,
      lang,
    )} → ${formatDate(policy.expiresAt, lang)}</div>
    <div class="muted" style="font-size: 11px; margin-top: 6px;">Weekly premium · TSh ${fmtTSh(
      policy.weeklyPremium,
    )}</div>
    <div style="margin-top: 8px;">
      <span class="chip">ACTIVE</span>
      <span class="chip" style="background: rgba(15,15,15,0.08); color: #0F0F0F;">TIRA · MVIS</span>
    </div>
  </div>
</div>

${
  policy.vehicle
    ? `
<div class="card" style="margin-top: 20px;">
  <div class="eyebrow">Insured vehicle</div>
  <div class="display tabular" style="font-size: 22px; margin-top: 4px;">${escape(
    policy.vehicle.reg,
  )}</div>
  <div class="muted" style="font-size: 13px;">${escape(policy.vehicle.make)} · ${escape(
        policy.vehicle.colour,
      )} · ${escape(policy.vehicle.cc)}cc</div>
</div>`
    : ""
}

<div style="margin-top: 24px;">
  <div class="eyebrow brick">Policy schedule</div>
  <table>
    ${rows
      .map(
        (r) => `<tr><td>${escape(r.l)}</td><td class="tabular">${escape(r.v)}</td></tr>`,
      )
      .join("")}
  </table>
</div>

<div style="margin-top: 24px;">
  <div class="eyebrow brick">Beneficiaries</div>
  <table>
    ${policy.beneficiaries
      .map(
        (b) =>
          `<tr><td>${escape(b.name)} · ${escape(
            b.relation,
          )}</td><td class="tabular">${b.share}%</td></tr>`,
      )
      .join("")}
  </table>
</div>

<div class="footer">
  Underwritten by <strong>${escape(policy.underwriter)}</strong>, regulated by TIRA · Licence #${escape(
    policy.tiraLicence,
  )}<br/>
  14-day cooling-off period applies. Hospital Cash: 48-hour minimum stay, up to 5–10 days/year depending on tier.<br/>
  Issued ${formatDate(policy.issuedAt, lang)} · This cover note serves as proof of insurance under MVIS.
</div>

<script>
  // Auto-print on open
  window.addEventListener('load', function() {
    setTimeout(function() { window.print(); }, 400);
  });
</script>
</body>
</html>`;
}

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function downloadCoverNote(policy: Policy, lang: Lang) {
  const html = buildCoverNoteHTML(policy, lang);
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `simba-bima-${policy.policyNumber}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function shareCoverNoteViaWhatsApp(policy: Policy, lang: Lang) {
  const msg =
    lang === "sw"
      ? `Hati yangu ya kinga ya Simba Bima: ${policy.policyNumber}\n${policy.insured.name}\nNamba ya kufuatilia: ${policy.coverNoteId}`
      : `My Simba Bima cover note: ${policy.policyNumber}\n${policy.insured.name}\nTracking: ${policy.coverNoteId}`;
  const phone = (policy.insured.phone || "").replace(/[^\d]/g, "");
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}
