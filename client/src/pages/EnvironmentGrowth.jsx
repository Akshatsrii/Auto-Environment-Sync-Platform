import { useEffect, useState } from "react";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { getEnvironmentGrowth } from "../services/environmentGrowthService";

const COLORS = ["#22c55e", "#ef4444"];

function EnvironmentGrowth() {
  const [data, setData] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const res = await getEnvironmentGrowth();
      setData(res);
    } catch (err) {
      console.error(err);
    }
  }

  if (!data) {
    return <h3>Loading...</h3>;
  }

  const driftData = [
    {
      name: "Synced",
      value: data.driftSummary.synced,
    },
    {
      name: "Drifted",
      value: data.driftSummary.drifted,
    },
  ];

  return (
    <div>

      <h1 style={{ marginBottom: 25 }}>
        Environment Growth
      </h1>

      {/* Cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <Card
          title="Total Environments"
          value={
            data.statusSummary.active +
            data.statusSummary.inactive
          }
        />

        <Card
          title="Active"
          value={data.statusSummary.active}
        />

        <Card
          title="Inactive"
          value={data.statusSummary.inactive}
        />

        <Card
          title="Synced"
          value={data.driftSummary.synced}
        />
      </div>

      {/* Charts */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "25px",
          marginBottom: "30px",
        }}
      >
        {/* Area Chart */}

        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h3>Environment Growth</h3>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <AreaChart
              data={data.monthlyGrowth}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="cumulative"
                fill="#3b82f6"
                stroke="#2563eb"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie */}

        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h3>Drift Status</h3>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <PieChart>
              <Pie
                data={driftData}
                dataKey="value"
                outerRadius={90}
                label
              >
                {driftData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Legend />

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Variables */}

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        <h3>Variables Per Environment</h3>

        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <BarChart
            data={data.variableGrowth}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="variables"
              fill="#16a34a"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
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
      <h2>{value}</h2>

      <p>{title}</p>
    </div>
  );
}

export default EnvironmentGrowth;