import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../services";
import { useAuth } from "../../../shared/hooks/AuthProvider";

function UserLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    userEmail: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await loginApi(credentials);

      login(data); // 🔥 one line

      switch (data.role) {
        case "ADMIN":
          navigate("/admin");
          break;
        case "DEALER":
          navigate("/dealer");
          break;
        default:
          navigate("/customer");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="">
        <input
          name="userEmail"
          value={credentials.userEmail}
          onChange={(e) =>
            setCredentials({ ...credentials, userEmail: e.target.value })
          }
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default UserLogin;
