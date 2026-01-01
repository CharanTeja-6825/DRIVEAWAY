import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../shared/hooks/AuthContext";

export const ProtectedRoute = ({ allowedRoles }) => {

  const {user, isLoggedIn} = useAuth();

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
