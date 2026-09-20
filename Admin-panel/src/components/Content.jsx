import React, { useCallback, useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { api } from "../lib/api.js";
import { Badge, Button, Card, EmptyState, ErrorBanner, Field, PageHeader, Select, Spinner, TextArea, TextInput } from "./ui.jsx";

const TABS = [
  { key: "services", label: "Services" },
  { key: "conditions", label: "Conditions" },
  { key: "faqs", label: "FAQs" },
];

export default function Content() {
  const [tab, setTab] = useState("services");
  const [data, setData] = useState({ services: [], conditions: [], groups: [], faqs: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [draft, setDraft] = useState(null);
  const [saving, setSaving] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [services, conditions, faqs] = await Promise.all([
        api("/admin/services"),
        api("/admin/conditions"),
        api("/admin/faqs"),
      ]);
      setData({ services: services.items, conditions: conditions.items, groups: conditions.groups, faqs: faqs.items });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function openCreate() {
    const kind = tab.slice(0, -1);
    if (kind === "condition") setDraft({ kind, title: "", group: "", isActive: true });
    else if (kind === "service") setDraft({ kind, title: "", description: "", icon: "", isActive: true });
    else setDraft({ kind, question: "", answer: "", isActive: true });
  }

  function openEdit(item) {
    setDraft({ ...item, kind: tab.slice(0, -1), id: item.id });
  }

  async function createGroup() {
    const name = newGroupName.trim();
    if (!name) return;
    setError("");
    try {
      const res = await api("/admin/condition-groups", { method: "POST", body: { name } });
      setData((d) => ({ ...d, groups: [...d.groups, res.group] }));
      setDraft((d) => ({ ...d, group: res.group.name }));
      setNewGroupName("");
    } catch (err) {
      setError(err.message);
    }
  }

  async function saveDraft() {
    setSaving(true);
    setError("");
    try {
      const isEdit = Boolean(draft.id);
      let body;
      if (draft.kind === "service") body = { title: draft.title, description: draft.description, icon: draft.icon, isActive: draft.isActive };
      else if (draft.kind === "faq") body = { question: draft.question, answer: draft.answer, isActive: draft.isActive };
      else body = { title: draft.title, group: draft.group, isActive: draft.isActive };

      const path = draft.kind === "service" ? "/admin/services" : draft.kind === "faq" ? "/admin/faqs" : "/admin/conditions";
      if (isEdit) await api(`${path}/${draft.id}`, { method: "PATCH", body });
      else await api(path, { method: "POST", body });
      setDraft(null);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function removeItem(item) {
    if (!window.confirm(`Delete "${item.title || item.question}"? This cannot be undone.`)) return;
    setError("");
    try {
      const path = tab === "services" ? "/admin/services" : tab === "faqs" ? "/admin/faqs" : "/admin/conditions";
      await api(`${path}/${item.id}`, { method: "DELETE" });
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function toggleActive(item) {
    setError("");
    try {
      const path = tab === "services" ? "/admin/services" : tab === "faqs" ? "/admin/faqs" : "/admin/conditions";
      await api(`${path}/${item.id}`, { method: "PATCH", body: { isActive: !(item.isActive ?? true) } });
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <Spinner />;

  const showing = tab === "services" ? data.services : tab === "faqs" ? data.faqs : data.conditions;

  return (
    <div>
      <PageHeader title="Content" subtitle="Manage the services, conditions and FAQs shown on the website." />

      <div className="mb-4 flex gap-2">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              tab === t.key ? "bg-brand text-white" : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <ErrorBanner error={error} onRetry={load} />

      <Card>
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="font-medium text-gray-900">{TABS.find((t) => t.key === tab)?.label}</h2>
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4" /> Add
          </Button>
        </div>
        {showing.length === 0 ? (
          <EmptyState message="Nothing here yet." />
        ) : (
          <ul className="divide-y divide-gray-100">
            {showing.map((item) => (
              <li key={item.id}>
                <div className="flex items-center gap-4 px-5 py-3">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{item.title || item.question}</div>
                    <div className="truncate text-xs text-gray-500">
                      {item.group || item.icon || item.description || item.answer}
                    </div>
                  </div>
                  <Badge color={(item.isActive ?? true) ? "green" : "gray"}>{(item.isActive ?? true) ? "Active" : "Hidden"}</Badge>
                  <div className="flex items-center gap-1">
                    <Button kind="ghost" onClick={() => toggleActive(item)}>
                      {(item.isActive ?? true) ? "Hide" : "Show"}
                    </Button>
                    <Button kind="ghost" onClick={() => openEdit(item)} aria-label="Edit">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button kind="ghost" onClick={() => removeItem(item)} aria-label="Delete">
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {tab === "conditions" && (
        <Card className="mt-4 p-5">
          <h2 className="mb-3 font-medium text-gray-900">Condition groups</h2>
          {data.groups.length === 0 ? (
            <p className="text-sm text-gray-500">No groups yet. Add one below so conditions can be organised.</p>
          ) : (
            <div className="mb-3 flex flex-wrap gap-2">
              {data.groups.map((g) => (
                <span key={g.id} className="rounded-full bg-brand-soft px-3 py-1 text-xs font-medium text-brand-ink">
                  {g.name}
                </span>
              ))}
            </div>
          )}
          <div className="flex max-w-md gap-2">
            <TextInput
              placeholder="New group name, e.g. Metabolic & Hormonal"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && createGroup()}
            />
            <Button kind="secondary" onClick={createGroup}>
              + Add group
            </Button>
          </div>
        </Card>
      )}

      {draft && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              {draft.id ? "Edit" : "Add"} {draft.kind === "service" ? "service" : draft.kind === "faq" ? "FAQ" : "condition"}
            </h3>
            <div className="space-y-4">
              {draft.kind === "service" && (
                <>
                  <Field label="Title">
                    <TextInput value={draft.title || ""} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
                  </Field>
                  <Field label="Description">
                    <TextArea rows={3} value={draft.description || ""} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
                  </Field>
                  <Field label="Icon name" hint="Optional display label.">
                    <TextInput value={draft.icon || ""} onChange={(e) => setDraft({ ...draft, icon: e.target.value })} />
                  </Field>
                </>
              )}
              {draft.kind === "faq" && (
                <>
                  <Field label="Question">
                    <TextInput value={draft.question || ""} onChange={(e) => setDraft({ ...draft, question: e.target.value })} />
                  </Field>
                  <Field label="Answer">
                    <TextArea rows={4} value={draft.answer || ""} onChange={(e) => setDraft({ ...draft, answer: e.target.value })} />
                  </Field>
                </>
              )}
              {draft.kind === "condition" && (
                <>
                  <Field label="Group">
                    <Select value={draft.group || ""} onChange={(e) => setDraft({ ...draft, group: e.target.value })}>
                      <option value="">Select a group…</option>
                      {data.groups.map((g) => (
                        <option key={g.id} value={g.name}>
                          {g.name}
                        </option>
                      ))}
                    </Select>
                  </Field>
                  {data.groups.length === 0 && (
                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                      <p className="mb-2 text-xs text-amber-700">No condition groups exist yet. Add one first.</p>
                      <div className="flex gap-2">
                        <TextInput
                          placeholder="Group name"
                          value={newGroupName}
                          onChange={(e) => setNewGroupName(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && createGroup()}
                        />
                        <Button kind="secondary" onClick={createGroup}>
                          Add
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand"
                  checked={draft.isActive ?? true}
                  onChange={(e) => setDraft({ ...draft, isActive: e.target.checked })}
                />
                Visible on the website
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button kind="secondary" onClick={() => setDraft(null)}>
                Cancel
              </Button>
              <Button loading={saving} onClick={saveDraft} disabled={draft.kind === "condition" && !draft.group}>
                {saving ? "Saving…" : draft.id ? "Save" : "Create"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}