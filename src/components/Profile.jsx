import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { truncateText } from "../utils/TextOverflow";
import BlogCard from "./BlogCard";
import { getProfile } from "../utils/GetProfile";
import { SetLoading } from "../features/LoadingSlice";
import Loader from "./Loader";
import axiosInstence from "../utils/axiosInstance";
import NotFound from "./NotFound";

const Profile = () => {
  const { profileId } = useParams();
  const [user, setUser] = useState(null); // Start with null instead of undefined
  const [myBlogs, setMyBlogs] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.blogs);
  const [ShowMessage, setShowMessage] = useState(false);
  const [ShowProfile, setShowProfile] = useState(false);

  const { loading } = useSelector((state) => state.loading);

  const socialIcons = [
    "ri-facebook-fill",
    "ri-twitter-fill",
    "ri-instagram-fill",
    "ri-linkedin-fill",
    "ri-github-fill",
  ];

  const getMyBlogs = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axiosInstence.get(`/api/posts/${profileId}`, {
        withCredentials: true,
      });
      setMyBlogs(response.data.data);
      if (response.data.data.length < 1) {
        setShowMessage(true);
      }
      dispatch(SetLoading(false));
    } catch (error) {
      dispatch(SetLoading(false));
      setShowMessage(true);
    }
  };

  const fetchProfile = async () => {
    try {
      dispatch(SetLoading(true));

      const data = await getProfile(profileId);
      setUser(data?.data[0]); // Use the first user in the data array
      dispatch(SetLoading(false));
    } catch (error) {
      dispatch(SetLoading(false));
      toast.error("Failed to fetch profile.");
    }
  };

  useEffect(() => {
    getMyBlogs();
    fetchProfile();
    console.log(user);
  }, [profileId]);
  if (loading) {
    <Loader />;
  }

  return (
    <>
      <div className="pt-[80px]  h-auto w-full flex flex-col items-center">
        <div className="w-[90%] gap-[50px] h-auto md:h-auto  md:justify-start flex flex-col md:flex-row md:items-center items-center p-4 rounded-md border bg-[#F9FAFB] ">
          <div className="h-[50%] md:h-[100%]">
            <div
              id="Image"
              className="h-[260px] w-[260px] flex rounded-full border border-gray-300 justify-center items-center"
            >
              <div className="w-[180px] h-[180px] rounded-full border overflow-hidden">
                {user?.profileUrl ? (
                  <img
                    onClick={() => setShowProfile(!ShowProfile)}
                    className="h-full cursor-pointer scale-150 w-full object-cover"
                    src={user.profileUrl}
                    alt="Profile"
                  />
                ) : (
                  <p className="text-center">Loading...</p>
                )}
              </div>
            </div>
          </div>

          <div className="h-[50%] relative md:h-[100%] md:flex md:flex-col md:justify-center w-full mt-3 p-3">
            <h1 className="flex text-[18px]">
              <span className="font-bold">
                {<span>Hey! I'm </span>}
                {user?.firstName || "Loading..."}
              </span>
            </h1>
            <p className="text-gray-400 pt-2">
              {user?.bio || "No bio available."}
            </p>

            <div className="flex gap-4 sm:w-[300px] items-center justify-between p-2 w-full pt-3">
              {socialIcons.map((icon) => (
                <i key={icon} className={`${icon} text-2xl text-gray-500`}></i>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden md:flex flex-col gap-[50px] pt-7 mb-[20px]">
          {myBlogs?.map((data) => (
            <Link
              key={data?._id}
              to={`/blog/${data?._id}`}
              className={`rounded-lg flex gap-2 h-auto w-[90vw] shadow-xl border bg-white`}
            >
              <div
                id="Post Image"
                className="w-[40%] h-[350px] flex justify-center items-center p-4"
              >
                <img
                  className="rounded-lg border hover:scale-105 hover:transition-all object-cover w-full h-full"
                  src={data?.imageUrl}
                  alt=""
                />
              </div>
              <div
                id="Post-Details"
                className="w-[60%] p-4 flex flex-col justify-center gap-4"
              >
                <p className="text-blue-500 border text-center w-[70px] border-blue-500 rounded-full bg-blue-100 px-2 py-1 text-xs md:text-sm">
                  {data?.category}
                </p>
                <h1 className="text-xl md:text-3xl font-bold">{data?.title}</h1>
                <div
                  dangerouslySetInnerHTML={{
                    __html: truncateText(data?.content, 20),
                  }}
                  className="text-sm md:text-base text-gray-500 font-bold break-words"
                ></div>
                <div
                  id="Author"
                  className="flex justify-between items-center flex-wrap gap-2"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={data?.postBy?.profileUrl}
                      alt="Author"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <p className="text-gray-500 text-sm md:text-base">
                      {data?.postBy?.name}
                    </p>
                    <p className="text-gray-500 text-sm md:text-base">
                      {new Date(data?.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {ShowMessage && (
          <NotFound
            message="Blog Not Found"
            subMessage={` ${user?.firstName} have'nt Posted anything yet`}
          />
        )}

        <div className="h-auto grid md:hidden grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-y-11 gap-x-[7.5] p-4 sm:px-16 gap-6">
          {myBlogs?.map((data) => (
            <BlogCard
              showProfile={false}
              key={data._id}
              _id={data._id}
              profileUrl={data.postBy.profileUrl}
              imageUrl={data.imageUrl}
              title={data.title}
              name={data.postBy.name}
              createdAt={data.createdAt}
              Category={data.category}
              content={data.content}
            />
          ))}
        </div>

        <ToastContainer />
      </div>

      {ShowProfile && (
        <div className="w-[100%]  h-[100%] fixed top-0 left-0 bg-black/30 backdrop-blur-sm transition-all duration-300   ">
          <i
            onClick={() => setShowProfile(!ShowProfile)}
            className="cursor-pointer absolute right-0 p-3 text-white drop-shadow-xl text-[30px] ri-close-large-line"
          ></i>

          <div className=" rounded-md  absolute z-[100] transform -translate-y-1/2 overflow-hidden -translate-x-1/2 left-1/2 top-1/2 w-[400px] h-[400px] ">
            <img
              className="h-full rounded-md overflow-hidden cursor-pointer  w-full object-cover"
              src={user?.profileUrl}
              alt="Profile"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
