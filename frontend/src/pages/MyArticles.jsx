import React from 'react'

const MyArticles = () => {
  return (
    <div className='mx-[17%] mt-5 flex flex-col space-y-3'>
      <p className='font-bold text-3xl'>Write Articles on X</p>
      <p className='text-sm text-gray-400'>You must be subscribed to our Premium version to highlight<br />posts on your profile</p>
      <button className='bg-black rounded-full w-fit text-white font-bold text-lg py-2 px-6'>Subscribe to Premium</button>
    </div>
  )
}

export default MyArticles