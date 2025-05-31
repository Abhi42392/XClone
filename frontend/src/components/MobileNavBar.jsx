import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
const MobileNavBar = () => {
  return (
    <div className='flex w-full justify-around bg-white '>
        <NavLink to={"/"} className='lg:flex lg:space-x-4 items-center  hover:bg-secondary rounded-full p-2 w-fit'>
        <img src={assets.home} alt="Home logo"  className='w-6'/>
        <p className='text-xl  hidden lg:block'>Home</p>
      </NavLink>
      <NavLink to={"/notifications"} className='lg:flex lg:space-x-4  items-center  hover:bg-secondary rounded-full p-2 w-fit'>
        <img src={assets.notification} alt="Home logo"  className='w-6'/>
        <p className='text-xl  hidden lg:block'>Notifications</p>
      </NavLink>
      <NavLink to={"/explore"}className='lg:flex lg:space-x-4  items-center  hover:bg-secondary rounded-full p-2 w-fit'>
        <img src={assets.search} alt="Home logo"  className='w-6'/>
        <p className='text-xl  hidden lg:block'>Explore</p>
      </NavLink>
      <NavLink to={"/messages"} className='lg:flex lg:space-x-4  items-center  hover:bg-secondary rounded-full p-2 w-fit'>
        <img src={assets.message} alt="Home logo"  className='w-6'/>
        <p className='text-xl  hidden lg:block'>Messages</p>
      </NavLink>
      <NavLink to={`/community`} className='lg:flex lg:space-x-4  items-center  hover:bg-secondary rounded-full p-2 w-fit' >
        <img src={assets.community} alt="Community logo"  className='w-6'/>
        <p className='text-xl  hidden lg:block'>Communities</p>
      </NavLink>
    </div>
  )
}

export default MobileNavBar