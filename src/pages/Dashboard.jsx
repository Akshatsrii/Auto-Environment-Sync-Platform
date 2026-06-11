import StatsCard from "../components/StatsCard";

function Dashboard() {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          Welcome Back 👋
        </h1>

        <p className="text-slate-500 mt-2">
          Monitor repositories and environment synchronization.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatsCard
          title="Repositories"
          value="24"
          color="text-blue-600"
        />

        <StatsCard
          title="Environment Ready"
          value="18"
          color="text-green-600"
        />

        <StatsCard
          title="Issues Found"
          value="06"
          color="text-red-500"
        />

        <StatsCard
          title="Configs Generated"
          value="31"
          color="text-purple-600"
        />

      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Recent Activity */}
        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

          <h2 className="text-xl font-semibold mb-6 text-slate-900">
            Recent Activity
          </h2>

          <div className="space-y-4">

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              Banking System analyzed successfully
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              Docker configuration generated
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              Redis dependency detected
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              Environment validation completed
            </div>

          </div>

        </div>

        {/* Environment Status */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

          <h2 className="text-xl font-semibold mb-6 text-slate-900">
            Environment Status
          </h2>

          <div className="space-y-5">

            <div className="flex justify-between">
              <span className="text-slate-600">MongoDB</span>
              <span className="text-green-600 font-medium">
                Active
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-600">Redis</span>
              <span className="text-yellow-500 font-medium">
                Pending
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-600">Docker</span>
              <span className="text-green-600 font-medium">
                Active
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-600">Node.js</span>
              <span className="text-green-600 font-medium">
                Active
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

        <h2 className="text-xl font-semibold mb-6 text-slate-900">
          Quick Actions
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <button className="bg-slate-100 text-slate-700 p-4 rounded-xl hover:bg-slate-200 hover:scale-105 transition">
            Analyze Repository
          </button>

          <button className="bg-slate-100 text-slate-700 p-4 rounded-xl hover:bg-slate-200 hover:scale-105 transition">
            View Logs
          </button>

          <button className="bg-slate-100 text-slate-700 p-4 rounded-xl hover:bg-slate-200 hover:scale-105 transition">
            Compare Environments
          </button>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;