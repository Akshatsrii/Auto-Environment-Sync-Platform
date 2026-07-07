import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
 XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { getSyncAnalytics } from "../services/syncAnalyticsService";

function SyncAnalytics() {
  const [data, setData] = useState(null);
  const [period, setPeriod] = useState(30);

  useEffect(() => {
    loadData();
  }, [period]);

  async function loadData() {
    try {
      const res = await getSyncAnalytics(period);
      setData(res);
    } catch (err) {
      console.error(err);
    }
  }

  const successRate = data
    ? Math.round(
        (data.statusBreakdown.completed /
          Math.max(
            data.statusBreakdown.completed +
              data.statusBreakdown.failed,
            1
          )) *
          100
      )
    : 0;

  return (
    <div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "25px",
          alignItems: "center",
        }}
      >
        <h1>Sync Analytics</h1>

        <select
          value={period}
          onChange={(e) => setPeriod(Number(e.target.value))}
        >
          <option value={7}>Last 7 Days</option>
          <option value={30}>Last 30 Days</option>
          <option value={90}>Last 90 Days</option>
        </select>
      </div>

      {data && (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "20px",
              marginBottom: "25px",
            }}
          >
            <Card
              title="Success Rate"
              value={`${successRate}%`}
            />

            <Card
              title="Completed"
              value={data.statusBreakdown.completed}
            />

            <Card
              title="Failed"
              value={data.statusBreakdown.failed}
            />

            <Card
              title="Queued"
              value={data.statusBreakdown.queued}
            />
          </div>

          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "12px",
            }}
          >
            <ResponsiveContainer
              width="100%"
              height={350}
            >
              <BarChart data={data.trend}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="date" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="completed"
                  fill="#16a34a"
                />

                <Bar
                  dataKey="failed"
                  fill="#dc2626"
                />

                <Bar
                  dataKey="queued"
                  fill="#64748b"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        textAlign: "center",
      }}
    >
      <h3>{value}</h3>

      <p>{title}</p>
    </div>
  );
}

export default SyncAnalytics;