import React, { useContext, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import SideBar from './components/SideBar';
import Trends from './components/Trends';
import SearchInput from './components/SearchInput';
import AddPost from './components/AddPost';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import PostWithReply from './pages/PostWithReply';
import MyPosts from './pages/MyPosts';
import MyReplies from './pages/MyReplies';
import MyArticles from './pages/MyArticles';
import MyMedia from './pages/MyMedia';
import MyHighlights from './pages/MyHighlights';
import MyLikes from './pages/MyLikes';
import MobileNavBar from './components/MobileNavBar'
import ComposePost from './pages/ComposePost';
import { GlobalContextProvider } from './context/GlobalContext'; 
import { assets } from './assets/assets';

const App = () => {
  const { user,isPost,setIsPost } = useContext(GlobalContextProvider);

  const handlePostModel=()=>{
    setIsPost(!isPost);
  }

  useEffect(() => {
    document.body.style.overflow = isPost? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isPost]);
  if(!user) return <Login />
  return (
    <div className='relative'>
      {/* Main Layout */}
      <div className="flex lg:mx-[10vw]">
        {/* Left Sidebar */}
        <div className=" xs:w-[8vw] lg:w-[17vw]">
          <SideBar />
        </div>

        {/* Center Main Content */}
        <div className="border-l-[1px] border-r-[1px] border-gray-200 min-h-screen max-sm:w-full lg:w-[38vw]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:user" element={<Profile />}>
              <Route index element={<MyPosts />} />
              <Route path="replies" element={<MyReplies />} />
              <Route path="highlights" element={<MyHighlights />} />
              <Route path="articles" element={<MyArticles />} />
              <Route path="media" element={<MyMedia />} />
              <Route path="likes" element={<MyLikes />} />
            </Route>
            <Route path="/explore" element={<Home />} />
            <Route path="/notifications" element={<Home />} />
            <Route path="/messages" element={<Home/>} />
            <Route path="/community" element={<Home />} />
            <Route path="/premium" element={<Home />} />
            <Route path="/more" element={<Home/>} />
            <Route path="/post/:id" element={<PostWithReply />} />
            <Route path="/reply/:id" element={<PostWithReply />} />
            <Route path='/login' element={<Login />} />
            <Route path='/compose/post' element={<ComposePost />} />
          </Routes>
          <div className='fixed bottom-0 left-0 right-0 xs:hidden'><MobileNavBar /></div>
        </div>

        {/* Right Sidebar */}
        <div className="w-fit hidden lg:flex lg:flex-col lg:w-[25vw]">
          <div className="sticky top-0 bg-white z-10 mt-2 ml-7">
            <SearchInput />
          </div>
          <div className="overflow-auto h-[calc(100vh-50px)] scroll sticky top-0 ml-7">
            <Trends />
          </div>
        </div>
      </div>
      {/*isPost&&
        <div onClick={handlePostModel}  className="fixed inset-0 z-[10] bg-gray-800/55  flex items-start justify-center pt-10">
          <div  className="bg-white  w-[35vw] shadow-xl" onClick={(e)=>{e.stopPropagation()}}>
            <img src={assets.cross} alt="" className='w-6 h-6 ml-2 mt-2 cursor-pointer' onClick={handlePostModel}/>
            <AddPost />
          </div>
        </div>
      */}
    </div>
  );
};

export default App;
