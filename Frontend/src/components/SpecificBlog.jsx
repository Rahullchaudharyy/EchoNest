// import React from "react";

// const SpecificBlog = () => {
//   return (
//     <div className="h-screen overflow-y-scroll  flex justify-center items-center flex-col gap-6 p-5">
//       <button className="bg-blue-200 p-1 rounded-full text-blue-500">
//         Technology
//       </button>
//       <h1 className="text-center text-2xl font-bold md:text-3xl">
//         Start here for a quick overview of everything you need to know
//       </h1>

//       <div
//         id="Author"
//         className="flex justify-between items-center flex-wrap gap-2"
//       >
//         <div className="flex items-center gap-2">
//           <img
//             //   src={data.postBy.profileUrl}
//             alt="Author"
//             className="w-8 h-8 rounded-full object-cover"
//           />
//           <p className="text-gray-500 text-sm md:text-base">
//             {/* {data.postBy.name} */}
//             Rahul
//           </p>
//           <p className="text-gray-500 text-sm md:text-base">
//             {/* {
//                   new Date(data.createdAt).toLocaleString()} */}
//             today
//           </p>
//         </div>
//       </div>

//       <div className="w-[95%]  h-auto ">
//         <div id="Image" className="rounded-xl flex justify-center">
//           <img
//             src="https://clarity-tailwind.preview.uideck.com/images/blog-single-01.png"
//             alt=""
//           />
//         </div>
//         <div id="Information" className="flex flex-col px-24">
//           <h1 className="">
//             As discussed in the introduction post, one of the best things about
//             Ghost is just how much you can customize to turn your site into
//             something unique. Everything about your layout and design can be
//             changed, so you're not stuck with yet another clone of a social
//             network profile. Lorem ipsum dolor sit amet, consectetur adipiscing
//             elit. Nulla id quam at justo ullamcorper vulputate. Donec mattis
//             aliquam urna, sed placerat dolor volutpat vel. Maecenas posuere sem
//             purus, quis feugiat. Sed ullamcorper dui at risus viverra, nec
//             cursus leo ullamcorper. Class aptent taciti sociosqu ad litora
//             torquent per conubia nostra, per inceptos himenaeos. Curabitur
//             pretium, libero vitae pharetra rhoncus, tellus urna auctor orci, eu
//             dictum diam diam nec neque. Pellentesque habitant morbi tristique
//             senectus et netus et malesuada fames ac turpis egestas. Fusce congue
//             dui nec dui lobortis maximus. Morbi bibendum, nisi vel cursus.
//             Adipiscing elit. Nulla id quam at justo ullamcorper vulputate. Donec
//             mattis aliquam urna, sed placerat dolor volutpat vel. Maecenas quis
//             feugiat.
//           </h1>
//         </div>
        
//       </div>
//     </div>
//   );
// };

// export default SpecificBlog;


import React from "react";

const SpecificBlog = () => {
  return (
    <div className="min-h-screen pt-[90px] overflow-y-scroll flex justify-center items-center flex-col gap-6 p-5 bg-gray-50">
      {/* Category Button */}
      <button className="bg-blue-200 p-2 rounded-full text-blue-500 text-sm md:text-base">
        Technology
      </button>

      {/* Blog Title */}
      <h1 className="text-center text-2xl font-bold md:text-3xl text-gray-800">
        Start here for a quick overview of everything you need to know
      </h1>

      {/* Author Info */}
      <div
        id="Author"
        className="flex justify-between items-center flex-wrap gap-4 text-gray-500"
      >
        <div className="flex items-center gap-2">
          <img
            //   src={data.postBy.profileUrl}
            alt="Author"
            className="w-10 h-10 rounded-full object-cover"
          />
          <p className="text-sm md:text-base">Rahul</p>
          <p className="text-sm md:text-base">Today</p>
        </div>
      </div>

      {/* Blog Image */}
      <div className="w-full flex justify-center my-6">
        <div id="Image" className="rounded-xl overflow-hidden shadow-lg">
          <img
            src="https://clarity-tailwind.preview.uideck.com/images/blog-single-01.png"
            alt="Blog Visual"
            className="w-full object-cover h-[300px] md:h-[400px]"
          />
        </div>
      </div>

      {/* Blog Content */}
      <div id="Information" className="px-4 md:px-24 max-w-screen-lg">
        <h2 className="text-lg md:text-xl text-gray-700 mb-4">
          As discussed in the introduction post, one of the best things about
          Ghost is just how much you can customize to turn your site into
          something unique. Everything about your layout and design can be
          changed, so you're not stuck with yet another clone of a social
          network profile. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Nulla id quam at justo ullamcorper vulputate. Donec mattis
          aliquam urna, sed placerat dolor volutpat vel. Maecenas posuere sem
          purus, quis feugiat. Sed ullamcorper dui at risus viverra, nec
          cursus leo ullamcorper. Class aptent taciti sociosqu ad litora
          torquent per conubia nostra, per inceptos himenaeos. Curabitur
          pretium, libero vitae pharetra rhoncus, tellus urna auctor orci, eu
          dictum diam diam nec neque. Pellentesque habitant morbi tristique
          senectus et netus et malesuada fames ac turpis egestas. Fusce congue
          dui nec dui lobortis maximus. Morbi bibendum, nisi vel cursus.
          Adipiscing elit. Nulla id quam at justo ullamcorper vulputate. Donec
          mattis aliquam urna, sed placerat dolor volutpat vel. Maecenas quis
          feugiat.
        </h2>
      </div>
    </div>
  );
};

export default SpecificBlog;
