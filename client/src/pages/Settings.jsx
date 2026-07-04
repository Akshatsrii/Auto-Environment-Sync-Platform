import { useState, useEffect } from 'react'
import { useToast } from '../context/ToastContext'

function Settings() {
  const { showToast } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  const [emailEnabled, setEmailEnabled] = useState(true)
  const [slackEnabled, setSlackEnabled] = useState(false)
  const [slackWebhookUrl, setSlackWebhookUrl] = useState('')
  const [teamsEnabled, setTeamsEnabled] = useState(false)
  const [teamsWebhookUrl, setTeamsWebhookUrl] = useState('')

  const [githubToken, setGithubToken] = useState('') // Client-side state placeholder
  const [defaultEnv, setDefaultEnv] = useState('Development')

  const token = localStorage.getItem('token')

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('http://localhost:4000/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const data = await res.json()
        if (res.ok && data.user) {
          const ns = data.user.notificationSettings || {}
          setEmailEnabled(ns.emailEnabled !== false)
          setSlackEnabled(!!ns.slackEnabled)
          setSlackWebhookUrl(ns.slackWebhookUrl || '')
          setTeamsEnabled(!!ns.teamsEnabled)
          setTeamsWebhookUrl(ns.teamsWebhookUrl || '')
        } else {
          showToast(data.message || 'Failed to load user settings', 'error')
        }
      } catch (err) {
        showToast('Error fetching settings', 'error')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      loadSettings()
    }
  }, [token, showToast])

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)

    try {
      const res = await fetch('http://localhost:4000/api/auth/settings', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          notificationSettings: {
            emailEnabled,
            slackEnabled,
            slackWebhookUrl,
            teamsEnabled,
            teamsWebhookUrl
          }
        })
      })

      const data = await res.json()
      if (res.ok) {
        showToast('Settings saved successfully ✓', 'success')
        // Update user state stored in localStorage if we want
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
        storedUser.notificationSettings = data.user.notificationSettings
        localStorage.setItem('user', JSON.stringify(storedUser))
      } else {
        showToast(data.message || 'Failed to save settings', 'error')
      }
    } catch (err) {
      showToast('Error saving settings', 'error')
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-slate-500 text-sm font-medium">Loading preferences...</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-6 max-w-3xl">

      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-blue-800 mb-1">Settings</h1>
        <p className="text-slate-500 text-sm">Manage your DevSync preferences and notification integrations.</p>
      </div>

      {/* GitHub Integration */}
      <div className="bg-white border border-blue-150 rounded-xl p-5 shadow-sm transition hover:shadow-md">
        <h2 className="text-sm font-semibold text-blue-800 mb-4 flex items-center gap-2">
          <span>🐙</span> GitHub Integration
        </h2>
        <label className="block text-xs font-semibold text-slate-500 mb-2">
          GitHub Personal Access Token
        </label>
        <input
          type="password"
          value={githubToken}
          onChange={(e) => setGithubToken(e.target.value)}
          placeholder="ghp_••••••••••••••••••••••••••••••••"
          className="w-full bg-blue-50/50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-lg px-4 py-2.5 text-sm text-slate-700 outline-none transition"
        />
        <p className="text-slate-400 text-xs mt-1.5">This token is used for scanning repository files and scanning drift in background workers.</p>
      </div>

      {/* Notifications Configuration */}
      <div className="bg-white border border-blue-150 rounded-xl p-5 shadow-sm transition hover:shadow-md">
        <h2 className="text-sm font-semibold text-blue-800 mb-4 flex items-center gap-2">
          <span>🔔</span> Notification Channels
        </h2>

        <div className="flex flex-col gap-5">
          {/* Email Settings */}
          <div className="border-b border-slate-100 pb-4">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={emailEnabled}
                onChange={(e) => setEmailEnabled(e.target.checked)}
                className="w-4.5 h-4.5 rounded text-blue-600 border-blue-200 focus:ring-blue-500 accent-blue-600 transition"
              />
              <div>
                <span className="text-sm font-semibold text-slate-700 block">Email Alerts</span>
                <span className="text-xs text-slate-400">Receive direct reports about sync requests, drift detections and status logs.</span>
              </div>
            </label>
          </div>

          {/* Slack Integration */}
          <div className="border-b border-slate-100 pb-4">
            <label className="flex items-center gap-3 cursor-pointer select-none mb-3">
              <input
                type="checkbox"
                checked={slackEnabled}
                onChange={(e) => setSlackEnabled(e.target.checked)}
                className="w-4.5 h-4.5 rounded text-blue-600 border-blue-200 focus:ring-blue-500 accent-blue-600 transition"
              />
              <div>
                <span className="text-sm font-semibold text-slate-700 block">Slack Integration</span>
                <span className="text-xs text-slate-400">Dispatch sync summary and critical scan events directly to a Slack channel.</span>
              </div>
            </label>
            
            {slackEnabled && (
              <div className="pl-8 animate-fadeIn">
                <label className="block text-xs font-semibold text-slate-500 mb-2">Slack Webhook URL</label>
                <input
                  type="url"
                  required
                  value={slackWebhookUrl}
                  onChange={(e) => setSlackWebhookUrl(e.target.value)}
placeholder="Enter your Slack Incoming Webhook URL"                  className="w-full bg-blue-50/50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-lg px-4 py-2.5 text-sm text-slate-700 outline-none transition"
                />
              </div>
            )}
          </div>

          {/* Microsoft Teams Integration */}
          <div className="pb-2">
            <label className="flex items-center gap-3 cursor-pointer select-none mb-3">
              <input
                type="checkbox"
                checked={teamsEnabled}
                onChange={(e) => setTeamsEnabled(e.target.checked)}
                className="w-4.5 h-4.5 rounded text-blue-600 border-blue-200 focus:ring-blue-500 accent-blue-600 transition"
              />
              <div>
                <span className="text-sm font-semibold text-slate-700 block">Microsoft Teams Integration</span>
                <span className="text-xs text-slate-400">Post card notifications about environment states to a Microsoft Teams channel connector.</span>
              </div>
            </label>

            {teamsEnabled && (
              <div className="pl-8 animate-fadeIn">
                <label className="block text-xs font-semibold text-slate-500 mb-2">Teams Webhook URL</label>
                <input
                  type="url"
                  required
                  value={teamsWebhookUrl}
                  onChange={(e) => setTeamsWebhookUrl(e.target.value)}
                  placeholder="https://your-company.webhook.office.com/webhookb2/XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX@XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX/IncomingWebhook/XXXXXXXXXX/XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
                  className="w-full bg-blue-50/50 border border-blue-100 focus:border-blue-400 focus:bg-white rounded-lg px-4 py-2.5 text-sm text-slate-700 outline-none transition"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preferences Section */}
      <div className="bg-white border border-blue-150 rounded-xl p-5 shadow-sm transition hover:shadow-md">
        <h2 className="text-sm font-semibold text-blue-800 mb-4 flex items-center gap-2">
          <span>⚙️</span> Workspace Preferences
        </h2>
        <label className="block text-xs font-semibold text-slate-500 mb-2">Default Environment</label>
        <select
          value={defaultEnv}
          onChange={(e) => setDefaultEnv(e.target.value)}
          className="w-full bg-blue-50/50 border border-blue-100 rounded-lg px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400"
        >
          <option>Development</option>
          <option>Testing</option>
          <option>Production</option>
        </select>
      </div>

      {/* Save Button */}
      <div className="bg-white border border-blue-150 rounded-xl p-5 shadow-sm flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-semibold px-7 py-2.5 rounded-lg cursor-pointer transition flex items-center gap-2"
        >
          {saving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Saving Preferences...
            </>
          ) : (
            'Save Settings'
          )}
        </button>
      </div>

    </form>
  )
}

export default Settings