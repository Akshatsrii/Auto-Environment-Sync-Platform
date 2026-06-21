import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import AuthLayout from '../layouts/AuthLayout'
import Dashboard from '../pages/Dashboard'
import Environments from '../pages/Environments'
import Compare from '../pages/Compare'
import Sync from '../pages/Sync'
import Logs from '../pages/Logs'
import Settings from '../pages/Settings'
import Login from '../pages/Login'
import Register from '../pages/Register'
import VersionHistory from "../pages/VersionHistory";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="login"    element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard"    element={<Dashboard />} />
        <Route path="environments" element={<Environments />} />
        <Route path="compare"      element={<Compare />} />
        <Route path="sync"         element={<Sync />} />
        <Route path="logs"         element={<Logs />} />
        <Route path="settings"     element={<Settings />} />
      <Route path="versions/:envId" element={<VersionHistory />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes