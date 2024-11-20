import React from 'react'

const Footer = () => {
  return (
    <div className='min-h-[120px] max-h-auto border-t-2 flex justify-center items-center'>
        <div className='w-[300px] sm:w-full sm:flex-row sm:justify-between flex justify-center items-center flex-col gap-2  p-4  h-full'>
            <h1 className='text-gray-400'>@ 2024 EchoNest. All Rights reserved</h1>
            <h1 className='text-center text-gray-400'>Privacy • Terms • Contact • Contribute</h1>
            <h2 className='text-black'>Follow On : <i class="ri-github-fill"></i></h2>
        </div>
    </div>
  )
}

export default Footer