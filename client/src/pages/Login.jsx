import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [remember, setRemember] = useState(true)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.email) return setError('Email is required')
    if (!form.password) return setError('Password is required')

    setLoading(true)
    try {
      const res = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password }),
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data.message || 'Invalid email or password')

      login(data.user, data.token)
      localStorage.setItem("refreshToken", data.refreshToken);
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>

      {/* ── Left Panel ── */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(135deg, #dbeafe 0%, #ede9fe 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '48px',
      }}>

        <div>
          <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#1e293b', lineHeight: 1.2, marginBottom: '16px' }}>
            Welcome Back to<br />
            <span style={{ color: '#3b82f6' }}>DevSync.</span> 👋
          </h1>
          <p style={{ color: '#64748b', fontSize: '15px', lineHeight: 1.6, maxWidth: '340px' }}>
            Sign in to continue managing your projects,
            tasks and collaborate with your team.
          </p>
        </div>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 0' }}>
          <img
            src="/yy.png"
            alt="DevSync Illustration"
            style={{ maxWidth: '100%', maxHeight: '380px', objectFit: 'contain' }}
          />
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.7)',
          borderRadius: '16px',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-around',
          backdropFilter: 'blur(8px)',
        }}>
          {[
            { icon: '👥', title: 'Collaborate', sub: 'with team' },
            { icon: '✅', title: 'Track',       sub: 'projects' },
            { icon: '🚀', title: 'Ship',        sub: 'faster' },
          ].map(item => (
            <div key={item.title} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '22px' }}>{item.icon}</span>
              <div>
                <p style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>{item.title}</p>
                <p style={{ fontSize: '12px', color: '#64748b' }}>{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div style={{
        width: '520px',
        background: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 40px',
      }}>
        <div style={{ width: '100%', maxWidth: '380px' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{
              width: '48px', height: '48px',
              background: '#3b82f6',
              borderRadius: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ color: '#fff', fontSize: '16px', fontWeight: 700 }}>DS</span>
            </div>
            <span style={{ fontSize: '26px', fontWeight: 800, color: '#1e293b' }}>
              Dev<span style={{ color: '#3b82f6' }}>Sync</span>
            </span>
          </div>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '32px' }}>
            Sign in to your DevSync account 👋
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>Email</label>
                <span style={{ fontSize: '16px', color: '#94a3b8' }}>✉</span>
              </div>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute', left: '14px', top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '14px', color: '#94a3b8',
                }}>✉</span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="akshat@devsync.com"
                  style={{
                    width: '100%',
                    background: '#f8fafc',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '10px',
                    padding: '12px 14px 12px 40px',
                    fontSize: '14px',
                    color: '#1e293b',
                    fontFamily: 'inherit',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>Password</label>
                <span style={{ fontSize: '16px', color: '#94a3b8' }}>🔒</span>
              </div>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute', left: '14px', top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '14px', color: '#94a3b8',
                }}>🔒</span>
                <input
                  name="password"
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    background: '#f8fafc',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '10px',
                    padding: '12px 60px 12px 40px',
                    fontSize: '14px',
                    color: '#1e293b',
                    fontFamily: 'inherit',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: 'absolute', right: '14px', top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none', border: 'none',
                    color: '#3b82f6', fontSize: '13px',
                    fontWeight: 600, cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  {showPass ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  style={{ width: '16px', height: '16px', accentColor: '#3b82f6' }}
                />
                <span style={{ fontSize: '13px', color: '#475569' }}>Remember me</span>
              </label>
              <span style={{ fontSize: '13px', color: '#3b82f6', fontWeight: 600, cursor: 'pointer' }}>
                Forgot password?
              </span>
            </div>

            {error && (
              <div style={{
                background: '#fef2f2', border: '1px solid #fecaca',
                borderRadius: '8px', padding: '10px 14px',
                fontSize: '13px', color: '#dc2626',
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                background: '#3b82f6',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                padding: '14px',
                fontSize: '15px',
                fontWeight: 700,
                fontFamily: 'inherit',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? 'Signing In...' : '→ Sign In'}
            </button>

            {/* Don't have account → Register link */}
            <p style={{ textAlign: 'center', fontSize: '13px', color: '#64748b' }}>
              Don't have an account?{' '}
              <Link to="/register" style={{ color: '#3b82f6', fontWeight: 600, textDecoration: 'none' }}>
                Create one
              </Link>
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>or continue with</span>
              <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { label: 'GitHub', icon: '🐙' },
                { label: 'Google', icon: '🔵' },
              ].map(btn => (
                <button
                  key={btn.label}
                  type="button"
                  style={{
                    background: '#ffffff',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '10px',
                    padding: '11px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#1e293b',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  {btn.icon} {btn.label}
                </button>
              ))}
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Login