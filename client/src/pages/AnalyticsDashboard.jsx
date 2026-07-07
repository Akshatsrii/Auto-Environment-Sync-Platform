import { useEffect, useState } from "react";

import StatsCards from "../components/analytics/StatsCards";
import SyncChart from "../components/analytics/SyncChart";
import DriftChart from "../components/analytics/DriftChart";

import {
  getAnalytics,
  exportPDF,
  exportExcel,
} from "../services/analyticsService";

function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    try {
      const data = await getAnalytics();
      setAnalytics(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h1>Analytics Dashboard</h1>

        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={exportPDF}>
            Export PDF
          </button>

          <button onClick={exportExcel}>
            Export Excel
          </button>
        </div>
      </div>

      <StatsCards analytics={analytics} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >
        <SyncChart analytics={analytics} />
        <DriftChart analytics={analytics} />
      </div>
    </div>
  );
}

export default AnalyticsDashboard;