import axios, { all } from 'axios';
import {toast} from 'react-toastify'
import React, { createContext, useEffect, useState } from 'react'
export const GlobalContextProvider=createContext(null)
const GlobalContext = ({children}) => {
     const backendUrl="https://xclone-r93j.onrender.com"
     const redisUrl=import.meta.env.REDIS_URL;

    const[currentPlaying,setCurrentPlaying]=useState('');
    const[token,setToken]=useState(localStorage.getItem("token")?localStorage.getItem("token"):"");
    const[isPost,setIsPost]=useState(false)
    const[user, setUser] = useState("");
    const[openSignIn,setOpenSignIn]=useState(false);
    const[openSignUp,setOpenSignUp]=useState(false);
    const[saveChanges,setSaveChanges]=useState(false)
    const[allPosts,setAllPosts]=useState([]);
    const[replyData,setRepliesData]=useState([]);
    const[userPosts,setUserPosts]=useState([])
    const getUser = async () => {
      try {
        const response = await axios.get(`${backendUrl}/me`, {
          withCredentials: true, // needed for cookies (Google OAuth session)
          headers: {
            token: token 
          }
        });
        if (response.data.success) {
          setUser(response.data.user);
          if(token){
            localStorage.setItem("token",token);
          }
        } else {
          console.log("error");
          setUser(null);
        
        }
      } catch (err) {
        console.log(err);
        setUser(null);
        
      }
    };
    const getAllUserPosts=async()=>{
      try{
        const response=await axios.post(`${backendUrl}/user/get-all-posts-of-user`,{},{withCredentials:true,headers:{token:token}});
        if(response.data.success){
          setUserPosts(response.data.message);
        }else{
          throw new Error(response.data.message);
        }
      }catch(err){
        console.log(err)
        toast.error(err.message||"Something went wrong")
      }
    }

    const getAllPosts=async()=>{
      try{
        const response=await axios.post(`${backendUrl}/post/get-all-posts`,{},{withCredentials:true,headers:{token:token}});
        if(response.data.success){
          setAllPosts(response.data.message);
        }else{
          throw new Error(response.data.message);
        }
      }catch(err){
        console.log(err)
        toast.error(err.message||"Something went wrong")
      }
    }
    const getAllReplies=async(id)=>{
        try{
            const response=await axios.post(`${backendUrl}/reply/get-all-replies`,{postId:id},{withCredentials:true,headers:{token:token}});
          if(response.data.success){
            setRepliesData(response.data.message);
          }else{
            throw new Error(response.data.message);
          }
        }catch(err){
          console.log(err)
          toast.error(err.message||"Something went wrong")
        }
      }
    
  useEffect(()=>{
    if(!token){
      getUser()
    }
  },[])

  useEffect(()=>{
    if(token){
      getUser();
    }
  },[token])

  useEffect(()=>{
    if(user&&token){
      getAllPosts();
      getAllUserPosts();
    }
  },[user])
    
  return (
    <GlobalContextProvider.Provider value={{currentPlaying,setCurrentPlaying,token,setToken,
    isPost,setIsPost,backendUrl,user,setUser,getUser,openSignIn,setOpenSignIn,openSignUp,setOpenSignUp,
    saveChanges,setSaveChanges,allPosts,getAllPosts,getAllReplies,replyData,setRepliesData,userPosts,redisUrl}}>
        {children}
    </GlobalContextProvider.Provider>
  )
}

export default GlobalContext
