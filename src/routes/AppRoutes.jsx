import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Sync from "../pages/Sync";
import Environments from "../pages/Environments";
import Compare from "../pages/Compare";
import Logs from "../pages/Logs";
import Settings from "../pages/Settings";

function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route element={<MainLayout />}>

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sync" element={<Sync />} />
          <Route path="/environments" element={<Environments />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/settings" element={<Settings />} />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;