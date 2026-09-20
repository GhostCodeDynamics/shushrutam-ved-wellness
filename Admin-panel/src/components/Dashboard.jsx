import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarCheck, FileText, ClipboardList, HelpCircle, ListChecks } from "lucide-react";
import { api, formatDate } from "../lib/api.js";
import { Badge, Card, EmptyState, ErrorBanner, PageHeader, Spinner, STATUS_COLORS } from "./ui.jsx";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  async function load() {
    setError("");
    setData(null);
    try {
      setData(await api("/admin/dashboard"));
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (error) {
    return (
      <div>
        <PageHeader title="Dashboard" />
        <ErrorBanner error={error} onRetry={load} />
      </div>
    );
  }
  if (!data) return <Spinner label="Loading dashboard…" />;

  const { counts, recentEnquiries } = data;

  const tiles = [
    { label: "Pending", value: counts.pending, color: "text-amber-600", icon: CalendarCheck },
    { label: "Today", value: counts.today, color: "text-brand", icon: ListChecks },
    { label: "Total enquiries", value: counts.total, color: "text-gray-800", icon: ClipboardList },
    { label: "Appointments", value: counts.appointments, color: "text-gray-800", icon: CalendarCheck },
    { label: "Published posts", value: counts.publishedBlogs, color: "text-blue-600", icon: FileText },
    { label: "Services", value: counts.services, color: "text-gray-800", icon: ClipboardList },
    { label: "FAQs", value: counts.faqs, color: "text-gray-800", icon: HelpCircle },
    { label: "Conditions", value: counts.conditions, color: "text-gray-800", icon: ListChecks },
  ];

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Welcome back. Here is today's overview." />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {tiles.map((t) => (
          <Card key={t.label} className="p-5">
            <t.icon className={`mb-2 h-5 w-5 ${t.color}`} />
            <div className={`text-2xl font-semibold ${t.color}`}>{t.value}</div>
            <div className="text-sm text-gray-500">{t.label}</div>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="font-medium text-gray-900">Recent enquiries</h2>
          <Link to="/appointments" className="text-sm font-medium text-brand hover:underline">
            View all
          </Link>
        </div>
        {recentEnquiries.length === 0 ? (
          <EmptyState message="No enquiries yet." />
        ) : (
          <ul className="divide-y divide-gray-100">
            {recentEnquiries.map((a) => (
              <li key={a.id} className="flex items-center justify-between gap-4 px-5 py-3">
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {a.name} <span className="ml-1 font-normal text-gray-400">{a.ref}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {a.preferredDate ? formatDate(a.preferredDate) : "No date"} · {a.service || "No service"} · {formatDate(a.createdAt)}
                  </div>
                </div>
                <Badge color={STATUS_COLORS[a.status]}>{a.status}</Badge>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}