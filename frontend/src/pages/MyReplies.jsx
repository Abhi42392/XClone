import React, { useContext, useEffect,useState } from 'react'
import {posts} from "../assets/assets"
import Post from '../components/Post'
import { GlobalContextProvider } from '../context/GlobalContext'
import axios from 'axios'
import { toast } from 'react-toastify'
const MyReplies = () => {
  const[myReplies,setMyReplies]=useState([])
  const{backendUrl,token}=useContext(GlobalContextProvider)
  
  
    const getAllReplies=async()=>{
            try{
                const response=await axios.post(`${backendUrl}/user/get-all-replies-of-user`,{},{withCredentials:true,headers:{token:token}});
                console.log(response.data)
              if(response.data.success){
                setMyReplies(response.data.message);
              }else{
                throw new Error(response.data.message);
              }
            }catch(err){
              console.log(err)
              toast.error(err.message||"Something went wrong")
            }
    }
    useEffect(()=>{
      getAllReplies();
    },[])

    const createPost=(reply)=>{
      return <div>
        
        <Post key={reply.id} props={reply} onClickAvailable={true} isReply={true}/>
      </div>
    }
  return (
    <div>
      {myReplies.map(createPost)}
    </div>
  )
}

export default MyReplies