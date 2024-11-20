import React from "react";
import Navbar from "./components/Navbar";
import { Outlet, useLoaderData } from "react-router-dom";
import Footer from "./components/Footer";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation()
  const hideLayout = location.pathname === "/auth";

  return (
    <>
      {!hideLayout && <Navbar />}
      <Outlet />
     {!hideLayout && <Footer/>}
      
    </>
  );
};

export default Layout;
