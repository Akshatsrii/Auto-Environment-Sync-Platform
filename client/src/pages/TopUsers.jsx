import { useEffect, useState } from "react";
import { getTopUsers } from "../services/topUsersService";

function TopUsers() {
  const [data, setData] = useState(null);
  const [tab, setTab] = useState("envs");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const res = await getTopUsers();
      setData(res);
    } catch (err) {
      console.error(err);
    }
  }

  if (!data) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>

      <h1 style={{ marginBottom: "25px" }}>
        Top Users
      </h1>

      {/* Platform Stats */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <Card
          title="Users"
          value={data.platformStats.totalUsers}
        />

        <Card
          title="Environments"
          value={data.platformStats.totalEnvs}
        />

        <Card
          title="Sync Logs"
          value={data.platformStats.totalSyncs}
        />
      </div>

      {/* Tabs */}

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "25px",
        }}
      >
        <button
          onClick={() => setTab("envs")}
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            background:
              tab === "envs"
                ? "#2563eb"
                : "#e5e7eb",
            color:
              tab === "envs"
                ? "#fff"
                : "#000",
            cursor: "pointer",
          }}
        >
          By Environments
        </button>

        <button
          onClick={() => setTab("syncs")}
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            background:
              tab === "syncs"
                ? "#2563eb"
                : "#e5e7eb",
            color:
              tab === "syncs"
                ? "#fff"
                : "#000",
            cursor: "pointer",
          }}
        >
          By Syncs
        </button>
      </div>

      {/* Table */}

      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead
            style={{
              background: "#dbeafe",
            }}
          >
            <tr>
              <th style={th}>Rank</th>
              <th style={th}>Name</th>
              <th style={th}>Email</th>

              {tab === "envs" ? (
                <th style={th}>
                  Environments
                </th>
              ) : (
                <th style={th}>
                  Sync Logs
                </th>
              )}
            </tr>
          </thead>

          <tbody>

            {(tab === "envs"
              ? data.topByEnvironments
              : data.topBySyncs
            ).map((user, index) => (

              <tr key={user._id}>

                <td style={td}>
                  {index + 1}
                </td>

                <td style={td}>
                  {user.name}
                </td>

                <td style={td}>
                  {user.email}
                </td>

                <td style={td}>
                  {tab === "envs"
                    ? user.envCount
                    : user.syncCount}
                </td>

              </tr>

            ))}

          </tbody>
        </table>
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

const th = {
  padding: "14px",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
};

const td = {
  padding: "14px",
  borderBottom: "1px solid #eee",
};

export default TopUsers;