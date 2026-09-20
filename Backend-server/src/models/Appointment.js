import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

export const APPOINTMENT_STATUSES = ["pending", "confirmed", "completed", "cancelled", "rejected"];
export const APPOINTMENT_SOURCES = ["website"];

/**
 * Allowed status transitions. Stricter than "any-to-any" so a terminal
 * appointment (completed/cancelled/rejected) isn't silently reopened.
 */
export const APPOINTMENT_TRANSITIONS = {
  pending: ["confirmed", "rejected", "cancelled"],
  confirmed: ["completed", "cancelled"],
  completed: [],
  cancelled: [],
  rejected: [],
};

export function canTransition(from, to) {
  return from === to || (APPOINTMENT_TRANSITIONS[from] || []).includes(to);
}

const appointmentSchema = new Schema(
  {
    ref: { type: String, unique: true, index: true },
    name: { type: String, required: true, trim: true, maxlength: 120 },
    phone: { type: String, required: true, trim: true, maxlength: 20 },
    email: { type: String, trim: true, lowercase: true, maxlength: 200, default: "" },
    preferredDate: { type: String, trim: true, maxlength: 20, default: "" },
    preferredTime: { type: String, trim: true, maxlength: 120, default: "" },
    service: { type: String, trim: true, maxlength: 200, default: "" },
    message: { type: String, trim: true, maxlength: 4000, default: "" },
    status: {
      type: String,
      enum: APPOINTMENT_STATUSES,
      default: "pending",
      index: true,
    },
    source: { type: String, enum: APPOINTMENT_SOURCES, default: "website" },
    notes: { type: String, trim: true, maxlength: 4000, default: "" },
    ip: { type: String, default: "" },
    userAgent: { type: String, default: "" },
    confirmedAt: { type: Date, default: null },
    completedAt: { type: Date, default: null },
    cancelledAt: { type: Date, default: null },
    rejectedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

appointmentSchema.index({ status: 1, createdAt: -1 });
appointmentSchema.index({ preferredDate: 1 });
appointmentSchema.index({ createdAt: -1 });

// User-facing ref code: SV-XXXXXX, generated on creation.
export async function generateRef() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no confusing chars
  const chars = Array.from({ length: 6 }, () =>
    alphabet.charAt(Math.floor(Math.random() * alphabet.length)),
  ).join("");
  return `SV-${chars}`;
}

export const Appointment = models?.Appointment || model("Appointment", appointmentSchema);
export default Appointment;