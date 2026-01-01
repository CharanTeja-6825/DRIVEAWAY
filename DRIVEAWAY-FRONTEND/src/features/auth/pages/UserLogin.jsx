import React, { useState } from 'react'
import { login } from '../services';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../shared/hooks/AuthContext';

function UserLogin() {
    const { setUser, setIsLoggedIn} = useAuth();
    const [localUser, setLocalUser] = useState({
      userEmail : '',
      password : ''
    });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleUser = async (e) => {
      e.preventDefault();

//    Exception Handling
      try {

//      Fetching Login Response from Backend  
          const { data } = await login(localUser);
          console.log(data);

//      Response Validation
          if(data) {

            setUser(data);
            setIsLoggedIn(true);

//        Saving creds to localstorage
            localStorage.setItem("user", JSON.stringify(data));
            localStorage.setItem("isLoggedIn", JSON.stringify(true));

            setMessage("Login Success");
            setError("");
          };

//      Role Based Navigation
          switch (data.role) {
              case "CUSTOMER":
                  navigate("/customer");
                  break;
              case "DEALER":
                  navigate("/dealer");
                  break;
              case "ADMIN":
                  navigate("/admin");
                  break;
              default:
                  navigate("/login");
          };

      } catch (err) {
          setError(err.message);
          console.error(err);
      }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setLocalUser((prev) => ({
            ...prev,
            [name]:value
        }));
    }

    return (
    <div>
      {
        error.length > 0 ? (
            <p style={{color:'red', fontWeight:'bold'}}>{error}</p>
        ):message.length > 0 ?
        (
            <p style={{color:'green', fontWeight:'bold'}}>{message}</p>
        ):null
      }
      <form onSubmit={handleUser}>
        <input 
        onChange={handleChange} 
        type="email" 
        name='userEmail'
        value={localUser.userEmail}
        placeholder='Enter Email'
      />
        <input 
          onChange={handleChange} 
          type="password" 
          name='password'
          value={localUser.password}
          placeholder='Enter password'
        />
        <button 
          type="submit" 
        >Submit</button>
      </form>
    </div>
  )
}

export default UserLogin