import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import CustomerHome from '../customer/CustomerHome'

export default function CustomerNavbar() {
  return (
    <>
        <nav>
            <Link to="/customer/home">Dashboard</Link>
            <Link>Rent Cars</Link>
            <Link>Bookings</Link>
        </nav>
        <Routes>
            <Route path='/customer/home' element={<CustomerHome />} />
        </Routes>
    </>
  )
}