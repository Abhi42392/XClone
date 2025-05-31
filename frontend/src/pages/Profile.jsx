import React, { useContext, useEffect, useState } from 'react'
import { assets} from '../assets/assets'
import { useNavigate, useParams,NavLink,Outlet } from 'react-router-dom'
import EditProfile from '../components/EditProfile'
import { GlobalContextProvider } from '../context/GlobalContext'

const Profile = () => {
  const navigate=useNavigate()

  const[editModel,setEditModel]=useState(false)
  const{user,setSaveChanges,userPosts}=useContext(GlobalContextProvider)
  if(editModel){
    document.body.style.overflow=editModel?"hidden":"";
  }else{
    document.body.style.overflow="";
  }
  const handleEdit=()=>{
    setEditModel(!editModel)
  }
 
  const convertDate=(date)=>{
    const isoDate=new Date(date)
    const formattedDate=isoDate.toLocaleDateString('en-Us',{year:"numeric",month:"long"})
    return formattedDate
  }
  return (
    <div>
      <div className='max-sm:w-full lg:w-[38vw] flex flex-col'>
        <div className='flex items-center  border-r-[1px]  border-gray-200 sticky top-0 bg-white z-10 px-4 py-2'>
          <img src={assets.left_arrow} alt="back" className='w-8 h-8 mr-12 cursor-pointer' onClick={()=>{navigate(-1)}} />
          <div className='flex flex-col'>
            <p className='font-semibold text-xl'>{user.name}</p>
            <p className='text-gray-600 text-xs font-medium'>{userPosts.length} posts</p>
          </div>
        </div>
        <div className='relative w-full max-h-[25vh]'>
          
          <img src={user.background.trim()!==""?user.background:assets.default_background} alt="background image" className='w-full h-full max-h-[25vh] object-cover object-center'/>
          <img src={user.avatar.trim()!==""?user.avatar:assets.default_profile} alt="profile pic" 
          className='w-30 h-30 rounded-full absolute bottom-0 left-5 translate-y-1/2 border-4 border-white object-center object-cover' 
           onError={(e) => {e.target.src = assets.default_profile }} />
          <button className='absolute -bottom-12 right-4 border-[1px] border-gray-400 py-1 font-bold rounded-2xl  px-4 cursor-pointer' onClick={handleEdit}>Edit profile</button>
        </div>
        <div className='mt-20 mx-4 flex flex-col'>
          <p className='font-bold text-xl'>{user.name}</p>
          <p className='text-gray-600'>@{user.username}</p>
          {user.bio!==""&&
            <p className=''>
              {user.bio}
            </p>}
          <span className='flex space-x-2 items-end pt-2'><img src={assets.calendar} alt="calendar" className='w-5' /><p className='text-gray-600'>{`Joined ${convertDate(user.dateofjoin)}`}</p></span>
          <span className='flex space-x-7'>
            <p><span className='font-bold'>7</span> Following</p>
            <p><span className='font-bold'>0</span> Following</p>
          </span>
          
        </div>
        <div>
          <div className='flex justify-between border-b-[1px] border-gray-200 px-6 pt-8 pb-4 profile-bar'>
              <NavLink to={""} end className={({isActive})=>isActive?"border-b-3 border-primary font-bold":""}>Posts</NavLink>
              <NavLink to={"replies"}  className={({isActive})=>isActive?"border-b-3 border-primary font-bold":""}>Replies</NavLink>
              <NavLink to={"highlights"} className={({isActive})=>isActive?"border-b-3 border-primary font-bold":""}>Highlights</NavLink>
              <NavLink to={"articles"} className={({isActive})=>isActive?"border-b-3 border-primary font-bold":""}>Articles</NavLink>
              <NavLink to={"media"} className={({isActive})=>isActive?"border-b-3 border-primary font-bold":""}>Media</NavLink>
              <NavLink to={"likes"} className={({isActive})=>isActive?"border-b-3 border-primary font-bold":""}>Likes</NavLink>
          </div>
          <Outlet />
        </div>
      </div>
      {
        editModel&&
        <div className="fixed inset-0 z-50 bg-gray-800/55  flex items-start justify-center pt-10 cursor-pointer" onClick={handleEdit} >
          <div className="bg-white  w-[40vw] shadow-xl rounded-2xl" onClick={(e)=>{e.stopPropagation()}}>
            <div className='flex justify-between mx-3 my-3 sticky top-0'>
              <img src={assets.cross} alt="" className='w-6 h-6  cursor-pointer' onClick={handleEdit}/>
              <button className='bg-black text-white font-bold px-4 py-1 rounded-full' onClick={()=>{setSaveChanges(true)}}>Save</button>
            </div>
            <EditProfile />
          </div>
        </div>
      }
    </div>
  )
}

export default Profile