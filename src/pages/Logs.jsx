function Logs() {
  const logs = [
    {
      repo: "Banking System",
      status: "Completed",
      health: "92%",
      date: "Today",
    },
    {
      repo: "E-Commerce App",
      status: "Running",
      health: "--",
      date: "Yesterday",
    },
    {
      repo: "Portfolio Website",
      status: "Failed",
      health: "65%",
      date: "2 Days Ago",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          Logs
        </h1>

        <p className="text-slate-500 mt-2">
          Repository analysis history and activity logs.
        </p>
      </div>

      {/* Logs Table */}

      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-xl font-semibold text-slate-900">
            Repository Activity
          </h2>

          <button className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition">
            Export Logs
          </button>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-slate-200 text-slate-500">

                <th className="text-left py-4 font-medium">
                  Repository
                </th>

                <th className="text-left py-4 font-medium">
                  Status
                </th>

                <th className="text-left py-4 font-medium">
                  Health Score
                </th>

                <th className="text-left py-4 font-medium">
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {logs.map((log, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-100 hover:bg-slate-50 transition"
                >

                  <td className="py-5 font-medium text-slate-800">
                    {log.repo}
                  </td>

                  <td>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        log.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : log.status === "Running"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {log.status}
                    </span>

                  </td>

                  <td className="font-semibold text-slate-700">
                    {log.health}
                  </td>

                  <td className="text-slate-500">
                    {log.date}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* Summary Cards */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

          <p className="text-slate-500">
            Completed Scans
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            18
          </h2>

        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

          <p className="text-slate-500">
            Running Scans
          </p>

          <h2 className="text-3xl font-bold text-yellow-500 mt-2">
            3
          </h2>

        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

          <p className="text-slate-500">
            Failed Scans
          </p>

          <h2 className="text-3xl font-bold text-red-500 mt-2">
            2
          </h2>

        </div>

      </div>

    </div>
  );
}

export default Logs;