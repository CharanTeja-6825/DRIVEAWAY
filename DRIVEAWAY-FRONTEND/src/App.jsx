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
import { useAuth } from './shared/hooks/AuthContext';

function App() {

  const { isLoggedIn } = useAuth();

  return (
    <div>
      <Navbar />
      <Routes>

        {/* Public */}
        {!isLoggedIn && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<UserRegistration />} />
          </>
        )}

        {isLoggedIn && (
          <>
            {/* Customer */}
            <Route element={<ProtectedRoute allowedRoles={["CUSTOMER"]} />}>
              <Route path="/customer" element={<CustomerHome />} />
            </Route>

            {/* Dealer */}
            <Route element={<ProtectedRoute allowedRoles={["DEALER"]} />}>
              <Route path="/dealer" element={<DealerHome />} />
            </Route>

            {/* Admin */}
            <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
              <Route path="/admin" element={<AdminHome />} />
            </Route>
          </>
        )}

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  )
}

export default App