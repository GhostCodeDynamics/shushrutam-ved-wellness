import React, { useCallback, useEffect, useState } from "react";
import { Eye, Phone, Trash2, X } from "lucide-react";
import { api, formatDateTime } from "../lib/api.js";
import { Badge, Button, Card, EmptyState, ErrorBanner, PageHeader, Select, Spinner, STATUS_COLORS, TextInput } from "./ui.jsx";

const PAGE_SIZE = 20;
const NEXT_STATUS = {
  pending: ["confirmed", "rejected", "cancelled"],
  confirmed: ["completed", "cancelled"],
  completed: [],
  cancelled: [],
  rejected: [],
};

export default function Appointments() {
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [filters, setFilters] = useState({ status: "", search: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  const [errorBox, setErrorBox] = useState("");

  const load = useCallback(async (page = 1) => {
    setLoading(true);
    setError("");
    try {
      const res = await api("/admin/appointments", {
        query: { status: filters.status, search: filters.search, page, limit: PAGE_SIZE },
      });
      setItems(res.items);
      setPagination(res.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters.status, filters.search]);

  useEffect(() => {
    load(1);
  }, [load]);

  async function changeStatus(item, status) {
    setErrorBox("");
    try {
      const res = await api(`/admin/appointments/${item.id}`, { method: "PATCH", body: { status } });
      if (selected?.id === item.id) setSelected(res.appointment);
      await load(pagination.page);
    } catch (err) {
      setErrorBox(err.message);
    }
  }

  async function remove(item) {
    if (!window.confirm(`Delete appointment ${item.ref}? This cannot be undone.`)) return;
    setErrorBox("");
    try {
      await api(`/admin/appointments/${item.id}`, { method: "DELETE" });
      setSelected(null);
      await load(pagination.page);
    } catch (err) {
      setErrorBox(err.message);
    }
  }

  function searchNow() {
    load(1);
  }

  return (
    <div>
      <PageHeader
        title="Appointments"
        subtitle={`${pagination.total} total enquiries`}
        actions={
          <div className="flex items-center gap-2">
            <Select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="!w-40"
            >
              <option value="">All statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="rejected">Rejected</option>
            </Select>
            <TextInput
              placeholder="Search name / ref / phone"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && searchNow()}
              className="!w-56"
            />
            <Button kind="secondary" onClick={searchNow}>
              Search
            </Button>
          </div>
        }
      />

      <ErrorBanner error={error} onRetry={() => load(pagination.page)} />
      <ErrorBanner error={errorBox} />

      {selected && (
        <div className="mb-4 rounded-xl border border-brand/30 bg-brand-soft p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-gray-900">{selected.name}</h2>
                <Badge color={STATUS_COLORS[selected.status]}>{selected.status}</Badge>
              </div>
              <p className="mt-1 text-sm text-gray-600">{selected.ref} · Requested {formatDateTime(selected.createdAt)}</p>
            </div>
            <Button kind="ghost" onClick={() => setSelected(null)} aria-label="Close details">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-sm md:grid-cols-3">
            <div>
              <dt className="text-gray-500">Phone</dt>
              <dd className="font-medium">{selected.phone}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Email</dt>
              <dd className="font-medium">{selected.email || "—"}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Service</dt>
              <dd className="font-medium">{selected.service || "—"}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Preferred date</dt>
              <dd className="font-medium">{formatDateTime(selected.preferredDate)}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Preferred time</dt>
              <dd className="font-medium">{selected.preferredTime || "—"}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Source</dt>
              <dd className="font-medium">{selected.source || "—"}</dd>
            </div>
            <div className="col-span-2 md:col-span-3">
              <dt className="text-gray-500">Message</dt>
              <dd className="whitespace-pre-wrap text-gray-800">{selected.message || "—"}</dd>
            </div>
            {selected.notes && (
              <div className="col-span-2 md:col-span-3">
                <dt className="text-gray-500">Internal notes</dt>
                <dd className="whitespace-pre-wrap text-gray-800">{selected.notes}</dd>
              </div>
            )}
            {selected.cancelledAt && (
              <div>
                <dt className="text-gray-500">Cancelled at</dt>
                <dd className="font-medium">{formatDateTime(selected.cancelledAt)}</dd>
              </div>
            )}
            {selected.completedAt && (
              <div>
                <dt className="text-gray-500">Completed at</dt>
                <dd className="font-medium">{formatDateTime(selected.completedAt)}</dd>
              </div>
            )}
          </dl>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Select
              value={selected.status}
              onChange={(e) => changeStatus(selected, e.target.value)}
              className="!w-44"
              aria-label="Change status"
            >
              {[selected.status, ...NEXT_STATUS[selected.status]].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
            <Button kind="danger" onClick={() => remove(selected)}>
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      )}

      <Card>
        {loading ? (
          <Spinner />
        ) : items.length === 0 ? (
          <EmptyState message="No appointments match this filter." />
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-400">
              <tr>
                <th className="px-5 py-3">Patient</th>
                <th className="px-5 py-3">Service</th>
                <th className="px-5 py-3">Preferred</th>
                <th className="px-5 py-3">Received</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3">
                    <div className="font-medium text-gray-900">
                      {a.name} <span className="ml-1 font-normal text-gray-400">{a.ref}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Phone className="h-3 w-3" /> {a.phone}
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-600">{a.service || "—"}</td>
                  <td className="px-5 py-3 text-gray-600">
                    {formatDateTime(a.preferredDate)}
                    {a.preferredTime ? ` · ${a.preferredTime.split("(")[0].trim()}` : ""}
                  </td>
                  <td className="px-5 py-3 text-gray-500">{formatDateTime(a.createdAt)}</td>
                  <td className="px-5 py-3">
                    <Badge color={STATUS_COLORS[a.status]}>{a.status}</Badge>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Button kind="ghost" onClick={() => setSelected(a)} aria-label={`Open ${a.ref}`}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      {pagination.pages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-3 text-sm">
          <Button kind="secondary" disabled={pagination.page <= 1} onClick={() => load(pagination.page - 1)}>
            Prev
          </Button>
          <span className="text-gray-500">
            Page {pagination.page} of {pagination.pages}
          </span>
          <Button kind="secondary" disabled={pagination.page >= pagination.pages} onClick={() => load(pagination.page + 1)}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
}