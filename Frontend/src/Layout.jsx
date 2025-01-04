


import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { login } from "./features/UserSlice";
import { addBlog } from "./features/blogSlice";
import { addcategory } from "./features/CategorySlice";
import { SetLoading } from "./features/LoadingSlice";

const Layout = () => {
  const {isLoggedIn} = useSelector((state)=>state.user);
  const { loading } = useSelector((state)=>state.loading);

  const location = useLocation();
  const navigate = useNavigate()
  const hideLayout = location.pathname === "/auth";
  const dispatch= useDispatch()


    const getProfile  = async () => {
      try {
        dispatch(SetLoading(true))
        const response = await axios.get('/api/profile/view',{
          withCredentials:true
        })

  
        if (response.status == 200) {
          dispatch(login(response.data))
          navigate('/home')
          dispatch(SetLoading(false))
        }
      } catch (error) {
        navigate('/auth')
        console.log(error)
        dispatch(SetLoading(false))
      }
    }
    const getData = async () => {
      try {
        dispatch(SetLoading(true))

        const data = await axios.get("/api/post/posts?page=1&limit=19");
        const dataForCategory = await axios.get('/api/post/posts');
       const Category =  dataForCategory?.data?.data?.map((data)=>data.category)
       dispatch(addcategory(Category))
      dispatch(addBlog(data?.data?.data))
      dispatch(SetLoading(false))

      } catch (error) {
        dispatch(SetLoading(false))
        console.log(error.message);
      }
    };
    useEffect(() => {
      getProfile()
      getData()
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
