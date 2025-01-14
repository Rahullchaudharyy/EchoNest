


import React, { useState } from "react";
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
  showProfile,
  postby,
  AllowAction,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  // Toggle the options dropdown
  const toggleOptions = () => {
    setShowOptions((prevState) => !prevState);
  };

  // Handle Edit and Delete actions (you can replace these with actual logic)
  const handleEdit = () => {
    console.log("Edit blog with id:", _id);
    // Redirect to edit page or handle edit action
  };

  const handleDelete = () => {
    console.log("Delete blog with id:", _id);
    // Handle delete logic
  };

  return (
    <div>
      <div
        key={_id}
        className={`rounded-lg col-span-1 shadow-xl relative`}
      >
     

        <div id="Post Image" className="w-full h-[300px] flex justify-center items-center p-4">
          <img
            className="rounded-lg border hover:scale-105 hover:transition-all object-cover w-full h-full"
            src={imageUrl}
            alt=""
          />
        </div>
        <div  id="Post-Details" className="relative w-full p-4 flex flex-col gap-4">
       
          <Link to={`/blog/${_id}`} className="text-xl md:text-xl font-bold">{title.split(" ").slice(0,4).join(" ") + '...'}</Link>
          <p className="text-sm md:text-base text-gray-500 break-words">
            {truncateText(content, 20)}
          </p>

          <div id="Author" className="flex justify-between items-center flex-wrap gap-2">
            <div className="flex items-center justify-between w-full gap-2">
              {showProfile && (
                <div className="flex gap-2">
                  <img
                    src={profileUrl}
                    alt="Author"
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <Link to={`/profile/${postby}`} className="text-gray-500 text-sm md:text-[14px]">
                    {name + "•"}
                  </Link>
                  <p className="text-gray-500 text-sm md:text-[14px]">
                    {new Date(createdAt)
                      .toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                      .replace(/^(\S+)\s(\S+)\s(\S+)$/, "$2 $1, $3")}
                  </p>
                </div>
              )}
              <p className="text-blue-500 border border-blue-500 rounded-full bg-blue-100 px-2 py-1 text-xs md:text-sm">
                {Category}
              </p>
            </div>
          </div>
        {AllowAction && (
          <div className="absolute top-0 right-0 p-4 z-10">
            {/* Three dots menu */}
            <button onClick={toggleOptions} className="text-gray-500 absolute right-0 p-4">
              &#x22EE; {/* Vertical Ellipsis */}
            </button>

            {showOptions && (
              <div className=" bg-white shadow-lg rounded-lg mt-[40px] w-40">
                <button
                  onClick={handleEdit}
                  className="block text-left px-4 py-2 text-sm text-blue-500 hover:bg-gray-100 w-full"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="block text-left px-4 py-2 text-red-500 hover:bg-gray-100 w-full"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
