import React,{useContext, useState} from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';
import { GlobalContextProvider } from '../context/GlobalContext';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp'
const Login = () => {
  const navigate=useNavigate();
  const{openSignIn,setOpenSignIn,openSignUp,setOpenSignUp}=useContext(GlobalContextProvider)
  const handleGoogleLogin=()=>{
    window.location.href = "http://localhost:4000/auth/google";
  }
  
  return (
    <>
    <div className='fixed inset-0 bg-white w-[100vw] h-[100vh] z-[20]'>
      <div className='flex justify-evenly mx-auto py-[10vh]'>
        <div className='flex items-center'>
          <img src={assets.logo} alt="x logo" className='max-w-[270px] max-h-[270px]'/>
        </div>
        <div className='flex flex-col space-y-15'>
          <p className='font-bold text-7xl '>Happening now</p>
          <p className='font-bold text-3xl'>Join today.</p>
          <div className='w-[60%] flex flex-col space-y-2'>
            <button className='cursor-pointer  flex space-x-2 justify-center items-center border-[1px] border-gray-400 px-4 py-2 rounded-full w-full' onClick={handleGoogleLogin} ><p>Sign up with Google</p><img src={assets.google} alt="google logo" className='w-6 h-6' /></button>
            <button className='cursor-pointer  flex space-x-2 justify-center items-center border-[1px] border-gray-400 px-4 py-2 rounded-full w-full' ><p>Sign up with Apple</p><img src={assets.apple} alt="apple logo" className='w-6 h-6' /></button>
            <div className='w-full flex items-center space-x-1'>
              <hr className='border-[0.5px] border-gray-300 flex-1' />
              <p>or</p>
              <hr className='border-[0.5px] border-gray-300 flex-1' />
            </div>
            <button className= 'cursor-pointer bg-primary text-white font-semibold text-center rounded-full w-full py-2' onClick={()=>{setOpenSignIn(true)}}>Create an account</button>
            <p className='text-xs'>By signing up, you agree to the <span  className='text-primary'>Terms of Service</span> and <span className='text-primary'>Privacy Policy,</span> including <span className='text-primary'>Cookie Use.</span></p>
          </div>
          <div>
            <p className='font-bold'>Already have an account?</p>
            <button className='text-primary border-[1px] cursor-pointer border-gray-400 font-semibold text-center rounded-full w-[60%] py-2' onClick={()=>{setOpenSignUp(true)}}>Sign in</button>
          </div>
        </div>
      </div>
      <div className='flex justify-between mx-10'>
          <a href="#" className='text-gray-400 text-xs'>About</a>
          <a href="#" className='text-gray-400 text-xs'>Download the X app</a>
          <a href="#" className='text-gray-400 text-xs'>Help Center</a>
          <a href="#" className='text-gray-400 text-xs'>Terms of Service</a>
          <a href="#" className='text-gray-400 text-xs'>Privacy Policy</a>
          <a href="#" className='text-gray-400 text-xs'>Cookie Policy</a>
          <a href="#" className='text-gray-400 text-xs'>Accessbility</a>
          <a href="#" className='text-gray-400 text-xs'>Ads info</a>
          <a href="#" className='text-gray-400 text-xs'>Blog</a>
          <a href="#" className='text-gray-400 text-xs'>Careers</a>
          <a href="#" className='text-gray-400 text-xs'>Brand Resources</a>
          <a href="#" className='text-gray-400 text-xs'>Advertising</a>
          <a href="#" className='text-gray-400 text-xs'>Marketing</a>
          <a href="#" className='text-gray-400 text-xs'>X for Business</a>
          <a href="#" className='text-gray-400 text-xs'>Developers</a>
          <a href="#" className='text-gray-400 text-xs'>Directory</a>
          <a href="#" className='text-gray-400 text-xs'>Settings</a>
      </div>
      <a href="#" className='absolute bottom-2 left-1/2 -translate-1/2 text-gray-400 text-xs'>© 2025 X Corp.</a>
    </div>
    {openSignIn&&<SignIn />}
    {openSignUp&&<SignUp />}
    </>
  )
}

export default Login