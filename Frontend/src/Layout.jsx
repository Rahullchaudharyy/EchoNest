


import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { login } from "./features/UserSlice";

const Layout = () => {
  const {isLoggedIn} = useSelector((state)=>state.user)
  console.log(isLoggedIn)
  const location = useLocation();
  const navigate = useNavigate()
  const hideLayout = location.pathname === "/auth";

  const dispatch = useDispatch()
    const getProfile  = async () => {
      try {
        const response = await axios.get('/api/profile/view',{
          withCredentials:true
        })

        // console.log(response)
  
        if (response.status == 200) {
          console.log('User response', response)
          dispatch(login(response.data))
          navigate('/home')
        }
      } catch (error) {
        navigate('/auth')
        console.log(error)
      }
    }
    useEffect(() => {
      getProfile()
      if (!isLoggedIn) {
        navigate('/auth')
      }
    }, [])

  return (
    <>
      {!hideLayout && <Navbar />}
      
      <div className="min-h-screen">
        <Outlet />
      </div>

      {!hideLayout && <Footer />}
    </>
  );
};

export default Layout;
