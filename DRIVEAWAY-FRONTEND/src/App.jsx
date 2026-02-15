import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './app/Navbar';
import UserLogin from './features/auth/pages/UserLogin';
import UserRegistration from './features/auth/pages/UserRegistration';
import { ProtectedRoute } from './app/ProtectedRoute';
import CustomerHome from './features/customer/pages/CustomerHome';
import DealerHome from './features/dealer/pages/DealerHome';
import AdminHome from './features/admin/pages/AdminHome';
import Home from './app/Home';
import PageNotFound from './shared/components/PageNotFound';
import { useAuth } from './shared/hooks/AuthProvider';
import AllUsers from './features/admin/pages/AllUsers'
import CustomerProfile from './features/customer/pages/CustomerProfile';
import ApproveDealers from './features/admin/pages/ApproveDealers';
import AddCar from './features/dealer/pages/AddCar';
import DealerCars from './features/dealer/pages/DealerCars';
import CustomerCars from './features/customer/pages/CustomerCars';
import DealerBookings from './features/dealer/pages/DealerBookings';
import CustomerBookings from './features/customer/pages/CustomerBookings';

function App() {
  const { isLoggedIn, user } = useAuth();

  const getDefaultRoute = () => {
    if (!user) return "/";
    if (user.role === "ADMIN") return "/admin";
    if (user.role === "DEALER") return "/dealer";
    return "/customer";
  };

  const defaultRoute = getDefaultRoute();

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to={defaultRoute} replace /> : <Home />
          }
        />
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to={defaultRoute} replace />
            ) : (
              <UserLogin />
            )
          }
        />
        <Route
          path="/register"
          element={
            isLoggedIn ? (
              <Navigate to={defaultRoute} replace />
            ) : (
              <UserRegistration />
            )
          }
        />

        {/* Customer */}
        <Route element={<ProtectedRoute allowedRoles={["CUSTOMER"]} />}>
          <Route path="/customer" element={<CustomerHome />} />
          <Route path="/customer/profile" element={<CustomerProfile />} />
          <Route path="/customer/viewCars" element={<CustomerCars />} />
          <Route path="/customer/myBookings" element={<CustomerBookings />} />
        </Route>

        {/* Dealer */}
        <Route element={<ProtectedRoute allowedRoles={["DEALER"]} />}>
          <Route path="/dealer" element={<DealerHome />} />
          <Route path="/dealer/addCar" element={<AddCar />} />
          <Route path="/dealer/allCars" element={<DealerCars />} />
          <Route path="/dealer/bookings" element={<DealerBookings />} />
        </Route>

        {/* Admin */}
        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/all" element={<AllUsers />} />
          <Route path="/admin/applications" element={<ApproveDealers />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App