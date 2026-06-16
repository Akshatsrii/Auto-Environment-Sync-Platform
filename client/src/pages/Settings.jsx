function Settings() {
  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-blue-800 mb-1">Settings</h1>
        <p className="text-slate-500 text-sm">Manage your DevSync preferences and integrations.</p>
      </div>

      {/* GitHub Integration */}
      <div className="bg-white border border-blue-200 rounded-xl p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-blue-800 mb-4">GitHub Integration</h2>
        <label className="block text-xs text-slate-500 mb-2">
          GitHub Personal Access Token
        </label>
        <input
          type="password"
          placeholder="Enter GitHub Token"
          className="w-full bg-blue-50 border border-blue-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 outline-none"
        />
      </div>

      {/* Notifications */}
      <div className="bg-white border border-blue-200 rounded-xl p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-blue-800 mb-4">Notifications</h2>
        <div className="flex flex-col gap-4">
          {['Email Notifications', 'Repository Scan Alerts', 'Environment Sync Updates'].map(label => (
            <label key={label} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 accent-blue-600"
              />
              <span className="text-sm text-slate-700">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white border border-blue-200 rounded-xl p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-blue-800 mb-4">Preferences</h2>
        <label className="block text-xs text-slate-500 mb-2">Default Environment</label>
        <select className="w-full bg-blue-50 border border-blue-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 outline-none">
          <option>Development</option>
          <option>Testing</option>
          <option>Production</option>
        </select>
      </div>

      {/* Save */}
      <div className="bg-white border border-blue-200 rounded-xl p-5 shadow-sm">
        <button className="bg-blue-600 text-white text-sm font-semibold px-7 py-2.5 rounded-lg cursor-pointer hover:bg-blue-700 transition">
          Save Settings
        </button>
      </div>

    </div>
  )
}

export default Settings