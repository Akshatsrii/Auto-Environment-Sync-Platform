function Compare() {
  return (
    <div className="space-y-6">

      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          Compare Environments
        </h1>

        <p className="text-slate-500 mt-2">
          Compare two repository environments side by side.
        </p>
      </div>

      {/* Compare Cards */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Environment A */}

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

          <div className="flex items-center justify-between mb-5">

            <h2 className="text-xl font-semibold text-slate-900">
              Environment A
            </h2>

            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
              Production
            </span>

          </div>

          <div className="space-y-4">

            <div className="flex justify-between border-b border-slate-100 pb-3">
              <span className="text-slate-500">Node Version</span>
              <span className="font-semibold">v20</span>
            </div>

            <div className="flex justify-between border-b border-slate-100 pb-3">
              <span className="text-slate-500">MongoDB</span>
              <span className="text-green-600 font-medium">
                Available
              </span>
            </div>

            <div className="flex justify-between border-b border-slate-100 pb-3">
              <span className="text-slate-500">Redis</span>
              <span className="text-green-600 font-medium">
                Available
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Docker</span>
              <span className="text-green-600 font-medium">
                Configured
              </span>
            </div>

          </div>

        </div>

        {/* Environment B */}

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

          <div className="flex items-center justify-between mb-5">

            <h2 className="text-xl font-semibold text-slate-900">
              Environment B
            </h2>

            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm">
              Development
            </span>

          </div>

          <div className="space-y-4">

            <div className="flex justify-between border-b border-slate-100 pb-3">
              <span className="text-slate-500">Node Version</span>
              <span className="font-semibold">v22</span>
            </div>

            <div className="flex justify-between border-b border-slate-100 pb-3">
              <span className="text-slate-500">MongoDB</span>
              <span className="text-green-600 font-medium">
                Available
              </span>
            </div>

            <div className="flex justify-between border-b border-slate-100 pb-3">
              <span className="text-slate-500">Redis</span>
              <span className="text-red-500 font-medium">
                Missing
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Docker</span>
              <span className="text-green-600 font-medium">
                Configured
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* Comparison Summary */}

      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

        <h2 className="text-xl font-semibold mb-5 text-slate-900">
          Comparison Summary
        </h2>

        <div className="space-y-3">

          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-700">
            ✓ Both environments support MongoDB
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-yellow-700">
            ⚠ Redis missing in Environment B
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-blue-700">
            ℹ Environment B uses newer Node.js version
          </div>

        </div>

      </div>

    </div>
  );
}

export default Compare;