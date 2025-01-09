import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addBlog } from "../features/blogSlice";
import BlogCard from "./BlogCard";
import { SetLoading } from "../features/LoadingSlice";
import Loader from "./Loader";
import axiosInstence from "../utils/axiosInstance";
import AuthorCard from "./AuthorCard";
import SearchComponent from "./SearchComponent";

const Blogs = () => {
  const [BlogData, setBlogData] = useState();
  const [DataForCategory, setDataForCategory] = useState();
  const [categories, setcategories] = useState([]);
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.blogs);
  const { loading } = useSelector((state) => state.loading);
  const { IsSearching } = useSelector((state) => state.config);

  // console.log(blogs)
  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const data = await axiosInstence.get("/api/post/posts?page=1&limit=19");
      const dataForCategory = await axiosInstence.get("/api/post/posts");
      // console.log(dataForCategory)
      const Category = dataForCategory?.data?.data?.map(
        (data) => data.category
      );
      //  console.log(Category)
      await dispatch(addBlog(data?.data?.data));
      await setcategories(Category);
      await setBlogData(data.data.data);
      dispatch(SetLoading(false));

      // console.log(BlogData.data);
    } catch (error) {
      dispatch(SetLoading(false));
      console.log(error.message);
    }
  };
  const getBlogByCategory = (category) => {
    const data = blogs.filter((data, index) =>
      data?.category == category ? data : null
    );
    // console.log(data)
    setBlogData(data);
  };
  const truncateText = (text, limit) => {
    const words = text.split(" ");

    return words.length > limit
      ? `${words.slice(0, limit).join(" ")}... read more`
      : text;
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen flex pt-[90px]  justify-start items-center flex-col">
          {IsSearching&&<SearchComponent/>}
          <div className="flex flex-col justify-start items-center mt-4">
            <h1 className="text-[46px] font-bold text-center">
              Browse By Category
            </h1>
            <h3 className="text-gray-500 text-center">
              Select a category to see more related content
            </h3>
            <div className="flex flex-wrap p-4 gap-4 justify-center items-center">
              <span
                onClick={getData}
                className=" hover:bg-black ease-in duration-200 cursor-pointer font-bold border border-black hover:text-white rounded-full px-4 p-2 "
              >
                All
              </span>
              {categories.map((data, index) => (
                <span
                  onClick={() => getBlogByCategory(data)}
                  className={`${
                    index > 5 ? "hidden" : ""
                  } cursor-pointer hover:bg-black ease-in duration-200 font-bold border border-black hover:text-white rounded-full px-4 p-2 `}
                >
                  {data}
                </span>
              ))}
            </div>
          </div>

          <div className="h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-y-11 gap-x-[7.5] p-4 sm:px-16 gap-6">
            {BlogData?.map((data) => (
              <BlogCard
                showProfile={true}
                key={data._id}
                _id={data._id}
                imageUrl={data.imageUrl}
                postby={data.postBy.userId}
                title={data.title}
                name={data.postBy.name}
                createdAt={data.createdAt}
                Category={data.category}
                profileUrl={data?.postBy?.profileUrl}
                content={data.content}
              />
            ))}
          </div>
          {/* <button className="border mb-4 w-[130px] p-2 rounded-xl  hover:bg-black hover:text-white hover:transition-all border-black">Browse more </button> */}
          <button className="flex justify-center font-medium hover:bg-black px-9 mt-6 border border-dark rounded-md py-2 px-7.5 hover:bg-dark hover:text-white ease-in duration-200 mx-auto mb-3">
            Load More
          </button>

            {/* top authors  */}
            <div className="w-[90%] h-[90px] p-2 border-b  flex justify-between items-end mx-1">
            <h1 className="text-[25px] font-bold">Top Authors</h1>
            <h1 className="text-[17px] ">All Authors <i class="ri-arrow-right-up-box-line"></i></h1>
            </div>
          <div className="w-full h-auto mb-[30px] p-7 gap-6 justify-items-center flex flex-wrap justify-center ">

            <AuthorCard name={"David"} profilephoto={'https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg'} bioOrDesignation={'Full-Stack-Developer'} totalPosts={8}/>
            <AuthorCard name={"David"} profilephoto={'https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg'} bioOrDesignation={'Full-Stack-Developer'} totalPosts={8}/>
            <AuthorCard name={"David"} profilephoto={'https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg'} bioOrDesignation={'Full-Stack-Developer'} totalPosts={8}/>
          </div>
        </div>
      )}
    </>
  );
};
export default Blogs;
