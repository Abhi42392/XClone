// routes/metrics.js
import express from 'express';
import redisClient from '../config/redisConfig.js';
import checkAuthenticated from '../middlewares/checkAuthenticated.js';

const redisRouter = express.Router();

redisRouter.get('/views/:postId',checkAuthenticated, async (req, res) => {
  const { postId } = req.params;
  const redisKey = `post:${postId}:views`;

  try {
    const views = await redisClient.incr(redisKey); // Atomically increment
    res.status(200).json({ postId, views });
  } catch (err) {
    console.error('Redis error:', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

redisRouter.get('/likes/:postId/',checkAuthenticated, async (req, res) => {
    const userId = req.user?._id || req.userId;
    const { postId } = req.params;
    const redisKey = `post:${postId}:${userId}:likes`;
  
    try {
      const likes = await redisClient.incr(redisKey); 
      await redisClient.sAdd(`post:${postId}:likes`,userId);
      res.status(200).json({ postId, likes });
    } catch (err) {
      console.error('Redis error:', err);
      res.status(500).json({ message: 'Something went wrong' });
    }
  });
  
redisRouter.get('/dislikes/:postId',checkAuthenticated, async (req, res) => {
    const userId = req.user?._id || req.userId;
    const { postId } = req.params;
    const redisKey = `post:${postId}:${userId}:dislikes`;
  
    try {
      const dislikes = await redisClient.decr(redisKey);
      await redisClient.sRem(`post:${postId}:likes`,userId);
      res.status(200).json({ postId, dislikes });
    } catch (err) {
      console.error('Redis error:', err);
      res.status(500).json({ message: 'Something went wrong' });
    }
});

redisRouter.get('/isLiked/:postId',checkAuthenticated,async(req,res)=>{
  const userId = req.user?._id || req.userId;
  const { postId } = req.params;
  try{
    const isLiked = await redisClient.sIsMember(`post:${postId}:likes`, userId);
    console.log(isLiked)
    res.status(200).json({isLiked});
  }catch(err){
    console.error('Redis error:', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
})

redisRouter.get('/getLikesCount/:postId',checkAuthenticated,async(req,res)=>{
  const userId = req.user?._id || req.userId;
  const { postId } = req.params;
  try{
    const likeCount = await redisClient.sCard(`post:${postId}:likes`);
    console.log(likeCount)
    res.status(200).json({likeCount});
  }catch(err){
    console.error('Redis error:', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
})

export default redisRouter;
