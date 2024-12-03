


import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const hideLayout = location.pathname === "/auth"; // Hide Navbar and Footer on "/auth"

  return (
    <>
      {/* Render Navbar and Footer only if not on /auth */}
      {!hideLayout && <Navbar />}
      
      <div className="min-h-screen">
        {/* This is where the nested routes will render */}
        <Outlet />
      </div>

      {!hideLayout && <Footer />}
    </>
  );
};

export default Layout;
