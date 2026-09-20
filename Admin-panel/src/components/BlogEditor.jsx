import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { api } from "../lib/api.js";
import ImageUploader from "./ImageUploader.jsx";
import { Button, Card, ErrorBanner, Field, PageHeader, Select, TextInput, TextArea } from "./ui.jsx";

const EMPTY_FORM = {
  title: "",
  slug: "",
  excerpt: "",
  category: "",
  publishDate: "",
  featuredImage: "",
  isPublished: false,
  seoTitle: "",
  seoDescription: "",
  content: [{ type: "heading", text: "" }],
};

export default function BlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEdit) return;
    api(`/admin/blog/${id}`)
      .then((res) => {
        const p = res.post;
        setForm({
          title: p.title || "",
          slug: p.slug || "",
          excerpt: p.excerpt || "",
          category: p.category || "",
          publishDate: p.publishDate ? String(p.publishDate).slice(0, 10) : "",
          featuredImage: p.featuredImage || "",
          isPublished: Boolean(p.isPublished),
          seoTitle: p.seoTitle || "",
          seoDescription: p.seoDescription || "",
          content: p.content?.length ? p.content : EMPTY_FORM.content,
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  function setField(key, value) {
    setForm({ ...form, [key]: value });
  }

  function updateBlock(index, patch) {
    const content = form.content.map((b, i) => (i === index ? { ...b, ...patch } : b));
    setForm({ ...form, content });
  }

  function addBlock() {
    setForm({ ...form, content: [...form.content, { type: "paragraph", text: "" }] });
  }

  function removeBlock(index) {
    if (form.content.length === 1) return;
    setForm({ ...form, content: form.content.filter((_, i) => i !== index) });
  }

  async function save() {
    setSaving(true);
    setError("");
    try {
      const cleanContent = form.content
        .filter((b) => (b.type === "list" ? b.items?.some(Boolean) : (b.text || "").trim() !== ""))
        .map((b) => {
          if (b.type === "list") return { type: "list", items: (b.items || []).filter(Boolean) };
          return { type: b.type, text: (b.text || "").trim() };
        });
      const body = { ...form, content: cleanContent, publishDate: form.publishDate || undefined };
      if (isEdit) {
        await api(`/admin/blog/${id}`, { method: "PATCH", body });
      } else {
        await api("/admin/blog", { method: "POST", body });
      }
      navigate("/blog");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="py-10 text-center text-sm text-gray-400">Loading post…</div>;

  return (
    <div className="max-w-3xl">
      <PageHeader
        title={isEdit ? "Edit post" : "New post"}
        actions={
          <Link to="/blog">
            <Button kind="secondary">
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          </Link>
        }
      />
      <ErrorBanner error={error} />

      <div className="space-y-4">
        <Card className="space-y-4 p-6">
          <Field label="Title">
            <TextInput value={form.title} onChange={(e) => setField("title", e.target.value)} required />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Slug" hint="Leave blank to auto-generate from the title.">
              <TextInput value={form.slug} onChange={(e) => setField("slug", e.target.value)} />
            </Field>
            <Field label="Category">
              <TextInput value={form.category} onChange={(e) => setField("category", e.target.value)} />
            </Field>
          </div>
          <Field label="Excerpt">
            <TextArea rows={2} value={form.excerpt} onChange={(e) => setField("excerpt", e.target.value)} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Publish date" hint="YYYY-MM-DD">
              <TextInput type="date" value={form.publishDate} onChange={(e) => setField("publishDate", e.target.value)} />
            </Field>
          </div>
          <ImageUploader
            folder="blog"
            value={form.featuredImage}
            onChange={(url) => setField("featuredImage", url)}
          />
        </Card>

        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-medium text-gray-900">Content blocks</h2>
            <Button kind="secondary" onClick={addBlock}>
              <Plus className="h-4 w-4" /> Add block
            </Button>
          </div>
          <div className="space-y-4">
            {form.content.map((block, i) => (
              <div key={i} className="rounded-lg border border-gray-200 p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <Select
                    value={block.type}
                    onChange={(e) => updateBlock(i, { type: e.target.value, text: e.target.value === "list" ? undefined : (block.text || ""), items: e.target.value === "list" ? (block.items || [""]) : undefined })}
                    className="!w-40"
                    aria-label="Block type"
                  >
                    <option value="heading">Heading</option>
                    <option value="paragraph">Paragraph</option>
                    <option value="list">List</option>
                  </Select>
                  <Button kind="ghost" onClick={() => removeBlock(i)} aria-label="Remove block" disabled={form.content.length === 1}>
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
                {block.type === "list" ? (
                  <div className="space-y-2">
                    {(block.items || [""]).map((itemText, j) => (
                      <div key={j} className="flex gap-2">
                        <TextInput
                          value={itemText || ""}
                          onChange={(e) => {
                            const items = [...(block.items || [""])];
                            items[j] = e.target.value;
                            updateBlock(i, { items });
                          }}
                          placeholder="List item"
                        />
                        <Button kind="ghost" onClick={() => updateBlock(i, { items: (block.items || [""]).filter((_, x) => x !== j) })} disabled={(block.items || []).length <= 1}>
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    ))}
                    <Button kind="secondary" onClick={() => updateBlock(i, { items: [...(block.items || []), ""] })}>
                      <Plus className="h-4 w-4" /> Add item
                    </Button>
                  </div>
                ) : (
                  <TextArea
                    rows={block.type === "heading" ? 1 : 3}
                    value={block.text || ""}
                    onChange={(e) => updateBlock(i, { text: e.target.value })}
                    placeholder={block.type === "heading" ? "Heading text" : "Paragraph text"}
                  />
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card className="space-y-4 p-6">
          <h2 className="font-medium text-gray-900">SEO</h2>
          <Field label="Meta title" hint="Leave blank to use the post title.">
            <TextInput value={form.seoTitle} onChange={(e) => setField("seoTitle", e.target.value)} />
          </Field>
          <Field label="Meta description">
            <TextArea rows={2} value={form.seoDescription} onChange={(e) => setField("seoDescription", e.target.value)} />
          </Field>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand"
              checked={form.isPublished}
              onChange={(e) => setField("isPublished", e.target.checked)}
            />
            Published (visible to the public)
          </label>
        </Card>

        <div className="flex justify-end gap-3 pb-8">
          <Link to="/blog">
            <Button kind="secondary">Cancel</Button>
          </Link>
          <Button loading={saving} onClick={save}>
            {saving ? "Saving…" : isEdit ? "Save changes" : "Create post"}
          </Button>
        </div>
      </div>
    </div>
  );
}