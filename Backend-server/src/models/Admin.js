import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

export const ADMIN_ROLES = ["admin", "manager"];

const adminSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true, trim: true, maxlength: 120 },
    role: { type: String, enum: ADMIN_ROLES, default: "admin", index: true },
    active: { type: Boolean, default: true, index: true },
    lastLoginAt: { type: Date, default: null },
  },
  { timestamps: true },
);

// Only email + passwordHash + name live here. No other PII is stored for admins.

export const Admin = models?.Admin || model("Admin", adminSchema);
export default Admin;