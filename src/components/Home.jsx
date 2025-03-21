import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
  const {isLoggedIn} = useSelector(state=>state.user)

  // useEffect(()=>{
  //   if (!isLoggedIn) {
  //     navigate('/auth')
  //   }
  // },[])
  const blogData = [
    {
      title: "Mastering JavaScript ES6+ Features",
      category: "Code",
      description:
        "Unlock the power of ES6+ with this comprehensive guide on modern JavaScript features like async/await, destructuring, and more...",
      imgSrc:
        "https://campus.epam.com/static/news/496/JavaScriptforatestautomationengineerfeaturesadvantagestools_014111.png",
      author: "Rahul",
      authorImg:
        "https://res.cloudinary.com/djthdoj8n/image/upload/v1735990470/x0max0opug83zoo8ug9a.jpg",
      date: "January 4, 2025, 9:00 AM",
    },
    {
      title: "Breaking into the World of Web3",
      category: "Blockchain",
      description:
        "A beginner-friendly guide to understanding Web3 technologies, including decentralized apps (dApps) and cryptocurrencies...",
      imgSrc:
        "https://www.xrtoday.com/wp-content/uploads/2022/10/What_Web3_Going_2023.jpg",
      author: "Rahul",
      authorImg:
        "https://res.cloudinary.com/djthdoj8n/image/upload/v1735990470/x0max0opug83zoo8ug9a.jpg",
      date: "January 3, 2025, 3:45 PM",
    },
    {
      title: "Docker Essentials for DevOps Engineers",
      category: "DevOps",
      description:
        "Learn how to containerize your applications and streamline development workflows with Docker in this hands-on guide...",
      imgSrc: "https://squareops.com/wp-content/uploads/2024/08/DevOps.webp",
      author: "Rahul",
      authorImg:
        "https://res.cloudinary.com/djthdoj8n/image/upload/v1735990470/x0max0opug83zoo8ug9a.jpg",
      date: "January 2, 2025, 8:15 PM",
    },
  ];

  return (
    <div className="h-auto">
      <div className="flex w-full justify-center">
        <div className="flex flex-col justify-center items-center w-full gap-[50px] pt-7 mb-[20px]">
          <Link className="rounded-lg hidden md:flex gap-2 h-auto w-[90vw] shadow-xl border bg-white">
            <div
              id="Post Image"
              className="w-[40%] h-[350px] flex justify-center items-center p-4"
            >
              <img
                className="rounded-lg border hover:scale-105 hover:transition-all object-cover w-full h-full"
                src="https://res.cloudinary.com/djthdoj8n/image/upload/v1736002913/pixelcut-export_1_iu1hmb.png"
                alt="Blog Post"
              />
            </div>
            <div
              id="Post-Details"
              className="w-[60%] p-4 flex flex-col justify-center gap-4"
            >
              <p className="text-blue-500 border text-center w-[120px]  border-blue-500 rounded-full bg-blue-100 px-2 py-1 text-xs md:text-sm">
                Technology
              </p>
              <h1 className="text-xl md:text-3xl font-bold">
                Welcome to EchoNest: Your Hub for Tech Insights and Inspiration
              </h1>
              <p className="text-sm md:text-base text-gray-500 font-bold break-words">
                Welcome to EchoNest, a blogging platform designed to empower you
                to create posts and share your thoughts with the world. Whether
                you’re a writer, a creator, or someone passionate about sharing
                ideas, EchoNest provides the tools you need to express yourself
                effortlessly.
              </p>
              <div
                id="Author"
                className="flex justify-between items-center flex-wrap gap-2"
              >
                <div className="flex items-center gap-2">
                  <img
                    src="https://res.cloudinary.com/djthdoj8n/image/upload/v1736002913/pixelcut-export_1_iu1hmb.png"
                    alt="Author"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <p className="text-gray-500 text-sm md:text-base">
                    EchoNest Official<i class="ri-checkbox-circle-fill"></i>
                  </p>
                  <p className="text-gray-500 text-sm md:text-base">
                    {new Date().toLocaleDateString('en-GB',{
                  day:'2-digit',
                  month:'short',
                  year:'numeric'
                }).replace(/^(\S+)\s(\S+)\s(\S+)$/, '$2 $1, $3')}
                  </p>
                </div>
              </div>
            </div>
          </Link>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid">
            {blogData.map((post, index) => (
              <div
                key={index}
                className="h-auto w-full gap-y-11 gap-x-[7.5] p-4 sm:px-16 gap-6"
              >
                <div className="rounded-lg shadow-xl border bg-white w-full">
                  <div className="w-full h-[200px] flex justify-center items-center p-4">
                    <img
                      className="rounded-lg object-cover w-full h-full"
                      src={post.imgSrc}
                      alt={post.title}
                    />
                  </div>
                  <div className="p-4 flex flex-col gap-4">
                    <p className="text-blue-500 border text-center w-[95px] border-blue-500 rounded-full bg-blue-100 px-2 py-1 text-xs md:text-sm">
                      {post.category}
                    </p>
                    <h1 className="text-xl md:text-2xl font-bold">
                      {post.title}
                    </h1>
                    <p className="text-sm text-gray-500 font-bold break-words">
                      {post.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <img
                        src={post.authorImg}
                        alt={post.author}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex flex-col">
                        <p className="text-gray-500 text-sm md:text-base">
                          {post.author}
                        </p>
                        <p className="text-gray-500 text-sm md:text-base">
                          {new Date(post.date).toLocaleDateString('en-GB',{
                  day:'2-digit',
                  month:'short',
                  year:'numeric'
                }).replace(/^(\S+)\s(\S+)\s(\S+)$/, '$2 $1, $3')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

<section className="h-auto w-full gap-y-11 flex gap-x-[7.5] p-4 sm:px-16 gap-6">
	<div className=" mx-auto flex flex-col items-center justify-center p-4  md:p-10">
		<h1 className="text-4xl font-bold leading-none text-center">Share Your Thoughts, Effortlessly</h1>
		<p className="pt-2 pb-8 text-xl font-medium text-center">Experience the simplicity of blogging, where you can express yourself freely without complications.</p>
		{/* <button className="px-8 py-3 text-lg font-semibold rounded dark:bg-gray-100 dark:text-gray-900">Sign Up Now</button> */}
    <Link to={isLoggedIn ? '/myprofile' :'/auth'}
              className="flex justify-center font-medium hover:bg-black px-9 mt-6 border border-dark rounded-md py-2 px-7.5 hover:bg-dark hover:text-white ease-in duration-200 mx-auto mb-3"
            >
              {isLoggedIn ? "Go To your Profile" :"Sign Up Now"}
            </Link>
	</div>
</section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
