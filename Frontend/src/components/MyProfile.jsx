import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { truncateText } from "../utils/TextOverflow";
import BlogCard from "./BlogCard";
import { useDispatch, useSelector } from "react-redux";
import { SetLoading } from "../features/LoadingSlice";


const MyProfile = () => {
  const { profileId } = useParams();
  const { loading } = useSelector((state)=>state.loading);
  
  const dispatch = useDispatch()

  const navigate = useNavigate();
  const [MyBlogs, setMyBlogs] = useState([]);
  // console.log(profileId);
  const { currentUser } = useSelector((state) => state.user);

  const GetMyBlogs = async () => {
    try {
      dispatch(SetLoading(true))
      const FetchMyBlogs = await axios.get(
        `/api/post/myposts`,
        {},
        {
          withCredentials: true,
        }
      );

      setMyBlogs(FetchMyBlogs.data.data);
      dispatch(SetLoading(false))

      // toast.success(FetchMyBlogs.data.message);
    } catch (error) {
      dispatch(SetLoading(false))
      toast.error(error.message);
    }
  };

  const HandleLogOut = async () => {
    try {
      const response = await axios.post(
        `/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status == 200) {
        navigate("/auth");
      }
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
    <>Loading...</>
  }
  return (
    <div className="pt-[80px] h-auto w-full flex flex-col  items-center">
      {/* <div 

style={{
  // background:"url('') no-repeat "
}}
      className="w-[90%] gap-[50px] h-auto md:h-auto md:p-[70px] md:justify-start flex flex-col md:flex-row md:items-center items-center p-4 rounded-md border bg-[url(../assets/hero.svg)] ">
        <div className="h-[50%] md:h-[100%]">
          <div
            id="Image"
            className="h-[260px] w-[260px] flex rounded-full border border-gray-300 justify-center items-center "
          >
            <div className="w-[180px] h-[180px] rounded-full border overflow-hidden ">
              <img src={currentUser?.profileUrl} alt="" />
            </div>
          </div>
        </div>

        <div className="h-[50%] relative md:h-[100%] md:flex md:flex-col md:justify-center w-full mt-3  p-3">
          <h1 className="flex text-[18px]">
            Hey! I'm{" "}
            {<h1 className="font-bold">{" " + currentUser?.firstName}</h1>}
          </h1>

          <p className="text-gray-400 pt-2">{currentUser?.bio}</p>
          {currentUser?._id && <i onClick={()=>setSettingOpem(!SettingOpem)} className="absolute hover:bg-gray-300 rounded-full cursor-pointer text-xl top-0 right-0 ri-settings-5-line"></i>}
          {
            SettingOpem&&<div>
            <div className="w-[140px] h-[130px] top-8 rounded-md right-0 flex flex-col justify-center items-center gap-4 absolute bg-gray-200">

            <button onClick={HandleLogOut} className="text-red-500 bg-red-300 px-6 rounded-md ">Log Out</button>
            <Link to={`/editprofile`} className="text-blue-500 bg-blue-300 px-6 rounded-md">Edit Profile</Link>

            </div>
           </div>
          }

          <div className="flex gap-4 sm:w-[300px] items-center justify-between p-2 w-full pt-3">
            {socialIcons.map((data) => (
              <i className={`${data} text-2xl text-gray-500`}></i>
            ))}
          </div>
        </div>
        
      </div> */}
      <div className="w-full md:w-[80%]  h-auto flex flex-col md:flex-row p-6 rounded-lg border border-gray-200  shadow-lg">
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
            <h1 className="text-2xl font-semibold">Hey! I'm</h1>
            <h1 className="text-2xl font-bold">{currentUser?.firstName}</h1>
          </div>

          <p className="text-gray-600 mt-3 leading-relaxed text-sm md:text-base">
            {currentUser?.bio}
          </p>

          {currentUser?._id && (
            <div className="relative  mt-4">
              <i
                onClick={() => setSettingOpem(!SettingOpem)}
                className="ri-settings-5-line text-2xl text-gray-500 hover:text-gray-700 cursor-pointer"
              ></i>
              {SettingOpem && (
                <div className="absolute top-0 p-5 gap-3  ml-8 mt-2 w-[160px] bg-gray-50 border border-gray-300 rounded-lg shadow-md flex flex-col py-2">
                  <button
                    onClick={HandleLogOut}
                    className="text-red-500 select-none	 hover:text-white hover:bg-red-400 py-2 px-4 rounded-md text-center transition"
                  >
                    Log Out
                  </button>
                  <Link
                    to={`/editprofile`}
                    className="text-blue-500 select-none	 hover:text-white hover:bg-blue-400 py-2 px-4 rounded-md text-center transition"
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
          <Link
            key={data?._id}
            to={`/blog/${data?._id}`}
            // onClick={(e) => console.log(_id)}
            className={`rounded-lg flex gap-2 h-auto w-[90vw] shadow-xl border bg-white `}
          >
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
              <h1 className="text-xl md:text-3xl font-bold">{data?.title}</h1>
              <p className="text-sm md:text-base text-gray-500 font-bold break-words">
                {truncateText(data?.content, 20)}
              </p>
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
      <div className="h-auto grid md:hidden grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-y-11 gap-x-[7.5] p-4 sm:px-16 gap-6">
        {MyBlogs?.map((data) => (
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
  );
};

export default MyProfile;
