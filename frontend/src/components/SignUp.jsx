import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';
import { GlobalContextProvider } from '../context/GlobalContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const SignUp = () => {
    const navigate=useNavigate()
    const handleGoogleLogin=()=>{
        window.location.href = "http://localhost:4000/auth/google";
      }
      const[activeDiv,setActiveDiv]=useState("")
      const[userNameOrEmail,setUserNameOrEmail]=useState("")
      const[password,setPassword]=useState("")
      const{setOpenSignIn,setOpenSignUp,getUser,token,setToken,backendUrl}=useContext(GlobalContextProvider)

      const handleSignUp=async()=>{
        try {
        
            // Sending data to register endpoint
            const response = await axios.post(
              `${backendUrl}/user/login`,
              {  userNameOrEmail, password},
              { withCredentials: true } // Ensure cookies are sent (if using session)
            );
        
            if (response.data.success) {
              setToken(response.data.token); 

              navigate("/")
            } else {
              throw new Error(response.data.message);
            }
          } catch (err) {
            console.log(err);
            // Show specific error message
            toast.error(err.response?.data?.message || err.message || "Something went wrong");
          }
      }
      useEffect(()=>{
        if(token){
            getUser()
        }
      },[token]);
  return (
    <div className='fixed inset-0 bg-[#999999] z-30'>
        <div className='bg-white sm:w-[max(35vw,400px)] sm:ml-[50%] w-full h-full  sm:-translate-x-1/2  sm:my-20 py-2 px-4 sm:rounded-xl sm:h-[80%]'>
            <div className='flex justify-between items-center'>
                <img src={assets.exit} alt="exit" className='w-6 cursor-pointer' onClick={()=>{setOpenSignUp(false)}}  />
                <div className='flex-1'></div>
                <img src={assets.logo} alt="logo" className='w-8'  />
                <div className='flex-1'></div>
            </div>
            
                <div className='mx-12 flex flex-col'>
                    <p className='mt-4 text-black font-bold text-3xl'>Sign into X</p>
                    <div className='mt-8 mb-10  flex flex-col space-y-6'>
                            <div className={`rounded-md   px-2 flex flex-col   ${activeDiv==="div-1"?"border-2  border-primary":"border-2 border-gray-400"}`} onClick={()=>{setActiveDiv("div-1")}}>
                                {name.length>0||activeDiv==="div-1"?
                                <div className=''>
                                    <p className={activeDiv==="div-1"?"text-primary":"text-gray-600 text-xs"}>Username or Email</p>
                                    <input className='outline-none resize-none scroll w-full'  value={userNameOrEmail} onChange={(e)=>{setUserNameOrEmail(e.target.value)}}></input>
                                </div>:
                                <p className='outline-none resize-none text-lg h-[50px] text-gray-600 py-2'>Username or Email</p>
                                }
                            </div>
                            
                            <div className={`rounded-md  px-2 flex flex-col cursor-pointer ${activeDiv==="div-3"?"border-2 border-primary":"border-2 border-gray-400"}`} onClick={()=>{setActiveDiv("div-3")}}>
                                {activeDiv==="div-3"||password.length>0?
                                <div className=''>
                                    <p className={activeDiv==="div-3"?"text-primary":"text-gray-600 text-xs"}>Password</p>
                                    <input className='outline-none resize-none scroll w-full'  value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
                                </div>:
                                <p className='outline-none resize-none text-lg h-[45px] py-2 text-gray-600'>Password</p>
                                }
                            </div>
                            <button className='bg-black py-3 rounded-full text-white cursor-pointer' onClick={handleSignUp}>Sign in</button>
                         </div>       
                    </div>
            
        </div>
    </div>
  )
}

export default SignUp