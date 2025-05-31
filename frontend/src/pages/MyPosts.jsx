import React, { useContext, useState } from 'react'
import { posts } from '../assets/assets'
import Post from '../components/Post'
import  {GlobalContextProvider} from '../context/GlobalContext'
const MyPosts = () => {
  const{userPosts}=useContext(GlobalContextProvider)
 
  const createPost=(props)=>{
    return <Post key={props.index} props={props}  onClickAvailable={true}/>
  }
  
  return (
    <div>
      {userPosts.map(createPost)}
    </div>
  )
}

export default MyPosts