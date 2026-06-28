import { useState, useEffect } from 'react'
import StatsCard from '../components/StatsCard'

const API_BASE = 'http://localhost:5000/api/environments'

const STATUS_STYLES = {
  matched:  { label: 'Matched',  badge: 'bg-green-100 text-green-700',   row: 'text-slate-600' },
  modified: { label: 'Modified', badge: 'bg-yellow-100 text-yellow-700', row: 'text-yellow-700 font-medium' },
  missing:  { label: 'Missing',  badge: 'bg-red-100 text-red-700',       row: 'text-red-600 font-medium' },
  extra:    { label: 'Extra',    badge: 'bg-blue-100 text-blue-700',     row: 'text-blue-600 font-medium' },
}

function Compare() {
  const [environments, setEnvironments] = useState([])
  const [sourceId, setSourceId] = useState('')
  const [targetId, setTargetId] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchEnvironments = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(API_BASE, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setEnvironments(data.environments || [])
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchEnvironments()
  }, [])

  const handleCompare = async () => {
    if (!sourceId || !targetId) {
      setError('Select both environments first')
      return
    }
    if (sourceId === targetId) {
      setError('Source and target must be different environments')
      return
    }

    setError('')
    setLoading(true)
    setResult(null)

    try {
      const token = localStorage.getItem('token')
      const res = await fetch(
        `${API_BASE}/compare?source=${sourceId}&target=${targetId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Comparison failed')
        return
      }

      setResult(data)
    } catch (err) {
      console.error(err)
      setError('Something went wrong while comparing')
    } finally {
      setLoading(false)
    }
  }

  const envLabel = (env) => `${env.name} · ${env.variables?.length || 0} vars`

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-blue-800 mb-1">Compare Environments</h1>
        <p className="text-slate-500 text-sm">Run drift detection between any two saved environments.</p>
      </div>

      {/* Selector */}
      <div className="bg-white border border-blue-200 rounded-xl p-5">
        <div className="flex flex-wrap gap-4 items-center">
          <select
            value={sourceId}
            onChange={(e) => setSourceId(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-700 outline-none"
          >
            <option value="">Source environment</option>
            {environments.map((env) => (
              <option key={env._id} value={env._id}>{envLabel(env)}</option>
            ))}
          </select>

          <span className="text-slate-400 text-sm">vs</span>

          <select
            value={targetId}
            onChange={(e) => setTargetId(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-700 outline-none"
          >
            <option value="">Target environment</option>
            {environments.map((env) => (
              <option key={env._id} value={env._id}>{envLabel(env)}</option>
            ))}
          </select>

          <button
            onClick={handleCompare}
            disabled={loading}
            className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Comparing...' : 'Compare'}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
      </div>

      {result && (
        <>
          {/* Drift Summary Stats */}
          <div className="grid grid-cols-4 gap-4">
            <StatsCard title="Matched"  value={result.summary.matched}  color="text-green-600" />
            <StatsCard title="Modified" value={result.summary.modified} color="text-yellow-600" />
            <StatsCard title="Missing"  value={result.summary.missing}  color="text-red-600" />
            <StatsCard title="Extra"    value={result.summary.extra}    color="text-blue-600" />
          </div>

          {/* Difference Table */}
          <div className="bg-white border border-blue-200 rounded-xl p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-blue-800 mb-4">
              {result.source.name} → {result.target.name}
            </h2>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left text-xs font-semibold text-slate-500 px-3 py-3">Key</th>
                  <th className="text-left text-xs font-semibold text-slate-500 px-3 py-3">{result.source.name}</th>
                  <th className="text-left text-xs font-semibold text-slate-500 px-3 py-3">{result.target.name}</th>
                  <th className="text-left text-xs font-semibold text-slate-500 px-3 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {result.differences.map((diff) => {
                  const style = STATUS_STYLES[diff.status]
                  return (
                    <tr key={diff.key} className="border-t border-slate-100">
                      <td className="px-3 py-3 text-sm font-medium text-slate-700">{diff.key}</td>
                      <td className={`px-3 py-3 text-sm ${style.row}`}>{diff.sourceValue ?? '—'}</td>
                      <td className={`px-3 py-3 text-sm ${style.row}`}>{diff.targetValue ?? '—'}</td>
                      <td className="px-3 py-3">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${style.badge}`}>
                          {style.label}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="bg-white border border-blue-200 rounded-xl p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-blue-800 mb-4">Comparison Summary</h2>
            <div className="flex flex-col gap-2">
              {result.summary.modified > 0 && (
                <div className="rounded-lg px-4 py-3 text-sm bg-yellow-50 border border-yellow-200 text-yellow-700">
                  ⚠ {result.summary.modified} variable(s) have different values between environments
                </div>
              )}
              {result.summary.missing > 0 && (
                <div className="rounded-lg px-4 py-3 text-sm bg-red-50 border border-red-200 text-red-600">
                  🔴 {result.summary.missing} variable(s) missing in {result.target.name}
                </div>
              )}
              {result.summary.extra > 0 && (
                <div className="rounded-lg px-4 py-3 text-sm bg-blue-50 border border-blue-200 text-blue-600">
                  🔵 {result.summary.extra} extra variable(s) found in {result.target.name}
                </div>
              )}
              {result.summary.modified === 0 && result.summary.missing === 0 && result.summary.extra === 0 && (
                <div className="rounded-lg px-4 py-3 text-sm bg-green-50 border border-green-200 text-green-700">
                  ✓ No drift detected — both environments are in sync
                </div>
              )}
            </div>
          </div>
        </>
      )}

    </div>
  )
}

export default Compare