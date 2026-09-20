/**
 * ShushrutamVed Care — transactional email templates.
 *
 * Email-safe markup only: HTML tables, inline CSS, no JavaScript, no external
 * fonts, media-query mobile stacking where clients support it, and safe
 * Outlook/Gmail fallback. All dynamic values are HTML-escaped; appointments
 * and statuses are never hardcoded.
 */

const BRAND = {
  deep: "#0f4c29",
  brand: "#176b3a",
  soft: "#2f8f57",
  tint: "#eaf5ec",
  tintBorder: "#d8eadc",
  cardBg: "#f7f9f6",
  ink: "#183126",
  body: "#27412f",
  muted: "#65796b",
  border: "#e6ece4",
  outer: "#eef1ec",
  gold: "#d9a441",
  amberBg: "#f7f3e6",
  amberFg: "#7a5c15",
  amberBorder: "#eadfbf",
};

const CLINIC = {
  name: "ShushrutamVed Care",
  practice: "Holistic & Integrative Wellness",
  doctor: "Dr. Aarti Sen",
  phone: "+91 6260520932",
  email: "draarti.shushrutamvedcare@gmail.com",
  address: "B/86 OM Nagar, Kolar Road, Bhopal, Madhya Pradesh 462042",
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const NOT_SPECIFIED = "To be scheduled";

function htmlEscape(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function firstWord(value) {
  const first = String(value || "").trim().split(/\s+/)[0] || "";
  return first || String(value || "there");
}

function formatDate(value) {
  const raw = String(value || "").trim();
  if (!raw) return NOT_SPECIFIED;
  const parsed = new Date(`${raw}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return htmlEscape(raw);
  return `${parsed.getUTCDate()} ${MONTHS[parsed.getUTCMonth()]} ${parsed.getUTCFullYear()}`;
}

function formatTime(value) {
  const raw = String(value || "").trim();
  if (!raw) return NOT_SPECIFIED;
  const match = raw.match(/^([A-Za-z]+)\s*\(([^)]*)\)$/);
  if (match && match[2].trim()) {
    const range = match[2]
      .replace(/\s*[–—-]\s*/g, " – ")
      .replace(/\bam\b/gi, "AM")
      .replace(/\bpm\b/gi, "PM");
    return `${match[1]} · ${range}`;
  }
  return htmlEscape(raw);
}

function displayService(value) {
  const raw = String(value || "").trim();
  if (!raw || raw === "none" || /guide me/i.test(raw)) {
    return "Guidance needed — our care team will help you choose";
  }
  return htmlEscape(raw);
}

function paragraphs(value) {
  return String(value || "")
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p style="margin:0 0 14px;">${htmlEscape(p)}</p>`)
    .join("");
}

function sectionTitle(text) {
  return `<div style="font-size:10.5px;font-weight:800;letter-spacing:1.8px;text-transform:uppercase;color:${BRAND.brand};margin:22px 0 10px;mso-line-height-rule:exactly;">${text}</div>`;
}

function detailItem(label, value) {
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td style="padding:10px 0 20px;">
        <div style="font-size:10.5px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:${BRAND.muted};margin-bottom:3px;mso-line-height-rule:exactly;">${label}</div>
        <div style="font-size:15.5px;font-weight:700;color:${BRAND.ink};line-height:1.4;mso-line-height-rule:exactly;">${value}</div>
      </td>
    </tr>
  </table>`;
}

function refBadge(ref) {
  const code = ref ? htmlEscape(ref) : BRAND.name;
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td style="background-color:${BRAND.tint};border:1px solid ${BRAND.tintBorder};border-radius:10px;padding:14px 18px;">
        <div style="font-size:10.5px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:${BRAND.muted};mso-line-height-rule:exactly;">Appointment ID</div>
        <div style="font-size:22px;font-weight:800;color:${BRAND.deep};letter-spacing:0.6px;margin-top:2px;font-family:'Courier New',monospace;mso-line-height-rule:exactly;">${code}</div>
      </td>
    </tr>
  </table>`;
}

function appointmentDetailsGrid(appointment) {
  return `
  ${refBadge(appointment.ref)}
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="stack">
    <tr>
      <td width="50%" valign="top">${detailItem("Service", displayService(appointment.service))}</td>
      <td width="4%"><div style="height:0;font-size:0;line-height:0;">&nbsp;</div></td>
      <td width="46%" valign="top">${detailItem("Preferred date", formatDate(appointment.preferredDate))}</td>
    </tr>
    <tr>
      <td width="50%" valign="top">${detailItem("Preferred time", formatTime(appointment.preferredTime))}</td>
      <td width="4%"><div style="height:0;font-size:0;line-height:0;">&nbsp;</div></td>
      <td width="46%" valign="top"></td>
    </tr>
  </table>`;
}

function patientDetailsGrid(appointment) {
  return `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0"
    style="border:1px solid ${BRAND.border};border-radius:12px;background-color:${BRAND.cardBg};">
    <tr>
      <td style="padding:18px 20px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="stack">
          <tr>
            <td width="50%" valign="top">${detailItem("Patient name", htmlEscape(appointment.name))}</td>
            <td width="4%"><div style="height:0;font-size:0;line-height:0;">&nbsp;</div></td>
            <td width="46%" valign="top">${detailItem("Email", htmlEscape(appointment.email || "Not provided"))}</td>
          </tr>
          <tr>
            <td width="50%" valign="top">${detailItem("Phone", htmlEscape(appointment.phone || "Not provided"))}</td>
            <td width="4%"><div style="height:0;font-size:0;line-height:0;">&nbsp;</div></td>
            <td width="46%" valign="top"></td>
          </tr>
        </table>
      </td>
    </tr>
  </table>`;
}

function messageBlock(appointment) {
  if (!appointment.message || !String(appointment.message).trim()) return "";
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td style="background-color:${BRAND.cardBg};border:1px solid ${BRAND.border};border-radius:12px;padding:16px 20px;">
        <div style="font-size:10.5px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:${BRAND.muted};margin-bottom:4px;mso-line-height-rule:exactly;">Message from the patient</div>
        <div style="font-size:14px;color:${BRAND.body};line-height:1.6;margin:0;">${paragraphs(appointment.message)}</div>
      </td>
    </tr>
  </table>`;
}

function statusPill(status) {
  const meta = STATUS_META[status] || STATUS_META.rejected;
  const glyph = meta.glyph ? `${meta.glyph}&nbsp;` : "";
  return `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td style="background-color:${meta.pillBg};border:1px solid ${meta.pillBorder};border-radius:999px;padding:6px 14px;">
        <span style="font-size:11.5px;font-weight:800;color:${meta.pillFg};letter-spacing:1.2px;text-transform:uppercase;mso-line-height-rule:exactly;">${glyph}${meta.pillLabel}</span>
      </td>
    </tr>
  </table>`;
}

function statusHeadingHtml(status, title, greeting, intro) {
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td style="padding:26px 0 4px;">
        ${statusPill(status)}
        <h1 style="margin:14px 0 6px;font-size:26px;font-weight:800;color:${BRAND.ink};line-height:1.25;mso-line-height-rule:exactly;">${title}</h1>
        <p style="margin:0 0 4px;font-size:16px;font-weight:600;color:${BRAND.body};line-height:1.5;">Hello ${greeting},</p>
        <p style="margin:0 0 6px;font-size:15px;color:${BRAND.body};line-height:1.6;">${intro}</p>
      </td>
    </tr>
  </table>`;
}

function headingHtml(title, greeting, intro) {
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td style="padding:20px 0 4px;">
        <h1 style="margin:0 0 10px;font-size:26px;font-weight:800;color:${BRAND.ink};line-height:1.25;mso-line-height-rule:exactly;">${title}</h1>
        <p style="margin:0 0 4px;font-size:16px;font-weight:600;color:${BRAND.body};line-height:1.5;">Hello ${greeting},</p>
        <p style="margin:0 0 6px;font-size:15px;color:${BRAND.body};line-height:1.6;">${intro}</p>
      </td>
    </tr>
  </table>`;
}

function noteBlock(text) {
  return `<p style="margin:10px 0 0;font-size:13.5px;color:${BRAND.muted};line-height:1.6;">${text}</p>`;
}

const HEADER_HTML = `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td class="hpad" style="padding:26px 36px 20px;border-bottom:1px solid ${BRAND.border};">
        <div style="font-size:23px;font-weight:800;letter-spacing:-0.3px;color:${BRAND.deep};line-height:1.25;text-shadow:none;mso-line-height-rule:exactly;">ShushrutamVed&nbsp;Care</div>
        <div style="font-size:10.5px;font-weight:600;letter-spacing:2.6px;text-transform:uppercase;color:${BRAND.soft};margin-top:5px;mso-line-height-rule:exactly;">Holistic&nbsp;&amp;&nbsp;Integrative&nbsp;Wellness</div>
        <div style="width:44px;height:3px;border-radius:2px;background-color:${BRAND.gold};margin-top:14px;"></div>
      </td>
    </tr>
  </table>`;

const FOOTER_HTML = `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td class="fpad" style="padding:26px 36px 28px;background-color:${BRAND.deep};border-radius:0 0 14px 14px;">
        <div style="font-size:16px;font-weight:800;color:#ffffff;letter-spacing:-0.2px;mso-line-height-rule:exactly;">ShushrutamVed Care</div>
        <div style="font-size:10px;font-weight:600;letter-spacing:2.2px;text-transform:uppercase;color:#9fd0ab;margin-top:3px;mso-line-height-rule:exactly;">Holistic &amp; Integrative Wellness</div>
        <div style="height:1px;background-color:#2a5e3c;font-size:0;line-height:1;margin:14px 0 0;">&nbsp;</div>
        <div style="font-size:12.5px;line-height:1.7;color:#d7e7da;margin-top:14px;">
          This is an automated appointment notification from ShushrutamVed Care. If you need assistance regarding your appointment, please contact the clinic directly.
        </div>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="stack" style="margin-top:14px;">
          <tr>
            <td width="34%" valign="top" style="padding:0 12px 0 0;">
              <div style="font-size:10px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:#9fd0ab;margin-bottom:4px;mso-line-height-rule:exactly;">Clinic</div>
              <div style="font-size:12.5px;line-height:1.7;color:#d7e7da;">${CLINIC.address}</div>
            </td>
            <td width="4%"><div style="height:0;font-size:0;line-height:0;">&nbsp;</div></td>
            <td width="62%" valign="top">
              <div style="font-size:10px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:#9fd0ab;margin-bottom:4px;mso-line-height-rule:exactly;">Contact</div>
              <div style="font-size:12.5px;line-height:1.9;color:#d7e7da;">
                <a href="tel:+916260520932" style="color:#d7e7da;text-decoration:underline;">${CLINIC.phone}</a><br>
                <a href="mailto:${CLINIC.email}" style="color:#d7e7da;text-decoration:underline;">${CLINIC.email}</a>
              </div>
            </td>
          </tr>
        </table>
        <div style="font-size:11px;color:#8fae97;margin-top:16px;line-height:1.6;">Care led by ${CLINIC.doctor} · ${CLINIC.practice}</div>
      </td>
    </tr>
  </table>`;

function layout({ preheader, status, title, greeting, intro, bodyHtml, noteText }) {
  const head = status ? statusHeadingHtml(status, title, greeting, intro) : headingHtml(title, greeting, intro);
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="x-apple-disable-message-reformatting">
<title>${htmlEscape(preheader)}</title>
<!--[if mso]>
<noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
<![endif]-->
<style>
  body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
  table { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
  img { border: 0; -ms-interpolation-mode: bicubic; }
  .preheader { display: none !important; font-size: 1px; line-height: 1px; max-height: 0; max-width: 0; opacity: 0; mso-hide: all; overflow: hidden; }
  @media screen and (max-width: 560px) {
    .body-pad { padding: 16px 10px !important; }
    .container { width: 100% !important; max-width: 100% !important; }
    .hpad { padding: 22px 22px 18px !important; }
    .pad { padding: 26px 22px 6px !important; }
    .fpad { padding: 24px 22px !important; }
    .stack td { display: block !important; width: 100% !important; padding: 0 0 2px 0 !important; box-sizing: border-box; }
  }
</style>
</head>
<body style="margin:0;padding:0;background-color:${BRAND.outer};color:${BRAND.body};font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;">
<div class="preheader" style="display:none !important;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;mso-hide:all;overflow:hidden;">${htmlEscape(preheader)}&nbsp;&zwnj;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background-color:${BRAND.outer};">
  <tr>
    <td class="body-pad" align="center" style="padding:28px 16px;">
      <!--[if mso]>
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" align="center">
        <tr><td>
      <![endif]-->
      <table role="presentation" class="container" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="width:100%;max-width:600px;background-color:#ffffff;border:1px solid #dde5da;border-radius:14px;">
        <tr><td>${HEADER_HTML}</td></tr>
        <tr><td class="pad" style="padding:8px 36px 6px;">${head}</td></tr>
        <tr><td class="pad" style="padding:6px 36px 8px;">${bodyHtml}${noteText ? noteBlock(noteText) : ""}</td></tr>
        <tr><td>${FOOTER_HTML}</td></tr>
      </table>
      <!--[if mso]>
        </td></tr>
      </table>
      <![endif]-->
    </td>
  </tr>
</table>
</body>
</html>`;
}

const STATUS_META = {
  confirmed: {
    pillLabel: "Confirmed",
    glyph: "✓",
    pillBg: BRAND.tint,
    pillFg: BRAND.deep,
    pillBorder: BRAND.tintBorder,
    title: "Appointment Confirmed",
  },
  completed: {
    pillLabel: "Completed",
    glyph: "✓",
    pillBg: BRAND.tint,
    pillFg: BRAND.deep,
    pillBorder: BRAND.tintBorder,
    title: "Appointment Completed",
  },
  cancelled: {
    pillLabel: "Cancelled",
    glyph: "",
    pillBg: BRAND.amberBg,
    pillFg: BRAND.amberFg,
    pillBorder: BRAND.amberBorder,
    title: "Appointment Cancelled",
  },
  rejected: {
    pillLabel: "Declined",
    glyph: "",
    pillBg: BRAND.amberBg,
    pillFg: BRAND.amberFg,
    pillBorder: BRAND.amberBorder,
    title: "Appointment Declined",
  },
  pending: {
    pillLabel: "Pending",
    glyph: "",
    pillBg: BRAND.cardBg,
    pillFg: BRAND.muted,
    pillBorder: BRAND.border,
    title: "Appointment Request Received",
  },
};

function appointmentBody(appointment) {
  return `${sectionTitle("Appointment details")}${appointmentDetailsGrid(appointment)}`;
}

function refSuffix(appointment) {
  return appointment.ref ? ` · ${appointment.ref}` : "";
}

function refSuffixText(appointment) {
  return appointment.ref ? ` (${appointment.ref})` : "";
}

/* ------------------------------------------------------------------ */
/* 1. Clinic notification                                              */
/* ------------------------------------------------------------------ */
export const newAppointmentToClinic = (appointment) => {
  const subject = `New appointment request${refSuffix(appointment)}`;
  const preheader = `New appointment request received for ${appointment.name} — ${displayService(appointment.service)}`;
  const text = `A new appointment request has been submitted on the website${refSuffixText(appointment)}.

Patient name: ${appointment.name}
Email: ${appointment.email || "Not provided"}
Phone: ${appointment.phone || "Not provided"}

Requested service: ${displayService(appointment.service)}
Preferred date: ${formatDate(appointment.preferredDate)}
Preferred time: ${formatTime(appointment.preferredTime)}
${appointment.message ? `Message: ${appointment.message}` : ""}

Please review it in the admin panel and respond to the patient.`;

  const html = layout({
    preheader,
    status: null,
    title: "New Appointment Request",
    greeting: firstWord(appointment.name),
    intro: "A new appointment request has been submitted through the website.",
    bodyHtml: `${sectionTitle("Patient details")}${patientDetailsGrid(appointment)}${appointmentBody(appointment)}${sectionTitle("Notes")}${messageBlock(appointment) || `<p style="margin:0;font-size:14px;color:${BRAND.muted};line-height:1.6;">No additional message was provided by the patient.</p>`}`,
    noteText: "Please review this request in the admin panel and respond to the patient.",
  });

  return { subject, text, html };
};

/* ------------------------------------------------------------------ */
/* 2. Patient acknowledgement                                          */
/* ------------------------------------------------------------------ */
export const newAppointmentToPatient = (appointment) => {
  const subject = `Appointment request received${refSuffix(appointment)}`;
  const preheader = `We've received your request for ${displayService(appointment.service)}. Our care team will contact you.`;
  const text = `Hello ${firstWord(appointment.name)},

Thank you for reaching out to ShushrutamVed Care. Your appointment request has been received and is under review. Our team will contact you regarding your appointment; this is not a confirmation.

${refSuffixText(appointment).trim() ? `Appointment ID: ${appointment.ref}` : ""}
Requested service: ${displayService(appointment.service)}
Preferred date: ${formatDate(appointment.preferredDate)}
Preferred time: ${formatTime(appointment.preferredTime)}

If you have questions, please contact the clinic directly.`;

  const html = layout({
    preheader,
    status: "pending",
    title: "Appointment Request Received",
    greeting: firstWord(appointment.name),
    intro: "Thank you for reaching out to ShushrutamVed Care. We have received your appointment request and are reviewing it.",
    bodyHtml: appointmentBody(appointment),
    noteText: `Our team will review your request and contact you regarding your appointment. This is not a confirmation of a booking.`,
  });

  return { subject, text, html };
};

/* ------------------------------------------------------------------ */
/* 3. Status change → patient                                          */
/* ------------------------------------------------------------------ */
const STATUS_COPY = {
  confirmed: {
    title: "Appointment Confirmed",
    intro: "Your appointment request has been confirmed.",
    note: "If you need to make any changes or if you have questions, please contact the clinic directly.",
    textIntro: "has been confirmed",
  },
  completed: {
    title: "Appointment Completed",
    intro: "Your appointment request has been marked as completed.",
    note: "Thank you for choosing ShushrutamVed Care. If you have any questions about your care, please contact the clinic directly.",
    textIntro: "has been marked as completed",
  },
  cancelled: {
    title: "Appointment Cancelled",
    intro: "Your appointment request has been cancelled.",
    note: "If you would like to reschedule or book a new appointment, please contact the clinic directly.",
    textIntro: "has been cancelled",
  },
  rejected: {
    title: "Appointment Declined",
    intro: "We are unable to take up this appointment request at this time.",
    note: "If you have any questions or would like to discuss your options, please contact the clinic directly.",
    textIntro: "has been declined",
  },
};

export const statusChangedToPatient = (appointment) => {
  const copy = STATUS_COPY[appointment.status] || {
    title: `Appointment ${appointment.status || ""}`.trim(),
    intro: `Your appointment request status is ${appointment.status || "unknown"}.`,
    note: "If you have questions, please contact the clinic directly.",
    textIntro: `is now ${appointment.status || "in an unknown state"}`,
  };

  const subject = `Appointment ${appointment.status === "rejected" ? "declined" : appointment.status || ""}${refSuffix(appointment)}`;
  const preheader = `Your appointment request${refSuffix(appointment)} ${copy.textIntro}.`;
  const text = `Hello ${firstWord(appointment.name)},

Your appointment request${refSuffixText(appointment)} ${copy.textIntro}.

Requested service: ${displayService(appointment.service)}
Preferred date: ${formatDate(appointment.preferredDate)}
Preferred time: ${formatTime(appointment.preferredTime)}

${copy.note}`;

  const html = layout({
    preheader,
    status: appointment.status || "pending",
    title: copy.title,
    greeting: firstWord(appointment.name),
    intro: copy.intro,
    bodyHtml: appointmentBody(appointment),
    noteText: copy.note,
  });

  return { subject, text, html };
};