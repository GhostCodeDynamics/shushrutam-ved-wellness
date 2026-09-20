import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const serviceSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, trim: true, maxlength: 1000, default: "" },
    // Icon name string only — the actual icon map (lucide) lives in the frontend/admin panel.
    icon: { type: String, trim: true, maxlength: 80, default: "" },
    isActive: { type: Boolean, default: true, index: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

serviceSchema.index({ isActive: 1, sortOrder: 1 });

export const Service = models?.Service || model("Service", serviceSchema);
export default Service;