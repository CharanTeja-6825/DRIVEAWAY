import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import CustomerNavbar from './navbars/CustomerNavbar'
import MainNavbar from './navbars/MainNavbar'

function App() {
  return (
    <div>
      {/* App Component */}
      <BrowserRouter >
        <MainNavbar />
      </BrowserRouter>
    </div>
  )
}

export default App