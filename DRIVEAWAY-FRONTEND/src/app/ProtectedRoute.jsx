import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ user, isLoggedIn, allowedRoles }) => {

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
