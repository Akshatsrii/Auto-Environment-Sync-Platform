import { ShieldX, ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
      <div className="bg-white border border-blue-200 rounded-2xl shadow-sm p-10 w-full max-w-md text-center">

        {/* Icon */}
        <div className="w-16 h-16 bg-red-50 border border-red-200 rounded-full flex items-center justify-center mx-auto mb-5">
          <ShieldX className="w-8 h-8 text-red-500" />
        </div>

        {/* Text */}
        <h1 className="text-xl font-bold text-blue-800 mb-2">Access Denied</h1>
        <p className="text-slate-500 text-sm mb-1">
          You don't have permission to view this page.
        </p>
        <p className="text-slate-400 text-xs mb-8">
          Contact your Admin if you think this is a mistake.
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-blue-100 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition"
          >
            <Home className="w-4 h-4" />
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;