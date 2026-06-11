function Sync() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          Sync Repository
        </h1>

        <p className="text-slate-500 mt-2">
          Analyze repositories and generate environments.
        </p>
      </div>

      {/* GitHub URL Input */}

      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

        <h2 className="text-xl font-semibold mb-4 text-slate-900">
          GitHub Repository
        </h2>

        <input
          type="text"
          placeholder="https://github.com/user/repository"
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        <button className="mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:scale-105 transition">
          Analyze Repository
        </button>

      </div>

      {/* Repository Preview */}

      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

        <div className="flex items-center justify-between mb-5">

          <h2 className="text-xl font-semibold text-slate-900">
            Repository Preview
          </h2>

          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
            Ready
          </span>

        </div>

        <div className="grid md:grid-cols-3 gap-4">

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p className="text-slate-500 text-sm">Repository</p>
            <p className="font-semibold mt-1">Banking System</p>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p className="text-slate-500 text-sm">Owner</p>
            <p className="font-semibold mt-1">RiyaBansal</p>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p className="text-slate-500 text-sm">Language</p>
            <p className="font-semibold mt-1">JavaScript</p>
          </div>

        </div>

      </div>

      {/* Analysis Workflow */}

      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

        <h2 className="text-xl font-semibold mb-5 text-slate-900">
          Analysis Workflow
        </h2>

        <div className="space-y-4">

          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-4 rounded-xl">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            Repository Connected
          </div>

          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-4 rounded-xl">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            Dependencies Detected
          </div>

          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-4 rounded-xl">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            Docker Generation
          </div>

          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-4 rounded-xl">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            Environment Validation
          </div>

        </div>

      </div>

      {/* Detected Services */}

      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

        <h2 className="text-xl font-semibold mb-5 text-slate-900">
          Detected Services
        </h2>

        <div className="flex flex-wrap gap-3">

          <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700">
            Node.js
          </span>

          <span className="px-4 py-2 rounded-full bg-green-100 text-green-700">
            MongoDB
          </span>

          <span className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-700">
            Redis
          </span>

          <span className="px-4 py-2 rounded-full bg-purple-100 text-purple-700">
            Docker
          </span>

        </div>

      </div>

    </div>
  );
}

export default Sync;