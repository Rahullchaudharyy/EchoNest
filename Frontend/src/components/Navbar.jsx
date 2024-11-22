// import React, { useEffect, useState } from "react";
// import { motion } from "motion/react";
// import logo from "../assets/EchoNest_Logo.png";
// import axios from "axios";
// import {Link} from 'react-router-dom'
// const Navbar = () => {
//   const [MenuToggle, setMenuToggle] = useState(false);

//    return (
//     <div>
//       <nav className="h-[80px] bg-white shadow-sm fixed w-full border-b-2">
//         <div className=" flex justify-between items-center h-full px-5">
//           <div>
//             <img className="h-[70px]" src={logo} alt="EchoNest_Logo" />
//           </div>
//           <div className="md:flex hidden justify-between items-center h-full max-w-[45%] gap-10">
//           <Link to={'home'}>Home</Link>
//             <Link to={'blogs'}>Blogs</Link>
//             <Link to={'blogs'}>Your Blogs</Link>
//             <h2>Feedback</h2>
//             <h2>About</h2>
//           </div>
//           <div onClick={()=>setMenuToggle(!MenuToggle)}>
//             <i  className="ri-menu-line text-2xl md:hidden"></i>
//             <i className="border-2 p-3 h-[40px] w-[40px] hover:bg-black hover:text-white hover:transition-all cursor-pointer justify-center items-center rounded-full border-black hidden md:flex ri-user-line"></i>
//           </div>
//         </div>
//         {MenuToggle && (
//           <div className="absolute md:hidden top-[31%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%] rounded-lg bg-gray-100  h-[400px]">
//             <div className="h-[80px] bg-gray-100 rounded-t ">
//               <div className=" flex justify-between items-center h-full px-5">
//                 <div>
//                   <img className="h-[70px]" src={logo} alt="EchoNest_Logo" />
//                 </div>
//                 <div onClick={()=>setMenuToggle(!MenuToggle)}>
//                   <i class={MenuToggle?"ri-close-large-line" :"ri-menu-line text-2xl"}></i>
//                 </div>
//               </div>
//             </div>
//             <div className="flex flex-col mt-5 h-[200px] justify-center items-center  w-full gap-5 p-6">
//             <h2 className=" border-2 font-bold border-black hover:bg-black hover:text-white hover:transition-all w-full text-center p-2 rounded-lg">Home</h2>
//             <h2 className=" border-2 font-bold border-black hover:bg-black hover:text-white hover:transition-all w-full text-center p-2 rounded-lg">Blogs</h2>
//             <h2 className=" border-2 font-bold border-black hover:bg-black hover:text-white hover:transition-all w-full text-center p-2 rounded-lg">Your Blogs</h2>
//             <h2 className=" border-2 font-bold border-black hover:bg-black hover:text-white hover:transition-all w-full text-center p-2 rounded-lg">Feedback</h2>
//           </div>
//           </div>
//         )}
//       </nav>
//     </div>
//   );
//   }
  
  


// export default Navbar;


import React, { useState } from "react";
import { motion } from "motion/react";
import logo from "../assets/EchoNest_Logo.png";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuToggle, setMenuToggle] = useState(false);

  return (
    <div>
      <nav className="h-[80px] bg-white shadow-sm fixed w-full border-b-2 z-10">
        <div className="flex justify-between items-center h-full px-5">
          {/* Logo */}
          <div>
            <img className="h-[70px]" src={logo} alt="EchoNest_Logo" />
          </div>

          {/* Desktop Menu */}
          <div className="md:flex hidden justify-between items-center h-full max-w-[45%] gap-10">
            <Link to={'/home'} className="text-lg hover:text-gray-600">Home</Link>
            <Link to={'/blogs'} className="text-lg hover:text-gray-600">Blogs</Link>
            <Link to={'/your-blogs'} className="text-lg hover:text-gray-600">Your Blogs</Link>
            <h2 className="text-lg hover:text-gray-600 cursor-pointer">Feedback</h2>
            <h2 className="text-lg hover:text-gray-600 cursor-pointer">About</h2>
          </div>

          {/* Mobile Menu Toggle */}
          <div onClick={() => setMenuToggle(!menuToggle)} className="md:hidden flex items-center">
            <i className={`ri-${menuToggle ? "close-large-line" : "menu-line"} text-2xl`} />
            <i className="border-2 p-3 h-[40px] w-[40px] hover:bg-black hover:text-white transition-all cursor-pointer justify-center items-center rounded-full border-black ml-3 ri-user-line"></i>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuToggle && (
          <div className="absolute md:hidden top-[80px] left-1/2 transform -translate-x-1/2 w-[95%] bg-gray-100 h-auto rounded-lg shadow-md">
            {/* <div className="flex justify-between items-center h-[80px] bg-gray-100 rounded-t-lg px-5">
              <div>
                <img className="h-[70px]" src={logo} alt="EchoNest_Logo" />
              </div>
              <div onClick={() => setMenuToggle(!menuToggle)}>
                <i className="ri-close-line text-2xl cursor-pointer" />
              </div>
            </div> */}

            <div className="flex flex-col items-center gap-5 p-6">
              <Link to="/home" className="border-2 font-bold border-black hover:bg-black hover:text-white w-full text-center p-2 rounded-lg">Home</Link>
              <Link to="/blogs" className="border-2 font-bold border-black hover:bg-black hover:text-white w-full text-center p-2 rounded-lg">Blogs</Link>
              <Link to="/your-blogs" className="border-2 font-bold border-black hover:bg-black hover:text-white w-full text-center p-2 rounded-lg">Your Blogs</Link>
              <h2 className="border-2 font-bold border-black hover:bg-black hover:text-white w-full text-center p-2 rounded-lg">Feedback</h2>
              <h2 className="border-2 font-bold border-black hover:bg-black hover:text-white w-full text-center p-2 rounded-lg">About</h2>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
