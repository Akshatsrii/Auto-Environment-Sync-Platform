import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  History,
  RotateCcw,
  Clock,
  User,
  ChevronRight,
  ArrowLeft,
  Save,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

const dummyVersions = [
  {
    _id: "v1",
    versionNumber: 5,
    changeNote: "Rolled back to v3",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    changedBy: { name: "Riya Bansal" },
    snapshot: {
      name: "Production",
      variables: [
        { key: "NODE_ENV", value: "production" },
        { key: "DB_URL", value: "mongodb://prod:27017/db" },
        { key: "JWT_SECRET", value: "prod_secret_v3" },
      ],
    },
  },
  {
    _id: "v2",
    versionNumber: 4,
    changeNote: "Added Redis config",
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    changedBy: { name: "Akshat Srivastava" },
    snapshot: {
      name: "Production",
      variables: [
        { key: "NODE_ENV", value: "production" },
        { key: "DB_URL", value: "mongodb://prod:27017/db" },
        { key: "REDIS_URL", value: "redis://localhost:6379" },
        { key: "JWT_SECRET", value: "prod_secret_v4" },
      ],
    },
  },
  {
    _id: "v3",
    versionNumber: 3,
    changeNote: "Manual snapshot",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    changedBy: { name: "Riya Bansal" },
    snapshot: {
      name: "Production",
      variables: [
        { key: "NODE_ENV", value: "production" },
        { key: "DB_URL", value: "mongodb://prod:27017/db" },
        { key: "JWT_SECRET", value: "prod_secret_v3" },
      ],
    },
  },
  {
    _id: "v4",
    versionNumber: 2,
    changeNote: "Updated DB connection string",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    changedBy: { name: "Akshat Srivastava" },
    snapshot: {
      name: "Production",
      variables: [
        { key: "NODE_ENV", value: "production" },
        { key: "DB_URL", value: "mongodb://old:27017/db" },
      ],
    },
  },
  {
    _id: "v5",
    versionNumber: 1,
    changeNote: "Initial version",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    changedBy: { name: "Riya Bansal" },
    snapshot: {
      name: "Production",
      variables: [{ key: "NODE_ENV", value: "development" }],
    },
  },
];

