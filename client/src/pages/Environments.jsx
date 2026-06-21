import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

function Environments() {
  const navigate = useNavigate();
  const services = ['Node.js', 'MongoDB', 'Redis', 'Docker']
  const files = ['Dockerfile', 'docker-compose.yml', '.env.example', 'README.md']

 const [environments, setEnvironments] = useState([])

  const [showModal, setShowModal]       = useState(false)
  const [envName, setEnvName]           = useState('')
  const [envVariables, setEnvVariables] = useState('')
  const [envStatus, setEnvStatus]       = useState('Active')

  const fetchEnvironments = async () => {
  try {
    const token = localStorage.getItem('token')
    console.log("TOKEN =>", token)

    const res = await fetch(
      'http://localhost:5000/api/environments',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    const data = await res.json()
    console.log("DATA =>", data)
    console.log(
  JSON.stringify(data.environments, null, 2)
)
    
    setEnvironments(data.environments || [])
  } catch (error) {
    console.error(error)
  }
}

useEffect(() => {
  fetchEnvironments()
}, [])

const handleDeleteEnvironment = async (id) => {
  const confirmDelete = window.confirm(
    'Are you sure you want to delete this environment?'
  )

  if (!confirmDelete) return

  try {
    const token = localStorage.getItem('token')

    const res = await fetch(
      `http://localhost:5000/api/environments/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    const data = await res.json()

    console.log(data)

    fetchEnvironments()
  } catch (error) {
    console.error(error)
  }
}
 
  const handleAddEnvironment = async () => {
    console.log("SAVE BUTTON CLICKED")
    if (!envName || !envVariables) {
  alert('Fill all fields')
  return
}
  try {
    const token = localStorage.getItem('token')

    const res = await fetch(
      'http://localhost:5000/api/environments',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: envName,
          description: `${envName} Environment`,
          variables: [
            {
              key: 'PORT',
              value: envVariables,
            },
          ],
        }),
      }
    )

    const data = await res.json()

    console.log(data)

    fetchEnvironments()

    setEnvName('')
    setEnvVariables('')
    setEnvStatus('Active')
    setShowModal(false)

  } catch (error) {
    console.error(error)
  }
}

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-blue-800 mb-1">Environment Overview</h1>
        <p className="text-slate-500 text-sm">Generated environment configuration and repository details.</p>
      </div>

      {/* Add Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white text-sm font-medium px-4 py-2.5 rounded-lg cursor-pointer hover:bg-blue-700 transition"
        >
          + Add Environment
        </button>
      </div>

      {/* Environment Cards */}
      <div className="flex flex-col gap-4">
        {environments.map(env => (
          <div key={env._id} className="bg-white border border-blue-200 rounded-xl p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-blue-800 mb-2">{env.name}</h3>
           <p className="text-slate-500 text-sm mb-3">
  Variables: {env.variables?.length || 0}
</p>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700">
  Active
</span>

<div className="flex gap-2 mt-3">
  <button
    onClick={() => navigate(`/versions/${env._id}`)}
    className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition"
  >
    {/* <History className="w-3 h-3" /> */}
    History
  </button>

  <button
    onClick={() => handleDeleteEnvironment(env._id)}
    className="bg-red-500 text-white px-3 py-1 rounded text-xs"
  >
    Delete
  </button>
</div>
          </div>
        ))}
      </div>

      {/* Environment Table */}
      <div className="bg-white border border-blue-200 rounded-xl p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-blue-800 mb-4">Environment List</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left text-xs font-semibold text-slate-500 px-3 py-3">Environment</th>
              <th className="text-left text-xs font-semibold text-slate-500 px-3 py-3">Variables</th>
              <th className="text-left text-xs font-semibold text-slate-500 px-3 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {environments.map(env => (
              <tr key={env._id} className="border-t border-slate-100">
                <td className="px-3 py-3 text-sm font-medium text-slate-700">{env.name}</td>
                <td className="px-3 py-3 text-sm text-slate-600">
  {env.variables?.length || 0}
</td>
                <td className="px-3 py-3">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700">
  Active
</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      

      {/* Health Score */}
      <div className="bg-white border border-blue-200 rounded-xl p-6 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-blue-800 mb-1">Health Score</h2>
          <p className="text-slate-500 text-sm">Environment is ready for deployment</p>
        </div>
        <div className="text-right">
          <p className="text-5xl font-bold text-green-600 leading-none">92%</p>
          <span className="inline-block mt-2 text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">
            Ready
          </span>
        </div>
      </div>

      {/* Services + Files */}
      <div className="grid grid-cols-2 gap-4">

        {/* Services */}
        <div className="bg-white border border-blue-200 rounded-xl p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-blue-800 mb-4">Detected Services</h2>
          <div className="flex flex-wrap gap-2">
            {services.map(service => (
              <span key={service} className="bg-blue-100 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full">
                {service}
              </span>
            ))}
          </div>
        </div>

        {/* Files */}
        <div className="bg-white border border-blue-200 rounded-xl p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-blue-800 mb-4">Generated Files</h2>
          <div className="flex flex-col gap-2">
            {files.map(file => (
              <div key={file} className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2.5 text-sm text-slate-700">
                📄 {file}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Issues */}
      <div className="bg-white border border-blue-200 rounded-xl p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-blue-800 mb-4">Detected Issues</h2>
        <div className="flex flex-col gap-2">
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 text-sm text-red-600">
            ⚠ MongoDB service not found
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2.5 text-sm text-yellow-600">
            ⚠ Node version mismatch
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white border border-blue-200 rounded-xl p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-blue-800 mb-4">AI Recommendations</h2>
        <div className="flex flex-col gap-2">
          {[
            'Use Node.js 22 for better compatibility',
            'Add Redis container to docker-compose.yml',
            'Create .env.example for onboarding developers',
          ].map((rec, i) => (
            <div key={i} className="bg-green-50 border border-green-200 rounded-lg px-4 py-2.5 text-sm text-green-700">
              ✓ {rec}
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
            <h2 className="text-sm font-semibold text-blue-800 mb-4">Add Environment</h2>
            <div className="flex flex-col gap-3 mb-5">
              <select
  value={envName}
  onChange={(e) => setEnvName(e.target.value)}
  className="px-3 py-2.5 border border-slate-300 rounded-lg text-sm outline-none"
>
  <option value="">Select Environment</option>
  <option value="Development">Development</option>
  <option value="Staging">Staging</option>
  <option value="Production">Production</option>
</select>
              <input
                type="number"
                placeholder="Variables Count"
                value={envVariables}
                onChange={(e) => setEnvVariables(e.target.value)}
                className="px-3 py-2.5 border border-slate-300 rounded-lg text-sm outline-none"
              />
              <select
                value={envStatus}
                onChange={(e) => setEnvStatus(e.target.value)}
                className="px-3 py-2.5 border border-slate-300 rounded-lg text-sm outline-none"
              >
                <option>Active</option>
                <option>Warning</option>
              </select>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleAddEnvironment}
                className="bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition"
              >
                Save
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-slate-100 text-slate-600 text-sm px-5 py-2 rounded-lg cursor-pointer hover:bg-slate-200 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Environments