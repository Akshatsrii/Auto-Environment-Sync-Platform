import { useState } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  GitMerge,
  User,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
} from "lucide-react";

const DUMMY_REQUESTS = [
  {
    _id: "req1",
    sourceEnvironment: { name: "Staging" },
    targetEnvironment: { name: "Production" },
    requestedBy: { name: "Akshat Srivastava", email: "akshat@dev.com" },
    status: "pending",
    createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    changes: [
      { key: "DB_URL",    type: "modified", oldValue: "mongodb://old", newValue: "mongodb://new" },
      { key: "REDIS_URL", type: "added",    oldValue: "",              newValue: "redis://localhost" },
      { key: "DEBUG",     type: "deleted",  oldValue: "true",          newValue: "" },
    ],
  },
  {
    _id: "req2",
    sourceEnvironment: { name: "Dev" },
    targetEnvironment: { name: "Staging" },
    requestedBy: { name: "Priya Sharma", email: "priya@dev.com" },
    status: "approved",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    reviewNote: "Looks good, approved.",
    changes: [
      { key: "API_KEY", type: "modified", oldValue: "old_key", newValue: "new_key" },
    ],
  },
  {
    _id: "req3",
    sourceEnvironment: { name: "Feature-X" },
    targetEnvironment: { name: "Dev" },
    requestedBy: { name: "Rahul Mehta", email: "rahul@dev.com" },
    status: "rejected",
    reviewNote: "Variables incomplete, please recheck.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    changes: [
      { key: "PORT", type: "modified", oldValue: "3000", newValue: "5000" },
    ],
  },
];

const statusConfig = {
  pending:  { bg: "bg-yellow-100 text-yellow-700", icon: Clock,         label: "Pending"  },
  approved: { bg: "bg-green-100 text-green-700",   icon: CheckCircle,   label: "Approved" },
  rejected: { bg: "bg-red-100 text-red-600",       icon: XCircle,       label: "Rejected" },
};

const changeConfig = {
  added:    { bg: "bg-green-50 border-green-200 text-green-700",   label: "Added"    },
  modified: { bg: "bg-yellow-50 border-yellow-200 text-yellow-700", label: "Modified" },
  deleted:  { bg: "bg-red-50 border-red-200 text-red-600",         label: "Deleted"  },
};

const formatDate = (d) =>
  new Date(d).toLocaleString("en-IN", {
    day: "numeric", month: "short",
    hour: "2-digit", minute: "2-digit",
  });

