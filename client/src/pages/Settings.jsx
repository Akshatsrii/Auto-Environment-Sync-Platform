function Settings() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Header */}
      <div>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#1e40af', marginBottom: '4px' }}>
          Settings
        </h1>
        <p style={{ color: '#64748b', fontSize: '13px' }}>
          Manage your DevSync preferences and integrations.
        </p>
      </div>

      {/* GitHub Integration */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #bfdbfe',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 4px rgba(59,130,246,0.07)',
      }}>
        <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#1e40af', marginBottom: '16px' }}>
          GitHub Integration
        </h2>
        <label style={{ display: 'block', fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>
          GitHub Personal Access Token
        </label>
        <input
          type="password"
          placeholder="Enter GitHub Token"
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
      </div>

      {/* Notifications */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #bfdbfe',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 4px rgba(59,130,246,0.07)',
      }}>
        <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#1e40af', marginBottom: '16px' }}>
          Notifications
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {['Email Notifications', 'Repository Scan Alerts', 'Environment Sync Updates'].map(label => (
            <label key={label} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                style={{ width: '15px', height: '15px', accentColor: '#3b82f6' }}
              />
              <span style={{ fontSize: '13px', color: '#334155' }}>{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Preferences */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #bfdbfe',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 4px rgba(59,130,246,0.07)',
      }}>
        <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#1e40af', marginBottom: '16px' }}>
          Preferences
        </h2>
        <label style={{ display: 'block', fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>
          Default Environment
        </label>
        <select style={{
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
        }}>
          <option>Development</option>
          <option>Testing</option>
          <option>Production</option>
        </select>
      </div>

      {/* Save */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #bfdbfe',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 4px rgba(59,130,246,0.07)',
      }}>
        <button style={{
          background: '#3b82f6',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          padding: '11px 28px',
          fontSize: '14px',
          fontWeight: 600,
          fontFamily: 'inherit',
          cursor: 'pointer',
        }}>
          Save Settings
        </button>
      </div>

    </div>
  )
}

export default Settings