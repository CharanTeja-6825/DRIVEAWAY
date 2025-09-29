import React from 'react'
import { Route, Routes, Link } from 'react-router-dom';
import Home from '../main/Home';
import CustomerLogin from '../customer/CustomerLogin';
import AdminLogin from '../admin/AdminLogin';
import DealerLogin from '../dealer/DealerLogin';
import MenuGroup from '../components/MenuGroup';


function MainNavbar() {
  return (
    <div>
        <nav className='flex justify-center items-center gap-3 bg-black text-white p-2'>
            <div>
                 <Link to="/">DriveAway</Link>
            </div>
            <Link>About</Link>
            <MenuGroup />
            <Link>Sign Up</Link>
        </nav>
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/customer/login' element={<CustomerLogin />} />
            <Route path='/admin/login' element={<AdminLogin />} />
            <Route path='/dealer/login' element={<DealerLogin />}/>
        </Routes>
    </div>
  )
}

export default MainNavbar