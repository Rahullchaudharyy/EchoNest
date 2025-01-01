import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addBlog } from "../features/blogSlice";

const Blogs = () => {
  const [BlogData, setBlogData] = useState();
  const [DataForCategory, setDataForCategory] = useState()
  const [categories, setcategories] = useState([])
  const dispatch = useDispatch();
  const {blogs} = useSelector((state)=>state.blogs)
  console.log(blogs)
  const getData = async () => {
    try {
      const data = await axios.get("/api/post/posts?page=1&limit=19");
      const dataForCategory = await axios.get('/api/post/posts');
      // console.log(dataForCategory)
     const Category =  dataForCategory?.data?.data?.map((data)=>data.category)
    //  console.log(Category)
    dispatch(addBlog(data?.data?.data))
      setcategories(Category)
      setBlogData(data.data.data);

      

      // console.log(BlogData.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getBlogByCategory = (category)=>{
    const data = blogs.filter((data,index)=>data?.category == category ? data : null)
    // console.log(data)
    setBlogData(data);
  }

  useEffect(()=>{
    getData()
          // console.log(BlogData);

  },[])

  return (
    <div className="min-h-screen flex pt-[90px]  justify-start items-center flex-col">
      <div className="flex flex-col justify-start items-center mt-4">
        <h1 className="text-[30px] font-bold text-center">
          Browse By Category
        </h1>
        <h3 className="text-gray-500 text-center">
          Select a category to see more related content
        </h3>
        <div className="flex flex-wrap p-4 gap-4 justify-center items-center">
          <span
            onClick={getData}
            className=" hover:bg-black font-bold border border-black hover:text-white rounded-full px-4 p-2 "
          >
            All
          </span>
          {categories.map((data)=>(
            <span onClick={()=>getBlogByCategory(data)} className="cursor-pointer hover:bg-black font-bold border border-black hover:text-white rounded-full px-4 p-2 ">
            {data}
          </span>
          ))}
       
        </div>
      </div>

      <div className="h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-y-11 gap-x-[7.5] p-4 sm:px-16 gap-6">
      { BlogData?.map((data)=>(
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
      )) }
     

      </div>
      {/* <button className="border mb-4 w-[130px] p-2 rounded-xl  hover:bg-black hover:text-white hover:transition-all border-black">Browse more </button> */}
      <button className="flex justify-center font-medium hover:bg-black px-9 mt-6 border border-dark rounded-md py-2 px-7.5 hover:bg-dark hover:text-white ease-in duration-200 mx-auto mb-3">Load More</button>
    </div>
  );
};

export default Blogs;
