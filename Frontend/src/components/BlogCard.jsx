import React from "react";
import { truncateText } from "../utils/TextOverflow";
import { Link } from "react-router-dom";

const BlogCard = ({
  _id,
  imageUrl,
  title,
  content,
  profileUrl,
  name,
  createdAt,
  Category,
}) => {
  return (
    <div>
      <Link
        key={_id}
        to={`/blog/${_id}`}
        // onClick={(e) => console.log(_id)}
        className=" rounded-lg shadow-xl border bg-white "
      >
        <div
          id="Post Image"
          className=" w-full h-[300px] flex justify-center items-center p-4"
        >
          <img
            className="rounded-lg border hover:scale-105 hover:transition-all object-cover w-full h-full"
            src={imageUrl}
            alt=""
          />
        </div>
        <div id="Post-Details" className=" w-[300px] p-4 flex flex-col gap-4 ">
          <h1 className="text-xl md:text-xl font-bold">{title}</h1>
          <p className="text-sm md:text-base text-gray-500 font-bold break-words">
            {truncateText(content, 20)}
          </p>
          <div
            id="Author"
            className="flex justify-between items-center flex-wrap gap-2"
          >
            <div className="flex items-center gap-2">
              <img
                src={profileUrl}
                alt="Author"
                className="w-8 h-8 rounded-full object-cover"
              />
              <p className="text-gray-500 text-sm md:text-base">{name}</p>
              <p className="text-gray-500 text-sm md:text-base">
                {new Date(createdAt).toLocaleString()}
              </p>
            </div>
            <p className="text-blue-500 border border-blue-500 rounded-full bg-blue-100 px-2 py-1 text-xs md:text-sm">
              {Category}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
