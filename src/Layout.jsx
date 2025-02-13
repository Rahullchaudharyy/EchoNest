import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { login } from "./features/userSlice.js";
import { addBlog } from "./features/blogSlice";
import { addcategory } from "./features/CategorySlice";
import { SetLoading } from "./features/LoadingSlice";
import axiosInstence from "./utils/axiosInstance.js";

const Layout = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.loading);

  const location = useLocation();
  const navigate = useNavigate();
  const hideLayout = location.pathname === "/auth";
  const dispatch = useDispatch();

  const getProfile = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axiosInstence.get("/api/profile/view", {
        withCredentials: true,
      });

      if (response.status == 200) {
        dispatch(login(response.data));
        // navigate('/home')
        dispatch(SetLoading(false));
      }
    } catch (error) {
      console.log(error);
      dispatch(SetLoading(false));
    }
  };
  const getData = async () => {
    try {
      dispatch(SetLoading(true));

      const data = await axiosInstence.get("/api/post/posts?page=1&limit=19");
      const dataForCategory = await axiosInstence.get("/api/post/posts");
      const Category = dataForCategory?.data?.data?.map(
        (data) => data.category
      );
      dispatch(addcategory(Category));
      dispatch(addBlog(data?.data?.data));
      dispatch(SetLoading(false));
    } catch (error) {
      dispatch(SetLoading(false));
      console.log(error.message);
    }
  };
  useEffect(() => {
    getProfile();
    getData();
  }, []);

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
