import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const hourSlotSchema = new Schema(
  {
    day: { type: String, trim: true, maxlength: 60, default: "" },
    time: { type: String, trim: true, maxlength: 120, default: "" },
  },
  { _id: false },
);

/**
 * Singleton clinic record (admin-editable). Public API serves a sanitised
 * projection of this. shape mirrors `src/data/clinic.js` on the website.
 */
const clinicSettingsSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120, default: "ShushrutamVed Care" },
    tagline: { type: String, trim: true, maxlength: 200, default: "Naturopathy & Lifestyle Medicine" },
    doctor: { type: String, trim: true, maxlength: 120, default: "Dr. Aarti Sen" },
    qualification: { type: String, trim: true, maxlength: 200, default: "" },
    experience: { type: String, trim: true, maxlength: 80, default: "" },
    phone: { type: String, trim: true, maxlength: 40, default: "" },
    phoneHref: { type: String, trim: true, maxlength: 120, default: "" },
    whatsapp: { type: String, trim: true, maxlength: 300, default: "" },
    email: { type: String, trim: true, maxlength: 200, default: "" },
    address: { type: String, trim: true, maxlength: 400, default: "" },
    map: { type: String, trim: true, maxlength: 500, default: "" },
    hours: { type: [hourSlotSchema], default: [] },
    social: {
      instagram: { type: String, trim: true, maxlength: 500, default: "" },
      facebook: { type: String, trim: true, maxlength: 500, default: "" },
      youtube: { type: String, trim: true, maxlength: 500, default: "" },
      linkedin: { type: String, trim: true, maxlength: 500, default: "" },
    },
    seoDefaults: {
      siteUrl: { type: String, trim: true, maxlength: 300, default: "" },
      ogImage: { type: String, trim: true, maxlength: 500, default: "" },
      googleBusinessProfile: { type: String, trim: true, maxlength: 500, default: "" },
    },
  },
  { timestamps: true },
);

export const ClinicSettings = models?.ClinicSettings || model("ClinicSettings", clinicSettingsSchema);
export default ClinicSettings;