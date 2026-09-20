import React, { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { api } from "../lib/api.js";
import ImageUploader from "./ImageUploader.jsx";
import { Button, Card, ErrorBanner, Field, PageHeader, Spinner, TextArea, TextInput } from "./ui.jsx";

const EMPTY = {
  name: "",
  tagline: "",
  doctor: "",
  qualification: "",
  experience: "",
  phone: "",
  phoneHref: "",
  whatsapp: "",
  email: "",
  address: "",
  map: "",
  hours: [{ day: "Monday – Saturday", time: "9:00 am – 7:00 pm" }],
  social: { instagram: "", facebook: "", youtube: "", linkedin: "" },
  seoDefaults: { siteUrl: "", ogImage: "", googleBusinessProfile: "" },
};

export default function ClinicSettings() {
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api("/admin/clinic")
      .then((res) => {
        if (res.settings) {
          setForm({
            ...EMPTY,
            ...res.settings,
            hours: res.settings.hours?.length ? res.settings.hours : EMPTY.hours,
            social: { ...EMPTY.social, ...res.settings.social },
            seoDefaults: { ...EMPTY.seoDefaults, ...res.settings.seoDefaults },
          });
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function setField(key, value) {
    setForm({ ...form, [key]: value });
    setSaved(false);
  }

  function setNested(section, key, value) {
    setForm({ ...form, [section]: { ...form[section], [key]: value } });
    setSaved(false);
  }

  function setHour(index, key, value) {
    const hours = form.hours.map((h, i) => (i === index ? { ...h, [key]: value } : h));
    setForm({ ...form, hours });
    setSaved(false);
  }

  async function save() {
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      await api("/admin/clinic", { method: "PATCH", body: form });
      setSaved(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <Spinner />;

  const section = "rounded-xl border border-gray-200 bg-white p-6";

  return (
    <div className="max-w-2xl">
      <PageHeader
        title="Clinic settings"
        subtitle="Contact details, hours and SEO defaults. These override the hardcoded website values once the frontend switches to API data."
        actions={
          <Button loading={saving} onClick={save}>
            {saving ? "Saving…" : "Save changes"}
          </Button>
        }
      />
      <ErrorBanner error={error} />
      {saved && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-800">
          Settings saved.
        </div>
      )}

      <div className="space-y-4">
        <div className={section}>
          <h2 className="mb-4 font-medium text-gray-900">Identity</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Clinic name">
                <TextInput value={form.name} onChange={(e) => setField("name", e.target.value)} />
              </Field>
              <Field label="Tagline">
                <TextInput value={form.tagline} onChange={(e) => setField("tagline", e.target.value)} />
              </Field>
            </div>
            <Field label="Doctor">
              <TextInput value={form.doctor} onChange={(e) => setField("doctor", e.target.value)} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Qualification">
                <TextInput value={form.qualification} onChange={(e) => setField("qualification", e.target.value)} />
              </Field>
              <Field label="Experience">
                <TextInput value={form.experience} onChange={(e) => setField("experience", e.target.value)} />
              </Field>
            </div>
          </div>
        </div>

        <div className={section}>
          <h2 className="mb-4 font-medium text-gray-900">Contact</h2>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Phone">
              <TextInput value={form.phone} onChange={(e) => setField("phone", e.target.value)} />
            </Field>
            <Field label="Phone link (href)">
              <TextInput value={form.phoneHref} onChange={(e) => setField("phoneHref", e.target.value)} placeholder="tel:+91…" />
            </Field>
            <Field label="WhatsApp">
              <TextInput value={form.whatsapp} onChange={(e) => setField("whatsapp", e.target.value)} />
            </Field>
            <Field label="Email">
              <TextInput value={form.email} onChange={(e) => setField("email", e.target.value)} />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Address">
              <TextArea rows={2} value={form.address} onChange={(e) => setField("address", e.target.value)} />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Map embed / link">
              <TextInput value={form.map} onChange={(e) => setField("map", e.target.value)} />
            </Field>
          </div>
        </div>

        <div className={section}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-medium text-gray-900">Opening hours</h2>
            <Button kind="secondary" onClick={() => setForm({ ...form, hours: [...form.hours, { day: "", time: "" }] })}>
              <Plus className="h-4 w-4" /> Add row
            </Button>
          </div>
          <div className="space-y-2">
            {form.hours.map((h, i) => (
              <div key={i} className="flex items-center gap-2">
                <TextInput
                  value={h.day}
                  onChange={(e) => setHour(i, "day", e.target.value)}
                  placeholder="Day(s)"
                  className="flex-1"
                />
                <TextInput value={h.time} onChange={(e) => setHour(i, "time", e.target.value)} placeholder="Time" className="flex-1" />
                <Button
                  kind="ghost"
                  onClick={() => setForm({ ...form, hours: form.hours.filter((_, x) => x !== i) })}
                  disabled={form.hours.length <= 1}
                  aria-label="Remove row"
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className={section}>
          <h2 className="mb-4 font-medium text-gray-900">Social links</h2>
          <div className="space-y-4">
            {Object.keys(EMPTY.social).map((k) => (
              <Field key={k} label={k[0].toUpperCase() + k.slice(1)}>
                <TextInput value={form.social[k] || ""} onChange={(e) => setNested("social", k, e.target.value)} />
              </Field>
            ))}
          </div>
        </div>

        <div className={section}>
          <h2 className="mb-4 font-medium text-gray-900">SEO defaults</h2>
          <div className="space-y-4">
            {Object.keys(EMPTY.seoDefaults).map((k) =>
              k === "ogImage" ? (
                <ImageUploader
                  key={k}
                  folder="settings"
                  label="OG image"
                  value={form.seoDefaults[k] || ""}
                  onChange={(url) => setNested("seoDefaults", k, url)}
                />
              ) : (
                <Field
                  key={k}
                  label={k === "siteUrl" ? "Site URL" : "Google Business Profile URL"}
                >
                  <TextInput
                    value={form.seoDefaults[k] || ""}
                    onChange={(e) => setNested("seoDefaults", k, e.target.value)}
                  />
                </Field>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}