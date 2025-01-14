import React, { useDebugValue, useEffect, useState } from "react";
import { motion } from "motion/react";
import logo from "../assets/EchoNest_Logo.png";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../utils/GetProfile";
import SearchComponent from "./SearchComponent";
import { setSearching } from "../features/ConfigSlice";

const Navbar = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const {IsSearching} = useSelector(state=>state.config)
  const dispatch = useDispatch();
  const params = useLocation();


  const menuItems = [
    { AuthRequired: false, type: "link", text: "Home", to: "/" },
    { AuthRequired: false, type: "link", text: "Blogs", to: "/blogs" },
    {
      AuthRequired: true,
      type: "link",
      text: "Create Blog",
      to: "/createblog",
    },
    { AuthRequired: false, type: "link", text: "Feedback", to: "/Feedback" },
    { AuthRequired: false, type: "link", text: "About", to: "/about" },
    { AuthRequired: true, type: "link", text: "Profile", to: `/myprofile` },
  ];

  const { isLoggedIn } = useSelector((state) => state.user);
  const HandleSearchButton = ()=>{
    dispatch(setSearching(!IsSearching))
  }
  // useEffect(() => {
  //     console.log(isLoggedIn)
  // }, [])

  return (
    <div>
      <nav className="h-[80px] bg-white flex justify-between shadow-sm w-full border-b-2">
        <div className="flex justify-between items-center h-full w-full  px-5">
          <div>
            <img className="h-[70px]" src={logo} alt="EchoNest_Logo" />
          </div>

          {/* Desktop Menu */}
          <div className="md:flex hidden justify-between items-center  h-full gap-10">
           {params.pathname == '/blogs' && <button onClick={HandleSearchButton} className="text-lg   text-center  flex justify-center items-center h-[30px] w-[30px] rounded-full  hover:text-gray-300 transition-all" ><i className=" p-1  ri-search-line"></i></button>}
            {menuItems.map((item, index) => {
              if (!isLoggedIn) {
                if (!item.AuthRequired) {
                  return (
                    <>
                      <Link
                        key={index}
                        to={item.to}
                        className="text-lg hover:text-gray-600"
                      >
                        {item.text}
                      </Link>
                    </>
                  );
                }
                
               

              } else {
                return (
                  <Link
                    key={index}
                    to={item.to}
                    className="text-lg hover:text-gray-600"
                  >
                    {item.text}
                  </Link>
                );
              }
            })}
          {!isLoggedIn &&<Link to={'/auth'} className="border-2 font-bold border-black hover:bg-black hover:text-white w-full text-center p-2 rounded-lg" >Sign In</Link>}
          </div>

          {/* Mobile Menu Toggle */}
          <div
            onClick={() => setMenuToggle(!menuToggle)}
            className="md:hidden flex gap-3 items-center"
          >

{params.pathname == '/blogs' && <button onClick={HandleSearchButton} className="text-lg   text-center  flex justify-center items-center h-[30px] w-[30px] rounded-full  hover:text-gray-300 transition-all" ><i className=" p-1  ri-search-line"></i></button>}

            <i
              className={`ri-${
                menuToggle ? "close-large-line" : "menu-line"
              } text-2xl`}
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {menuToggle && (
          <div className="absolute   md:hidden top-[80px] left-1/2 transform -translate-x-1/2 w-[95%] bg-gray-100 h-auto rounded-lg shadow-md">
            <div className="flex flex-col items-center gap-5 p-6">
             
              {menuItems.map((item, index) => {
              if (!isLoggedIn) {
                if (!item.AuthRequired) {
                  return (
                    <>
                      <Link
                      onClick={() => setMenuToggle(!menuToggle)}
                        key={index}
                        to={item.to}
                        className="border-2 font-bold border-black hover:bg-black hover:text-white w-full text-center p-2 rounded-lg"
                      >
                        {item.text}
                      </Link>
                    </>
                  );
                }
                
               

              } else {
                return (
                  <Link
                  onClick={() => setMenuToggle(!menuToggle)}
                    key={index}
                    to={item.to}
                    className="border-2 font-bold border-black hover:bg-black hover:text-white w-full text-center p-2 rounded-lg"
                  >
                    {item.text}
                  </Link>
                );
              }
            })}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
