import React from 'react'
import { useNavigate } from 'react-router-dom'
import AddPost from '../components/AddPost';
import { assets } from '../assets/assets';
const ComposePost = () => {
    const navigate=useNavigate();
  return (
    <div onClick={()=>{navigate("/")}}  className="fixed inset-0 z-[30] bg-gray-800/55  flex items-start justify-center pt-10">
        <div  className="bg-white  w-[35vw] shadow-xl" onClick={(e)=>{e.stopPropagation()}}>
            <img src={assets.cross} alt="" className='w-6 h-6 ml-2 mt-2 cursor-pointer' onClick={()=>{navigate("/")}}/>
            <AddPost isReply={false}/>
        </div>
    </div>
  )
}

export default ComposePost