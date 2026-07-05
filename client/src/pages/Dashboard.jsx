import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [statsData, setStatsData] = useState({
    environmentsCount: 0,
    driftedCount: 0,
    totalVariables: 0,
    pendingApprovalsCount: 0,
    recentLogs: []
  })
  const [environments, setEnvironments] = useState([])

  const token = localStorage.getItem('token')

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Fetch stats
        const statsRes = await fetch('http://localhost:4000/api/dashboard/stats', {
          headers: { Authorization: `Bearer ${token}` }
        })
        const statsData = await statsRes.json()

        // Fetch environments
        const envsRes = await fetch('http://localhost:4000/api/environments', {
          headers: { Authorization: `Bearer ${token}` }
        })
        const envsData = await envsRes.json()

        if (statsRes.ok) {
          setStatsData(statsData)
        }
        if (envsRes.ok) {
          setEnvironments(envsData.environments || [])
        }
      } catch (err) {
        console.error('Error fetching dashboard statistics:', err)
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchDashboardData()
    }
  }, [token])

  const stats = [
    { label: 'Repositories',      value: String(statsData.environmentsCount).padStart(2, '0') },
    { label: 'Environment Ready', value: String(Math.max(0, statsData.environmentsCount - statsData.driftedCount)).padStart(2, '0') },
    { label: 'Issues Found',      value: String(statsData.driftedCount).padStart(2, '0') },
    { label: 'Configs Generated', value: String(statsData.totalVariables).padStart(2, '0') },
  ]

  const quickActions = [
    { label: 'Analyze Repository',    path: '/environments' },
    { label: 'View Logs',             path: '/logs' },
    { label: 'Compare Environments',  path: '/compare' },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-slate-500 text-sm font-medium">Hydrating dashboard statistics...</span>
      </div>
    )
  }

  // Find all environments currently drifted to construct alerts
  const driftedEnvs = environments.filter(e => e.driftStatus === 'drifted')

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-blue-800 mb-1">Welcome Back 👋</h1>
        <p className="text-slate-500 text-sm">Monitor repositories and environment synchronization.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map(stat => (
          <div key={stat.label} className="bg-white border border-blue-200 rounded-xl p-5 shadow-sm transition hover:shadow-md">
            <p className="text-slate-500 text-xs mb-2 font-medium">{stat.label}</p>
            <p className="text-blue-800 text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Activity + Status */}
      <div className="grid grid-cols-2 gap-4">

        {/* Recent Activity */}
        <div className="bg-white border border-blue-200 rounded-xl p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-blue-800 mb-4">Recent Activity</h2>
          <div className="flex flex-col gap-2">
            {statsData.recentLogs.length === 0 ? (
              <div className="text-slate-400 text-xs text-center py-6">No recent sync logs recorded.</div>
            ) : (
              statsData.recentLogs.map((log, i) => (
                <div key={log.id || i} className="flex items-center gap-3 bg-blue-50/50 rounded-lg px-3 py-2.5 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  <div className="flex-1">
                    <span className="font-semibold text-slate-800">{log.source} → {log.target}</span>: Synced {log.changesCount} variable(s) successfully.
                  </div>
                  <span className="text-slate-400 font-mono text-[10px]">{new Date(log.syncedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Environment Status */}
        <div className="bg-white border border-blue-200 rounded-xl p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-blue-800 mb-4">Environment Status</h2>
          <div className="flex flex-col gap-2">
            {environments.length === 0 ? (
              <div className="text-slate-400 text-xs text-center py-6">No active environments. Create one to get started!</div>
            ) : (
              environments.slice(0, 4).map(env => (
                <div key={env._id} className="flex items-center justify-between bg-blue-50/50 rounded-lg px-3 py-2.5">
                  <span className="text-xs font-semibold text-slate-700">{env.name}</span>
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${
                    env.driftStatus === 'drifted'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {env.driftStatus === 'drifted' ? 'Drifted' : 'Synced'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Drift Alerts */}
      <div className="bg-white border border-blue-200 rounded-xl p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-blue-800 mb-4">Drift Alerts</h2>
        <div className="flex flex-col gap-2">
          {driftedEnvs.length === 0 ? (
            <div className="bg-green-50 border border-green-200 text-green-600 rounded-lg px-4 py-3 text-xs font-medium">
              ✓ All environments are synchronized! No active configuration drifts detected.
            </div>
          ) : (
            driftedEnvs.map(env => (
              <div key={env._id} className="bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-lg px-4 py-3 text-xs font-medium flex items-center justify-between">
                <span>⚠ Configuration drift detected in environment <strong>{env.name}</strong>. Differences found since last synchronization scan.</span>
                <button
                  onClick={() => navigate('/compare')}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white text-[10px] px-3 py-1.5 rounded font-bold cursor-pointer transition shrink-0 ml-3"
                >
                  Review Drift
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-blue-200 rounded-xl p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-blue-800 mb-4">Quick Actions</h2>
        <div className="flex gap-3">
          {quickActions.map(action => (
            <button
              key={action.label}
              onClick={() => navigate(action.path)}
              className="bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold px-5 py-2.5 rounded-lg cursor-pointer hover:bg-blue-100 transition"
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