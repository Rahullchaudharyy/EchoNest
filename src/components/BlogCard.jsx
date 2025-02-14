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
    <div className="rounded-lg max-w-xl w-full col-span-1 shadow-lg bg-white relative transition-all hover:shadow-2xl overflow-hidden">
      <div className="w-full h-[250px] sm:h-[300px] flex justify-center items-center p-4">
        <img
          className="rounded-lg border hover:scale-105 transition-all object-cover w-full h-full"
          src={imageUrl}
          alt="Blog Thumbnail"
        />
      </div>
      <div className="w-full p-4 flex flex-col gap-4">
        <Link
          to={`/blog/${_id}`}
          className="text-lg sm:text-xl font-bold hover:text-blue-600 transition-colors"
        >
          {title.split(" ").slice(0, 5).join(" ") + "..."}
        </Link>
        <p className="text-sm sm:text-base text-gray-500 break-words">
          <div
            dangerouslySetInnerHTML={{ __html: truncateText(content, 7) }}
          ></div>
        </p>

        <div className="flex justify-between items-center flex-wrap gap-2">
          {showProfile && (
            <div className="flex items-center gap-2">
              <img
                src={profileUrl}
                alt="Author"
                className="w-8 h-8 rounded-full object-cover border"
              />
              <Link
                to={`/profile/${postby}`}
                className="text-gray-600 text-sm sm:text-base font-medium hover:underline"
              >
                {name}
              </Link>
              <p className="text-gray-500 text-xs sm:text-sm">
                {new Date(createdAt)
                  .toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                  .replace(/^([0-9]+) ([a-zA-Z]+) ([0-9]+)$/, "$2 $1, $3")}
              </p>
            </div>
          )}
          <p className="text-blue-600 border border-blue-500 rounded-full bg-blue-100 px-3 py-1 text-xs sm:text-sm font-medium">
            {Category}
          </p>
        </div>

        {AllowAction && (
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={toggleOptions}
              className="text-gray-500 p-2 hover:bg-gray-200 rounded-full transition-all"
            >
              &#x22EE;
            </button>
            {showOptions && (
              <div className="bg-white shadow-lg rounded-lg mt-2 w-40 absolute right-0">
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
  );
};

export default BlogCard;
