import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SpecificBlog = () => {
  const { blogid } = useParams();
  const [Blog, setBlog] = useState(null);
  const [AllCommentsOfPost, setAllCommentsOfPost] = useState([])
  const getBlogs = async () => {
    try {
      const Response = await axios.get(`/api/post/view/${blogid}`);
      setBlog(Response.data.data);
      // console.log(Response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getAllCommetns  = async () => {
    try {
      // Fetch all comments
      const AllComments = await axios.get(`/api/post/${blogid}/comments`);
  
      // Fetch commenter's profile
      const AllCommentBy = await axios.get(`/api/profile/view/${AllComments.data.comments[0].commentedBy}`);
  
      console.log("All Comments", AllComments.data.comments[0].commentedBy);
      // console.log("CommentBy", AllCommentBy.data.data[0]);
  
      // Update the state with the fetched comments
      setAllCommentsOfPost(AllComments.data.comments);  // Use comments directly, not AllComments.data.data
      console.log("getAllCommetns", AllCommentsOfPost);
      
    } catch (error) {
      console.log(error.message);
    }
  };
  
  useEffect(() => {
    getBlogs();
    getAllCommetns();
    // console.log("getAllCommetns", AllCommentsOfPost);
  }, [blogid]);  // Effect runs when `blogid` changes
  
  return (
    <>
      {!Blog ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className="min-h-screen pt-[90px] overflow-y-scroll flex justify-center items-center flex-col gap-6 p-5 bg-gray-50">
          {/* Category Button */}
          <button className="bg-blue-200 p-2 rounded-full text-blue-500 text-sm md:text-base">
            {Blog.category}
          </button>
          {/* Blog Title */}
          <h1 className="text-center text-2xl font-bold md:text-3xl text-gray-800">
            {Blog.title}
          </h1>

          {/* Author Info */}
          <div
            id="Author"
            className="flex justify-between items-center flex-wrap gap-4 text-gray-500"
          >
            <div className="flex items-center gap-2">
              <img
                src={Blog.postBy.profileUrl}
                alt="Author"
                className="w-10 h-10 rounded-full object-cover"
              />
              <p className="text-sm md:text-base">{Blog.postBy.name}</p>
              <p className="text-sm md:text-base">
                {Blog.createdAt
                  ? new Date(Blog.createdAt).toDateString()
                  : "Loading.."}
              </p>
            </div>
          </div>
          {/* Blog Image */}
          <div className="w-full flex justify-center my-6">
            <div id="Image" className="rounded-xl overflow-hidden shadow-lg">
              <img
                src={Blog.imageUrl}
                alt="Blog Visual"
                className="w-full object-cover h-[300px] md:h-[400px]"
              />
            </div>
          </div>

          {/* Blog Content */}
          <div id="Information" className="px-4 md:px-24 max-w-screen-lg">
            <h2 className="text-lg md:text-xl text-gray-700 mb-4">
              {Blog.content}
            </h2>
          </div>
          {/* Comments  */}
          <div
            id="Comments"
            className="h-auto p-11 rounded-md border border-black bg-gray-300 w-[70%] "
          >
            <h1 className="font-bold text-xl">Comments</h1>
           {
            AllCommentsOfPost && AllCommentsOfPost?.map((data)=>(
              <div
              id="SingleCommentAndTheRplies"
              className="h-auto p-3 w-full bg-white"
            >
              <div id="UserInfo" className="flex justify-between px-3 items-center gap-1">
                <div className="flex items-center gap-2">
                  <p className="h-[40px] w-[40px] bg-yellow-300 rounded-full"></p>
                  <p>{data?.comments?.map(commentData=>commentData.text)}</p>
                </div>
                <button>Reply</button>
              </div>
              <div id="Comment">
                <h1>Hellow its</h1>
              </div>

            </div>
            ))
           }
          </div>
        </div>
      )}
    </>
    // <>
    // </>
  );
};

export default SpecificBlog;
