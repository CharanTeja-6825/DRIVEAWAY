import { useNavigate } from "react-router-dom";

const useLogout = (setUser, setIsLoggedIn) => {
  const navigate = useNavigate();

  return () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUser(null);
    navigate("/login", { replace: true });
  };
};

export default useLogout;
