import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function DriftChart({ analytics }) {
  const data = [
    {
      name: "Synced",
      value: analytics?.syncedEnvironments ?? 0,
    },
    {
      name: "Drifted",
      value: analytics?.driftedEnvironments ?? 0,
    },
  ];

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        border: "1px solid #dbeafe",
      }}
    >
      <h3>Environment Status</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DriftChart;