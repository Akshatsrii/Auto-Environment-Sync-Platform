import { useState } from "react";
function Compare() {
  const envA = {
    label: 'Environment A',
    tag: 'Production',
    tagBg: '#dbeafe', tagColor: '#1d4ed8',
    rows: [
      { key: 'Node Version', value: 'v20',        valueColor: '#1e293b' },
      { key: 'MongoDB',      value: 'Available',  valueColor: '#16a34a' },
      { key: 'Redis',        value: 'Available',  valueColor: '#16a34a' },
      { key: 'Docker',       value: 'Configured', valueColor: '#16a34a' },
    ],
  }

  const envB = {
    label: 'Environment B',
    tag: 'Development',
    tagBg: '#f3e8ff', tagColor: '#9333ea',
    rows: [
      { key: 'Node Version', value: 'v22',        valueColor: '#1e293b' },
      { key: 'MongoDB',      value: 'Available',  valueColor: '#16a34a' },
      { key: 'Redis',        value: 'Missing',    valueColor: '#dc2626' },
      { key: 'Docker',       value: 'Configured', valueColor: '#16a34a' },
    ],
  }

  const summary = [
    { text: '✓ Both environments support MongoDB',          bg: '#f0fdf4', border: '#bbf7d0', color: '#16a34a' },
    { text: '⚠ Redis missing in Environment B',            bg: '#fefce8', border: '#fef08a', color: '#ca8a04' },
    { text: 'ℹ Environment B uses newer Node.js version',  bg: '#eff6ff', border: '#bfdbfe', color: '#1d4ed8' },
  ]

  const card = (env) => (
    <div style={{
      background: '#ffffff',
      border: '1px solid #bfdbfe',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 1px 4px rgba(59,130,246,0.07)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#1e40af' }}>{env.label}</h2>
        <span style={{
          background: env.tagBg, color: env.tagColor,
          fontSize: '12px', fontWeight: 600,
          padding: '3px 10px', borderRadius: '20px',
        }}>
          {env.tag}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {env.rows.map((row, i) => (
          <div key={row.key} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 0',
            borderBottom: i < env.rows.length - 1 ? '1px solid #f1f5f9' : 'none',
          }}>
            <span style={{ fontSize: '13px', color: '#64748b' }}>{row.key}</span>
            <span style={{ fontSize: '13px', fontWeight: 600, color: row.valueColor }}>{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
  const [environmentA, setEnvironmentA] = useState("Production");
const [environmentB, setEnvironmentB] = useState("Development");

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Header */}
      <div>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#1e40af', marginBottom: '4px' }}>
          Compare Environments
        </h1>
        <p style={{ color: '#64748b', fontSize: '13px' }}>
          Compare two repository environments side by side.
        </p>
      </div>

      <div
  style={{
    background: "#ffffff",
    border: "1px solid #bfdbfe",
    borderRadius: "12px",
    padding: "20px",
  }}
>
  <div
    style={{
      display: "flex",
      gap: "16px",
    }}
  >
    <select
      value={environmentA}
      onChange={(e) => setEnvironmentA(e.target.value)}
      style={{
        padding: "10px",
        border: "1px solid #cbd5e1",
        borderRadius: "8px",
      }}
    >
      <option>Production</option>
      <option>Development</option>
      <option>Staging</option>
    </select>

    <select
      value={environmentB}
      onChange={(e) => setEnvironmentB(e.target.value)}
      style={{
        padding: "10px",
        border: "1px solid #cbd5e1",
        borderRadius: "8px",
      }}
    >
      <option>Development</option>
      <option>Production</option>
      <option>Staging</option>
    </select>
    <button
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
  Compare
</button>
  </div>
</div>

      {/* Compare Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {card(envA)}
        {card(envB)}
      </div>

      {/* Difference Table */}

<div
  style={{
    background: "#ffffff",
    border: "1px solid #bfdbfe",
    borderRadius: "12px",
    padding: "20px",
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
    Difference Table
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
          Property
        </th>

        <th style={{ textAlign: "left", padding: "12px" }}>
          Environment A
        </th>

        <th style={{ textAlign: "left", padding: "12px" }}>
          Environment B
        </th>
      </tr>
    </thead>

    <tbody>

      <tr style={{ borderTop: "1px solid #e2e8f0" }}>
        <td style={{ padding: "12px" }}>Node Version</td>
        <td style={{ padding: "12px" }}>v20</td>
        <td style={{ padding: "12px" }}>v22</td>
      </tr>

      <tr style={{ borderTop: "1px solid #e2e8f0" }}>
        <td style={{ padding: "12px" }}>MongoDB</td>
        <td style={{ padding: "12px" }}>Available</td>
        <td style={{ padding: "12px" }}>Available</td>
      </tr>

      <tr style={{ borderTop: "1px solid #e2e8f0" }}>
        <td style={{ padding: "12px" }}>Redis</td>
        <td style={{ padding: "12px" }}>Available</td>
        <td style={{ padding: "12px" }}>Missing</td>
      </tr>

      <tr style={{ borderTop: "1px solid #e2e8f0" }}>
        <td style={{ padding: "12px" }}>Docker</td>
        <td style={{ padding: "12px" }}>Configured</td>
        <td style={{ padding: "12px" }}>Configured</td>
      </tr>

    </tbody>
  </table>
</div>

      {/* Summary */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #bfdbfe',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 4px rgba(59,130,246,0.07)',
      }}>
        <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#1e40af', marginBottom: '16px' }}>
          Comparison Summary
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {summary.map((item, i) => (
            <div key={i} style={{
              background: item.bg,
              border: `1px solid ${item.border}`,
              borderRadius: '8px',
              padding: '10px 14px',
              fontSize: '13px',
              color: item.color,
            }}>
              {item.text}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Compare