import { useLocation } from 'react-router-dom'

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

      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        background: '#dbeafe',
        padding: '6px 14px',
        borderRadius: '20px',
      }}>
        <div style={{
          width: '24px', height: '24px',
          background: '#3b82f6',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ color: '#fff', fontSize: '10px', fontWeight: 700 }}>A</span>
        </div>
        <span style={{ color: '#1d4ed8', fontSize: '13px', fontWeight: 500 }}>Akshat</span>
      </div>
    </header>
  )
}

export default Navbar