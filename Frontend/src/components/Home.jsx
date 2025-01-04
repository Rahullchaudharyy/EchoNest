import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='h-auto'>
      <div className='flex w-full justify-center'>
      <div className="flex flex-col justify-center items-center w-full gap-[50px] pt-7 mb-[20px]">
  <Link
 
    className="rounded-lg hidden md:flex gap-2 h-auto w-[90vw] shadow-xl border bg-white"
  >
    <div
      id="Post Image"
      className="w-[40%] h-[350px] flex justify-center items-center p-4"
    >
      <img
        className="rounded-lg border hover:scale-105 hover:transition-all object-cover w-full h-full"
        src="https://via.placeholder.com/300"
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
      <h1 className="text-xl md:text-3xl font-bold">How to Build a React App</h1>
      <p className="text-sm md:text-base text-gray-500 font-bold break-words">
        Learn the step-by-step process to create a React app with best practices...
      </p>
      <div
        id="Author"
        className="flex justify-between items-center flex-wrap gap-2"
      >
        <div className="flex items-center gap-2">
          <img
            src="https://via.placeholder.com/50"
            alt="Author"
            className="w-8 h-8 rounded-full object-cover"
          />
          <p className="text-gray-500 text-sm md:text-base">John Doe</p>
          <p className="text-gray-500 text-sm md:text-base">
            {new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  </Link>
  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid'>

  {Array.from({length:3}).map(()=>(<div className="h-auto  w-full gap-y-11 gap-x-[7.5] p-4 sm:px-16 gap-6">
  <div className="rounded-lg shadow-xl border bg-white w-full">
    <div className="w-full h-[200px] flex justify-center items-center p-4">
      <img
        className="rounded-lg object-cover w-full h-full"
        src="https://via.placeholder.com/300"
        alt="Blog Post"
      />
    </div>
    <div className="p-4 flex flex-col gap-4">
      <p className="text-blue-500 border text-center w-[90px] border-blue-500 rounded-full bg-blue-100 px-2 py-1 text-xs md:text-sm">
        Technology
      </p>
      <h1 className="text-xl md:text-2xl font-bold">How to Build a React App</h1>
      <p className="text-sm text-gray-500 font-bold break-words">
        Learn the step-by-step process to create a React app with best practices...
      </p>
      <div className="flex items-center gap-2">
        <img
          src="https://via.placeholder.com/50"
          alt="Author"
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <p className="text-gray-500 text-sm md:text-base">John Doe</p>
          <p className="text-gray-500 text-sm md:text-base">
            {new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  </div>
</div>))}

  </div>

</div>

      </div>
      </div>
  )
}

export default Home