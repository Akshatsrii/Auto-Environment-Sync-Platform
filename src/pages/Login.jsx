import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">

      <div className="w-full max-w-md">

        {/* Logo */}

        <div className="text-center mb-8">

          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            DevSync
          </h1>

          <p className="text-slate-500 mt-3">
            Auto Environment Sync Platform
          </p>

        </div>

        {/* Login Card */}

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-lg">

          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Welcome Back 👋
          </h2>

          <p className="text-slate-500 mb-6">
            Sign in to your account
          </p>

          <form className="space-y-5">

            <div>

              <label className="block mb-2 text-slate-700 font-medium">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

            </div>

            <div>

              <label className="block mb-2 text-slate-700 font-medium">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium hover:scale-[1.02] transition"
            >
              Login
            </button>

          </form>

          {/* Demo Access */}

          <div className="mt-6 text-center">

            <p className="text-slate-500">
              Demo Access
            </p>

            <Link
              to="/dashboard"
              className="inline-block mt-2 text-blue-600 font-medium hover:text-blue-700"
            >
              Go to Dashboard →
            </Link>

          </div>

        </div>

        {/* Footer */}

        <p className="text-center text-slate-400 text-sm mt-6">
          DevSync © 2026
        </p>

      </div>

    </div>
  );
}

export default Login;