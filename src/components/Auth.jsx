import React, { useEffect, useState } from "react";
// import { auth } from '../firebase.config'
// import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/userSlice.js";
import axiosInstence from "../utils/axiosInstance.js";
import { SetLoading } from "../features/LoadingSlice.js";
import Loader, { MiniLoader } from "./Loader.jsx";
import { setError } from "../features/ConfigSlice.js";

const Auth = () => {
  const [IsSignUp, setIsSignUp] = useState(true);
  // const [loading, setloading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.loading);
  const navigate = useNavigate();
  const [Name, setName] = useState("");
  const [Username, setUsername] = useState("");
  const [emailId, setemailId] = useState("");
  const [password, setpassword] = useState("");
  const [ResetingPassword, setResetingPassword] = useState(false);
  const [EmailForReset, setEmailForReset] = useState("");

  const { CurrentError } = useSelector((state) => state.config);
  const dispatch = useDispatch();
  const HandleSignUp = async (e) => {
    e.preventDefault();

    try {
      dispatch(SetLoading(true));
      const Response = await axiosInstence.post(`/api/auth/signup`, {
        emailId: emailId,
        password: password,
        firstName: Name,
        username: Username,
      });

      // console.log(Response);

      if (Response.status == 201) {
        setIsSignUp(false);
        dispatch(SetLoading(false));
      }
    } catch (error) {
      dispatch(SetLoading(false));
      toast.error(error.response.data.message);
      dispatch(setError(error.response.data.message));
      // console.log(error.message);
    }
  };

  const HandleSignIn = async (e) => {
    e.preventDefault();

    try {
      dispatch(SetLoading(true));

      const response = await axiosInstence.post("/api/auth/signin", {
        emailId: emailId,
        password: password,
      });

      // console.log(response.data.token);
      if (response.data.token) {
        localStorage.setItem("token", response?.data?.token);
        // console.log("LoggedIn stuffs", response)
        dispatch(SetLoading(false));
        console.log(response.headers);
        dispatch(login(response.data.yourProfile));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      dispatch(SetLoading(false));
      toast.error(error.response?.data?.message);
      dispatch(setError(error.response.data.message));
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate(-1); // Navigate back to the previous page if logged in
    }
  }, [isLoggedIn]);

  // if (loading) {
  //   return (
  //     <Loader/>
  //   )
  // }

  const HandleResetPassword = async () => {};

  return (
    <div className="flex justify-center items-center h-screen dark:bg-gray-50 dark:text-gray-800">
      <ToastContainer />
      <div className="max-w-md md:w-[60%] p-6 rounded-md sm:p-10 bg-white shadow-md">
        {IsSignUp ? (
          <div>
            <div className="mb-8 text-center">
              <h1 className="my-3 text-4xl font-bold">Create Account</h1>
              <p className="text-sm dark:text-gray-600">
                Join us and share your blogs
              </p>
            </div>
            <form className="space-y-6" onSubmit={HandleSignUp}>
              <div>
                <label htmlFor="Username" className="block mb-2 text-sm">
                  Username
                </label>
                <input
                  required
                  value={Username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                  type="text"
                  placeholder="Enter your username"
                />
              </div>
              <div>
                <label htmlFor="Name" className="block mb-2 text-sm">
                  Name
                </label>
                <input
                  required
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                  type="text"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label htmlFor="Email" className="block mb-2 text-sm">
                  Email
                </label>
                <input
                  required
                  value={emailId}
                  onChange={(e) => setemailId(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                  type="email"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="Password" className="block mb-2 text-sm">
                  Password
                </label>
                <input
                  required
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded-md border-gray-300 mr-2"
                />
                <label className="text-sm">Show Password</label>
              </div>
              <h1 className="text-red-600">{CurrentError}</h1>
              {loading ? (
                <MiniLoader />
              ) : (
                <button
                  type="submit"
                  className={`w-full px-8 py-3 font-semibold rounded-md ${
                    loading
                      ? "cursor-not-allowed bg-purple-400"
                      : "bg-purple-500 text-white"
                  }`}
                >
                  Sign Up
                </button>
              )}
            </form>
            <p className="text-sm text-center mt-4 dark:text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => setIsSignUp(false)}
                className="text-indigo-600 hover:underline"
              >
                Sign In
              </button>
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-8 text-center">
              <h1 className="my-3 text-4xl font-bold">Welcome Back</h1>
              <p className="text-sm dark:text-gray-600">
                Sign in to access your account
              </p>
            </div>
            <form className="space-y-6" onSubmit={HandleSignIn}>
              <div>
                <label htmlFor="Email" className="block mb-2 text-sm">
                  Email
                </label>
                <input
                  required
                  value={emailId}
                  onChange={(e) => setemailId(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                  type="email"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="Password" className="block mb-2 text-sm">
                  Password
                </label>
                <input
                  required
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex justify-between">
                <h1 className="text-red-600">{CurrentError}</h1>

                <button
                  onClick={() => setResetingPassword(true)}
                  className="text-xs text-indigo-600 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <button
                type="submit"
                className={`w-full px-8 py-3 font-semibold rounded-md ${
                  loading
                    ? "cursor-not-allowed bg-purple-400"
                    : "bg-purple-500 text-white"
                }`}
              >
                Sign In
              </button>
            </form>
            <p className="text-sm text-center mt-4 dark:text-gray-600">
              Don't have an account yet?{" "}
              <button
                onClick={() => setIsSignUp(true)}
                className="text-indigo-600 hover:underline"
              >
                Register
              </button>
            </p>
          </div>
        )}
        {ResetingPassword && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm">
              <h1 className="text-center text-lg mb-4">Reset your password</h1>
              <input
                type="email"
                value={EmailForReset}
                onChange={(e) => setEmailForReset(e.target.value)}
                placeholder="Enter your registered email"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 mb-4"
              />
              <button
                onClick={HandleResetPassword}
                className="w-full bg-purple-500 text-white px-4 py-2 rounded-md"
              >
                Send Reset Link
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
