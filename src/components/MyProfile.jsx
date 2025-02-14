import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { truncateText } from "../utils/TextOverflow";
import BlogCard from "./BlogCard";
import { useDispatch, useSelector } from "react-redux";
import { SetLoading } from "../features/LoadingSlice";
import Loader from "./Loader";
import axiosInstence from "../utils/axiosInstance";
import NotFound from "./NotFound";
import { logout } from "../features/userSlice";

const MyProfile = () => {
  const { profileId } = useParams();
  const { loading } = useSelector((state) => state.loading);
  const [ShowMessage, setShowMessage] = useState(false);
  const [showOptions, setshowOptions] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [MyBlogs, setMyBlogs] = useState([]);
  // console.log(profileId);
  const { currentUser } = useSelector((state) => state.user);

  const GetMyBlogs = async () => {
    try {
      dispatch(SetLoading(true));
      const FetchMyBlogs = await axiosInstence.get(
        `/api/post/myposts`,
        {},
        {
          withCredentials: true,
        }
      );

      setMyBlogs(FetchMyBlogs.data.data);
      dispatch(SetLoading(false));

      // toast.success(FetchMyBlogs.data.message);
    } catch (error) {
      dispatch(SetLoading(false));
      setShowMessage(true);
      // toast.error(error.message);
    }
  };

  const HandleLogOut = async () => {
    try {
      localStorage.removeItem("token");
      dispatch(logout());
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetMyBlogs();
  }, []);
  const socialIcons = [
    "ri-facebook-fill",
    "ri-twitter-fill",
    "ri-instagram-fill",
    "ri-linkedin-fill",
    "ri-github-fill",
  ];

  const [SettingOpem, setSettingOpem] = useState(false);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="pt-[80px] h-auto w-full flex flex-col   items-center">
      <div className="w-[85%] md:w-[80%] h-auto flex flex-col md:flex-row p-6 rounded-lg border border-gray-200 bg-[url(https://res.cloudinary.com/djthdoj8n/image/upload/v1736004884/5431981_nxvaf2.jpg)] bg-cover bg-center bg-no-repeat shadow-lg">
        <div className="flex justify-center md:justify-start md:w-[40%]">
          <div className="relative w-[200px] h-[200px] rounded-full overflow-hidden border-4 border-gray-300">
            <img
              src={currentUser?.profileUrl}
              alt="Profile Picture"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <div className="flex flex-col md:w-[60%] mt-6 md:mt-0 md:ml-8 justify-center">
          <div className="flex items-center gap-2 text-gray-800">
            <h1 className="text-2xl font-semibold text-white">Hey! I'm</h1>
            <h1 className="text-2xl font-bold text-white">
              {currentUser?.firstName}
            </h1>
          </div>

          <p className=" text-white mt-3 leading-relaxed text-sm md:text-base">
            {currentUser?.bio}
          </p>

          {currentUser?._id && (
            <div className="relative mt-4">
              <i
                onClick={() => setSettingOpem(!SettingOpem)}
                className="ri-settings-5-line text-2xl text-gray-500 hover:text-white cursor-pointer"
              ></i>
              {SettingOpem && (
                <div className="absolute top-0 p-5 gap-3 ml-8 mt-2 w-[160px] bg-gray-50 border border-gray-300 rounded-lg shadow-md flex flex-col py-2">
                  <button
                    onClick={HandleLogOut}
                    className="text-red-500 select-none hover:text-white hover:bg-red-400 py-2 px-4 rounded-md text-center transition"
                  >
                    Log Out
                  </button>
                  <Link
                    to={`/editprofile`}
                    className="text-blue-500 select-none hover:text-white hover:bg-blue-400 py-2 px-4 rounded-md text-center transition"
                  >
                    Edit Profile
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="hidden md:flex flex-col gap-[50px] pt-7 mb-[20px]">
        {MyBlogs?.map((data, index) => (
          <div
            key={data?._id}
            // onClick={(e) => console.log(_id)}
            className={`rounded-lg relative flex gap-2 h-auto w-[90vw] shadow-xl border bg-white `}
          >
            {currentUser?._id == data?.postBy.userId && (
              <div className="absolute top-0 right-0 p-4 z-10">
                {/* Three dots menu */}
                <button
                  onClick={() => setshowOptions(data?._id)}
                  className="text-gray-500 absolute right-0 p-4"
                >
                  &#x22EE; {/* Vertical Ellipsis */}
                </button>

                {showOptions == data?._id && (
                  <div className=" bg-white shadow-lg rounded-lg  mt-[40px] w-40">
                    <Link
                      to={`/post/edit/${data?._id}`}
                      className="block text-left px-4 py-2 text-sm text-blue-500 hover:bg-gray-100 w-full"
                    >
                      Edit
                    </Link>
                    <button
                      // onClick={handleDelete}
                      className="block text-left px-4 py-2 text-red-500 hover:bg-gray-100 w-full"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
            <div
              id="Post Image"
              className=" w-[40%] h-[350px]  flex justify-center items-center p-4"
            >
              <img
                className="rounded-lg border hover:scale-105 hover:transition-all object-cover w-full h-full"
                src={data?.imageUrl}
                alt=""
              />
            </div>
            <div
              id="Post-Details"
              className=" w-[60%] p-4 flex flex-col justify-center gap-4 "
            >
              <p className="text-blue-500 border text-center w-[70px] border-blue-500 rounded-full bg-blue-100 px-2 py-1 text-xs md:text-sm">
                {data?.category}
              </p>
              <Link
                to={`/blog/${data?._id}`}
                className="text-xl md:text-3xl font-bold"
              >
                {data?.title}
              </Link>
              <p className="text-sm md:text-base text-gray-500 font-bold break-words">
                <div
                  dangerouslySetInnerHTML={{
                    __html: truncateText(data?.content, 20),
                  }}
                ></div>
              </p>
              <div
                id="Author"
                className="flex justify-between items-center flex-wrap gap-2"
              >
                <div className="flex items-center gap-2 relative ">
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
          </div>
        ))}
      </div>
      <div className="h-auto grid md:hidden grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-y-11 gap-x-[7.5] p-4 sm:px-16 gap-6">
        {MyBlogs?.map((data) => (
          <BlogCard
            AllowAction={currentUser?._id == data?.postBy.userId}
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
      {ShowMessage && (
        <NotFound message={"You Have not created any blog yet "} />
      )}
      <ToastContainer />
    </div>
  );
};

export default MyProfile;