const ApprovalQueue = () => {
  const [requests, setRequests]         = useState(DUMMY_REQUESTS);
  const [expandedId, setExpandedId]     = useState(null);
  const [activeReviewId, setActiveReviewId] = useState(null);
  const [reviewNote, setReviewNote]     = useState("");
  const [loadingId, setLoadingId]       = useState(null);
  const [successMsg, setSuccessMsg]     = useState("");
  const [errorMsg, setErrorMsg]         = useState("");

  const showSuccess = (msg) => { setSuccessMsg(msg); setTimeout(() => setSuccessMsg(""), 3500); };
  const showError   = (msg) => { setErrorMsg(msg);   setTimeout(() => setErrorMsg(""),   3500); };

  const handleAction = async (requestId, action) => {
    setLoadingId(requestId);

    // Backend ready hone par:
    // await fetch(`/api/sync-requests/${requestId}/${action}`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //   },
    //   body: JSON.stringify({ reviewNote }),
    // });

    await new Promise((r) => setTimeout(r, 1300));

    setRequests((prev) =>
      prev.map((r) =>
        r._id === requestId ? { ...r, status: action, reviewNote } : r
      )
    );

    action === "approved"
      ? showSuccess("Sync approved and executed successfully!")
      : showError("Request has been rejected.");

    setActiveReviewId(null);
    setReviewNote("");
    setLoadingId(null);
  };

  const pendingCount = requests.filter((r) => r.status === "pending").length;

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-blue-800 mb-1 flex items-center gap-2">
          <GitMerge className="w-5 h-5 text-blue-600" />
          Approval Queue
          {pendingCount > 0 && (
            <span className="text-xs font-medium bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
              {pendingCount} pending
            </span>
          )}
        </h1>
        <p className="text-slate-500 text-sm">
          Review and approve sync requests before they execute on production.
        </p>
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

      {/* Requests List */}
      <div className="flex flex-col gap-4">
        {requests.map((req) => {
          const StatusIcon  = statusConfig[req.status].icon;
          const isExpanded  = expandedId === req._id;
          const isReviewing = activeReviewId === req._id;

          return (
            <div
              key={req._id}
              className="bg-white border border-blue-200 rounded-xl shadow-sm overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-5">
                <div className="flex items-center justify-between">

                  {/* Left: icon + info */}
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 border border-blue-200 rounded-lg">
                      <GitMerge className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-blue-800">
                        <span className="text-blue-600">
                          {req.sourceEnvironment.name}
                        </span>
                        <span className="text-slate-400 mx-2">→</span>
                        <span>{req.targetEnvironment.name}</span>
                      </p>
                      <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {req.requestedBy.name}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(req.createdAt)}
                        </span>
                        <span>{req.changes.length} changes</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: status badge + expand */}
                  <div className="flex items-center gap-3">
                    <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${statusConfig[req.status].bg}`}>
                      <StatusIcon className="w-3 h-3" />
                      {statusConfig[req.status].label}
                    </span>
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : req._id)}
                      className="p-1.5 rounded-lg bg-blue-50 border border-blue-200 hover:bg-blue-100 transition text-blue-600"
                    >
                      {isExpanded
                        ? <ChevronUp className="w-4 h-4" />
                        : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Section */}
              {isExpanded && (
                <div className="border-t border-blue-100 p-5 flex flex-col gap-4">

                  {/* Changes Preview */}
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">
                      Changes Preview
                    </p>
                    <div className="flex flex-col gap-2">
                      {req.changes.map((change, i) => (
                        <div
                          key={i}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border text-xs ${changeConfig[change.type].bg}`}
                        >
                          <span className="font-mono font-semibold w-28 truncate">
                            {change.key}
                          </span>
                          <span className="w-16 opacity-70 capitalize">
                            {changeConfig[change.type].label}
                          </span>
                          {change.type !== "added" && (
                            <span className="font-mono line-through opacity-60 truncate max-w-[110px]">
                              {change.oldValue}
                            </span>
                          )}
                          {change.type !== "deleted" && (
                            <>
                              <span className="opacity-40">→</span>
                              <span className="font-mono truncate max-w-[110px]">
                                {change.newValue}
                              </span>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rejection Note — for rejected */}
                  {req.status === "rejected" && req.reviewNote && (
                    <div className="flex items-start gap-2 px-4 py-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>Rejection reason: {req.reviewNote}</span>
                    </div>
                  )}

                  {/* Approval Note — for approved */}
                  {req.status === "approved" && req.reviewNote && (
                    <div className="flex items-start gap-2 px-4 py-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm">
                      <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>Review note: {req.reviewNote}</span>
                    </div>
                  )}

                  {/* Action Area — only for pending */}
                  {req.status === "pending" && (
                    <>
                      {isReviewing ? (
                        <div className="flex flex-col gap-3">
                          <textarea
                            value={reviewNote}
                            onChange={(e) => setReviewNote(e.target.value)}
                            placeholder="Add a review note (optional)..."
                            rows={2}
                            className="w-full border border-blue-200 bg-blue-50 rounded-lg px-3 py-2 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 resize-none"
                          />
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleAction(req._id, "approved")}
                              disabled={loadingId === req._id}
                              className="flex-1 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                              {loadingId === req._id ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <CheckCircle className="w-4 h-4" />
                              )}
                              Approve & Sync
                            </button>
                            <button
                              onClick={() => handleAction(req._id, "rejected")}
                              disabled={loadingId === req._id}
                              className="flex-1 py-2.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm font-medium transition flex items-center justify-center gap-2 hover:bg-red-100 disabled:opacity-50"
                            >
                              <XCircle className="w-4 h-4" />
                              Reject
                            </button>
                            <button
                              onClick={() => { setActiveReviewId(null); setReviewNote(""); }}
                              className="px-4 py-2.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-700 text-sm hover:bg-blue-100 transition"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setActiveReviewId(req._id)}
                          className="self-start flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-blue-100 transition"
                        >
                          Review Request
                        </button>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ApprovalQueue;