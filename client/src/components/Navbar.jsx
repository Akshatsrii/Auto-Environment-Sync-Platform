import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import NotificationCenter from './NotificationCenter'

const titles = {
  '/dashboard':    'Dashboard',
  '/environments': 'Environments',
  '/compare':      'Compare',
  '/sync':         'Sync',
  '/logs':         'Logs',
  '/settings':     'Settings',
}

function Navbar() {
  const { pathname } = useLocation()
  const title = titles[pathname] ?? 'DevSync'

  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const userName = user?.name || 'User'
  const initial = userName.charAt(0).toUpperCase()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header style={{
      height: '56px',
      background: '#ffffff',
      borderBottom: '1px solid #bfdbfe',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      flexShrink: 0,
    }}>
      <span style={{ color: '#1e40af', fontSize: '15px', fontWeight: 600 }}>
        {title}
      </span>

    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <NotificationCenter />
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: '#dbeafe',
        padding: '6px 14px',
        borderRadius: '20px',
      }}>
    <div style={{
      width: '24px',
      height: '24px',
      background: '#3b82f6',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <span style={{ color: '#fff', fontSize: '10px', fontWeight: 700 }}>
        {initial}
      </span>
    </div>

    <span style={{ color: '#1d4ed8', fontSize: '13px', fontWeight: 500 }}>
      {userName}
    </span>
  </div>

  <button
    onClick={handleLogout}
    style={{
      background: '#ef4444',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      padding: '8px 14px',
      cursor: 'pointer',
      fontSize: '13px',
      fontWeight: 600,
    }}
  >
    Logout
  </button>
</div>
    </header>
  )
}

export default Navbar