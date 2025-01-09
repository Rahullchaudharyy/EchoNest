import React from 'react'

const AuthorCard = ({name, bioOrDesignation,totalPosts,profilephoto}) => {
  return (
    <div className='w-full cursor-pointer hover:scale-110 transition-all  sm:w-[300px] h-[120px] flex rounded-lg border '>
            <div className='flex justify-center items-center w-[120px] h-full rounded-full '>
                <img className='h-[100px] w-[100px] rounded-full object-cover' src={profilephoto} alt="Author" />
            </div>
            
            <div className=' flex flex-col h-full w-auto justify-start p-[5px] items-start'>
                <h1 className='text-[20px] font-semibold '>{name}</h1>
                <h2 className='text-[16px] text-gray-400 font-semibold'>{bioOrDesignation}</h2>
                <h2 className='text-gray-400'><i class="ri-edit-2-line"></i>{totalPosts} Published Posts</h2>
            </div>
    </div>
  )
}

export default AuthorCard