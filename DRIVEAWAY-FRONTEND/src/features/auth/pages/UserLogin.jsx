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

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await loginApi(credentials);

      login(data);

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
      setError(err.response.data)
    }
  };

  return (
    <div>
      {
        error && (<p className="text-red-500 font-bold">{error}</p>)
      }
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
        <button className="cursor-pointer" type="submit">Login</button>
      </form>
    </div>
  );
}

export default UserLogin;
