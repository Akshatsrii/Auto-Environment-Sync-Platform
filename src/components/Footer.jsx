import { useNavigate } from 'react-router-dom'

function Footer() {
  const navigate = useNavigate()

  const links = {
    Product: [
      { label: 'Dashboard',    path: '/dashboard' },
      { label: 'Environments', path: '/environments' },
      { label: 'Compare',      path: '/compare' },
      { label: 'Sync',         path: '/sync' },
    ],
    Resources: [
      { label: 'Logs',         path: '/logs' },
      { label: 'Settings',     path: '/settings' },
    ],
    Company: [
      { label: 'About',        path: '#' },
      { label: 'Contact',      path: '#' },
      { label: 'Privacy',      path: '#' },
    ],
  }

  return (
    <footer style={{
      background: '#ffffff',
      borderTop: '1px solid #bfdbfe',
      padding: '48px 32px 24px',
      flexShrink: 0,
    }}>

      {/* Top Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '40px', marginBottom: '40px' }}>

        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <div style={{
              width: '32px', height: '32px',
              background: '#3b82f6',
              borderRadius: '8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ color: '#fff', fontSize: '13px', fontWeight: 700 }}>DS</span>
            </div>
            <span style={{ color: '#1e40af', fontWeight: 700, fontSize: '16px' }}>DevSync</span>
          </div>
          <p style={{ color: '#64748b', fontSize: '13px', lineHeight: '1.7', maxWidth: '260px' }}>
            Automatically synchronize configuration settings across Development, Staging, and Production environments.
          </p>
          {/* Status Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: '#f0fdf4', border: '1px solid #bbf7d0',
            borderRadius: '20px', padding: '5px 12px', marginTop: '16px',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16a34a', display: 'inline-block' }} />
            <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: 500 }}>All systems operational</span>
          </div>
        </div>

        {/* Link Columns */}
        {Object.entries(links).map(([section, items]) => (
          <div key={section}>
            <p style={{ fontSize: '12px', fontWeight: 700, color: '#1e40af', marginBottom: '14px', letterSpacing: '0.05em' }}>
              {section.toUpperCase()}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {items.map(item => (
                <span
                  key={item.label}
                  onClick={() => item.path !== '#' && navigate(item.path)}
                  style={{
                    fontSize: '13px',
                    color: '#64748b',
                    cursor: item.path !== '#' ? 'pointer' : 'default',
                  }}
                >
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '12px', color: '#94a3b8' }}>
          © 2026 DevSync. All rights reserved.
        </span>

        {/* Tech Stack Pills */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {['React', 'Node.js', 'MongoDB', 'Docker'].map(tech => (
            <span key={tech} style={{
              background: '#eff6ff',
              border: '1px solid #bfdbfe',
              color: '#3b82f6',
              fontSize: '11px',
              fontWeight: 500,
              padding: '3px 10px',
              borderRadius: '20px',
            }}>
              {tech}
            </span>
          ))}
        </div>

        <span style={{ fontSize: '12px', color: '#94a3b8' }}>
          Built with ❤️ by <span style={{ color: '#3b82f6', fontWeight: 600 }}>Akshat</span>
        </span>
      </div>

    </footer>
  )
}

export default Footer