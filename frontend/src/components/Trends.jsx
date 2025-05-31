import React, { useState,useRef, useEffect } from 'react'
import {assets,trends,follow} from '../assets/assets'
const Trends = () => {
  
  const createTrend=(trend)=>{
    return(
        <div className='w-full flex justify-between items-center px-4 py-3  hover:bg-gray-100 cursor-pointer'>
        <div className='flex flex-col'>
          <p className='font-bold'>{trend.hashtag}</p>
          <p className='text-sm text-gray-600'>{trend.postsCount} posts</p>
        </div>
        <img src={assets.moremini} alt="more" className='w-4' />
      </div>
    )
  }
  const createFollow=(follow)=>{
    return(
      <div  className='w-full flex justify-between items-center px-4 py-3  hover:bg-gray-100 cursor-pointer space-x-2'>
        <img src={follow.profile_pic} alt="profile pic" className='w-10 h-10 rounded-full' />
        <div className='flex flex-col'>
          <span className='flex space-x-1 items-center'><p className='font-semibold'>{follow.name}</p>{follow.premium&&<img src={assets.verified} className='w-5 h-5'/>}</span>
          <p className='text-gray-600'>{follow.username}</p>
        </div>
        <div className='flex-1'></div>
        <button className='bg-black text-white font-semibold px-4 py-1.5 rounded-full'>Follow</button>
      </div>
    )
  }
  return (
      <div className='max-h-[95vh] overflow-y-scroll scroll ease-in-out scroll hidden lg:block'>
        <div className='flex flex-col space-y-3 border-[1px] border-[#edebeb] bg-white px-4 py-3 rounded-2xl my-4 '>
          <p className='font-bold text-xl'>Subscribe to Premium</p>
          <p>Subscribe to unlock new features and if eligible, 
            receive a share of revenue.</p>
          <button className='bg-primary text-white font-semibold px-5 py-1.5 rounded-full w-fit'>Subscribe</button>
        </div>
          <div className='border-[1px] border-[#edebeb] rounded-2xl'>
            <p className='text-xl font-bold mt-2 mb-2 px-4'>What's happening</p>
            <div className='flex flex-col'>
              {trends.slice(0,5).map(createTrend)}
            </div>
            {trends.length>5&&<p className='text-primary mb-2 cursor-pointer pl-4'>Show more</p>}
          </div>
          <div className='border-[1px] border-[#edebeb] rounded-2xl my-4'>
            <p className='text-2xl font-bold mt-2 mb-2 px-4'>What's happening</p>
            <div className='flex flex-col'>
              {follow.slice(0,3).map(createFollow)}
            </div>
            {follow.length>3&&<p className='text-primary mb-2 cursor-pointer pl-4'>Show more</p>}
          </div>
      </div>
  )
}

export default Trends