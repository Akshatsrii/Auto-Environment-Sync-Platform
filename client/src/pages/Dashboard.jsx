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

const driftAlerts = [
  { msg: 'Production environment missing REDIS_URL', className: 'bg-red-50 border border-red-200 text-red-600' },
  { msg: 'Node version mismatch detected',           className: 'bg-yellow-50 border border-yellow-200 text-yellow-600' },
  { msg: 'Docker image requires update',             className: 'bg-blue-50 border border-blue-200 text-blue-600' },
]

const quickActions = [
  { label: 'Analyze Repository',    path: '/environments' },
  { label: 'View Logs',             path: '/logs' },
  { label: 'Compare Environments',  path: '/compare' },
]

function Dashboard() {
  const navigate = useNavigate()

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
          <div key={stat.label} className="bg-white border border-blue-200 rounded-xl p-5 shadow-sm">
            <p className="text-slate-500 text-xs mb-2">{stat.label}</p>
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
            {activity.map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-blue-50 rounded-lg px-3 py-2.5 text-sm text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Environment Status */}
        <div className="bg-white border border-blue-200 rounded-xl p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-blue-800 mb-4">Environment Status</h2>
          <div className="flex flex-col gap-2">
            {envStatus.map(env => (
              <div key={env.name} className="flex items-center justify-between bg-blue-50 rounded-lg px-3 py-2.5">
                <span className="text-sm text-slate-700">{env.name}</span>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  env.status === 'Active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {env.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Drift Alerts */}
      <div className="bg-white border border-blue-200 rounded-xl p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-blue-800 mb-4">Drift Alerts</h2>
        <div className="flex flex-col gap-2">
          {driftAlerts.map((alert, i) => (
            <div key={i} className={`rounded-lg px-4 py-3 text-sm ${alert.className}`}>
              {alert.msg}
            </div>
          ))}
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
              className="bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium px-5 py-2.5 rounded-lg cursor-pointer hover:bg-blue-100 transition"
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