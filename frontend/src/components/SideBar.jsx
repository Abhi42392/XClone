import React, { useContext, useState } from 'react'
import { assets} from '../assets/assets'
import {GlobalContextProvider} from '../context/GlobalContext'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
const SideBar = () => {
  const[more,setMore]=useState(false);
  const{isPost,setIsPost,backendUrl,user,token,setToken,setUser}=useContext(GlobalContextProvider)
  const navigate=useNavigate();
  const handleLogout=async()=>{
    if(token){
      localStorage.removeItem("token")
      setToken("");
    }else{
      await axios.post(`${backendUrl}/logout`, {}, { withCredentials: true });
    }
    setUser("")
    navigate("/login")
  }
  const moreMenu=more && (
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mt-2 z-20 w-[280px] shadow-md rounded-2xl  py-4 border border-gray-300 bg-white flex flex-col space-y-2 transition-all ease">
          <p className="font-bold cursor-pointer py-1 hover:bg-gray-100 w-full px-4 ">Add an existing account</p>
          <p className="font-bold cursor-pointer py-1  hover:bg-gray-100 w-full px-4" onClick={handleLogout}>Log out {user.username}</p>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r border-b border-gray-300 rotate-45"></div>
      </div>
    );


  return (
    
    <div className='mt-4 flex flex-col space-y-3 sticky top-0  sidebar w-full max-lg:items-center max-xs:hidden'>
      <img src={assets.logo} alt="X logo" className='w-8 mb-4 pl-2'/>
      <NavLink to={"/"} className='lg:flex lg:space-x-4 items-center  hover:bg-secondary rounded-full p-2 w-fit'>
        <img src={assets.home} alt="Home logo"  className='w-6'/>
        <p className='text-xl  hidden lg:block'>Home</p>
      </NavLink>
      <NavLink to={"/explore"}className='lg:flex lg:space-x-4  items-center  hover:bg-secondary rounded-full p-2 w-fit'>
        <img src={assets.search} alt="Home logo"  className='w-6'/>
        <p className='text-xl  hidden lg:block'>Explore</p>
      </NavLink>
      <NavLink to={"/notifications"} className='lg:flex lg:space-x-4  items-center  hover:bg-secondary rounded-full p-2 w-fit'>
        <img src={assets.notification} alt="Home logo"  className='w-6'/>
        <p className='text-xl  hidden lg:block'>Notifications</p>
      </NavLink>
      <NavLink to={"/messages"} className='lg:flex lg:space-x-4  items-center  hover:bg-secondary rounded-full p-2 w-fit'>
        <img src={assets.message} alt="Home logo"  className='w-6'/>
        <p className='text-xl  hidden lg:block'>Messages</p>
      </NavLink>
      <NavLink to={`/community`} className='lg:flex lg:space-x-4  items-center  hover:bg-secondary rounded-full p-2 w-fit' >
        <img src={assets.community} alt="Community logo"  className='w-6'/>
        <p className='text-xl  hidden lg:block'>Communities</p>
      </NavLink>
      <NavLink to={`/premium`} className='lg:flex lg:space-x-4  items-center  hover:bg-secondary rounded-full p-2 w-fit'>
        <img src={assets.premium} alt="Premium logo"  className='w-6'/>
        <p className='text-xl  hidden lg:block'>Premium</p>
      </NavLink>
      <NavLink to={`/profile/${user.username}`} className='lg:flex lg:space-x-4  items-center  hover:bg-secondary rounded-full p-2 w-fit'>
        <img src={assets.profile} alt="Profile logo"  className='w-6'/>
        <p className='text-xl  hidden lg:block'>Profile</p>
      </NavLink>
      <NavLink to={"/more"} className='lg:flex lg:space-x-4  items-center  hover:bg-secondary rounded-full p-2 w-fit'>
        <img src={assets.more} alt="Profile logo"  className='w-6'/>
        <p className='text-xl  hidden lg:block'>More</p>
      </NavLink>
      <button className='bg-black  hidden lg:block text-white py-4 w-full rounded-full -translate-x-4 cursor-pointer' onClick={()=>{navigate("/compose/post")}}>Post</button>

      <div className="relative">
        <div className="lg:flex lg:space-x-2 items-center w-full mt-4 cursor-pointer hover:bg-secondary rounded-full p-2">

            <img src={user.avatar.trim() !== "" ? user.avatar : assets.default_profile} alt="profile pic" className="lg:w-12 w-8  rounded-full lg:h-12 object-center object-cover"  
            onError={(e) => {console.log(e); e.target.src = assets.default_profile }} />
            <div className=" flex-1  hidden lg:flex lg:flex-col">
                <span className='flex items-center space-x-1'>
                  <p className="font-bold text-black">{user.name}</p>
                  <img src={assets.verified} alt="" className='w-5'/>
                </span>
                <p>@{user.username}</p>
            </div>
            <img src={assets.moremini} alt="more mini" className="w-6  hidden lg:block" onClick={() => setMore(prev => !prev)} />
        </div>
        {moreMenu}
      </div>
  </div>
  )
}

export default SideBar