import React, { useContext, useEffect, useRef, useState } from 'react';
import { assets } from '../assets/assets';
import TextareaAutosize from 'react-textarea-autosize';
import { GlobalContextProvider } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Post = (props) => {
  const { likescount, viewscount, repostcount, commentscount, files, _id, userId, title, dateposted } = props.props;
  const { currentPlaying, setCurrentPlaying, backendUrl, token } = useContext(GlobalContextProvider);
  const userData = userId;

  
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [currTime, setCurrTime] = useState('');
  const [currWidth, setCurrWidth] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likescount);

  const navigate = useNavigate();
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    setShowVideoPlayer(true);
    setCurrentPlaying(_id);
  };

  const handleNavigate = () => {
    if (props.onClickAvailable) {
      if (props.isReply) {
        navigate(`/reply/${_id}`);
      } else {
        navigate(`/post/${_id}`);
      }
    }
  };

  const computeTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes <= 9 ? '0' : ''}${minutes}:${seconds <= 9 ? '0' : ''}${seconds}`;
  };

  const mute = () => {
    videoRef.current.muted = true;
    setIsMuted(true);
  };

  const unMute = () => {
    videoRef.current.muted = false;
    setIsMuted(false);
  };

  const playVideo = () => {
    videoRef.current.play();
    setIsPaused(false);
  };

  const pauseVideo = () => {
    videoRef.current.pause();
    setIsPaused(true);
  };

  const progressVideo = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setCurrTime(computeTime(current));
      setCurrWidth(Math.floor((current / duration) * 100));
    }
  };

  const handleJump = (e) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
  };

  const handleIsLiked = async () => {
    try {
      const response = await axios.post(`${backendUrl}/likes/check-is-liked`, { postId: _id }, { withCredentials: true, headers: { token } });
      if (response.data.success) {
        setIsLiked(response.data.message); // message: true or false
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      console.log(err.message || "Something went wrong");
      toast.error(err.message || "Something went wrong");
    }
  };

  const handleLike = async (e) => {
    e.stopPropagation();
    try {
      setIsLiked(true);
      setLikesCount(prev => prev + 1);
      await axios.get(`${backendUrl}/api/likes/${_id}`, { withCredentials: true, headers: { token } });
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Something went wrong");
    }
  };

  const handleDisLike = async (e) => {
    e.stopPropagation();
    try {
      setIsLiked(false);
      setLikesCount(prev => (prev > 0 ? prev - 1 : 0));
      await axios.get(`${backendUrl}/api/dislikes/${_id}`, { withCredentials: true, headers: { token } });
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Something went wrong");
    }
  };

  const calculateDate = (date) => {
    const postDate = new Date(date);
    const currDate = new Date();
    const diffMs = currDate - postDate;
    const diffMinutes = diffMs / (1000 * 60);
    const diffHours = diffMinutes / 60;
    const diffDays = diffHours / 24;

    if (diffMinutes < 60) {
      return `${Math.floor(diffMinutes)}m`;
    } else if (diffHours < 24) {
      return `${Math.floor(diffHours)}h`;
    } else if (currDate.getFullYear() !== postDate.getFullYear()) {
      return postDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } else {
      return postDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }
  };

  const createMedia = ({ mediaType, media }) => {
    return (
      <div className='ml-14'>
        {mediaType === "image" && <img src={media} alt='image' className='max-h-[400px] max-w-full rounded-2xl' />}
        {mediaType === "video" && (
          <div
            className='relative max-h-[500px] w-full bg-black rounded-2xl cursor-pointer'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setShowVideoPlayer(false)}
            onTouchStart={handleMouseEnter}
            onTouchEnd={() => setShowVideoPlayer(false)}
          >
            <video
              ref={videoRef}
              className='w-full h-full rounded-2xl max-h-[500px] object-contain'
              muted
              autoPlay
              playsInline
              loop
              onTimeUpdate={progressVideo}
              onClick={(e) => {
                e.stopPropagation();
                if (isMuted) unMute();
                else if (isPaused) playVideo();
                else pauseVideo();
              }}
            >
              <source src={media} />
              Your browser does not support video playback.
            </video>

            {/* Video Controls */}
            {showVideoPlayer && (
              <div className='absolute bottom-3 w-full px-3'>
                <div className='w-full h-2.5 py-1' onClick={handleJump}>
                  <div className='w-full h-0.5 bg-gray-400 rounded-2xl'>
                    <div className="h-full bg-white rounded-2xl" style={{ width: `${currWidth}%` }} />
                  </div>
                </div>
                <div className='flex items-center space-x-4 pt-4 text-white'>
                  {isPaused ? (
                    <img src={assets.play} alt="play" className='w-6 cursor-pointer' onClick={(e) => { e.stopPropagation(); playVideo(); }} />
                  ) : (
                    <img src={assets.pause} alt="pause" className='w-6 cursor-pointer' onClick={(e) => { e.stopPropagation(); pauseVideo(); }} />
                  )}
                  <div className='flex-1'></div>
                  <p>{currTime}/{computeTime(videoRef.current?.duration || 0)}</p>
                  {isMuted ? (
                    <img src={assets.mute} alt="mute" className='w-5 h-5 cursor-pointer' onClick={(e) => { e.stopPropagation(); unMute(); }} />
                  ) : (
                    <img src={assets.volume} alt="volume" className='w-5 h-5 cursor-pointer' onClick={(e) => { e.stopPropagation(); mute(); }} />
                  )}
                  <img src={assets.settings_white} alt="settings" className='w-5 h-5 cursor-pointer' />
                  <img src={assets.pic_in_pic} alt="pip" className='w-5 h-5 cursor-pointer' />
                  <img src={assets.maximize} alt="fullscreen" className='w-5 h-5 cursor-pointer' onClick={(e) => { e.stopPropagation(); videoRef.current?.requestFullscreen(); }} />
                </div>
              </div>
            )}
            {!showVideoPlayer && <div className='absolute bottom-3 w-full px-3 text-white'>{currTime}</div>}
          </div>
        )}
      </div>
    );
  };

  const getLikesFromRedis=async()=>{
    const redisLikes=await axios.get(`${backendUrl}/api/getLikesCount/${_id}`,{withCredentials:true,headers:{token:token}})
    setLikesCount(prev=>prev+redisLikes.data.likeCount)
  }

  useEffect(() => {
    if (videoRef.current) {
      if (currentPlaying === _id) {
        playVideo();
      } else {
        pauseVideo();
      }
    }
  }, [currentPlaying]);

  useEffect(() => {
    if (!videoRef.current) return;
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Video is in view
            if (currentPlaying === _id) {
              playVideo();
            }
          } else {
            // Video out of view
            pauseVideo();
          }
        });
      },
      {
        threshold: 0.25, // Play/Pause when 25% of video is visible
      }
    );
  
    observer.observe(videoRef.current);
  
    return () => {
      observer.disconnect();
    };
  }, [currentPlaying, _id]);
  
  useEffect(() => {
    if (_id) {
      handleIsLiked();
    }
  }, [_id]);

  useEffect(()=>{
    getLikesFromRedis()
  },[])

  return (
    <div className='px-4 py-3 hover:bg-gray-100 transition-all' onClick={handleNavigate}>
      <div className='flex space-x-4'>
        <img src={userData.avatar} alt="profile" className='w-10 h-10 rounded-full object-cover' />
        <div className='w-full'>
          <div className='flex items-center space-x-1'>
            <p className='font-bold cursor-pointer'>{userData.name}</p>
            <img src={assets.verified} alt="verified" className='w-5' />
            <p className='text-gray-500'>@{userData.username}</p>
            <p className='text-gray-500 ml-2'>{calculateDate(dateposted)}</p>
          </div>
          <TextareaAutosize readOnly value={title} className="w-full resize-none outline-none" />
        </div>
      </div>

      <div className='flex flex-col space-y-4'>
        {files?.map(createMedia)}
      </div>

      <div className='flex justify-between pl-14 my-3'>
        <span className='flex items-end space-x-1 cursor-pointer'>
          <img src={assets.comment} alt="comment" className='w-5 h-5' />
          <p className='text-xs'>{commentscount}</p>
        </span>

        <span className='flex items-end space-x-1 cursor-pointer'>
          <img src={assets.repost} alt="repost" className='w-5 h-5' />
          <p className='text-xs'>{repostcount}</p>
        </span>

        <span className='flex items-end space-x-1 cursor-pointer'>
          {isLiked ? (
            <img src={assets.active_like} alt="like" className='w-5 h-5' onClick={handleDisLike} />
          ) : (
            <img src={assets.like} alt="like" className='w-5 h-5' onClick={handleLike} />
          )}
          <p className='text-xs'>{likesCount}</p>
        </span>

        <span className='flex items-end space-x-1 cursor-pointer'>
          <img src={assets.views} alt="views" className='w-5 h-5' />
          <p className='text-xs'>{viewscount}</p>
        </span>

        <div className='flex items-center space-x-2 cursor-pointer'>
          <img src={assets.save} alt="save" className='w-5 h-5' />
          <img src={assets.upload} alt="upload" className='w-5 h-5' />
        </div>
      </div>
    </div>
  );
};

export default Post;
