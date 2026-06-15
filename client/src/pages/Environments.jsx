import { useState } from "react";
function Environments() {
  const services = ['Node.js', 'MongoDB', 'Redis', 'Docker']

  const files = ['Dockerfile', 'docker-compose.yml', '.env.example', 'README.md']
 const [environments, setEnvironments] = useState([
  {
    name: "Development",
    status: "Active",
    variables: 24,
  },
  {
    name: "Staging",
    status: "Active",
    variables: 18,
  },
  {
    name: "Production",
    status: "Warning",
    variables: 20,
  },
]);
const [showModal, setShowModal] = useState(false);
const [envName, setEnvName] = useState("");
const [envVariables, setEnvVariables] = useState("");
const [envStatus, setEnvStatus] = useState("Active");
const handleAddEnvironment = () => {
  if (!envName || !envVariables) return;

  const newEnvironment = {
    name: envName,
    variables: Number(envVariables),
    status: envStatus,
  };

  setEnvironments([...environments, newEnvironment]);

  setEnvName("");
  setEnvVariables("");
  setEnvStatus("Active");

  setShowModal(false);
};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Header */}
      <div>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#1e40af', marginBottom: '4px' }}>
          Environment Overview
        </h1>
        <p style={{ color: '#64748b', fontSize: '13px' }}>
          Generated environment configuration and repository details.
        </p>
      </div>

      <div
  style={{
    display: "flex",
    justifyContent: "flex-end",
  }}
>
  <button
  onClick={() => setShowModal(true)}
  style={{
    background: "#2563eb",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 16px",
    cursor: "pointer",
    fontWeight: 500,
  }}
>
  Add Environment
</button>
</div>

      {/* Environment Cards */}

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
  }}
>
  {environments.map((env) => (
    <div
      key={env.name}
      style={{
        background: "#ffffff",
        border: "1px solid #bfdbfe",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 1px 4px rgba(59,130,246,0.07)",
      }}
    >
      <h3
        style={{
          color: "#1e40af",
          fontWeight: 600,
          marginBottom: "10px",
        }}
      >
        {env.name}
      </h3>

      <p style={{ color: "#64748b", fontSize: "13px" }}>
        Variables: {env.variables}
      </p>

      <p
        style={{
          marginTop: "10px",
          color:
            env.status === "Active"
              ? "#16a34a"
              : "#ca8a04",
          fontWeight: 600,
        }}
      >
        {env.status}
      </p>
    </div>
  ))}
</div>

{/* Environment Table */}

<div
  style={{
    background: "#ffffff",
    border: "1px solid #bfdbfe",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 1px 4px rgba(59,130,246,0.07)",
  }}
