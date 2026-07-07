import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

import Dashboard from "../pages/Dashboard";
import Environments from "../pages/Environments";
import Compare from "../pages/Compare";
import Sync from "../pages/Sync";
import Logs from "../pages/Logs";
import Settings from "../pages/Settings";
import Login from "../pages/Login";
import Register from "../pages/Register";
import VersionHistory from "../pages/VersionHistory";
import ApprovalQueue from "../pages/ApprovalQueue";
import Unauthorized from "../pages/Unauthorized";
import AnalyticsDashboard from "../pages/AnalyticsDashboard";
import SyncAnalytics from "../pages/SyncAnalytics";
import EnvironmentGrowth from "../pages/EnvironmentGrowth";
import TopUsers from "../pages/TopUsers";

import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Main App Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />

    <Route
  path="dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="environments"
  element={
    <ProtectedRoute>
      <Environments />
    </ProtectedRoute>
  }
/>

<Route
  path="compare"
  element={
    <ProtectedRoute>
      <Compare />
    </ProtectedRoute>
  }
/>

<Route
  path="sync"
  element={
    <ProtectedRoute>
      <Sync />
    </ProtectedRoute>
  }
/>

<Route
  path="logs"
  element={
    <ProtectedRoute>
      <Logs />
    </ProtectedRoute>
  }
/>

<Route
  path="settings"
  element={
    <ProtectedRoute>
      <Settings />
    </ProtectedRoute>
  }
/>

<Route
  path="analytics"
  element={
    <ProtectedRoute>
      <AnalyticsDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="sync-analytics"
  element={
    <ProtectedRoute>
      <SyncAnalytics />
    </ProtectedRoute>
  }
/>

<Route
  path="environment-growth"
  element={
    <ProtectedRoute>
      <EnvironmentGrowth />
    </ProtectedRoute>
  }
/>

<Route
  path="top-users"
  element={
    <ProtectedRoute>
      <TopUsers />
    </ProtectedRoute>
  }
/>

<Route
  path="versions"
  element={
    <ProtectedRoute>
      <VersionHistory />
    </ProtectedRoute>
  }
/>
        <Route
          path="approvals"
          element={
            <ProtectedRoute allowedRoles={["reviewer", "admin"]}>
              <ApprovalQueue />
            </ProtectedRoute>
          }
        />

        <Route
          path="unauthorized"
          element={<Unauthorized />}
        />
      </Route>
    </Routes>
  );
}

export default AppRoutes; 