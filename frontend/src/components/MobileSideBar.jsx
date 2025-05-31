import React, { useContext } from 'react'
import{userData,assets} from '../assets/assets'
import { NavLink} from 'react-router-dom'
import { GlobalContextProvider } from '../context/GlobalContext'
const MobileSideBar = () => {
    const{user}=useContext(GlobalContextProvider)
    
  return (
    <div>
        <div>
            <div className='flex justify-between items-center my-2 mx-4'>
                <NavLink to={`/profile/${user.id}`}><img src={user.avatar} alt="profile pic" className='w-10 h-10 rounded-full'/></NavLink>
                <img src={assets.plus} alt="plus icon" className='w-8 h-8 rounded-ful'/>
            </div>
            <div className=' mx-4 flex flex-col  text-sm'>
                <p className='font-bold text-lg'>{user.name}</p>
                <p className='text-gray-600'>{user.username}</p>
                <span className='flex space-x-7 mt-3'>
                    <p><span className='font-bold'>7</span> Following</p>
                    <p><span className='font-bold'>0</span> Following</p>
                </span>
            </div>
            <div className='flex flex-col space-y-5 mt-8 mx-4'>
                <NavLink to={`/profile/${user.name}`} className='flex space-x-8 items-center  hover:bg-secondary rounded-full p-2 w-fit'>
                    <img src={assets.profile} alt="Profile logo"  className='w-6'/>
                    <p className='text-xl font-bold'>Profile</p>
                </NavLink>
                <NavLink to={`/premium`} className='flex space-x-8 items-center  hover:bg-secondary rounded-full p-2 w-fit'>
                    <img src={assets.premium} alt="Premium logo"  className='w-6'/>
                    <p className='text-xl font-bold'>Premium</p>
                </NavLink>
                <NavLink to={`/${user.username}/lists`}className='flex space-x-8 items-center  hover:bg-secondary rounded-full p-2 w-fit'>
                    <img src={assets.list} alt="Lists logo"  className='w-6'/>
                    <p className='text-xl font-bold'>Lists</p>
                </NavLink>
                <NavLink to={`/${user.username}/bookmarks`}className='flex space-x-8 items-center  hover:bg-secondary rounded-full p-2 w-fit'>
                    <img src={assets.save} alt="Lists logo"  className='w-6'/>
                    <p className='text-xl font-bold'>Bookmarks</p>
                </NavLink>
                <NavLink to={`/verified-orgs`}className='flex space-x-8 items-center  hover:bg-secondary rounded-full p-2 w-fit'>
                    <img src={assets.thunder} alt="veirfied orgs logo"  className='w-6'/>
                    <p className='text-xl font-bold'>Verified orgs</p>
                </NavLink>
                <NavLink to={`/monetization`}className='flex space-x-8 items-center  hover:bg-secondary rounded-full p-2 w-fit'>
                    <img src={assets.monetization} alt="monetization logo"  className='w-6'/>
                    <p className='text-xl font-bold'>Monetization</p>
                </NavLink>
                <NavLink to={`/jobs`}className='flex space-x-8 items-center  hover:bg-secondary rounded-full p-2 w-fit'>
                    <img src={assets.jobs} alt="jobs logo"  className='w-6'/>
                    <p className='text-xl font-bold'>Jobs</p>
                </NavLink>
                <NavLink to={`/settings`}className='flex space-x-8 items-center  hover:bg-secondary rounded-full p-2 w-fit'>
                    <img src={assets.settings} alt="jobs logo"  className='w-6'/>
                    <p className='text-xl font-bold'>Settings and Privacy</p>
                </NavLink>
                <NavLink to={`/logout`}className='flex space-x-8 items-center  hover:bg-secondary rounded-full p-2 w-fit'>
                    <img src={assets.logout} alt="logout logo"  className='w-6'/>
                    <p className='text-xl font-bold'>Log out</p>
                </NavLink>
            </div>
        </div>
    </div>
  )
} 

export default MobileSideBar