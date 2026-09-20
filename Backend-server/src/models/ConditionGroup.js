import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const conditionGroupSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 200, unique: true },
    description: { type: String, trim: true, maxlength: 1000, default: "" },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

conditionGroupSchema.index({ sortOrder: 1 });

export const ConditionGroup = models?.ConditionGroup || model("ConditionGroup", conditionGroupSchema);
export default ConditionGroup;