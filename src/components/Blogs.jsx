import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBlog } from "../features/blogSlice";
import BlogCard from "./BlogCard";
import { SetLoading } from "../features/LoadingSlice";
import Loader from "./Loader";
import axiosInstence from "../utils/axiosInstance";
import AuthorCard from "./AuthorCard";
import SearchComponent from "./SearchComponent";

const Blogs = () => {
  const [BlogData, setBlogData] = useState([]); // Changed to array initialization
  const [DataForCategory, setDataForCategory] = useState();
  const [categories, setcategories] = useState([]);
  const [hasMore, setHasMore] = useState(true); // New state to track if more data exists
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.blogs);
  const { loading } = useSelector((state) => state.loading);
  const { IsSearching } = useSelector((state) => state.config);
  const [TopAuthors, setTopAuthors] = useState();
  const [page, setpage] = useState(1);
  const [limit, setlimit] = useState(6);

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const data = await axiosInstence.get(
        `/api/post/posts?page=${page}&limit=${limit}`
      );
      const dataForCategory = await axiosInstence.get("/api/post/posts");
      // console.log(dataForCategory)
      let Category = dataForCategory?.data?.data?.map((data) => data.category);
      const UniqueCategory = Category.filter(
        (str, index, arr) => arr.indexOf(str) === index
      );

      //  console.log(UniqueCategory)
      await dispatch(addBlog(data?.data?.data));
      await setcategories(UniqueCategory);
      await setBlogData(data.data.data);
      dispatch(SetLoading(false));

      // console.log(BlogData.data);
    } catch (error) {
      dispatch(SetLoading(false));
      console.log(error.message);
    }
  };
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

  // const getBlogByCategory = (category) => {
  //   // Reset pagination when filtering by category
  //   setpage(1);
  //   setHasMore(true);
  //   setBlogData([]);
  //   if (category) {
  //     const data = blogs.filter((data, index) =>
  //       data?.category == category ? data : null
  //     );
  //     // console.log(data)
  //     setBlogData(data);
  //   } else {
  //     // Reset to initial state for "All" category
  //     setBlogData([]);
  //     getData();
  //   }
  // };
  const getBlogByCategory = (category) => {
    const data = blogs.filter((data, index) =>
      data?.category.toLowerCase() == category.toLowerCase() ? data : null
    );
    // console.log(data)
    setBlogData(data);
  };

  const handleLoadMore = () => {
    setpage((prev) => prev + 1);
  };

  useEffect(() => {
    getData();
  }, [page]);
  useEffect(() => {
    getTopUser();
    // console.log(TopAuthors)
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen flex pt-[90px] justify-start items-center flex-col">
          {IsSearching && <SearchComponent />}
          <div className="flex flex-col justify-start items-center mt-4">
            <h1 className="text-[46px] font-bold text-center">
              Browse By Category
            </h1>
            <h3 className="text-gray-500 text-center">
              Select a category to see more related content
            </h3>
            <div className="flex flex-wrap p-4 gap-4 justify-center items-center">
              <span
                onClick={() => getData()}
                className="hover:bg-black ease-in duration-200 cursor-pointer font-bold border border-black hover:text-white rounded-full px-4 p-2"
              >
                All
              </span>
              {categories.map((data, index) => (
                <span
                  key={index}
                  onClick={() => getBlogByCategory(data)}
                  className={`${
                    index > 5 ? "hidden" : ""
                  } cursor-pointer hover:bg-black ease-in duration-200 font-bold border border-black hover:text-white rounded-full px-4 p-2`}
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

          {hasMore && !loading && (
            <button
              onClick={handleLoadMore}
              className="flex justify-center font-medium hover:bg-black px-9 mt-6 border border-dark rounded-md py-2 px-7.5 hover:bg-dark hover:text-white ease-in duration-200 mx-auto mb-3"
            >
              {page}
            </button>
          )}

          <div className="w-[90%] h-[90px] p-2 border-b flex justify-between items-end mx-1">
            <h1 className="text-[25px] font-bold">Top Authors</h1>
            <h1 className="text-[17px]">
              All Authors <i className="ri-arrow-right-up-box-line"></i>
            </h1>
          </div>

          <div className="w-full h-auto mb-[30px] p-7 gap-6 justify-items-center flex flex-wrap justify-center">
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
      )}
    </>
  );
};

export default Blogs;
