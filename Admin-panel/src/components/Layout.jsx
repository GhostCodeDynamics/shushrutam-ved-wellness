import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { CalendarCheck, ClipboardList, LayoutDashboard, Leaf, LogOut, Settings, FileText } from "lucide-react";
import { api, clearToken, getToken } from "../lib/api.js";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/appointments", label: "Appointments", icon: CalendarCheck },
  { to: "/blog", label: "Blog", icon: FileText },
  { to: "/content", label: "Content", icon: ClipboardList },
  { to: "/clinic", label: "Clinic", icon: Settings },
];

export default function Layout() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    api("/auth/me")
      .then((res) => setAdmin(res.admin))
      .catch(() => {});
  }, []);

  function logout() {
    api("/auth/logout", { method: "POST" }).catch(() => {});
    clearToken();
    navigate("/login", { replace: true });
  }

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-60 shrink-0 flex-col border-r border-gray-200 bg-white">
        <div className="flex items-center gap-2 px-5 py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-white">
            <Leaf className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900">ShushrutamVed</div>
            <div className="text-xs text-gray-400">Care Admin</div>
          </div>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-2">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive ? "bg-brand-soft text-brand-ink" : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-gray-200 p-3">
          <div className="mb-2 truncate px-1 text-xs text-gray-500">{admin?.email || "…"}</div>
          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto px-8 py-8">{getToken() ? <Outlet /> : null}</main>
    </div>
  );
}