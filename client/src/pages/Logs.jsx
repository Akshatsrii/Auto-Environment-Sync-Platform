import { useState, useEffect } from 'react'

function Logs() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchLogs()
  }, [])

  async function fetchLogs() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('http://localhost:5000/api/logs', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)
      setLogs(data.logs)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const statusClass = (status) => {
    if (status === 'success') return 'bg-green-100 text-green-700'
    return 'bg-red-100 text-red-600'
  }

  const completed = logs.filter(l => l.status === 'success').length
  const failed    = logs.filter(l => l.status === 'failed').length

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-blue-800 mb-1">Logs</h1>
        <p className="text-slate-500 text-sm">Repository sync history and audit trail.</p>
      </div>

      {/* Table */}
      <div className="bg-white border border-blue-200 rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-semibold text-blue-800">Sync Activity</h2>
          <button
            onClick={fetchLogs}
            className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition"
          >
            Refresh
          </button>
        </div>

        {loading && <p className="text-sm text-slate-500">Loading logs...</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}

        {!loading && !error && logs.length === 0 && (
          <p className="text-sm text-slate-500">No sync activity yet.</p>
        )}

        {!loading && logs.length > 0 && (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left text-xs font-medium text-slate-500 px-3 py-3">Source → Target</th>
                <th className="text-left text-xs font-medium text-slate-500 px-3 py-3">Changes</th>
                <th className="text-left text-xs font-medium text-slate-500 px-3 py-3">Status</th>
                <th className="text-left text-xs font-medium text-slate-500 px-3 py-3">Synced By</th>
                <th className="text-left text-xs font-medium text-slate-500 px-3 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log._id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                  <td className="px-3 py-4 text-sm font-medium text-slate-800">
                    {log.sourceEnv?.name || '—'} → {log.targetEnv?.name || '—'}
                  </td>
                  <td className="px-3 py-4 text-sm text-slate-600">
                    {log.changes?.length || 0} change(s)
                  </td>
                  <td className="px-3 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClass(log.status)}`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-3 py-4 text-sm text-slate-600">
                    {log.syncedBy?.name || '—'}
                  </td>
                  <td className="px-3 py-4 text-sm text-slate-500">
                    {new Date(log.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-blue-200 rounded-xl p-5 shadow-sm">
          <p className="text-slate-500 text-sm">Total Syncs</p>
          <h2 className="text-3xl font-bold text-blue-700 mt-2">{logs.length}</h2>
        </div>
        <div className="bg-white border border-blue-200 rounded-xl p-5 shadow-sm">
          <p className="text-slate-500 text-sm">Completed</p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">{completed}</h2>
        </div>
        <div className="bg-white border border-blue-200 rounded-xl p-5 shadow-sm">
          <p className="text-slate-500 text-sm">Failed</p>
          <h2 className="text-3xl font-bold text-red-500 mt-2">{failed}</h2>
        </div>
      </div>

    </div>
  )
}

export default Logs