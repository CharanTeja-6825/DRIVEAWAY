import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // email + role
  const [token, setToken] = useState(null); // jwt

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

  // hydrate on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const login = (data) => {
    // backend response: { email, role, token }
    const { token, ...userInfo } = data;

    setUser(userInfo);
    setToken(token);

    localStorage.setItem("user", JSON.stringify(userInfo));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoggedIn: !!token,
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
