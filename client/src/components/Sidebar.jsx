import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/environments', label: 'Environments' },
  { to: '/compare', label: 'Compare' },
  { to: '/sync', label: 'Sync' },
  { to: '/logs', label: 'Logs' },
  { to: '/analytics', label: 'Analytics' },
  { to: "/sync-analytics", label: "Sync Analytics" },
  { to: "/environment-growth", label: "Environment Growth" },
  { to: "/top-users", label: "Top Users" },
  { to: '/versions', label: 'Version History' },
  { to: '/settings', label: 'Settings' },
]

function Sidebar() {
  const user = { role: "admin" }
  return (
    <aside
      style={{
        width: '220px',
        minHeight: '100vh',
        background: '#ffffff',
        borderRight: '1px solid #bfdbfe',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: '24px 20px',
          borderBottom: '1px solid #bfdbfe',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <div
          style={{
            width: '30px',
            height: '30px',
            background: '#3b82f6',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              color: '#fff',
              fontSize: '12px',
              fontWeight: 700,
            }}
          >
            DS
          </span>
        </div>

        <span
          style={{
            color: '#1e40af',
            fontWeight: 700,
            fontSize: '15px',
          }}
        >
          DevSync
        </span>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '12px 0' }}>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              padding: '10px 20px',
              color: isActive ? '#1d4ed8' : '#64748b',
              textDecoration: 'none',
              background: isActive ? '#dbeafe' : 'transparent',
              borderLeft: isActive
                ? '3px solid #3b82f6'
                : '3px solid transparent',
              fontSize: '13px',
              fontWeight: isActive ? 600 : 400,
            })}
          >
            {link.label}
          </NavLink>
        ))}

        {/* Role Based Approvals Link */}
        {(user?.role === 'reviewer' || user?.role === 'admin') && (
          <NavLink
            to="/approvals"
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              color: isActive ? '#1d4ed8' : '#64748b',
              textDecoration: 'none',
              background: isActive ? '#dbeafe' : 'transparent',
              borderLeft: isActive
                ? '3px solid #3b82f6'
                : '3px solid transparent',
              fontSize: '13px',
              fontWeight: isActive ? 600 : 400,
            })}
          >
           
            Approvals
          </NavLink>
        )}
      </nav>

      {/* Footer */}
      <div
        style={{
          padding: '16px 20px',
          borderTop: '1px solid #bfdbfe',
          color: '#94a3b8',
          fontSize: '11px',
        }}
      >
        v1.0.0
      </div>
    </aside>
  )
}

export default Sidebar