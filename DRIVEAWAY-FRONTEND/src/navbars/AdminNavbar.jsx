import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

export default function AdminNavbar() {
  return (
    <div>
      <BrowserRouter>
        <nav>
          <Link>Dashboard</Link>
          <Link>Customers</Link>
          <Link>Dealers</Link>
          <Link>Approvals</Link>
          <Link>Vehicles</Link>
        </nav>

        <Routes>
          <Route path="" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
