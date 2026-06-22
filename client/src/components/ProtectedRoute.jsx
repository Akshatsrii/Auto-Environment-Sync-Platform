import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user } = useAuth();

  console.log("ProtectedRoute User =>", user);
  console.log("Allowed Roles =>", allowedRoles);

  // User login nahi hai
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  console.log("User Role =>", user.role);
  console.log("Includes =>", allowedRoles.includes(user.role));

  // Role check
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;