import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useLogout from '../shared/hooks/useLogout';

function Navbar({isLoggedIn, user, setUser, setIsLoggedIn}) {

  const logout = useLogout(setUser, setIsLoggedIn);

  return (
    <div>
        {!isLoggedIn && (
            <>
                <Link to={'/'}>Home</Link>
                <Link to={'/login'}>Login</Link>
                <Link to={'/register'}>Register</Link>
            </>
        )}

        {isLoggedIn && (
            <>
                {/* Customer Routings */}
                {user.role === "CUSTOMER" && (
                    <>
                        <Link to={'/customer'}>Ch</Link>
                    </>
                )}
                
                {/* Dealer Routings */}
                {user.role === "DEALER" && (
                    <>
                        <Link to={'/dealer'}>Dh</Link>
                    </>
                )}
                
                {/* Admin Routings */}
                {user.role === "ADMIN" && (
                    <>
                        <Link to={'/admin'}>Ah</Link>
                    </>
                )}

                <button onClick={logout}>Logout</button>
            </>
        )}
    </div>
  )
}

export default Navbar