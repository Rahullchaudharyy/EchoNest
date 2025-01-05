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

const Auth = () => {
  const [IsSignUp, setIsSignUp] = useState(true);
  const [loading, setloading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [Name, setName] = useState("");
  const [Username, setUsername] = useState("");
  const [emailId, setemailId] = useState("");
  const [password, setpassword] = useState("");
  const [ResetingPassword, setResetingPassword] = useState(false);
  const [EmailForReset, setEmailForReset] = useState("");
  const dispatch = useDispatch();
  const HandleSignUp = async (e) => {
    e.preventDefault();

    try {
      const Response = await axios.post(`/api/auth/signup`, {
        emailId: emailId,
        password: password,
        firstName: Name,
        username: Username,
      });

      console.log(Response);

      if (Response.status == 201) {
        setIsSignUp(false);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  const HandleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstence.post("/api/auth/signin", {
        emailId: emailId,
        password: password,
      });

      if (response.status == 201) {
        // console.log("LoggedIn stuffs", response)
        dispatch(login(response.data.yourProfile));
        navigate("/home");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate(-1); // Navigate back to the previous page if logged in
    }
  }, [isLoggedIn]);

  const HandleResetPassword = async () => {};

  return (
    <div className="h-auto w-auto flex">
      <ToastContainer />

      <div
        id="Auth-Left"
        className="h-full w-[50%] hidden md:flex justify-center items-center flex-col p-0 relative"
      >
        <img
          src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA3L2pvYjE0NDgtYmFja2dyb3VuZC0wNGEteF8xLmpwZw.jpg"
          alt="Background"
          className="h-screen w-full"
        />
      </div>
      <div
        id="Auth-Right"
        className="h-full w-full md:w-[50%] flex justify-center items-center p-10 md:p-20"
      >
        {IsSignUp ? (
          <div className="flex flex-col gap-9">
            <div className="flex flex-col justify-center items-center gap-11">
              <h1 className="text-center text-3xl font-semibold">
                Throw your Blogs article: Create Your Account
              </h1>
            </div>

            <form className="flex flex-col gap-3" onSubmit={HandleSignUp}>
              <label htmlFor="Username" className="text-sm">
                Username
              </label>
              <input
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
                className="p-4 outline-none focus:border-gray-800 transition-opacity border-b-2 border-gray-500"
                type="text"
                placeholder="Name"
              />
              <label htmlFor="Name" className="text-sm">
                Name
              </label>
              <input
                value={Name}
                onChange={(e) => setName(e.target.value)}
                className="p-4 outline-none focus:border-gray-800 transition-opacity border-b-2 border-gray-500"
                type="text"
                placeholder="Name"
              />
              <label htmlFor="Email" className="text-sm">
                Email
              </label>
              <input
                value={emailId}
                onChange={(e) => setemailId(e.target.value)}
                className="p-4 outline-none focus:border-gray-800 transition-opacity border-b-2 border-gray-500"
                type="text"
                placeholder="Email"
              />
              <label htmlFor="Username" className="text-sm">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                className="p-4 outline-none focus:border-gray-800 transition-opacity border-b-2 border-gray-500"
                type="text"
                placeholder="Password"
              />
              <span className="flex items-center  gap-4">
                <input
                  type="checkbox"
                  className="rounded-full h-[20px] w-[20px] "
                />{" "}
                Show the password{" "}
                <button
                  type="submit"
                  className={`bg-purple-500 p-3 ${
                    loading
                      ? "cursor-not-allowed bg-purple-400"
                      : "cursor-pointer"
                  }  fixed md:right-[4.9rem] right-9 text-white rounded-full mt-3`}
                >
                  SignUp
                </button>
              </span>
            </form>
            <h1 className="">
              Already have an account ?{" "}
              <button
                onClick={() => setIsSignUp(!IsSignUp)}
                className={`border-b ${
                  loading ? "cursor-not-allowed" : "cursor-pointer"
                } border-b-blue-600 bg-none`}
              >
                SignIn
              </button>
            </h1>
          </div>
        ) : (
          <div className="flex flex-col gap-9">
            <div className="flex flex-col justify-center items-center gap-11">
              <h1 className="text-center text-3xl font-semibold">
                Welcome Back !! Glad you come agian
              </h1>
              <button className="p-5 bg-gray-300 rounded-full">
                <i class="ri-google-fill"></i>Signin with Google
              </button>
            </div>

            <form
              onSubmit={HandleSignIn}
              className="flex flex-col gap-3"
              action=""
            >
              <label htmlFor="Email" className="text-sm">
                Email
              </label>
              <input
                value={emailId}
                onChange={(e) => setemailId(e.target.value)}
                className="p-4 outline-none focus:border-gray-800 transition-opacity border-b-2 border-gray-500"
                type="text"
                placeholder="Email"
              />
              <label htmlFor="Username" className="text-sm">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                className="p-4 outline-none focus:border-gray-800 transition-opacity border-b-2 border-gray-500"
                type="text"
                placeholder="Password"
              />
              <span className="flex items-center  gap-4">
                <input
                  type="checkbox"
                  className="rounded-full h-[20px] w-[20px] "
                />{" "}
                Show the password{" "}
                <button
                  type="submit"
                  className={`bg-purple-500 p-3 ${
                    loading
                      ? "cursor-not-allowed bg-purple-400"
                      : "cursor-pointer"
                  }  fixed md:right-[4.9rem] right-9 text-white rounded-full mt-3`}
                >
                  Signin
                </button>
              </span>
              <h1
                onClick={() => setResetingPassword(true)}
                className="text-blue-600 cursor-pointer"
              >
                Forgot password ?
              </h1>
            </form>
            <h1 className="">
              Don't have an account ?{" "}
              <button
                onClick={() => setIsSignUp(!IsSignUp)}
                className="border-b border-b-blue-600 bg-none"
              >
                Register
              </button>
            </h1>
          </div>
        )}
      </div>
      {ResetingPassword && (
        <div className="absolute p-[30px] flex justify-center items-center flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[250px] w-[350px] md:w-[500px] rounded-md bg-gray-100">
          <h1 className="text-center p-6">Enter your registerd email</h1>
          <input
            type="email"
            value={EmailForReset}
            onChange={(e) => setEmailForReset(e.target.value)}
            placeholder="Email"
            className=" p-4 outline-none transition-opacity border rounded-xl border-gray-500"
          />
          <button
            onClick={HandleResetPassword}
            className="bg-purple-500 p-3 w-64 text-white rounded-full mt-3"
          >
            Send Reset link
          </button>
        </div>
      )}
    </div>
  );
};

export default Auth;
