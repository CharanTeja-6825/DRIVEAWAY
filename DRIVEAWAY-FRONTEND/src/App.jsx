import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './app/Navbar';
import UserLogin from './features/auth/pages/UserLogin';
import UserRegistration from './features/auth/pages/UserRegistration';
import { ProtectedRoute } from './app/ProtectedRoute';
import CustomerHome from './features/customer/pages/CustomerHome';
import DealerHome from './features/dealer/pages/DealerHome';
import AdminHome from './features/admin/pages/AdminHome';
import Home from './app/Home';
import PageNotFound from './shared/components/PageNotFound';

function App() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  // console.log(currentUser);
  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem("isLoggedIn")));

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn}/>
      <Routes>

        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserLogin setIsLoggedIn={setIsLoggedIn} setUserState={setUser}/>} />
        <Route path="/register" element={<UserRegistration />} />

        {/* Customer */}
        <Route element={<ProtectedRoute user={user} isLoggedIn={isLoggedIn} allowedRoles={["CUSTOMER"]} />}>
          <Route path="/customer" element={<CustomerHome />} />
        </Route>

        {/* Dealer */}
        <Route element={<ProtectedRoute user={user} isLoggedIn={isLoggedIn} allowedRoles={["DEALER"]} />}>
          <Route path="/dealer" element={<DealerHome />} />
        </Route>

        {/* Admin */}
        <Route element={<ProtectedRoute user={user} isLoggedIn={isLoggedIn} allowedRoles={["ADMIN"]} />}>
          <Route path="/admin" element={<AdminHome />} />
        </Route>

        {/* <Route path="*" element={<PageNotFound />} /> */}
      </Routes>
    </div>
  )
}

export default App