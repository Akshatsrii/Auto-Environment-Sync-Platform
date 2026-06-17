import { useState, useEffect } from 'react'
import StatsCard from '../components/StatsCard'

const API_BASE = 'http://localhost:5000/api/environments'

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
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Comparison failed')
      }

      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Environment Comparison</h1>
        <p className="text-gray-500">
          Compare variables between two environments
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow border">
        <div className="grid md:grid-cols-3 gap-4">
          <select
            value={sourceId}
            onChange={(e) => setSourceId(e.target.value)}
            className="border rounded-lg p-3"
          >
            <option value="">Select Source</option>
            {environments.map((env) => (
              <option key={env._id} value={env._id}>
                {env.name}
              </option>
            ))}
          </select>

          <select
            value={targetId}
            onChange={(e) => setTargetId(e.target.value)}
            className="border rounded-lg p-3"
          >
            <option value="">Select Target</option>
            {environments.map((env) => (
              <option key={env._id} value={env._id}>
                {env.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleCompare}
            disabled={loading}
            className="bg-blue-600 text-white rounded-lg px-4 py-3 hover:bg-blue-700"
          >
            {loading ? 'Comparing...' : 'Compare'}
          </button>
        </div>

        {error && (
          <div className="mt-4 text-red-600 font-medium">
            {error}
          </div>
        )}
      </div>

      {result?.summary && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatsCard
            title="Matched"
            value={result.summary.matched || 0}
          />
          <StatsCard
            title="Modified"
            value={result.summary.modified || 0}
          />
          <StatsCard
            title="Missing"
            value={result.summary.missing || 0}
          />
          <StatsCard
            title="Extra"
            value={result.summary.extra || 0}
          />
        </div>
      )}

      {result?.differences?.length > 0 && (
        <div className="bg-white rounded-xl shadow border overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-lg">
              Variable Differences
            </h2>
          </div>

          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3">Key</th>
                <th className="text-left p-3">Source</th>
                <th className="text-left p-3">Target</th>
                <th className="text-left p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {result.differences.map((item, index) => (
                <tr
                  key={index}
                  className="border-t"
                >
                  <td className="p-3">{item.key}</td>
                  <td className="p-3">
                    {item.sourceValue ?? '-'}
                  </td>
                  <td className="p-3">
                    {item.targetValue ?? '-'}
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-1 rounded bg-gray-100">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Compare;