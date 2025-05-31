import React,{useContext, useEffect, useState} from 'react'
import {assets, posts} from '../assets/assets'
import AddPost from '../components/AddPost'
import Post from '../components/Post'
import MobileSideBar from '../components/MobileSideBar'
import { GlobalContextProvider } from '../context/GlobalContext'
const Home = () => {
  const[postsType,setPostsType]=useState('foryou')
  const[newposts,setNewPosts]=useState(false)
  const[sideBar,setSideBar]=useState(false)
  const{getUser,allPosts,user}=useContext(GlobalContextProvider)
  const createPost=(props)=>{
    return <Post key={props.id} props={props} onClickAvailable={true} isReply={false}/>
  }

  const toggleSideBar=()=>{
    setSideBar(!sideBar);
  }
  useEffect(()=>{
    getUser()
  },[])

  return (
    <div className='max-sm:w-full lg:w-[38vw] flex flex-col '>
      <div className='flex  xs:hidden bg-white z-30 my-2 mx-3  items-center justify-between ' id="top-div">
        <img src={user.avatar} alt="profile pic" className='w-8 h-8 rounded-full object-center object-cover' onClick={()=>setSideBar(true)} />
        <img src={assets.logo} alt="logo" className='w-6 h-6 ' />
        <button className='border-[1px] border-gray-400 px-2 rounded-full py-1 font-bold'>Upgrade</button>
      </div>
      <div className='flex items-center border-b-[1px] lg:border-r-[1px] border-gray-200 xs:sticky xs:top-0 bg-white z-10'>
        <div className='w-1/2 flex flex-col cursor-pointer ' onClick={()=>{setPostsType("foryou")}}>
          <p className={`mx-auto ${postsType=="foryou"?"font-bold":""} py-4`}>For you</p>
          {postsType==='foryou'&&<div className='mx-auto h-1 w-12 bg-primary rounded-full'></div>}
        </div>
        <div className='w-1/2  flex flex-col cursor-pointer' onClick={()=>{setPostsType("following")}}>
        <p className={`mx-auto ${postsType=="following"?"font-bold":""} py-4`}>Following</p>
          {postsType==='following'&&<div className='mx-auto h-1 w-12 bg-primary rounded-full'></div>}
        </div>
       </div>
      {newposts&&<div className='text-primary py-2 text-center border-b-[1px] border-gray-200 w-full'>Show 35 posts</div>}
      {/*posts*/}
      <AddPost isReply={false} />
      <div>
         {allPosts?.map(createPost)}
      </div>
      {sideBar&&<div className='fixed z-40 inset-0 bg-gray-800/50' onClick={()=>setSideBar(false)}>
        <div className='w-[80vw] fixed top-0 bottom-0 left-0 bg-white z-50 overflow-y-scroll max-h-screen
         transform transition-transform duration-300 ease-in-out ' onClick={(e)=>{e.stopPropagation()}}>
          <MobileSideBar />
        </div>
      </div>}
    </div>
  )
}

export default Home