import React, { use, useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';
import { GlobalContextProvider } from '../context/GlobalContext';
import {toast} from 'react-toastify'
import axios from 'axios';

const SignIn = () => {
      const navigate=useNavigate();
      const[createAccount,setCreateAccount]=useState(false)
      const[activeDiv,setActiveDiv]=useState("")
      const[name,setName]=useState("")
      const[username,setUserName]=useState("")
      const[email,setEmail]=useState("")
      const[password,setPassword]=useState("")
      const[day,setDay]=useState("")
      const[month,setMonth]=useState("")
      const[year,setYear]=useState("")

      const{setOpenSignIn,setOpenSignUp,backendUrl,setToken,getUser,token}=useContext(GlobalContextProvider)

      const handleSignIn = async () => {
        try {
          const dob = `${month}-${day}-${year}`;
          // Sending data to register endpoint
          const response = await axios.post(
            `${backendUrl}/user/register`,
            { name, email, password, username, dob },
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
      };
      
      const handleGoogleLogin=()=>{
        window.location.href = `${backendUrl}/auth/google`;
      }

      useEffect(()=>{
        if(token){
            getUser()
        }
      },[token])
  return (
    <div className='fixed inset-0 bg-[#999999] z-30'>
        <div className='bg-white sm:w-[max(35vw,400px)] sm:ml-[50%] w-full h-full  sm:-translate-x-1/2  sm:my-20 py-2 px-4 sm:rounded-xl sm:h-[80%] overflow-y-scroll'>
            <div className='flex justify-between items-center'>
                <img src={assets.exit} alt="exit" className='w-6 cursor-pointer' onClick={()=>{setOpenSignIn(false)}}  />
                <div className='flex-1'></div>
                <img src={assets.logo} alt="logo" className='w-8'  />
                <div className='flex-1'></div>
            </div>
            {!createAccount&&<div className='w-[max(50%,300px)] mx-auto'>
                <p className='mt-8 text-black font-bold text-3xl'>Join X today</p>
                <button className='cursor-pointer my-8  flex space-x-2 justify-center items-center border-[1px] border-gray-400 px-4 py-2 rounded-full w-full' onClick={handleGoogleLogin} ><p>Sign up with Google</p><img src={assets.google} alt="google logo" className='w-6 h-6' /></button>
                <button className='cursor-pointer  flex space-x-2 justify-center items-center border-[1px] border-gray-400 px-4 py-2 rounded-full w-full' ><p>Sign up with Apple</p><img src={assets.apple} alt="apple logo" className='w-6 h-6' /></button>
                <div className='w-full flex items-center space-x-1 my-4'>
                    <hr className='border-[0.5px] border-gray-300 flex-1' />
                    <p>or</p>
                    <hr className='border-[0.5px] border-gray-300 flex-1' />
                </div>
                <button className= 'cursor-pointer bg-black text-white font-semibold text-center rounded-full w-full py-2' onClick={()=>{setCreateAccount(true)}}>Create an account</button>
                <p className='text-xs text-gray-400 mt-2'>By signing up, you agree to the <span  className='text-primary'>Terms of Service</span> and <span className='text-primary'>Privacy Policy,</span> including <span className='text-primary'>Cookie Use.</span></p>
                <p className='text-gray-400 mt-14'>Have an account already?<span className='text-primary cursor-pointer' onClick={()=>{setOpenSignIn(false);setOpenSignUp(true)}}>Login</span></p>
            </div>}
            {createAccount&&
                <div className='mx-12 flex flex-col'>
                    <p className='mt-4 text-black font-bold text-3xl'>Create your account</p>
                    <div className='mt-8 mb-10  flex flex-col space-y-6'>
                            <div className={`rounded-md py-2 px-2 flex flex-col   ${activeDiv==="div-1"?"border-2  border-primary":"border-2 border-gray-400"}`} onClick={()=>{setActiveDiv("div-1")}}>
                                {name.length>0||activeDiv==="div-1"?
                                <div className='h-[45px]'>
                                    <p className={activeDiv==="div-1"?"text-primary":"text-gray-600 text-xs"}>Name</p>
                                    <input className='outline-none resize-none scroll w-full'  value={name} onChange={(e)=>{setName(e.target.value)}}></input>
                                </div>:
                                <p className='outline-none resize-none text-lg h-[50px] text-gray-600'>Name</p>
                                }
                            </div>
                            <div className={`rounded-md py-2 px-2 flex flex-col   ${activeDiv==="div-4"?"border-2 border-primary":"border-2 border-gray-400"}`} onClick={()=>{setActiveDiv("div-4")}}>
                                {activeDiv==="div-4"||username.length>0?
                                <div className='h-[45px]'>
                                    <p className={activeDiv==="div-4"?"text-primary":"text-gray-600 text-xs"}>@username</p>
                                    <input className='outline-none resize-none scroll w-full' maxLength={20} value={username} onChange={(e)=>{setUserName(e.target.value)}}></input>
                                </div>:
                                <p className='outline-none resize-none text-lg h-[45px] text-gray-600'>@username</p>
                                }
                            </div>
                            <div className={`rounded-md py-2 px-2 flex flex-col   ${activeDiv==="div-2"?"border-2 border-primary":"border-2 border-gray-400"}`} onClick={()=>{setActiveDiv("div-2")}}>
                                {activeDiv==="div-2"||email.length>0?
                                <div className='h-[45px]'>
                                    <p className={activeDiv==="div-2"?"text-primary":"text-gray-600 text-xs"}>Email</p>
                                    <input className='outline-none resize-none scroll w-full'  value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
                                </div>:
                                <p className='outline-none resize-none text-lg h-[45px] text-gray-600'>Email</p>
                                }
                            </div>
                            <div className={`rounded-md py-2 px-2 flex flex-col cursor-pointer ${activeDiv==="div-3"?"border-2 border-primary":"border-2 border-gray-400"}`} onClick={()=>{setActiveDiv("div-3")}}>
                                {activeDiv==="div-3"||password.length>0?
                                <div className='h-[45px]'>
                                    <p className={activeDiv==="div-3"?"text-primary":"text-gray-600 text-xs"}>Password</p>
                                    <input className='outline-none resize-none scroll w-full'  value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
                                </div>:
                                <p className='outline-none resize-none text-lg h-[45px] text-gray-600'>Password</p>
                                }
                            </div>
                        
                    </div>
                    <p className='font-bold'>Date of Birth</p>
                    <p className='text-xs'>This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, 
                        or something else.</p>
                    <div className='relative my-2 flex space-x-4'>
                        <div className='border-[1px] border-gray-400 rounded-sm w-[50%] flex items-center'>
                            <select name="month" id="month" className='outline-none w-full' onChange={(e)=>{setMonth(e.target.value)}} defaultValue={"Month"}>
                                <option value="">Month</option>
                                <option value="January">January</option>
                                <option value="February">February</option>
                                <option value="April">April</option>
                                <option value="March">March</option>
                                <option value="May">May</option>
                                <option value="June">June</option>
                                <option value="July">July</option>
                                <option value="August">August</option>
                                <option value="Septembe">September</option>
                                <option value="October">October</option>
                                <option value="November">November</option>
                                <option value="December">December</option>
                            </select>
                        </div>
                        <div className='p-2 border-[1px] border-gray-400 rounded-sm w-[20%] items-center'>
                            <select name="day" id="day" className='outline-none ' onChange={(e)=>{setDay(e.target.value)}} defaultValue={"Day"}>
                                <option value="">Day</option>
                                {[...Array(31)].map((_, i)=>(
                                    <option key={i+1}value={i+1}>{i+1}</option>
                                ))}
                            </select>
                        </div>
                        <div className='p-2 border-[1px] border-gray-400 rounded-sm  w-[30%] flex items-center '>
                            <select name="year" id="year" className='outline-none w-full' onChange={(e)=>{setYear(e.target.value)}} defaultValue={"Year"}>
                                <option value="">Year</option>
                                {[...Array(121)].map((_, i)=>(
                                    <option key={2025-i}value={2025-i}>{2025-i}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button className=' bg-black text-white w-full  rounded-full py-2 mt-4 cursor-pointer' onClick={handleSignIn}>Create</button>
                </div>
            }
        </div>
    </div>
  )
}

export default SignIn