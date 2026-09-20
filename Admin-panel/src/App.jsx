import { Navigate, Route, Routes } from "react-router-dom";
import { getToken } from "./lib/api.js";
import Login from "./components/Login.jsx";
import Layout from "./components/Layout.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Appointments from "./components/Appointments.jsx";
import BlogList from "./components/BlogList.jsx";
import BlogEditor from "./components/BlogEditor.jsx";
import Content from "./components/Content.jsx";
import ClinicSettings from "./components/ClinicSettings.jsx";

function RequireAuth({ children }) {
  if (!getToken()) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="blog" element={<BlogList />} />
        <Route path="blog/new" element={<BlogEditor />} />
        <Route path="blog/:id" element={<BlogEditor />} />
        <Route path="content" element={<Content />} />
        <Route path="clinic" element={<ClinicSettings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}