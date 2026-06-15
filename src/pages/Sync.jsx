import { useState } from "react";
function Sync() {
  const workflow = [
    { label: 'Repository Connected',   color: '#16a34a' },
    { label: 'Dependencies Detected',  color: '#3b82f6' },
    { label: 'Docker Generation',      color: '#9333ea' },
    { label: 'Environment Validation', color: '#ca8a04' },
  ]

  const services = [
    { label: 'Node.js',  bg: '#dbeafe', color: '#1d4ed8' },
    { label: 'MongoDB',  bg: '#dcfce7', color: '#16a34a' },
    { label: 'Redis',    bg: '#fef9c3', color: '#ca8a04' },
    { label: 'Docker',   bg: '#f3e8ff', color: '#9333ea' },
  ]

  const preview = [
    { label: 'Repository', value: 'Banking System' },
    { label: 'Owner',      value: 'RiyaBansal' },
    { label: 'Language',   value: 'JavaScript' },
  ]

  const changes = [
  {
    type: "Add",
    item: "REDIS_URL variable",
  },
  {
    type: "Update",
    item: "NODE_VERSION",
  },
  {
    type: "Delete",
    item: "OLD_API_KEY",
  },
];
const [repoUrl, setRepoUrl] = useState("");
const [analyzed, setAnalyzed] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Header */}
      <div>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#1e40af', marginBottom: '4px' }}>
          Sync Repository
        </h1>
       <div>
  <h1>Sync Repository</h1>

  <p>
    Analyze repositories and generate environments.
  </p>

</div>
      </div>

      {/* GitHub URL Input */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #bfdbfe',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 4px rgba(59,130,246,0.07)',
      }}>
        <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#1e40af', marginBottom: '16px' }}>
          GitHub Repository
        </h2>
        <input
          type="text"
          placeholder="https://github.com/user/repository"
          value={repoUrl}
onChange={(e) => setRepoUrl(e.target.value)}
          style={{
            width: '100%',
            background: '#f0f9ff',
            border: '1px solid #bfdbfe',
            borderRadius: '8px',
            padding: '10px 14px',
            fontSize: '13px',
            color: '#1e293b',
            fontFamily: 'inherit',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
        <button onClick={() => {
  if (repoUrl.trim() !== "") {
    setAnalyzed(true);
  }
}}   style={{
          marginTop: '12px',
          background: '#3b82f6',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          padding: '10px 20px',
          fontSize: '13px',
          fontWeight: 600,
          fontFamily: 'inherit',
          cursor: 'pointer',
        }}>
          Analyze Repository
        </button>
      </div>

      {/* Repository Preview */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #bfdbfe',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 4px rgba(59,130,246,0.07)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#1e40af' }}>
            Repository Preview
          </h2>
          <span style={{
            background: '#dcfce7', color: '#16a34a',
            fontSize: '12px', fontWeight: 600,
            padding: '3px 10px', borderRadius: '20px',
          }}>
            Ready
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {preview.map(item => (
            <div key={item.label} style={{
              background: '#f0f9ff',
              border: '1px solid #bfdbfe',
              borderRadius: '8px',
              padding: '12px 14px',
            }}>
              <p style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>{item.label}</p>
              <p style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Analysis Workflow */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #bfdbfe',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 4px rgba(59,130,246,0.07)',
      }}>
        <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#1e40af', marginBottom: '16px' }}>
          Analysis Workflow
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {workflow.map(step => (
            <div key={step.label} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: '#f0f9ff',
              border: '1px solid #bfdbfe',
              borderRadius: '8px',
              padding: '12px 14px',
              fontSize: '13px',
              color: '#334155',
            }}>
              <span style={{
                width: '10px', height: '10px',
                borderRadius: '50%',
                background: step.color,
                flexShrink: 0,
              }} />
              {step.label}
            </div>
          ))}
        </div>
      </div>

      {/* Detected Services */}
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
          {services.map(s => (
            <span key={s.label} style={{
              background: s.bg,
              color: s.color,
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 500,
            }}>
              {s.label}
            </span>
          ))}
        </div>
        </div>

        {/* Changes Preview */}

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
      fontSize: "14px",
      fontWeight: 600,
      color: "#1e40af",
      marginBottom: "16px",
    }}
  >
    Changes Preview
  </h2>

  {changes.map((change, index) => (
  <div
    key={index}
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "14px 12px",
      marginBottom: "8px",
      background: "#f8fafc",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
    }}
  >
    <span>{change.item}</span>

    <span
      style={{
        background:
          change.type === "Add"
            ? "#dcfce7"
            : change.type === "Update"
            ? "#dbeafe"
            : "#fee2e2",

        color:
          change.type === "Add"
            ? "#16a34a"
            : change.type === "Update"
            ? "#2563eb"
            : "#dc2626",

        padding: "4px 10px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: 600,
      }}
    >
      {change.type}
    </span>
  </div>
))}
</div>
      </div>
  )
}

export default Sync