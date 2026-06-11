function Settings() {
  return (
    <div className="space-y-6">

      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          Settings
        </h1>

        <p className="text-slate-500 mt-2">
          Manage your DevSync preferences and integrations.
        </p>
      </div>

      {/* GitHub Integration */}

      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

        <h2 className="text-xl font-semibold mb-4 text-slate-900">
          GitHub Integration
        </h2>

        <label className="block text-sm text-slate-500 mb-2">
          GitHub Personal Access Token
        </label>

        <input
          type="password"
          placeholder="Enter GitHub Token"
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

      </div>

      {/* Notifications */}

      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

        <h2 className="text-xl font-semibold mb-5 text-slate-900">
          Notifications
        </h2>

        <div className="space-y-4">

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              className="w-4 h-4"
            />
            <span>Email Notifications</span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              className="w-4 h-4"
            />
            <span>Repository Scan Alerts</span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              className="w-4 h-4"
            />
            <span>Environment Sync Updates</span>
          </label>

        </div>

      </div>

      {/* Preferences */}

      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

        <h2 className="text-xl font-semibold mb-5 text-slate-900">
          Preferences
        </h2>

        <div className="space-y-4">

          <div>
            <label className="block text-sm text-slate-500 mb-2">
              Default Environment
            </label>

            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
              <option>Development</option>
              <option>Testing</option>
              <option>Production</option>
            </select>
          </div>

        </div>

      </div>

      {/* Save Button */}

      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

        <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:scale-105 transition">
          Save Settings
        </button>

      </div>

    </div>
  );
}

export default Settings;