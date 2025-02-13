import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "./BlogCard";
import axiosInstence from "../utils/axiosInstance";
import { useParams } from "react-router-dom";
import { SetLoading } from "../features/LoadingSlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import styles

const EditBlog = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [visibility, setVisibility] = useState("private");
  const [categoryBlog, setCategoryBlog] = useState("");
  const [isOther, setIsOther] = useState(true);
  const { category } = useSelector((state) => state.category);
  const { currentUser } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const formData = {};
  formData.title = title;
  formData.content = content;
  formData.status = visibility;
  formData.category = categoryBlog;
  if (image) formData.file = image;
  const getBlogs = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axiosInstence.get(`/api/post/view/${id}`);
      const blogData = response.data?.data;

      if (blogData) {
        setTitle(blogData.title || "");
        setContent(blogData.content || "");
        setVisibility(blogData.status || "private");
        setCategoryBlog(blogData.category || "");
        // setImage(blogData?.imageUrl || "");
      }
      dispatch(SetLoading(false));
    } catch (error) {
      console.error("Error fetching blog data:", error.message);
      dispatch(SetLoading(false));
    }
  };

  const handleEditBlog = async (e) => {
    e.preventDefault();

    try {
      dispatch(SetLoading(true));
      // const response = await axiosInstence.patch(
      //   `/api/post/edit/${id}`,
      //   formData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //     withCredentials: true,
      //   }
      // );

      const response = await axiosInstence.patch(
        `/api/post/edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.status >= 200 && response.status < 300) {
        console.log("Post Updated Successfully");
      }
      dispatch(SetLoading(false));
    } catch (error) {
      console.error(
        "Error updating post:",
        error.response?.data?.message || error.message
      );
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    if (categoryBlog.toLowerCase() === "other") {
      setCategoryBlog("");
      setIsOther(false);
    }
  }, [categoryBlog]);

  useEffect(() => {
    getBlogs();
  }, [id]);

  useEffect(() => {
    console.log(title, content, visibility);
    console.log(formData);
  }, [title, content, visibility]);

  return (
    <div className="h-[100vh] flex md:h-full mb-[100px] md:mb-[200px] p-6 w-full">
      <form
        className="md:w-[70%] w-full p-5 h-auto pb-5 md:relative transition-all md:flex flex-col gap-6 border"
        onSubmit={handleEditBlog}
      >
        {/* Left Side */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <label htmlFor="Title" className="text-2xl font-bold">
              Title
            </label>
            <input
              type="text"
              id="Title"
              value={title}
              className="w-full p-2 rounded-md border-2"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* <div className="flex flex-col gap-3">
            <label htmlFor="Content" className="text-2xl font-bold">
              Content
            </label>
            <textarea
              id="Content"
              className="w-full p-2 rounded-md border-2 h-[150px] resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div> */}

          <label htmlFor="Content" className="text-2xl font-bold">
            Content
          </label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className="flex flex-col gap-3">
            <label htmlFor="photo" className="text-2xl font-bold text-gray-700">
              Photo
            </label>
            <input
              id="photo"
              type="file"
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col gap-3 mb-16 md:m-0">
          <div className="flex flex-col gap-5">
            <label htmlFor="Category" className="text-2xl font-bold">
              Category
            </label>
            {isOther ? (
              <select
                id="Category"
                value={categoryBlog}
                className="w-full p-2 rounded-md border-2"
                onChange={(e) => setCategoryBlog(e.target.value)}
                required
              >
                {category?.map((data, index) => (
                  <option key={index} value={data}>
                    {data}
                  </option>
                ))}
                <option value="N/A">N/A</option>
                <option value="other">Other</option>
              </select>
            ) : (
              <input
                type="text"
                id="Category"
                value={categoryBlog}
                className="w-full p-2 rounded-md border-2"
                onChange={(e) => setCategoryBlog(e.target.value)}
              />
            )}
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="Visibility" className="text-2xl font-bold">
              Visibility
            </label>
            <div className="flex items-center gap-4 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="visibility"
                  value="private"
                  checked={visibility === "private"}
                  onChange={(e) => setVisibility(e.target.value)}
                />
                Private
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="visibility"
                  value="published"
                  checked={visibility === "published"}
                  onChange={(e) => setVisibility(e.target.value)}
                />
                Public
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className={`flex ${
            loading ? "cursor-not-allowed" : "cursor-pointer"
          } md:absolute md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:bottom-0 md:left-1/2 justify-center font-medium hover:bg-black px-9 mt-8 border border-dark rounded-md py-2 px-7.5 hover:bg-dark hover:text-white ease-in duration-200 mx-auto`}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
      <div className="max-w-[350px] h-full hidden sm:flex flex-col justify-center items-center p-3 ">
        <h1 className="text-xl md:text-sm font-bold">Preview Blog Card </h1>
        <BlogCard
          profileUrl={currentUser?.profileUrl || "default.jpg"}
          createdAt={new Date().toISOString()}
          _id={null}
          title={title || "Waiting"}
          name={currentUser?.firstName + " " + currentUser?.lastName}
          imageUrl={
            image
              ? URL.createObjectURL(image)
              : "https://placehold.co/600x400?text=Preview+Card"
          }
          content={content || "No content provided."}
          Category={categoryBlog || "General"}
        />
      </div>
    </div>
  );
};

export default EditBlog;
