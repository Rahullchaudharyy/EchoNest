

import React, { useState } from "react";
import { motion } from "motion/react";
import logo from "../assets/EchoNest_Logo.png";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

const Navbar = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const {currentUser} = useSelector((state)=>state.user)
  const menuItems = [
    { type: "link", text: "Home", to: "/home" },
    { type: "link", text: "Blogs", to: "/blogs" },
    { type: "link", text: "Your Blogs", to: "/your-blogs" },
    { type: "link", text: "Feedback", to: "/your-blogs" },
    { type: "link", text: "About", to: "/your-blogs" },
    { type: "link", text: "Profile", to: `profile/${currentUser?._id}` },
    
  ];
  

  return (
    <div>
      <nav className="h-[80px] bg-white flex justify-between shadow-sm w-full border-b-2">
        <div className="flex justify-between items-center h-full w-full  px-5">
          {/* Logo */}
          <div>
            <img className="h-[70px]" src={logo} alt="EchoNest_Logo" />
          </div>

          {/* Desktop Menu */}
          <div className="md:flex hidden justify-between items-center  h-full gap-10">
            <Link to={'/home'} className="text-lg hover:text-gray-600">Home</Link>
            <Link to={'/blogs'} className="text-lg hover:text-gray-600">Blogs</Link>
            <Link to={'/createblog'} className="text-lg hover:text-gray-600">Create Blog</Link>
            <h2 className="text-lg hover:text-gray-600 cursor-pointer">Feedback</h2>
            <h2 className="text-lg hover:text-gray-600 cursor-pointer">About</h2>
            <Link to={`/profile/${currentUser?._id}`} className="border-2  p-[8px] px-[12px]  hover:bg-black hover:text-white transition-all cursor-pointer justify-center items-center rounded-full border-black">
            <i className="ri-user-line"></i>
            
            </Link>

          </div>

          {/* Mobile Menu Toggle */}
          <div onClick={() => setMenuToggle(!menuToggle)} className="md:hidden flex items-center">
            <i className={`ri-${menuToggle ? "close-large-line" : "menu-line"} text-2xl`} />
          </div>
        </div>

        {/* Mobile Menu */}
        {menuToggle && (
          <div className="absolute  md:hidden top-[80px] left-1/2 transform -translate-x-1/2 w-[95%] bg-gray-100 h-auto rounded-lg shadow-md">
           

            <div className="flex flex-col items-center gap-5 p-6">
            {menuItems.map((item, index) =>(
          <Link
          onClick={()=>setMenuToggle(!menuToggle)}
            key={index}
            to={item.to}
            className="border-2 font-bold border-black hover:bg-black hover:text-white w-full text-center p-2 rounded-lg"
          >
            {item.text}
          </Link>
        ) 
      )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
