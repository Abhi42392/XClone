import React,{ useState,useRef, useEffect } from 'react'
import { assets } from '../assets/assets'
const SearchInput = () => {
    const dropdownRef=useRef(null)
    const[showDrop,setShowDrop]=useState(false)
     useEffect(()=>{
        function handleClick(event){
          if(dropdownRef.current&&!dropdownRef.current.contains(event.target)){
            setShowDrop(false)
          }
        }
        document.addEventListener("mousedown",handleClick);
        return () => {
          document.removeEventListener("mousedown", handleClick);
        };
      },[])
  return (
    <div className='relative'  ref={dropdownRef}>
        <div className='flex space-x-2 items-center  bg-white px-4 py-2 w-full border-[1px] border-[#edebeb] rounded-full ' onClick={()=>setShowDrop(true)}>
          <img src={assets.search} alt="search" className='w-5' />
          <input type="text" placeholder='Search' className='outline-none  text-gray-700 ' />
        </div>
        {showDrop&&
          <div
          className="absolute top-full shadow-md min-h-[150px] w-full border-[1px] border-[#edebeb] z-50 bg-white  rounded-lg px-4 pt-4"
        >
          Try searching for people, lists, or keywords
        </div>}
      </div>
  )
}

export default SearchInput