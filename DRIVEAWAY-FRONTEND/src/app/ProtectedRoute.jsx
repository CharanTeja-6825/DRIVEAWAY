import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../shared/hooks/AuthProvider";

export const ProtectedRoute = ({ allowedRoles }) => {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

// export default ProtectedRoute;