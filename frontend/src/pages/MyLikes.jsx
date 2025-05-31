import React, { useContext, useEffect, useState } from 'react'
import Post from '../components/Post'
import { GlobalContextProvider } from '../context/GlobalContext'
import axios from 'axios'
import { toast } from 'react-toastify'
const MyLikes = () => {
  const{backendUrl,token,user}=useContext(GlobalContextProvider)
  const[userLikedPosts,setUserLikedPosts]=useState([])

  const getUserLikedPosts=async()=>{
    try{
      const response=await axios.post(`${backendUrl}/likes/get-liked-posts-of-user`,{},{withCredentials:true,headers:{token:token}})
      if(response.data){
        setUserLikedPosts(response.data.message)
      }else{
        throw new Error(response.data.message)
      }
    }catch(err){
      console.log(err);
      toast.error(err.message)
    }
  }

  const createPost=(post)=>{
    const props=post.postId;
    return <Post key={props.id} props={props} onClickAvailable={true}/>
  }

  useEffect(()=>{
    if(user){
      getUserLikedPosts();
    }
  },[])

  return (
    <div>
      {userLikedPosts?.map(createPost)}
    </div>
  )
}

export default MyLikes