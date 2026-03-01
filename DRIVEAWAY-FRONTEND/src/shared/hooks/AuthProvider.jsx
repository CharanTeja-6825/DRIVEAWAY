import { createContext, useContext, useState } from "react";
import { logout as logoutApi } from "../../features/auth/services";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const authLoading = false;

  const statusColorMap = {
    AVAILABLE: "#2E7D32", // green
    PENDING: "#ED6C02", // orange
    APPROVED: "#0288D1", // blue
    ACTIVE: "#7B1FA2", // purple
    COMPLETED: "#616161", // grey
    CANCELLED: "#D32F2F", // red
    REJECTED: "#B71C1C", // dark red
    EXPIRED: "#455A64", // blue-grey
    PAID: "#56eb58",
  };

  const getStatusLabel = (status) => {
    const labels = {
      PENDING: "Pending Approval",
      APPROVED: "Confirmed",
      ACTIVE: "Active",
      COMPLETED: "Completed",
      CANCELLED: "Cancelled",
      REJECTED: "Rejected",
      EXPIRED: "Expired",
      PAID: "Paid",
    };
    return labels[status] || status;
  };

  const login = (data) => {

    // backend response: { email, role, token }

    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const logout = async () => {
    try {
      await logoutApi();
    } catch (error) {
      // swallow error so UI can still log out gracefully
      console.error("Logout request failed", error);
    } finally {
      setUser(null);
      localStorage.removeItem("user");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        authLoading,
        login,
        logout,
        statusColorMap,
        getStatusLabel
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
