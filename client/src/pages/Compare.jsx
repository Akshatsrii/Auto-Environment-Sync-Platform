import { useState } from 'react'

function Compare() {
  const [environmentA, setEnvironmentA] = useState('Production')
  const [environmentB, setEnvironmentB] = useState('Development')

  const envA = {
    label: 'Environment A',
    tag: 'Production',
    tagClass: 'bg-blue-100 text-blue-700',
    rows: [
      { key: 'Node Version', value: 'v20',        valueClass: 'text-slate-800' },
      { key: 'MongoDB',      value: 'Available',  valueClass: 'text-green-600' },
      { key: 'Redis',        value: 'Available',  valueClass: 'text-green-600' },
      { key: 'Docker',       value: 'Configured', valueClass: 'text-green-600' },
    ],
  }

  const envB = {
    label: 'Environment B',
    tag: 'Development',
    tagClass: 'bg-purple-100 text-purple-700',
    rows: [
      { key: 'Node Version', value: 'v22',        valueClass: 'text-slate-800' },
      { key: 'MongoDB',      value: 'Available',  valueClass: 'text-green-600' },
      { key: 'Redis',        value: 'Missing',    valueClass: 'text-red-500' },
      { key: 'Docker',       value: 'Configured', valueClass: 'text-green-600' },
    ],
  }

  const summary = [
    { text: '✓ Both environments support MongoDB',         className: 'bg-green-50 border border-green-200 text-green-700' },
    { text: '⚠ Redis missing in Environment B',           className: 'bg-yellow-50 border border-yellow-200 text-yellow-700' },
    { text: 'ℹ Environment B uses newer Node.js version', className: 'bg-blue-50 border border-blue-200 text-blue-700' },
  ]

  const diffRows = [
    { property: 'Node Version', a: 'v20',        b: 'v22' },
    { property: 'MongoDB',      a: 'Available',  b: 'Available' },
    { property: 'Redis',        a: 'Available',  b: 'Missing' },
    { property: 'Docker',       a: 'Configured', b: 'Configured' },
  ]

  const card = (env) => (
    <div className="bg-white border border-blue-200 rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-blue-800">{env.label}</h2>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${env.tagClass}`}>
          {env.tag}
        </span>
      </div>
      <div className="flex flex-col">
        {env.rows.map((row, i) => (
          <div
            key={row.key}
            className={`flex justify-between items-center py-3 ${i < env.rows.length - 1 ? 'border-b border-slate-100' : ''}`}
          >
            <span className="text-sm text-slate-500">{row.key}</span>
            <span className={`text-sm font-semibold ${row.valueClass}`}>{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-blue-800 mb-1">Compare Environments</h1>
        <p className="text-slate-500 text-sm">Compare two repository environments side by side.</p>
      </div>

      {/* Selector */}
      <div className="bg-white border border-blue-200 rounded-xl p-5">
        <div className="flex gap-4">
          <select
            value={environmentA}
            onChange={(e) => setEnvironmentA(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-700 outline-none"
          >
            <option>Production</option>
            <option>Development</option>
            <option>Staging</option>
          </select>

          <select
            value={environmentB}
            onChange={(e) => setEnvironmentB(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-700 outline-none"
          >
            <option>Development</option>
            <option>Production</option>
            <option>Staging</option>
          </select>

          <button className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition">
            Compare
          </button>
        </div>
      </div>

      {/* Compare Cards */}
      <div className="grid grid-cols-2 gap-4">
        {card(envA)}
        {card(envB)}
      </div>

      {/* Difference Table */}
      <div className="bg-white border border-blue-200 rounded-xl p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-blue-800 mb-4">Difference Table</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left text-xs font-semibold text-slate-500 px-3 py-3">Property</th>
              <th className="text-left text-xs font-semibold text-slate-500 px-3 py-3">Environment A</th>
              <th className="text-left text-xs font-semibold text-slate-500 px-3 py-3">Environment B</th>
            </tr>
          </thead>
          <tbody>
            {diffRows.map((row, i) => (
              <tr key={i} className="border-t border-slate-100">
                <td className="px-3 py-3 text-sm text-slate-700 font-medium">{row.property}</td>
                <td className="px-3 py-3 text-sm text-slate-600">{row.a}</td>
                <td className={`px-3 py-3 text-sm font-medium ${row.b === 'Missing' ? 'text-red-500' : 'text-slate-600'}`}>
                  {row.b}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="bg-white border border-blue-200 rounded-xl p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-blue-800 mb-4">Comparison Summary</h2>
        <div className="flex flex-col gap-2">
          {summary.map((item, i) => (
            <div key={i} className={`rounded-lg px-4 py-3 text-sm ${item.className}`}>
              {item.text}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Compare