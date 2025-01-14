import React from 'react';
import { Link } from 'react-router-dom';

const AuthorCard = ({ name, bioOrDesignation, totalPosts, profilephoto, _id }) => {
  return (
    <Link
      to={`/profile/${_id}`}
      className="w-full sm:w-[68%] lg:w-[50%] cursor-pointer hover:scale-105 transition-transform duration-300 h-auto flex flex-wrap md:flex-nowrap rounded-lg border p-4"
    >
      {/* Profile Image Section */}
      <div className="flex justify-center items-center w-full md:w-[120px] h-[120px] md:h-full md:mr-4">
        <img
          className="h-[80px] w-[80px] md:h-[100px] md:w-[100px] rounded-full object-cover"
          src={profilephoto}
          alt="Author"
        />
      </div>

      {/* Author Info Section */}
      <div className="flex flex-col w-full md:w-auto justify-start items-start mt-4 md:mt-0">
        <h1 className="text-[18px] md:text-[20px] font-semibold text-center md:text-left">{name}</h1>
        <h2 className="text-[14px] md:text-[16px] text-gray-400 font-medium text-center md:text-left">
          {bioOrDesignation}
        </h2>
        <h2 className="text-[14px] text-gray-400 text-center md:text-left">
          <i className="ri-edit-2-line"></i> {totalPosts} Published Posts
        </h2>
      </div>
    </Link>
  );
};

export default AuthorCard;
