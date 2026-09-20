import nodemailer from "nodemailer";

import { env } from "../config/env.js";
import { logError } from "../utils/AppError.js";
import {
  newAppointmentToClinic,
  newAppointmentToPatient,
  statusChangedToPatient,
} from "../emails/templates.js";

let transporter = null;

function smtpConfigured() {
  return Boolean(env.smtp.host && env.smtp.user);
}

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.smtp.host,
      port: env.smtp.port,
      secure: env.smtp.secure,
      auth: {
        user: env.smtp.user,
        pass: env.smtp.pass,
      },
    });
  }
  return transporter;
}

/**
 * Fire-and-forget send. Never rejects — failures are logged so an email
 * outage can never break an API request.
 */
async function sendEmail({ to, subject, text, html }) {
  if (!to || !smtpConfigured()) {
    return false;
  }
  try {
    const info = await getTransporter().sendMail({
      from: env.smtp.from,
      to,
      subject,
      text,
      html,
    });
    return Boolean(info.messageId);
  } catch (error) {
    logError(new Error(`Email send failed (to=${to}, subject=${subject}): ${error.message}`));
    return false;
  }
}

export function notifyNewAppointment(appointment) {
  const clinic = newAppointmentToClinic(appointment);
  return Promise.all([
    sendEmail({ ...clinic, to: env.smtp.to }),
    appointment.email
      ? sendEmail({ ...newAppointmentToPatient(appointment), to: appointment.email })
      : Promise.resolve(false),
  ]);
}

export function notifyAppointmentStatusChanged(appointment) {
  if (!appointment.email) {
    return Promise.resolve(false);
  }
  return sendEmail({ ...statusChangedToPatient(appointment), to: appointment.email });
}