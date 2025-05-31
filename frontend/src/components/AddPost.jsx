import React,{useContext, useState} from 'react'
import TextareaAutosize from "react-textarea-autosize";
import { assets } from '../assets/assets';
import {GlobalContextProvider} from '../context/GlobalContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const AddPost = (props) => {
    const navigate=useNavigate();
    const lineHeight = 24;
    const maxHeight = 500;
    const maxRows = Math.floor(maxHeight / lineHeight);
     const[post,setPost]=useState('');
     const[media,setMedia]=useState([]);
     const{isPost,setIsPost,token,backendUrl,user,getAllReplies}=useContext(GlobalContextProvider)

    const addMedia=(e)=>{
        const file=e.target.files[0];
        setMedia(prev=>([...prev,file]))
      }
      const removeMedia=(file)=>{
        const updatedMedia=media.filter((item)=>{
          return item!=file;
        })
        setMedia(updatedMedia)
      }
    const handlePost=async()=>{
      try{
        const fd= new FormData();
        fd.append('title',post);
        media.forEach(file=>fd.append("media",file))
        let response;
        if(props.isReply){
          fd.append('postId',props.postId)
          response=await axios.post(`${backendUrl}/reply/add-reply`,fd,{withCredentials:true,headers:{token:token}})
        }else{
          response=await axios.post(`${backendUrl}/post/add-post`,fd,{withCredentials:true,headers:{token:token}})
        }
        if(response.data.success){
          toast.success(`${post.isReply===true?"Reply":"Post"} added Successfully`);
          setIsPost(false);
          setPost("")
          setMedia([])
          if(!props.isReply){
            navigate("/")
          }else{
            getAllReplies(props.postId)
          }

        }else{
          throw new Error(response.data.message)
        }
      }catch(err){
        console.log(err)
        toast.error(err.message||"Something went wrong")
      }
    }
  return (
    <div className='px-4 pt-4 border-b-[1px] border-r-[1px] border-gray-200 bg-white w-full'>
    <div className="flex ">
      <img src={user.avatar.trim() !== "" ? user.avatar : assets.default_profile} alt="profile pic" className='w-12 h-12 rounded-full object-center object-cover' />
      <div className={`${post!==''?"border-b-[1px] border-gray-200":""} max-h-screen overflow-scroll scroll w-full`}>
        <TextareaAutosize minRows={2} maxLength={100} maxRows={maxRows} className="resize-none w-full mx-3 outline-0 text-lg"
        placeholder="What's happening?" value={post} onChange={(e)=>{setPost(e.target.value)}}/>
        <div className='flex overflow-x-scroll w-full scroll mx-3 space-x-4 '>
          {media.map((file,index)=>{
            const mediaType = file.type.split("/")[0];
            return (
              <div>
                {mediaType==="image"?
                  (<div className='relative'>
                    <img src={URL.createObjectURL(file)} alt='image file' className='min-w-[230px] max-h-[300px] object-cover object-center rounded-2xl' />
                    <img src={assets.exit} alt="exit" 
                    className='absolute right-2 top-2 bg-white w-5 h-5 rounded-full m-0 p-0 cursor-pointer' onClick={()=>{removeMedia(file)}} />
                  </div>
                  )
                  :
                  (<div className='rounded-2xl relative'>
                      <video  className='min-w-[230px] max-h-[300px] object-cover object-center '>
                        <source src={URL.createObjectURL(file)}/>
                        Sorry video can't be played
                      </video>
                    <img src={assets.exit} alt="exit"
                     className='absolute right-2 top-2 bg-white w-5 h-5 rounded-full m-0 p-0 cursor-pointer' onClick={()=>{removeMedia(file)}}/>
                  </div>)
                }
              </div>
            );
          })}
        </div>
      </div>
    </div>
    <div className='flex justify-between items-center py-3'>
      <label htmlFor="media">
        <img src={assets.gallery} alt="media" className='w-5 h-5 ml-14 cursor-pointer' />
      </label>
      <input type="file" hidden id="media" onChange={addMedia}/>
      {post!=''||media.length>0?
        <button className='bg-black text-white font-bold px-4 py-1 rounded-full cursor-pointer ' onClick={handlePost}>Post</button>
        :
        <button className='bg-[#969393] text-white font-bold px-4 py-1 rounded-full' disabled>Post</button>}
    </div>
  </div>
  )
}

export default AddPost