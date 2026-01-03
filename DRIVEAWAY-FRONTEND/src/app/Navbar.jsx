import React from 'react'
import { Link } from 'react-router-dom'
import useLogout from '../shared/hooks/useLogout';
import { useAuth } from '../shared/hooks/AuthProvider';
import { useNavigate } from 'react-router-dom';

function Navbar() {

    const {user, isLoggedIn, logout} = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();                  
        navigate("/", { replace: true });
    };

    return (
        <div className='flex gap-5 bg-blue-500 text-white p-4 font-bold'>
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

            <button onClick={handleLogout}>Logout</button>
                </>
            )}
        </div>
)
}

export default Navbar