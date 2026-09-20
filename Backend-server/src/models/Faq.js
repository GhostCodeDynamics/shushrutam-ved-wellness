import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const faqSchema = new Schema(
  {
    question: { type: String, required: true, trim: true, maxlength: 300 },
    answer: { type: String, required: true, trim: true, maxlength: 3000 },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
);

faqSchema.index({ isActive: 1, sortOrder: 1 });

export const Faq = models?.Faq || model("Faq", faqSchema);
export default Faq;