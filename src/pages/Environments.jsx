function Environments() {
  const services = [
    "Node.js",
    "MongoDB",
    "Redis",
    "Docker",
  ];

  const files = [
    "Dockerfile",
    "docker-compose.yml",
    ".env.example",
    "README.md",
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>

        <h1 className="text-4xl font-bold text-slate-900">
          Environment Overview
        </h1>

        <p className="text-slate-500 mt-2">
          Generated environment configuration and repository details.
        </p>

      </div>

      {/* Health Score */}

      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Health Score
            </h2>

            <p className="text-slate-500 mt-2">
              Environment is ready for deployment
            </p>
          </div>

          <div className="text-right">

            <h1 className="text-6xl font-bold text-green-600">
              92%
            </h1>

            <span className="text-green-600 font-medium">
              Ready
            </span>

          </div>

        </div>

      </div>

      {/* Services + Files */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Services */}

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

          <h2 className="text-xl font-semibold mb-5 text-slate-900">
            Detected Services
          </h2>

          <div className="flex flex-wrap gap-3">

            {services.map((service) => (
              <span
                key={service}
                className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium"
              >
                {service}
              </span>
            ))}

          </div>

        </div>

        {/* Files */}

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

          <h2 className="text-xl font-semibold mb-5 text-slate-900">
            Generated Files
          </h2>

          <div className="space-y-3">

            {files.map((file) => (
              <div
                key={file}
                className="bg-slate-50 border border-slate-200 rounded-xl p-4"
              >
                📄 {file}
              </div>
            ))}

          </div>

        </div>

      </div>

      {/* Issues */}

      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

        <h2 className="text-xl font-semibold mb-5 text-slate-900">
          Detected Issues
        </h2>

        <div className="space-y-3">

          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600">
            MongoDB service not found
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-yellow-700">
            Node version mismatch
          </div>

        </div>

      </div>

      {/* Recommendations */}

      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

        <h2 className="text-xl font-semibold mb-5 text-slate-900">
          AI Recommendations
        </h2>

        <div className="space-y-3">

          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-700">
            Use Node.js 22 for better compatibility
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-700">
            Add Redis container to docker-compose.yml
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-700">
            Create .env.example for onboarding developers
          </div>

        </div>

      </div>

    </div>
  );
}

export default Environments;