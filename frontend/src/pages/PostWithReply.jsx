import React, { use, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { assets } from '../assets/assets';
import AddPost from '../components/AddPost';
import Post from '../components/Post';
import { toast } from 'react-toastify';
import axios from 'axios';
import { GlobalContextProvider } from '../context/GlobalContext';
const PostWithReply = () => {
  const {id}=useParams();
  const flag=true
  const navigate=useNavigate();
  const location=useLocation();
  const route=location?.pathname.split("/")[1];

  const{backendUrl,token,getAllReplies,replyData,setReplyData}=useContext(GlobalContextProvider)
  const[postData,setPostData]=useState({});

  const getPostData=async()=>{
    try{
      let response;
      if(route==="post"){
        response=await axios.post(`${backendUrl}/post/get-postbyid`,{postId:id},{withCredentials:true,headers:{token:token}});
      }else{
        response=await axios.post(`${backendUrl}/reply/get-replybyid`,{replyId:id},{withCredentials:true,headers:{token:token}});
      }
      if(response.data.success){
        setPostData(response.data.message);
      }else{
        throw new Error(response.data.message);
      }
    }catch(err){
      console.log(err)
      toast.error(err.message||"Something went wrong")
    }
  }

  
  useEffect(()=>{
    if(id){
      getPostData();
      getAllReplies(id);
      
    }
  },[id])

  const createPost=(props)=>{
    return <Post key={props.id} props={props} onClickAvailable={true} isReply={true}/>
  }
  return (
    <div className='max-sm:w-full lg:w-[38vw] flex flex-col '>
        <div className='flex items-center  border-r-[1px]  border-gray-200 sticky top-0 bg-white z-10 px-4 py-2 justify-between'>
            <img src={assets.left_arrow} alt="back" className='w-8 h-8 mr-12 cursor-pointer' onClick={()=>{navigate(-1)}} />
            <p className='font-semibold text-xl'>Post</p>
            <div className='flex-1'></div>
            <button className='border-[1px] border-gray-400 font-bold rounded-2xl  px-4'>Reply</button>
       </div>
        {Object.keys(postData).length > 0 &&<Post props={postData} onClickAvailable={false} isReply={false}/>}   
        <div className='border-t-[1px] border-gray-200'><AddPost isReply={true} postId={id}/></div>
        {replyData.length>0&&replyData.map(createPost)}
    </div>
  )
}

export default PostWithReply