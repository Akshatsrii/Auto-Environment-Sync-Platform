import { useState } from 'react'

function Sync() {
  const [repoUrl, setRepoUrl] = useState('')
  const [analyzed, setAnalyzed] = useState(false)

  const workflow = [
    { label: 'Repository Connected',   color: 'bg-green-500' },
    { label: 'Dependencies Detected',  color: 'bg-blue-500' },
    { label: 'Docker Generation',      color: 'bg-purple-500' },
    { label: 'Environment Validation', color: 'bg-yellow-500' },
  ]

  const services = [
    { label: 'Node.js', className: 'bg-blue-100 text-blue-700' },
    { label: 'MongoDB', className: 'bg-green-100 text-green-700' },
    { label: 'Redis',   className: 'bg-yellow-100 text-yellow-700' },
    { label: 'Docker',  className: 'bg-purple-100 text-purple-700' },
  ]

  const preview = [
    { label: 'Repository', value: 'Banking System' },
    { label: 'Owner',      value: 'RiyaBansal' },
    { label: 'Language',   value: 'JavaScript' },
  ]

  const changes = [
    { type: 'Add',    item: 'REDIS_URL variable' },
    { type: 'Update', item: 'NODE_VERSION' },
    { type: 'Delete', item: 'OLD_API_KEY' },
  ]

  const changeStyle = (type) => {
    if (type === 'Add')    return 'bg-green-100 text-green-700'
    if (type === 'Update') return 'bg-blue-100 text-blue-700'
    return                        'bg-red-100 text-red-600'
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-blue-800 mb-1">Sync Repository</h1>
        <p className="text-slate-500 text-sm">Analyze repositories and generate environments.</p>
      </div>

      {/* GitHub URL Input */}
      <div className="bg-white border border-blue-200 rounded-xl p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-blue-800 mb-4">GitHub Repository</h2>
        <input
          type="text"
          placeholder="https://github.com/user/repository"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          className="w-full bg-blue-50 border border-blue-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 outline-none"
        />
        <button
          onClick={() => { if (repoUrl.trim()) setAnalyzed(true) }}
          className="mt-3 bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg cursor-pointer hover:bg-blue-700 transition"
        >
          Analyze Repository
        </button>
      </div>

      {/* Repository Preview */}
      <div className="bg-white border border-blue-200 rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-blue-800">Repository Preview</h2>
          <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
            Ready
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {preview.map(item => (
            <div key={item.label} className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
              <p className="text-xs text-slate-500 mb-1">{item.label}</p>
              <p className="text-sm font-semibold text-slate-800">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Analysis Workflow */}
      <div className="bg-white border border-blue-200 rounded-xl p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-blue-800 mb-4">Analysis Workflow</h2>
        <div className="flex flex-col gap-2">
          {workflow.map(step => (
            <div key={step.label} className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm text-slate-700">
              <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${step.color}`} />
              {step.label}
            </div>
          ))}
        </div>
      </div>

      {/* Detected Services */}
      <div className="bg-white border border-blue-200 rounded-xl p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-blue-800 mb-4">Detected Services</h2>
        <div className="flex flex-wrap gap-2">
          {services.map(s => (
            <span key={s.label} className={`text-sm font-medium px-4 py-1.5 rounded-full ${s.className}`}>
              {s.label}
            </span>
          ))}
        </div>
      </div>

      {/* Changes Preview */}
      <div className="bg-white border border-blue-200 rounded-xl p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-blue-800 mb-4">Changes Preview</h2>
        <div className="flex flex-col gap-2">
          {changes.map((change, i) => (
            <div key={i} className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
              <span className="text-sm text-slate-700">{change.item}</span>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${changeStyle(change.type)}`}>
                {change.type}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Sync