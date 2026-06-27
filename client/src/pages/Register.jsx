import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!form.name || !form.email || !form.password) {
      return setError('All fields are required')
    }
    if (form.password.length < 6) {
      return setError('Password must be at least 6 characters')
    }
    if (form.password !== form.confirmPassword) {
      return setError('Passwords do not match')
    }

    setLoading(true)
    try {
      const res = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data.message || 'Registration failed')

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
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

        {/* Heading */}
        <div>
          <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#1e293b', lineHeight: 1.2, marginBottom: '16px' }}>
            Start Building with<br />
            <span style={{ color: '#3b82f6' }}>DevSync.</span> 🚀
          </h1>
          <p style={{ color: '#64748b', fontSize: '15px', lineHeight: 1.6, maxWidth: '340px' }}>
            Create an account to sync environments,
            track changes, and ship faster with your team.
          </p>
        </div>

        {/* Illustration */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 0' }}>
          <img
            src="/yy.png"
            alt="DevSync Illustration"
            style={{ maxWidth: '100%', maxHeight: '380px', objectFit: 'contain' }}
          />
        </div>

        {/* Bottom Feature Pills */}
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
        overflowY: 'auto',
      }}>
        <div style={{ width: '100%', maxWidth: '380px' }}>

          {/* Logo */}
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
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '28px' }}>
            Create your DevSync account 🎉
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

            {/* Name */}
            <div>
              <label style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b', marginBottom: '8px', display: 'block' }}>
                Full Name
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute', left: '14px', top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '14px', color: '#94a3b8',
                }}>👤</span>
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Akshat Srivastava"
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

            {/* Email */}
            <div>
              <label style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b', marginBottom: '8px', display: 'block' }}>
                Email
              </label>
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

            {/* Password */}
            <div>
              <label style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b', marginBottom: '8px', display: 'block' }}>
                Password
              </label>
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

            {/* Confirm Password */}
            <div>
              <label style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b', marginBottom: '8px', display: 'block' }}>
                Confirm Password
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute', left: '14px', top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '14px', color: '#94a3b8',
                }}>🔒</span>
                <input
                  name="confirmPassword"
                  type={showPass ? 'text' : 'password'}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
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

            {/* Error */}
            {error && (
              <div style={{
                background: '#fef2f2', border: '1px solid #fecaca',
                borderRadius: '8px', padding: '10px 14px',
                fontSize: '13px', color: '#dc2626',
              }}>
                {error}
              </div>
            )}

            {/* Sign Up Button */}
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
              {loading ? 'Creating Account...' : '→ Create Account'}
            </button>

            {/* Already have account */}
            <p style={{ textAlign: 'center', fontSize: '13px', color: '#64748b' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#3b82f6', fontWeight: 600, textDecoration: 'none' }}>
                Sign In
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Register