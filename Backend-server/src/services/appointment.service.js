import { Appointment, generateRef } from "../models/index.js";
import { notifyNewAppointment } from "./email.service.js";

/**
 * Creates an appointment enquiry with a guaranteed-unique user-facing ref code.
 * Retries on the rare unique-index collision.
 */
export async function createAppointment(doc, { ip = "", userAgent = "" } = {}) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const ref = await generateRef();
      const appointment = await Appointment.create({
        ...doc,
        ref,
        source: "website",
        ip: ip.slice(0, 64),
        userAgent: userAgent.slice(0, 300),
      });
      void notifyNewAppointment(appointment);
      return appointment;
    } catch (error) {
      const isDup = error?.code === 11000 && /ref/.test(String(error.message));
      if (!isDup) throw error;
    }
  }
  throw new Error("Could not allocate a reference for this appointment");
}

export function publicAppointment(doc) {
  return {
    ref: doc.ref,
    name: doc.name,
    phone: doc.phone,
    email: doc.email || undefined,
    preferredDate: doc.preferredDate || undefined,
    preferredTime: doc.preferredTime || undefined,
    service: doc.service || undefined,
    status: doc.status,
    createdAt: doc.createdAt,
  };
}

export function adminAppointment(doc) {
  return {
    id: String(doc._id),
    ref: doc.ref,
    name: doc.name,
    phone: doc.phone,
    email: doc.email || undefined,
    preferredDate: doc.preferredDate || undefined,
    preferredTime: doc.preferredTime || undefined,
    service: doc.service || undefined,
    message: doc.message || undefined,
    status: doc.status,
    source: doc.source,
    notes: doc.notes || undefined,
    ip: doc.ip || undefined,
    userAgent: doc.userAgent || undefined,
    confirmedAt: doc.confirmedAt || undefined,
    completedAt: doc.completedAt || undefined,
    cancelledAt: doc.cancelledAt || undefined,
    rejectedAt: doc.rejectedAt || undefined,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}