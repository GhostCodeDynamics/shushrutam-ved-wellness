import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { api, formatDate } from "../lib/api.js";
import { Badge, Button, Card, EmptyState, ErrorBanner, PageHeader, Spinner } from "./ui.jsx";

export default function BlogList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api("/admin/blog", { query: { limit: 100 } });
      setItems(res.items);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function togglePublish(post) {
    try {
      await api(`/admin/blog/${post.id}`, { method: "PATCH", body: { isPublished: !post.isPublished } });
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function remove(post) {
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    try {
      await api(`/admin/blog/${post.id}`, { method: "DELETE" });
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <PageHeader
        title="Blog posts"
        subtitle="Write, edit and publish health condition articles."
        actions={
          <Link to="/blog/new">
            <Button>
              <Plus className="h-4 w-4" /> New post
            </Button>
          </Link>
        }
      />
      <ErrorBanner error={error} onRetry={load} />
      <Card>
        {loading ? (
          <Spinner />
        ) : items.length === 0 ? (
          <EmptyState message="No posts yet. Create your first post." />
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-400">
              <tr>
                <th className="px-5 py-3">Title</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Published</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3">
                    <div className="font-medium text-gray-900">{p.title}</div>
                    <div className="text-xs text-gray-400">/{p.slug}</div>
                  </td>
                  <td className="px-5 py-3 text-gray-600">{p.category || "—"}</td>
                  <td className="px-5 py-3">
                    <Badge color={p.isPublished ? "green" : "gray"}>{p.isPublished ? "Published" : "Draft"}</Badge>
                  </td>
                  <td className="px-5 py-3 text-gray-500">{formatDate(p.publishDate)}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Button kind="ghost" onClick={() => togglePublish(p)}>
                        {p.isPublished ? "Unpublish" : "Publish"}
                      </Button>
                      <Link to={`/blog/${p.id}`}>
                        <Button kind="ghost" aria-label={`Edit ${p.title}`}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button kind="ghost" onClick={() => remove(p)} aria-label={`Delete ${p.title}`}>
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}