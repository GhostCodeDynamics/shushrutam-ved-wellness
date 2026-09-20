import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

// Must match the condition group titles on the public website.
export const CONDITION_GROUPS = [
  "Metabolic & Hormonal",
  "Digestive Health",
  "Pain & Mobility",
  "Mind & Sleep",
];

const conditionSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    group: { type: String, enum: CONDITION_GROUPS, required: true, index: true },
    isActive: { type: Boolean, default: true, index: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

conditionSchema.index({ group: 1, sortOrder: 1 });

export const Condition = models?.Condition || model("Condition", conditionSchema);
export default Condition;