import React, { useEffect, useState } from "react";
import axiosInstence from "../utils/axiosInstance";
import AuthorCard from "./AuthorCard";

const About = () => {
  const [TopAuthors, setTopAuthors] = useState();
  const getTopUser = async () => {
    try {
      const topUser = await axiosInstence.get(`/api/authours/top`);
      if (topUser.statusText == "OK") {
        setTopAuthors(topUser.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getTopUser();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="w-[100vw] md:w-full flex flex-col md:flex-row items-center md:items-start gap-5 md:h-auto h-[100vh] p-4">
        <div className="w-[99%] h-[50vh] overflow-hidden rounded-lg  p-4">
          <img
            className="w-full rounded-md h-full object-contain"
            src="https://clarity-tailwind.preview.uideck.com/images/about.png"
            alt="about"
          />
        </div>
        <div className="flex flex-col h-[50vh] items-start md:justify-center w-full p-4 gap-3">
          <h2 className="text-[20px] text-[#625DF5] font-semibold">
            About this Platform{" "}
          </h2>
          <h2 className="text-[24px] font-semibold md:text-[34px]">
            {" "}
            Share Your high quality Articles & blogs
          </h2>
          <h2 className="text-[16px] text-gray-400">
            Sed ullamcorper dui at risus viverra, nec cursus leo ullamcorper.
            Class aptent taciti sociosqu ad litora torquent per conubia nostra,
            per inceptos himenaeos congue dui nec dui lobortis maximus.
          </h2>

          <h2 className="text-[16px] text-gray-400">
            Curabitur pretium, libero vitae pharetra rhoncus, tellus urna auctor
            orci, eu dictum diam diam nec neque. Pellentesque.
          </h2>
        </div>
      </div>
      <div className=" h-auto w-auto p-9 flex flex-col flex-wrap  justify-center items-center gap-2">
        <h1 className="text-[30px] font-semibold">
          Top Authors of the month
        </h1>
        {TopAuthors?.map((data) => (
          <AuthorCard
            _id={data?._id?._id}
            name={data?._id?.firstName + data?._id?.lastName}
            profilephoto={data?._id?.profileUrl}
            bioOrDesignation={data?._id?.bio}
            totalPosts={data?.postCount}
          />
        ))}
      </div>
    </div>
  );
};

export default About;
