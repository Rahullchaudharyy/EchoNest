import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BlogCard from "./BlogCard";
import axios from "axios";

const CreateBlog = () => {
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const [image, setimage] = useState("");
  const [visibility, setvisibility] = useState("");
  const [status, setstatus] = useState("");
  const [categoryblog, setcategoryblog] = useState("");
  const { category } = useSelector((state) => state.category);
  const {currentUser} = useSelector(state=>state.user)
  const [Ohter, setOhter] = useState(true);
  const url = image ? URL.createObjectURL(image) : "defaul.jpg";
  const HandleCreateBlog =async (e) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("status", visibility);
    formData.append("category", categoryblog);
    if (image) {
        formData.append("file", image);
      }

    e.preventDefault();
    try {
        const response = await axios.post(`/api/post/create`,formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true
        })

        if (response.status == 200) {
            console.log("Post Created")
            settitle('')
            setimage('')
            setvisibility('')
            setcontent('')
            setcategoryblog('')
        }

      console.log(e);
    } catch (error) {
      console.log(error.message);
    }
  };
  //   console.log(categoryblog)
  useEffect(() => {
    if (categoryblog.toLocaleLowerCase() == "other") {
      setcategoryblog("");
      setOhter(false);
    }
  }, [categoryblog]);

  return (
    <div className="h-[100vh] flex md:h-[80vh] mb-[100px] md:mb-[200px] p-6 w-full ">
      <form
        className=" md:w-[70%] w-full p-5 h-auto pb-5 md:relative transition-all  md:grid grid-cols-2 gap-6 border"
        onSubmit={(e) => HandleCreateBlog(e)}
      >
        {/* Left side - Title, Content, and Image */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 ">
            <label htmlFor="Title" className="text-2xl font-bold">
              Title
            </label>
            <input
              type="text"
              id="Title"
              value={title}
              className="w-full p-2 rounded-md border-2"
              onChange={(e) => settitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-3 ">
            <label htmlFor="Content" className="text-2xl font-bold">
              Content
            </label>
            <textarea
              id="Content"
              className="w-full p-2 rounded-md border-2 h-[150px] resize-none"
              value={content}
              onChange={(e) => setcontent(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-3 ">
            <label htmlFor="photo" className="text-2xl font-bold text-gray-700">
              Photo
            </label>
            <input
              id="photo"
              type="file"
              className="block w-full text-sm text-gray-700
               file:mr-4 file:py-2 file:px-4
               file:rounded-lg file:border-0
               file:text-sm file:font-semibold
               file:bg-blue-100 file:text-blue-700
               hover:file:bg-blue-200
               focus:ring-2 focus:ring-blue-400 focus:outline-none"
              onChange={(e) => setimage(e.target.files[0])}
            />
          </div>
        </div>

        {/* Right side - Category, Status, and Private/Public */}
        <div className="flex flex-col gap-3 mb-16 md:m-0">
          <div className="flex flex-col gap-5">
            <label htmlFor="Category" className="text-2xl  font-bold">
              Category
            </label>
            {Ohter ? (
              <select
                id="Category"
                value={categoryblog}
                className="w-full p-2 rounded-md border-2"
                onChange={(e) => setcategoryblog(e.target.value)}
              >
                {category?.map((data) => (
                  <option value={data}>{data}</option>
                ))}

                <option value="N/A">N/A</option>
                <option value="other">other</option>
              </select>
            ) : (
              <input
                type="text"
                id="Category"
                value={categoryblog}
                className="w-full p-2 rounded-md border-2"
                onChange={(e) => setcategoryblog(e.target.value)}
              />
            )}
          </div>

          <div className="flex flex-col gap-3 ">
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
                  onChange={(e) => setvisibility(e.target.value)}
                />
                Private
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="visibility"
                  value="published"
                  checked={visibility === "published"}
                  onChange={(e) => setvisibility(e.target.value)}
                />
                Public
              </label>
            </div>
          </div>
        </div>

        <button type="submit" className="flex md:absolute md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:bottom-0 md:left-1/2   justify-center font-medium hover:bg-black px-9 mt-8  border border-dark rounded-md py-2 px-7.5 hover:bg-dark hover:text-white ease-in duration-200 mx-auto ">
          Upload
        </button>
      </form>
      <div className="max-w-[350px] h-full hidden sm:flex flex-col justify-center items-center p-3 ">
        <h1 className="text-xl md:text-sm font-bold">Preview Blog Card </h1>
        <BlogCard
                 profileUrl={currentUser?.profileUrl || "default.jpg"} 
                 createdAt={new Date().toISOString()} 
                 _id={"asdf"} 
                 title={title || "Waiting"} 
                 name={currentUser?.firstName + " " + currentUser?.lastName} 
                 imageUrl={image 
                    ? URL.createObjectURL(image) 
                    :  "https://placehold.co/600x400?text=Hello+World"}
                                   content={content || "No content provided."} 
                 Category={categoryblog||"General"} 
         
        />
      </div>
    </div>
  );
};

export default CreateBlog;
