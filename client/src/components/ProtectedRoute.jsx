import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user } = useAuth();

  console.log("ProtectedRoute User:", user);
  console.log("Allowed Roles:", allowedRoles);

  // Login required
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Agar roles pass hi nahi kiye gaye hain,
  // to sirf login check karo aur access de do.
  if (allowedRoles.length === 0) {
    return children;
  }

  // Role check
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;