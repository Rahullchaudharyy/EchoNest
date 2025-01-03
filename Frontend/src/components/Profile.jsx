import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { profileId } = useParams();
  console.log(profileId);
  const {currentUser} = useSelector((state)=>state.user)
  useEffect(() => {}, []);
  const socialIcons = [
    "ri-facebook-fill",
  "ri-twitter-fill",
  "ri-instagram-fill",
  "ri-linkedin-fill",
  "ri-github-fill"
  ];
  

  return (
    <div className="pt-[80px] h-[100vh] w-full flex flex-col  items-center">
      <div className="w-[90%] gap-[50px] h-auto md:h-auto md:p-[70px] md:justify-start flex flex-col md:flex-row md:items-center items-center p-4 rounded-md border bg-[#F9FAFB] ">

        <div className="h-[50%] md:h-[100%]">
        <div
          id="Image"
          className="h-[260px] w-[260px] flex rounded-full border border-gray-300 justify-center items-center "
        >
          <div className="w-[180px] h-[180px] rounded-full border overflow-hidden ">
            <img
              src={currentUser?.profileUrl}
              alt=""
            />
          </div>
        </div>
        </div>
            
        <div className="h-[50%] md:h-[100%] md:flex md:flex-col md:justify-center w-full mt-3  p-3">
          <h1 className="flex text-[18px]">Hey! I'm {<h1 className="font-bold">{" "+currentUser?.firstName}</h1>}</h1>

          <p className="text-gray-400 pt-2">{currentUser?.bio}</p>

          <div className="flex gap-4 sm:w-[300px] items-center justify-between p-2 w-full pt-3">
              {socialIcons.map((data)=>(
               <i className={`${data} text-2xl text-gray-500`}></i>
              ))}
          </div>
        </div>
      </div>
      {/* <div className="h-auto">
              {
                BlogData?.map((data)=>(
                        <Link key={data._id} to={`/blog/${data._id}`} onClick={(e)=> console.log(data._id)} className=" rounded-lg shadow-xl  bg-white">
                          <div
                            id="Post Image"
                            className=" w-full flex justify-center items-center p-4"
                          >
                            <img
                              className="rounded-lg hover:scale-105 hover:transition-all object-cover w-full h-full"
                              src={data.imageUrl}
                              alt=""
                            />
                          </div>
                          <div id="Post-Details" className=" w-full p-4 flex flex-col gap-4">
                            <h1 className="text-xl md:text-xl font-bold">
                              {data.title}
                            </h1>
                            <p className="text-sm md:text-base text-gray-500 font-bold">
                              {data.content}
                            </p>
                            <div
                              id="Author"
                              className="flex justify-between items-center flex-wrap gap-2"
                            >
                              <div className="flex items-center gap-2">
                                <img
                                  src={data.postBy.profileUrl}
                                  alt="Author"
                                  className="w-8 h-8 rounded-full object-cover"
                                />
                                <p className="text-gray-500 text-sm md:text-base">
                                  {data.postBy.name}
                                </p>
                                <p className="text-gray-500 text-sm md:text-base">
                                  {
                                  new Date(data.createdAt).toLocaleString()}
                                </p>
                              </div>
                              <p className="text-blue-500 border border-blue-500 rounded-full bg-blue-100 px-2 py-1 text-xs md:text-sm">
                                Category
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))
              }
      </div> */}
    </div>
  );
};

export default Profile;