const VersionHistory = () => {
  const { environmentId } = useParams();
  const navigate = useNavigate();

  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [rollbackTarget, setRollbackTarget] = useState(null);
  const [rollbackLoading, setRollbackLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // Backend ready hone par replace karo:
    // fetch(`/api/versions/${environmentId}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }})
    //   .then(r => r.json()).then(d => { setVersions(d.versions); setLoading(false); });

    setTimeout(() => {
      setVersions(dummyVersions);
      setSelectedVersion(dummyVersions[0]);
      setLoading(false);
    }, 700);
  }, [environmentId]);

  const handleRollbackClick = (version) => {
    setRollbackTarget(version);
    setShowConfirm(true);
  };

  const confirmRollback = async () => {
    setRollbackLoading(true);
    setShowConfirm(false);

    // Backend ready hone par:
    // await fetch(`/api/versions/rollback/${rollbackTarget._id}`, {
    //   method: "POST",
    //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    // });

    await new Promise((r) => setTimeout(r, 1400));

    setSuccessMsg(`Environment restored to v${rollbackTarget.versionNumber} successfully!`);
    setTimeout(() => setSuccessMsg(""), 4000);
    setRollbackLoading(false);
    setRollbackTarget(null);
  };

  const handleSaveSnapshot = async () => {
    // Backend: POST /api/versions/:environmentId/save
    setSuccessMsg("Snapshot saved successfully!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg bg-blue-50 border border-blue-200 hover:bg-blue-100 transition"
        >
          <ArrowLeft className="w-4 h-4 text-blue-700" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-blue-800 flex items-center gap-2">
            <History className="w-5 h-5 text-blue-600" />
            Version History
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            View and restore previous environment configurations.
          </p>
        </div>
        <button
          onClick={handleSaveSnapshot}
          className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-blue-100 transition"
        >
          <Save className="w-4 h-4" />
          Save Snapshot
        </button>
      </div>

      {/* Success Message */}
      {successMsg && (
        <div className="flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm">
          <CheckCircle className="w-4 h-4 shrink-0" />
          {successMsg}
        </div>
      )}

      {/* Error Message */}
      {errorMsg && (
        <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          {errorMsg}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500" />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">

          {/* Version Timeline — 2/3 width */}
          <div className="col-span-2 flex flex-col gap-3">
            {versions.map((version, index) => (
              <div
                key={version._id}
                onClick={() => setSelectedVersion(version)}
                className={`bg-white border rounded-xl p-5 shadow-sm cursor-pointer transition-all ${
                  selectedVersion?._id === version._id
                    ? "border-blue-500 ring-1 ring-blue-300"
                    : "border-blue-200 hover:border-blue-400"
                }`}
              >
                <div className="flex items-start gap-4">

                  {/* Version badge + connector */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border ${
                        index === 0
                          ? "bg-green-50 border-green-300 text-green-700"
                          : "bg-blue-50 border-blue-200 text-blue-700"
                      }`}
                    >
                      v{version.versionNumber}
                    </div>
                    {index < versions.length - 1 && (
                      <div className="w-px h-5 bg-blue-200 mt-2" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-blue-800 flex items-center gap-2">
                          {version.changeNote}
                          {index === 0 && (
                            <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                              Current
                            </span>
                          )}
                        </p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatDate(version.createdAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {version.changedBy?.name}
                          </span>
                          <span>
                            {version.snapshot.variables.length} variables
                          </span>
                        </div>
                      </div>

                      {/* Restore button — not for current */}
                      {index !== 0 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRollbackClick(version);
                          }}
                          disabled={rollbackLoading}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium rounded-lg hover:bg-blue-100 transition disabled:opacity-50"
                        >
                          {rollbackLoading && rollbackTarget?._id === version._id ? (
                            <div className="w-3 h-3 border border-blue-500 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <RotateCcw className="w-3 h-3" />
                          )}
                          Restore
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Snapshot Preview Panel — 1/3 width */}
          <div className="col-span-1">
            <div className="bg-white border border-blue-200 rounded-xl p-5 shadow-sm sticky top-6">
              {selectedVersion ? (
                <>
                  <h3 className="text-sm font-semibold text-blue-800 mb-1 flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-blue-500" />
                    v{selectedVersion.versionNumber} Snapshot
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">
                    {formatDate(selectedVersion.createdAt)}
                  </p>

                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">
                    Variables ({selectedVersion.snapshot.variables.length})
                  </p>

                  <div className="flex flex-col gap-2">
                    {selectedVersion.snapshot.variables.map((v, i) => (
                      <div
                        key={i}
                        className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 text-xs"
                      >
                        <span className="text-blue-700 font-mono font-semibold">
                          {v.key}
                        </span>
                        <span className="text-slate-400 mx-1">=</span>
                        <span className="text-slate-600 font-mono">
                          {v.value.length > 18
                            ? v.value.slice(0, 18) + "..."
                            : v.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Restore from panel */}
                  {selectedVersion._id !== versions[0]?._id && (
                    <button
                      onClick={() => handleRollbackClick(selectedVersion)}
                      className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-blue-100 transition"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Restore this Version
                    </button>
                  )}
                </>
              ) : (
                <div className="text-center py-10">
                  <History className="w-8 h-8 mx-auto text-blue-200 mb-2" />
                  <p className="text-slate-400 text-sm">
                    Click a version to preview
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      )}

      {/* Confirm Rollback Modal */}
      {showConfirm && rollbackTarget && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white border border-blue-200 rounded-2xl shadow-xl p-6 w-full max-w-md mx-4">

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-yellow-50 border border-yellow-200 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-800">Confirm Rollback</h3>
                <p className="text-xs text-slate-500">
                  This will overwrite the current configuration
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-5 text-sm text-slate-700">
              Restore environment to{" "}
              <span className="font-semibold text-blue-700">
                v{rollbackTarget.versionNumber}
              </span>
              ?
              <p className="text-xs text-slate-500 mt-1">
                "{rollbackTarget.changeNote}" —{" "}
                {formatDate(rollbackTarget.createdAt)}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowConfirm(false);
                  setRollbackTarget(null);
                }}
                className="flex-1 py-2.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-700 text-sm hover:bg-blue-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmRollback}
                className="flex-1 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium transition flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Yes, Restore
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VersionHistory;