>
  <h2
    style={{
      color: "#1e40af",
      fontSize: "14px",
      fontWeight: 600,
      marginBottom: "16px",
    }}
  >
    Environment List
  </h2>

  <table
    style={{
      width: "100%",
      borderCollapse: "collapse",
    }}
  >
    <thead>
      <tr>
        <th style={{ textAlign: "left", padding: "12px" }}>
          Environment
        </th>

        <th style={{ textAlign: "left", padding: "12px" }}>
          Variables
        </th>

        <th style={{ textAlign: "left", padding: "12px" }}>
          Status
        </th>
      </tr>
    </thead>

    <tbody>
      {environments.map((env) => (
        <tr
          key={env.name}
          style={{
            borderTop: "1px solid #e2e8f0",
          }}
        >
          <td style={{ padding: "12px" }}>
            {env.name}
          </td>

          <td style={{ padding: "12px" }}>
            {env.variables}
          </td>

          <td style={{ padding: "12px" }}>
            {env.status}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      {/* Health Score */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #bfdbfe',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 1px 4px rgba(59,130,246,0.07)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#1e40af', marginBottom: '6px' }}>
            Health Score
          </h2>
          <p style={{ color: '#64748b', fontSize: '13px' }}>
            Environment is ready for deployment
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '48px', fontWeight: 700, color: '#16a34a', lineHeight: 1 }}>
            92%
          </div>
          <span style={{
            fontSize: '12px', fontWeight: 600,
            color: '#16a34a',
            background: '#dcfce7',
            padding: '3px 10px',
            borderRadius: '20px',
            marginTop: '6px',
            display: 'inline-block',
          }}>
            Ready
          </span>
        </div>
      </div>

      {/* Services + Files */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

        {/* Services */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #bfdbfe',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 1px 4px rgba(59,130,246,0.07)',
        }}>
          <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#1e40af', marginBottom: '16px' }}>
            Detected Services
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {services.map(service => (
              <span key={service} style={{
                padding: '6px 14px',
                borderRadius: '20px',
                background: '#dbeafe',
                color: '#1d4ed8',
                fontSize: '13px',
                fontWeight: 500,
              }}>
                {service}
              </span>
            ))}
          </div>
        </div>

        {/* Files */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #bfdbfe',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 1px 4px rgba(59,130,246,0.07)',
        }}>
          <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#1e40af', marginBottom: '16px' }}>
            Generated Files
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {files.map(file => (
              <div key={file} style={{
                background: '#f0f9ff',
                border: '1px solid #bfdbfe',
                borderRadius: '8px',
                padding: '10px 14px',
                fontSize: '13px',
                color: '#334155',
              }}>
                📄 {file}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Issues */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #bfdbfe',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 4px rgba(59,130,246,0.07)',
      }}>
        <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#1e40af', marginBottom: '16px' }}>
          Detected Issues
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{
            background: '#fef2f2', border: '1px solid #fecaca',
            borderRadius: '8px', padding: '10px 14px',
            fontSize: '13px', color: '#dc2626',
          }}>
            ⚠ MongoDB service not found
          </div>
          <div style={{
            background: '#fefce8', border: '1px solid #fef08a',
            borderRadius: '8px', padding: '10px 14px',
            fontSize: '13px', color: '#ca8a04',
          }}>
            ⚠ Node version mismatch
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #bfdbfe',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 4px rgba(59,130,246,0.07)',
      }}>
        <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#1e40af', marginBottom: '16px' }}>
          AI Recommendations
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            'Use Node.js 22 for better compatibility',
            'Add Redis container to docker-compose.yml',
            'Create .env.example for onboarding developers',
          ].map((rec, i) => (
            <div key={i} style={{
              background: '#f0fdf4', border: '1px solid #bbf7d0',
              borderRadius: '8px', padding: '10px 14px',
              fontSize: '13px', color: '#16a34a',
            }}>
              ✓ {rec}
            </div>
          ))}
        </div>
      </div>
      {showModal && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <div
      style={{
        background: "#ffffff",
        padding: "24px",
        borderRadius: "12px",
        width: "400px",
      }}
    >
     <h2
  style={{
    marginBottom: "16px",
    color: "#1e40af",
  }}
>
  Add Environment
</h2>

<div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "16px",
  }}
>
  <input
    type="text"
    placeholder="Environment Name"
    value={envName}
    onChange={(e) => setEnvName(e.target.value)}
    style={{
      padding: "10px",
      border: "1px solid #cbd5e1",
      borderRadius: "6px",
    }}
  />

  <input
    type="number"
    placeholder="Variables Count"
    value={envVariables}
    onChange={(e) => setEnvVariables(e.target.value)}
    style={{
      padding: "10px",
      border: "1px solid #cbd5e1",
      borderRadius: "6px",
    }}
  />

  <select
    value={envStatus}
    onChange={(e) => setEnvStatus(e.target.value)}
    style={{
      padding: "10px",
      border: "1px solid #cbd5e1",
      borderRadius: "6px",
    }}
  >
    <option>Active</option>
    <option>Warning</option>
  </select>
</div>

<button
  onClick={handleAddEnvironment}
  style={{
    background: "#2563eb",
    color: "#ffffff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "10px",
  }}
>
  Save
</button>

<button
  onClick={() => setShowModal(false)}
  style={{
    background: "#e2e8f0",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
  }}
>
  Close
</button>
    </div>
  </div>
)}

    </div>
    
  )
}

export default Environments