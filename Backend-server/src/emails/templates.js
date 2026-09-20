function htmlEscape(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function sharedRows(appointment) {
  return [
    ["Reference", appointment.ref || ""],
    ["Name", appointment.name],
    ["Phone", appointment.phone],
    ["Requested service", appointment.service || "Not specified"],
    ["Preferred date", appointment.preferredDate || "Not specified"],
    ["Preferred time", appointment.preferredTime || "Not specified"],
    ["Message", appointment.message || ""],
  ];
}

function rowsToText(rows) {
  return rows.map(([k, v]) => `${k}: ${v}`).join("\n");
}

function rowsToHtml(rows) {
  const cells = rows
    .map(([k, v]) => `<tr><td><strong>${htmlEscape(k)}</strong></td><td>${htmlEscape(v)}</td></tr>`)
    .join("");
  return `<table cellpadding="6" cellspacing="0" border="0" style="border-collapse:collapse"><tbody>${cells}</tbody></table>`;
}

function wrapHtml(bodyHtml) {
  return `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;font-size:14px;color:#1f2937;line-height:1.5">
<div style="max-width:600px;margin:0 auto;border:1px solid #d1d5db;border-radius:8px;overflow:hidden">
<div style="background:#0f4c29;color:#ffffff;padding:14px 20px"><strong>ShushrutamVed Care</strong></div>
<div style="padding:20px">${bodyHtml}</div>
<div style="background:#f9fafb;padding:10px 20px;font-size:12px;color:#6b7280">This is an automated message from ShushrutamVed Care. Please do not reply to this email.</div>
</div></body></html>`;
}

export const newAppointmentToClinic = (appointment) => {
  const subject = `New appointment request ${appointment.ref || ""} — ${appointment.name}`;
  const bodyText = `A new appointment request has been submitted on the website.\n\n${rowsToText(sharedRows(appointment))}\n\nPlease review it in the admin panel and respond to the patient.`;
  const bodyHtml = wrapHtml(
    `<h2>New appointment request</h2><p>A new appointment request has been submitted on the website.</p>${rowsToHtml(sharedRows(appointment))}<p>Please review it in the admin panel and respond to the patient.</p>`,
  );
  return { subject, text: bodyText, html: bodyHtml };
};

export const newAppointmentToPatient = (appointment) => {
  const subject = `We received your appointment request (${appointment.ref || "ShushrutamVed Care"})`;
  const bodyText = `Dear ${appointment.name},\n\nThank you for reaching out to ShushrutamVed Care. Your appointment request has been received and is under review. We will contact you shortly to confirm.\n\n${rowsToText(sharedRows(appointment))}`;
  const bodyHtml = wrapHtml(
    `<h2>Thank you, ${htmlEscape(appointment.name)}</h2><p>Your appointment request has been received and is under review. We will contact you shortly to confirm.</p>${rowsToHtml(sharedRows(appointment))}`,
  );
  return { subject, text: bodyText, html: bodyHtml };
};

const STATUS_LABELS = {
  pending: "still awaiting confirmation",
  confirmed: "has been confirmed",
  completed: "has been marked as completed",
  cancelled: "has been cancelled",
  rejected: "has been declined",
};

export const statusChangedToPatient = (appointment) => {
  const label = STATUS_LABELS[appointment.status] || appointment.status;
  const subject = `Your appointment ${appointment.ref || ""} ${label}`;
  const bodyText = `Dear ${appointment.name},\n\nYour appointment request ${appointment.ref || ""} ${label}.\n\nRequested service: ${appointment.service || "Not specified"}\nPreferred date: ${appointment.preferredDate || "Not specified"}\nPreferred time: ${appointment.preferredTime || "Not specified"}\n\nIf you have questions, please contact the clinic directly.`;
  const bodyHtml = wrapHtml(
    `<h2>Appointment ${htmlEscape(label)}</h2><p>Dear ${htmlEscape(appointment.name)},</p><p>Your appointment request <strong>${htmlEscape(appointment.ref || "")}</strong> ${label}.</p>${rowsToHtml([["Requested service", appointment.service || "Not specified"], ["Preferred date", appointment.preferredDate || "Not specified"], ["Preferred time", appointment.preferredTime || "Not specified"]])}<p>If you have questions, please contact the clinic directly.</p>`,
  );
  return { subject, text: bodyText, html: bodyHtml };
};