import { useNavigate } from 'react-router-dom'

const stats = [
  { label: 'Repositories',      value: '24' },
  { label: 'Environment Ready', value: '18' },
  { label: 'Issues Found',      value: '06' },
  { label: 'Configs Generated', value: '31' },
]

const activity = [
  'Banking System analyzed successfully',
  'Docker configuration generated',
  'Redis dependency detected',
  'Environment validation completed',
]

const envStatus = [
  { name: 'MongoDB', status: 'Active' },
  { name: 'Redis',   status: 'Pending' },
  { name: 'Docker',  status: 'Active' },
  { name: 'Node.js', status: 'Active' },
]

function Dashboard() {
  const navigate = useNavigate()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Header */}
      <div>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#1e40af', marginBottom: '4px' }}>
          Welcome Back 👋
        </h1>
        <p style={{ color: '#64748b', fontSize: '13px' }}>
          Monitor repositories and environment synchronization.
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {stats.map(stat => (
          <div key={stat.label} style={{
            background: '#ffffff',
            border: '1px solid #bfdbfe',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 1px 4px rgba(59,130,246,0.07)',
          }}>
            <p style={{ color: '#64748b', fontSize: '12px', marginBottom: '8px' }}>{stat.label}</p>
            <p style={{ color: '#1e40af', fontSize: '28px', fontWeight: 700 }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Bottom Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

        {/* Recent Activity */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #bfdbfe',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 1px 4px rgba(59,130,246,0.07)',
        }}>
          <h2 style={{ color: '#1e40af', fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>
            Recent Activity
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {activity.map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                background: '#f0f9ff',
                borderRadius: '8px',
                fontSize: '13px',
                color: '#334155',
              }}>
                <span style={{
                  width: '6px', height: '6px',
                  borderRadius: '50%',
                  background: '#3b82f6',
                  flexShrink: 0,
                }} />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Environment Status */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #bfdbfe',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 1px 4px rgba(59,130,246,0.07)',
        }}>
          <h2 style={{ color: '#1e40af', fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>
            Environment Status
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {envStatus.map((env) => (
              <div key={env.name} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                background: '#f0f9ff',
                borderRadius: '8px',
              }}>
                <span style={{ fontSize: '13px', color: '#334155' }}>{env.name}</span>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  padding: '3px 10px',
                  borderRadius: '20px',
                  background: env.status === 'Active' ? '#dcfce7' : '#fef9c3',
                  color: env.status === 'Active' ? '#16a34a' : '#ca8a04',
                }}>
                  {env.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #bfdbfe',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 4px rgba(59,130,246,0.07)',
      }}>
        <h2 style={{ color: '#1e40af', fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>
          Quick Actions
        </h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          {[
            { label: 'Analyze Repository', path: '/environments' },
            { label: 'View Logs',          path: '/logs' },
            { label: 'Compare Environments', path: '/compare' },
          ].map(action => (
            <button
              key={action.label}
              onClick={() => navigate(action.path)}
              style={{
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: '8px',
                padding: '10px 20px',
                color: '#1d4ed8',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Dashboard