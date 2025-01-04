import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useAsyncError, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import Loader from "./Loader";
const SpecificBlog = () => {
  const [CommentAdded, setCommentAdded] = useState(false)
  const [TotalLikesOnPost, setTotalLikesOnPost] = useState(0)
  const [TotalComment, setTotalComment] = useState(0)

  const [IsLiked, setIsLiked] = useState(false);
  const [CommentText, setCommentText] = useState('')
  const [LikeState, setLikeState] = useState("");
  const [Comment, setComment] = useState("");
  const [ReplyingOf, setReplyingOf] = useState();
  const { blogid } = useParams();
  const [Blog, setBlog] = useState(null);
  const [AllCommentsOfPost, setAllCommentsOfPost] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  const handleLike = async (postId) => {
    try {
      const response = await axios.post(
        `/api/post/like/${postId}`,
        {},
        {
          withCredentials: true,
        }
      );
      // console.log(response)

      if (response.status == 201) {
        // console.log(response)
        toast.success(response.data.message);
        response.data.message.toLowerCase().replace(/\s+/g, "") ===
        "postlikedsuccessfully"
          ? setLikeState("Liked")
          : setLikeState("Like");

        // console.log(response.data.message.toLowerCase().replace(/\s+/g, ''));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDropdownToggle = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };
  const getBlogs = async () => {
    try {
      const Response = await axios.get(`/api/post/view/${blogid}`);
      setBlog(Response.data.data);
      // console.log(Response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getAllCommetns = async () => {
    try {
      const AllComments = await axios.get(`/api/post/${blogid}/comments`);

      setTotalComment(AllComments.data.comments.length)

      setAllCommentsOfPost(AllComments?.data?.comments); 
    } catch (error) {
      console.log(error);
    }
  };
  const HandleReply = async (commentIdOfParentComment) => {
    try {
      const reply = await axios.post(`/api/post/${blogid}/reply`,{
        ParentCommentId:commentIdOfParentComment,
        text:CommentText
      },{withCredentials:true});

      toast.info(reply.data.message)
      setCommentAdded(!CommentAdded)
      console.log(reply)
    } catch (error) {
      console.log(error)
    }
  }
  const handleComment = async (e) => {
    e.preventDefault();
    try {
      const commentOnPost = await axios.post(
        `/api/post/comment/${Blog._id}`,
        {
          text: Comment,
        },
        {
          withCredentials: true,
        }
      );
      toast.info(commentOnPost.data.message);
      setComment("");
      setCommentAdded(!CommentAdded)

      console.log(commentOnPost);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getTotalLikes = async () => {
    try {
      const totalLikes = await axios.get(`/api/post/likedby/${blogid}`,{},{
        withCredentials:true
      })

      setTotalLikesOnPost(totalLikes.data.data.length);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getBlogs();
    getAllCommetns();
    if (Blog?.likedBy?.includes(currentUser?._id)) {
      setLikeState("Liked");
      setIsLiked(true);
    } else {
      setLikeState("Like");
      setIsLiked(false);
    }
    // console.log(LikeState,IsLiked)

    // console.log("getAllCommetns", AllCommentsOfPost);
  }, [blogid]); 
  
  useEffect(() => {
    if (Blog?.likedBy?.includes(currentUser?._id)) {
      setLikeState("Liked");
      setIsLiked(true);
    } else {
      setLikeState("Like");
      setIsLiked(false);
    }
    // console.log(LikeState,IsLiked)
  }, [LikeState]);
  useEffect(() => {
    getAllCommetns();
  }, [CommentAdded]);

  useEffect(()=>{
    getTotalLikes()
  },[])

  return (
    <>
      {!Blog ? (
        <Loader/>
) : (
        <div className="min-h-screen w-full pt-[90px] overflow-y-scroll flex justify-center items-center flex-col gap-6 p-5 bg-gray-50">
          <button className="bg-blue-200 p-2 rounded-full text-blue-500 text-sm md:text-base">
            {Blog.category}
          </button>
          <h1 className="text-center text-xl font-bold md:text-4xl text-gray-800">
            {Blog.title}
          </h1>

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
              <Link to={`/profile/${Blog.postBy?.userId}`} className="text-sm md:text-base cursor-pointer">{Blog.postBy.name}</Link>
              <p className="text-sm md:text-base">
                {Blog.createdAt
                  ? new Date(Blog.createdAt).toDateString()
                  : "Loading.."}
              </p>
            </div>
          </div>
          <div className="w-[80%]  flex justify-center my-6">
            <div
              id="Image"
              className="rounded-xl h-[500px] w-full overflow-hidden shadow-lg"
            >
              <img
                src={Blog.imageUrl}
                alt="Blog Visual"
                className="w-full h-full object-cover  md:h-full"
              />
            </div>
          </div>

          <div className="flex justify-center gap-2">
            <button
              onClick={(e) => handleLike(Blog._id)}
              className="bg-blue-300 p-[8px] rounded-lg text-center "
            >
              <i className="ri-thumb-up-line text-blue-500"></i> {LikeState} ({TotalLikesOnPost})
            </button>
            <a href="#comment" className="bg-red-300 p-[8px] rounded-lg text-center ">
              <i className="ri-chat-1-line text-red-500 "></i> Comment ({TotalComment})
            </a>
          </div>

          {/* Blog Content */}
          <div id="Information" className="px-4 md:px-24 max-w-screen-lg">
            <h2 className="text-lg md:text-xl text-gray-700 mb-4">
              {Blog.content}
            </h2>
          </div>
        
          <section id="comment" className="bg-gray-100 py-8 lg:py-16 antialiased">
            <div className="w-[70vw] mx-auto px-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg lg:text-2xl font-bold text-black">
                  Comments
                </h2>
              </div>
              <form className="mb-6" onSubmit={(e) => handleComment(e)}>
                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
                  <label htmlFor="comment" className="sr-only">
                    Your comment
                  </label>
                  <textarea
                    id="comment"
                    rows="6"
                    className="px-0 w-full text-sm text-gray-900 focus:ring-0 focus:outline-none"
                    placeholder="Write a comment..."
                    value={Comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-blue-300 rounded-lg focus:ring-4 transition-all focus:ring-primary-200 hover:bg-blue-100"
                >
                  Post comment
                </button>
              </form>

              {/* { AllCommentsOfPost?.map((data, index) => (
                <article
                  key={data._id}
                  className={`p-6 ${
                    data._id !== 1 ? "mb-3" : ""
                  } text-base bg-white rounded-lg`}
                >
                  <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold">
                        <img
                          className="mr-2 w-6 h-6 rounded-full"
                          src={data.commentedBy?.profileUrl || ""}
                          alt={data.commentedBy?.firstName}
                        />
                        {data.commentedBy?.firstName}
                      </p>
                     
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
                      onClick={() => handleDropdownToggle(data._id)}
                    >
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 3"
                      >
                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                      </svg>
                      <span className="sr-only">Comment settings</span>
                    </button>
                    {dropdownOpen === data._id && (
                      <div className="z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow">
                        <ul className="py-1 text-sm text-gray-700">
                          <li>
                            <a
                              href="#"
                              className="block py-2 px-4 hover:bg-gray-100"
                            >
                              Edit
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block py-2 px-4 hover:bg-gray-100"
                            >
                              Remove
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block py-2 px-4 hover:bg-gray-100"
                            >
                              Report
                            </a>
                          </li>
                        </ul>
                      </div>
                    )}
                  </footer>
                  <p className="text-gray-500">{data.text}</p>
                  {ReplyingOf == data._id ? (
                    <div  className="flex gap-2">

                      <input
                        value={CommentText}
                        onChange={(e)=>setCommentText(e.target.value)}
                        type="text"
                        placeholder={`Reply to ${data.commentedBy.firstName}`}
                        className="p-1 border rounded-md focus:outline-dashed"
                      />
                      <button onClick={()=>HandleReply(data._id)} className="text-gray-400 p-1 border rounded-md">Post Reply</button>
                      <button onClick={()=>setReplyingOf('')} className="text-gray-400 p-1 border rounded-md">Cancel</button>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="flex items-center mt-4 space-x-4">
                    <button
                      type="button"
                      onClick={() => setReplyingOf(data._id)}
                      className="flex items-center text-sm text-gray-500 hover:underline font-medium"
                    >
                      <svg
                        className="mr-1.5 w-3.5 h-3.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                        />
                      </svg>
                      Reply
                    </button>
                  </div>
                </article>
              ))} */}
              {AllCommentsOfPost &&
  AllCommentsOfPost.filter((comment) => !comment.parentComment).map((parentComment) => (
    <article
      key={parentComment._id}
      className="p-6 mb-3 text-base bg-white rounded-lg"
    >
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold">
            <img
              className="mr-2 w-6 h-6 rounded-full"
              src={parentComment.commentedBy?.profileUrl || ""}
              alt={parentComment.commentedBy?.firstName}
            />
            {parentComment.commentedBy?.firstName}
          </p>
        </div>
      </footer>
      <p className="text-gray-500">{parentComment.text}</p>

      {/* Input for replying to parent comment */}
      {ReplyingOf === parentComment._id ? (
        <div className="flex gap-2 mt-2">
          <input
            value={CommentText}
            onChange={(e) => setCommentText(e.target.value)}
            type="text"
            placeholder={`Reply to ${parentComment.commentedBy.firstName}`}
            className="p-1 border rounded-md focus:outline-dashed"
          />
          <button
            onClick={() => HandleReply(parentComment._id)}
            className="text-gray-400 p-1 border rounded-md"
          >
            Post Reply
          </button>
          <button
            onClick={() => setReplyingOf("")}
            className="text-gray-400 p-1 border rounded-md"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setReplyingOf(parentComment._id)}
          className="text-sm text-gray-500 hover:underline font-medium mt-2"
        >
          Reply
        </button>
      )}

      {/* Nested Replies */}
      <div className="ml-6 mt-4">
        {AllCommentsOfPost.filter(
          (childComment) => childComment.parentComment === parentComment._id
        ).map((childComment) => (
          <div
            key={childComment._id}
            className="p-4 mb-2 text-sm bg-gray-100 rounded-lg"
          >
            <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold">
                  <img
                    className="mr-2 w-6 h-6 rounded-full"
                    src={childComment.commentedBy?.profileUrl || ""}
                    alt={childComment.commentedBy?.firstName}
                  />
                  {childComment.commentedBy?.firstName}
                </p>
              </div>
            </footer>
            <p className="text-gray-500">{childComment.text}</p>
          </div>
        ))}
      </div>
    </article>
  ))}

            </div>
          </section>
        </div>
      )}

      <ToastContainer />
    </>
    // <>
    // </>
  );
};

export default SpecificBlog;
