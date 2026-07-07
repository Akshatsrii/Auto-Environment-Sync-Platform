import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

function SyncChart({ analytics }) {
  const data = [
    {
      name: "Success",
      value: analytics?.successfulSyncs ?? 0,
    },
    {
      name: "Failed",
      value: analytics?.failedSyncs ?? 0,
    },
  ];

  const COLORS = ["#16a34a", "#dc2626"];

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        border: "1px solid #dbeafe",
      }}
    >
      <h3>Sync Status</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="value" outerRadius={90}>
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SyncChart;