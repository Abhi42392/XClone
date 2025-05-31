import React, { useContext, useEffect, useState } from 'react'
import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { GlobalContextProvider } from '../context/GlobalContext';
import axios  from 'axios';
import {toast} from 'react-toastify'


const EditProfile = () => {
  const navigate =useNavigate();
  const[activeDiv,setActiveDiv]=useState("")
  const{user,setUser,saveChanges,backendUrl,token,setSaveChanges}=useContext(GlobalContextProvider)
  const[editUser,setEditUser]=useState({...user})
  const[inputBackground,setInputBackground]=useState(false)
  const[inputAvatar,setInputAvatar]=useState(false)
  const handleImageChange=(e)=>{
    const file=e.target.files[0];
    if(file){
      if(e.target.name==="background"){
        setEditUser(prev=>({...prev,background:file}))
        setInputBackground(URL.createObjectURL(file))
      }else{
        setEditUser(prev=>({...prev,avatar:file}))
        setInputAvatar(URL.createObjectURL(file))
      }
    }
  }

   const handleSubmit=async(e)=>{
        try{
          
          const fd=new FormData();
          fd.append('name',editUser.name);
          fd.append('bio',editUser.bio);
          fd.append('location',editUser.location);
          fd.append('website',editUser.website);
          fd.append('avatar',editUser.avatar);
          fd.append('background',editUser.background);

          const response =await axios.post(`${backendUrl}/user/edit-user-info`,fd,{withCredentials:true,headers:{token:token}});
          if(response.data.success){
            toast.success('User data updated');
            setEditUser({});
            setSaveChanges(false)
            navigate("/")
          }else{
            setSaveChanges(false)
            throw new Error(response.data.message)
          }
        }catch(err){
          console.log(err);
          setSaveChanges(false)
          toast.error(err.message||'Something went wrong')
        }
    }
  useEffect(()=>{
    if(saveChanges){
      handleSubmit();
    }
  },[saveChanges])
  return (
    <div className='m-2 max-h-[80vh] overflow-y-scroll scroll'>
      <div className='relative w-full max-h-[30vh]'>
          <div className='relative'>
            <label htmlFor="background">
              {!inputBackground&&<img src={editUser.background.trim()!==""?editUser.background:assets.default_background}
               alt="background image" className='w-full h-full max-h-[30vh] object-cover object-center'/>}
              {!inputBackground&&<div className='bg-gray-800/60 absolute top-0 left-0 right-0 w-full h-full flex space-x-2 justify-center items-center text-white'>
                <img src={assets.edit_icon} alt="edit icon" className='w-6 h-6'/>
                <p>Add background</p>
              </div>}
              {inputBackground&&<img src={inputBackground} className='w-full h-full max-h-[30vh] object-cover object-center'/>}
            </label>
            <input type="file" accept='image/*' id="background" name='background' hidden onChange={handleImageChange}/>
          </div>

          <div className=''>
            <label htmlFor="avatar">
              {!inputAvatar&&<img src={editUser.avatar.trim()!==""?editUser.avatar:assets.default_profile} alt="profile pic" 
              className='w-30 h-30 rounded-full absolute bottom-0 left-5 translate-y-1/2 border-4 border-white'
              onError={(e) => {e.target.src = assets.default_profile }}  />}
              {!inputAvatar&&<div className='absolute w-30 h-30 rounded-full bg-gray-800/60 z-20 bottom-0 left-5 translate-y-1/2 flex justify-center items-center space-x-2 text-white'>
                  <img src={assets.edit_icon} alt="edit icon" className='w-6 h-6 object-center object-cover'/>
                  <p>Edit</p>
              </div>}
              {inputAvatar&&<img src={inputAvatar} alt="profile pic" 
              className='w-30 h-30 rounded-full absolute bottom-0 left-5 translate-y-1/2 border-4 border-white'
              onError={(e) => {e.target.src = assets.default_profile }}  />}
            </label>
            <input type="file" accept='image/*' id="avatar" name='avatar' hidden onChange={handleImageChange} />
            </div>
          <button className='absolute -bottom-12 right-4 border-[1px] border-gray-400 py-1 font-bold rounded-2xl  px-4 cursor-pointer' 
          onClick={()=>{setIsEdit(true)}}>Edit profile</button>
      </div>
      <div className='mt-20 mb-10 mx-2 flex flex-col space-y-6'>
        <div className={`rounded-md py-2 px-2 ${activeDiv==="div-1"?"border-2 border-primary":"border-2 border-gray-400"}`} onClick={(e)=>{setActiveDiv("div-1")}}>
          <p className={activeDiv==="div-1"?"text-primary":""}>Name</p>
          <input type="text" className='outline-none' value={editUser.name} onChange={(e)=>{setEditUser(prev=>({...prev,name:e.target.value}))}} />
        </div>
        <div className={`rounded-md py-2 px-2 ${activeDiv==="div-2"?"border-2 border-primary":"border-2 border-gray-400"}`} onClick={()=>{setActiveDiv("div-2")}}>
          {activeDiv==="div-2"||editUser.bio.length>0?
          <div className='h-[100px]'>
            <span className='flex justify-between'><p className={activeDiv==="div-2"?"text-primary":"text-gray-600"}>Bio</p><p className='text-sm text-gray-500'>{editUser.bio.length}/ 160</p></span>
            <textarea className='outline-none resize-none scroll w-full' maxLength={160} value={editUser.bio} onChange={(e)=>{setEditUser(prev=>({...prev,bio:e.target.value}))}}></textarea>
          </div>:
          <textarea placeholder='Bio' className='outline-none resize-none text-lg pt-4 h-[100px] text-gray-800' readOnly></textarea>
          }
        </div>
        <div className={`rounded-md py-2 px-2 ${activeDiv==="div-3"?"border-2 border-primary":"border-2 border-gray-400"}`} onClick={()=>{setActiveDiv("div-3")}}>
          {activeDiv==="div-3"||location.length>0?
          <div className='h-[50px]'>
            <span className='flex justify-between'><p className={activeDiv==="div-3"?"text-primary":"text-gray-600"}>Location</p><p className='text-sm text-gray-500'>{editUser.location.length}/ 30</p></span>
            <input className='outline-none resize-none scroll w-full' maxLength={30} value={editUser.location} onChange={(e)=>{setEditUser(prev=>({...prev,location:e.target.value}))}}></input>
          </div>:
          <p className='outline-none resize-none text-lg h-[50px] text-gray-600'>Location</p>
          }
        </div>
        <div className={`rounded-md py-2 px-2 flex flex-col  ${activeDiv==="div-4"?"border-2 border-primary":"border-2 border-gray-400"}`} onClick={()=>{setActiveDiv("div-4")}}>
          {activeDiv==="div-4"||editUser.website.length>0?
          <div className='h-[50px]'>
            <span className='flex justify-between'><p className={activeDiv==="div-4"?"text-primary":"text-gray-600"}>Website</p><p className='text-sm text-gray-500'>{editUser.website.length}/ 30</p></span>
            <input className='outline-none resize-none scroll w-full' maxLength={70} value={editUser.website} onChange={(e)=>{setEditUser(prev=>({...prev,website:e.target.value}))}}></input>
          </div>:
          <p className='outline-none resize-none text-lg h-[50px] text-gray-600'>Website</p>
          }
        </div>
      </div>

    </div>
  )
}

export default EditProfile