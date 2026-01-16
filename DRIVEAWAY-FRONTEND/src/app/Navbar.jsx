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
                    <Link to={'/customer'}>Home</Link>
                    <Link to={'/customer/profile'}>Profile</Link>
                    <Link to={'/customer/viewCars'}>Cars</Link>
                </>
            )}

            {/* Dealer Routings */}
                {user.role === "DEALER" && (
                <>
                    <Link to={'/dealer'}>Home</Link>
                    <Link to={'/dealer/addCar'}>New Car</Link>
                    <Link to={'/dealer/allCars'}>Cars</Link>
                    <Link to={'/dealer/bookings'}>Bookings</Link>
                </>
            )}

            {/* Admin Routings */}
            {user.role === "ADMIN" && (
                <>
                    <Link to={'/admin'}>Dashboard</Link>
                    <Link to={'/admin/all'}>All Users</Link>
                    <Link to={'/admin/applications'}>Requests</Link>
                </>
            )}

            <button onClick={handleLogout} className='cursor-pointer'>Logout</button>
                </>
            )}
        </div>
)
}

export default Navbar