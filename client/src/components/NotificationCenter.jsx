import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'

let socket = null

function NotificationCenter() {
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)

  const token = localStorage.getItem('token')
  const user  = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(() => {
    fetchNotifications()
    connectSocket()
    return () => socket?.disconnect()
  }, [])

  function connectSocket() {
    socket = io('http://localhost:4000')
    socket.emit('join', user.id)
    socket.on('notification', (notif) => {
      setNotifications(prev => [notif, ...prev])
      setUnreadCount(prev => prev + 1)
    })
  }

  async function fetchNotifications() {
    try {
      const res = await fetch('http://localhost:4000/api/notifications', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setNotifications(data.notifications || [])
      setUnreadCount(data.unreadCount || 0)
    } catch (err) {
      console.error('Failed to fetch notifications:', err)
    }
  }

  async function markAsRead(id) {
    await fetch(`http://localhost:4000/api/notifications/${id}/read`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
    })
    setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n))
    setUnreadCount(prev => Math.max(0, prev - 1))
  }

  async function markAllAsRead() {
    await fetch('http://localhost:4000/api/notifications/read-all', {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
    })
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    setUnreadCount(0)
  }

  async function deleteNotification(id) {
    await fetch(`http://localhost:4000/api/notifications/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    setNotifications(prev => prev.filter(n => n._id !== id))
  }

  const typeStyle = (type) => {
    if (type === 'sync')  return 'bg-green-100 text-green-700'
    if (type === 'drift') return 'bg-yellow-100 text-yellow-700'
    if (type === 'error') return 'bg-red-100 text-red-600'
    return 'bg-blue-100 text-blue-700'
  }

  const typeIcon = (type) => {
    if (type === 'sync')  return '✓'
    if (type === 'drift') return '⚠'
    if (type === 'error') return '✕'
    return 'ℹ'
  }

  return (
    <div style={{ position: 'relative' }}>

      {/* Bell Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: 'relative',
          background: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: '8px',
          padding: '8px 12px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        🔔
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '-6px', right: '-6px',
            background: '#dc2626',
            color: '#fff',
            fontSize: '10px',
            fontWeight: 700,
            width: '18px', height: '18px',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: 'absolute',
          top: '44px', right: 0,
          width: '360px',
          background: '#ffffff',
          border: '1px solid #bfdbfe',
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(59,130,246,0.12)',
          zIndex: 100,
          overflow: 'hidden',
        }}>

          {/* Header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '16px 16px 12px',
            borderBottom: '1px solid #e2e8f0',
          }}>
            <span style={{ fontWeight: 700, fontSize: '14px', color: '#1e40af' }}>
              Notifications {unreadCount > 0 && `(${unreadCount})`}
            </span>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                style={{
                  background: 'none', border: 'none',
                  color: '#3b82f6', fontSize: '12px',
                  fontWeight: 600, cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div style={{ maxHeight: '380px', overflowY: 'auto' }}>
            {notifications.length === 0 ? (
              <div style={{ padding: '32px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>
                No notifications yet
              </div>
            ) : (
              notifications.map(notif => (
                <div
                  key={notif._id}
                  onClick={() => !notif.read && markAsRead(notif._id)}
                  style={{
                    display: 'flex', gap: '12px', alignItems: 'flex-start',
                    padding: '12px 16px',
                    borderBottom: '1px solid #f1f5f9',
                    background: notif.read ? '#ffffff' : '#f0f9ff',
                    cursor: notif.read ? 'default' : 'pointer',
                  }}
                >
                  {/* Icon */}
                  <span style={{
                    width: '28px', height: '28px',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '12px', fontWeight: 700, flexShrink: 0,
                  }}
                    className={typeStyle(notif.type)}
                  >
                    {typeIcon(notif.type)}
                  </span>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontSize: '13px', fontWeight: notif.read ? 400 : 600,
                      color: '#1e293b', margin: 0, marginBottom: '2px',
                    }}>
                      {notif.title}
                    </p>
                    <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                      {notif.message}
                    </p>
                    <p style={{ fontSize: '11px', color: '#94a3b8', margin: '4px 0 0' }}>
                      {new Date(notif.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteNotification(notif._id) }}
                    style={{
                      background: 'none', border: 'none',
                      color: '#cbd5e1', cursor: 'pointer',
                      fontSize: '14px', padding: '0 4px',
                      flexShrink: 0,
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationCenter