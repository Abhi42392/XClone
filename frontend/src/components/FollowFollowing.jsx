import React, { useState } from 'react'

const FollowFollowing = () => {
  const[postsType,setPostsType]=useState('foryou')
  return (
    <div className='flex items-center border-b-[1px]  border-gray-200  '>
        <div className='w-1/2 flex flex-col cursor-pointer' onClick={()=>{setPostsType("foryou")}}>
          <p className={`mx-auto ${postsType=="foryou"?"font-bold":""} py-4`}>For you</p>
          {postsType==='foryou'&&<div className='mx-auto h-1 w-12 bg-primary rounded-full'></div>}
        </div>
        <div className='w-1/2  flex flex-col cursor-pointer' onClick={()=>{setPostsType("following")}}>
        <p className={`mx-auto ${postsType=="following"?"font-bold":""} py-4`}>Following</p>
          {postsType==='following'&&<div className='mx-auto h-1 w-12 bg-primary rounded-full'></div>}
        </div>
    </div>
  )
}

export default FollowFollowing