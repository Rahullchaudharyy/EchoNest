import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useAsyncError, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import Loader from "./Loader";
import axiosInstence from "../utils/axiosInstance";
import LogInPopUp from "./LogInPopUp";
import { SetLoading } from "../features/LoadingSlice";
const SpecificBlog = () => {
  const [CommentAdded, setCommentAdded] = useState(false);
  const [TotalLikesOnPost, setTotalLikesOnPost] = useState(0);
  const [TotalComment, setTotalComment] = useState(0);

  const [IsLiked, setIsLiked] = useState(false);
  const [CommentText, setCommentText] = useState("");
  const [LikeState, setLikeState] = useState("");
  const [Comment, setComment] = useState("");
  const [ReplyingOf, setReplyingOf] = useState();
  const { blogid } = useParams();
  const [Blog, setBlog] = useState(null);
  const [AllCommentsOfPost, setAllCommentsOfPost] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const { currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.loading);
  const [ShowPopUp, setShowPopUp] = useState(false);
  const dispatch = useDispatch();

  const [replyEditOf, setreplyEditOf] = useState("");
  const [ReplyEditText, setReplyEditText] = useState("");
  const [Liked, setLiked] = useState(false)

  const handleLike = async (postId) => {
    try {
      if (!isLoggedIn) {
        setShowPopUp(true);
        return;
      }
      const response = await axiosInstence.post(
        `/api/post/like/${postId}`,
        {},
        {
          withCredentials: true,
        }
      );
      // console.log(response)

      if (response.status == 201) {

        setLiked(!Liked)
        // setTotalLikesOnPost(response.data.data.length)
        console.log("Like Stuff",response.data)
        // console.log(response)
        toast.success(response.data.message.toLowerCase().replace(/\s+/g, ""));
        response.data.message.toLowerCase().replace(/\s+/g, "") ==
        "postlikedsuccessfully"
          ? setLikeState(true)
          : setLikeState(false);


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
      dispatch(SetLoading(true));
      const Response = await axiosInstence.get(`/api/post/view/${blogid}`);

      setBlog(Response.data.data);
      if (Response.statusText == "OK" && Blog?.length > 0) {
        dispatch(SetLoading(false));
      }
      // console  .log(Response.data.data);
    } catch (error) {
      dispatch(SetLoading(false));
      console.log(error.message);
    }
  };
  const getAllCommetns = async () => {
    try {
      const AllComments = await axiosInstence.get(
        `/api/post/${blogid}/comments`
      );

      setTotalComment(AllComments.data.comments.length);

      setAllCommentsOfPost(AllComments?.data?.comments);

      dispatch(SetLoading(false))
    } catch (error) {
      console.log(error);
    }
  };
  const HandleReply = async (commentIdOfParentComment) => {
    try {
      if (!isLoggedIn) {
        setShowPopUp(true);
        return;
      }
      const reply = await axiosInstence.post(
        `/api/post/${blogid}/reply`,
        {
          ParentCommentId: commentIdOfParentComment,
          text: CommentText,
        },
        { withCredentials: true }
      );

      toast.info(reply.data.message);
      setCommentAdded(!CommentAdded);
      setReplyingOf('')
      console.log(reply);
    } catch (error) {
      console.log(error);
    }
  };
  const handleComment = async (e) => {
    e.preventDefault();
    try {
      if (!isLoggedIn) {
        setShowPopUp(true);
        return;
      }
      const commentOnPost = await axiosInstence.post(
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
      setCommentAdded(!CommentAdded);

      console.log(commentOnPost);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getTotalLikes = async () => {
    try {
      const totalLikes = await axiosInstence.get(
        `/api/post/likedby/${blogid}`,
        {},
        {
          withCredentials: true,
        }
      );
      // console.log(totalLikes)

      setTotalLikesOnPost(totalLikes.data.data.length);
    } catch (error) {
      console.log(error);
    }
  };
  const editReply = async (CommentOrReplyId) => {
    try {
      if (!isLoggedIn) {
        setreplyEditOf('')
        ShowPopUp(true)
        return;
      }

      if (ReplyEditText.length == 0 ) {
        setreplyEditOf('')
      }

      const edit = await axiosInstence.patch(`/api/post/comment/edit/${CommentOrReplyId}`,{
        text:ReplyEditText
      })
      if (edit.status == 201) {
        console.log('Successfully')
        getAllCommetns()
        setreplyEditOf('')
        setReplyEditText('')
      }
      console.log(edit)
    } catch (error) {
      toast.error(error.message)
    }
  };
  const deleteCommentOrReply = async (commentOrReplyId) => {
    try {
      const DeleteComment = await axiosInstence.delete(`/api/post/comment/delete/${commentOrReplyId}`);
      if (DeleteComment.status == 201) {
        toast.success('Comment Deleted')
        getAllCommetns()
      }
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
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
    // console.log(LikeState,IsLiked)
  }, [LikeState]);
  useEffect(() => {
    getAllCommetns();
    // console.log(AllCommentsOfPost[1]?.commentedBy._id)
    // console.log(Blog?.postBy?.userId)

  }, [CommentAdded]);

  useEffect(() => {
    getTotalLikes();
  }, [Liked,LikeState]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="min-h-screen w-full pt-[90px] overflow-y-scroll flex justify-center items-center flex-col gap-6 p-5 bg-gray-50">
        {ShowPopUp && (
          <LogInPopUp isOpen={true} onClose={() => setShowPopUp(false)} />
        )}
        <button className="bg-blue-200 p-2 rounded-full text-blue-500 text-sm md:text-base">
          {Blog?.category}
        </button>
        <h1 className="text-center text-xl font-bold md:text-4xl text-gray-800">
          {Blog?.title}
        </h1>

        <p className="w-[60%] text-center text-gray-400 font-semibold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim corrupti
          laborum aliquam, sed fugit illum aliquam!
        </p>

        <div
          id="Author"
          className="flex justify-between items-center flex-wrap gap-4 text-gray-500"
        >
          <div className="flex items-center gap-4">
            <img
              src={Blog?.postBy?.profileUrl}
              alt="Author"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="">
              <Link
                to={`/profile/${Blog?.postBy?.userId}`}
                className="text-sm md:text-xl font-bold text-black cursor-pointer"
              >
                {Blog?.postBy?.name}
              </Link>
              <p className="text-sm md:text-base">
                {Blog?.createdAt
                  ? new Date(Blog?.createdAt)
                      .toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                      .replace(/^(\S+)\s(\S+)\s(\S+)$/, "$2 $1, $3")
                  : "Loading.."}
              </p>
            </div>
          </div>
        </div>
        <div className="w-[80%]  flex justify-center my-6">
          <div
            id="Image"
            className="rounded-xl h-[500px] w-full overflow-hidden shadow-lg"
          >
            <img
              src={Blog?.imageUrl}
              alt="Blog Visual"
              className="w-full h-full object-cover  md:h-full"
            />
          </div>
        </div>

        <div className="flex justify-center gap-2">
          <button
            onClick={(e) => handleLike(Blog?._id)}
            className="bg-blue-300 p-[8px] rounded-lg text-center "
          >
            <i className="ri-thumb-up-line text-blue-500"></i> {LikeState == true ? 'Liked':'Like'} (
            {TotalLikesOnPost})
          </button>
          <a
            href="#comment"
            className="bg-red-300 p-[8px] rounded-lg text-center "
          >
            <i className="ri-chat-1-line text-red-500 "></i> Comment (
            {TotalComment})
          </a>
        </div>

        {/* Blog Content */}
        <div id="Information" className="px-4 md:px-24 max-w-screen-lg">
          <h2 className="text-lg md:text-xl text-gray-700 mb-4">
            {Blog?.content}
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

            {AllCommentsOfPost &&
              AllCommentsOfPost?.filter(
                (comment) => !comment?.parentComment
              ).map((parentComment) => (
                <article
                  key={parentComment?._id}
                  className="p-6 mb-3 text-base bg-white rounded-lg"
                >
                  <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <Link
                        to={`/profile/${parentComment?.commentedBy?._id}`}
                        className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold"
                      >
                        <img
                          className="mr-2 w-6 h-6 object-coverx` rounded-full"
                          src={parentComment?.commentedBy?.profileUrl || ""}
                          alt={parentComment?.commentedBy?.firstName}
                        />
                        {parentComment?.commentedBy?.firstName}
                        {Blog?.postBy?.userId == parentComment?.commentedBy._id && <h1 className="p-1 py-0 ml-3 text-white bg-gray-400 rounded-lg"> Author</h1>}
                      </Link>
                    </div>
                  </footer>
                  <p className="text-gray-500">{parentComment?.text}</p>

                  {ReplyingOf === parentComment?._id ? (
                    <div className="flex flex-col md:flex-row gap-2 mt-2">
                      <input
                        value={CommentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        type="text"
                        placeholder={`Reply to ${parentComment?.commentedBy?.firstName}`}
                        className="p-1 border rounded-md focus:outline-dashed"
                      />
                      <button
                        onClick={() => HandleReply(parentComment?._id)}
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
                    <div className="flex gap-5">
                      <button
                        onClick={() => setReplyingOf(parentComment?._id)}
                        className="text-sm text-gray-500 hover:underline font-medium mt-2"
                      >
                        Reply
                      </button>
                      {
                        replyEditOf == parentComment?._id ? (
                          <>
                            <input
                              value={ReplyEditText !== null ? ReplyEditText : parentComment?.text}
                              onChange={(e) =>
                                setReplyEditText(e.target.value)
                              }
                              type="text"
                              placeholder={`edit your reply`}
                              className="p-1 border rounded-md focus:outline-dashed"
                            />
                            <button
                              onClick={() =>
                                editReply(parentComment?._id)
                              }
                              className="text-gray-400 p-1 border rounded-md"
                            >
                              Save Reply
                            </button>
                            <button
                              onClick={() => setreplyEditOf("")}
                              className="text-gray-400 p-1 border rounded-md"
                            >
                              Cancel
                            </button>
                          </>
                        ) :
                        currentUser?._id === parentComment?.commentedBy?._id && (
                          <div className="flex gap-4">
                            <button
                               onClick={() => {
                                setreplyEditOf(parentComment?._id);
                              }}
                              className="text-sm text-gray-500 hover:underline font-medium mt-2"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {deleteCommentOrReply(parentComment?._id)}}
                              className="text-sm text-gray-500 hover:underline font-medium mt-2"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    )
                      }
                    

                  {/* Nested Replies */}
                  <div className="ml-6 mt-4">
                    {AllCommentsOfPost?.filter(
                      (childComment) =>
                        childComment?.parentComment === parentComment?._id
                    ).map((childComment) => (
                      <div
                        key={childComment?._id}
                        className="p-4 mb-2 text-sm bg-gray-100 rounded-lg"
                      >
                        <footer className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <Link
                              to={`/profile/${childComment?.commentedBy?._id}`}
                              className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold"
                            >
                              <img
                                className="mr-2 w-6 h-6 rounded-full"
                                src={
                                  childComment?.commentedBy?.profileUrl || ""
                                }
                                alt={childComment?.commentedBy?.firstName}
                              />
                              {childComment?.commentedBy?.firstName}
                              {Blog?.postBy?.userId == childComment?.commentedBy._id && <h1 className="p-1 py-0 ml-3 text-white bg-gray-400 rounded-lg"> Author</h1>}

                            </Link>
                          </div>
                        </footer>
                        
                        <p className="text-gray-500">{<Link to={`/profile/${parentComment?.commentedBy?._id}`} className="text-blue-600">@{parentComment?.commentedBy?.firstName+" "}</Link>}{childComment?.text}</p>
                        {currentUser?._id ===
                          childComment?.commentedBy?._id && (
                          <div className="flex gap-4">
                            <div className="flex flex-col md:flex-row gap-2 mt-2">
                              {replyEditOf == childComment?._id ? (
                                <>
                                  <input
                                    value={ReplyEditText !== null ? ReplyEditText : childComment?.text}
                                    onChange={(e) =>
                                      setReplyEditText(e.target.value)
                                    }
                                    type="text"
                                    placeholder={`edit your reply`}
                                    className="p-1 border rounded-md focus:outline-dashed"
                                  />
                                  <button
                                    onClick={() =>
                                      editReply(childComment?._id)
                                    }
                                    className="text-gray-400 p-1 border rounded-md"
                                  >
                                    Save Reply
                                  </button>
                                  <button
                                    onClick={() => setreplyEditOf("")}
                                    className="text-gray-400 p-1 border rounded-md"
                                  >
                                    Cancel
                                  </button>
                                </>
                              ) : (
                                <div className="flex gap-4">
                                  <button
                                    onClick={() => {
                                      setreplyEditOf(childComment?._id);
                                    }}
                                    className="text-sm text-blue-500 hover:underline font-medium mt-2"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => {deleteCommentOrReply(childComment?._id)}}
                                    className="text-sm text-red-500 hover:underline font-medium mt-2"
                                  >
                                    Delete
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </article>
              ))}
          </div>
        </section>
      </div>

      <ToastContainer />
    </>
    // <>
    // </>
  );
};

export default SpecificBlog;
