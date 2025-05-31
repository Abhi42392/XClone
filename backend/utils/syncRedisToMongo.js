import redisClient from '../config/redisConfig.js';
import postModel from '../models/postModel.js';
import likesModel from '../models/likesModel.js';

export const syncLikesToMongo = async () => {
  try {
    const keys = await redisClient.keys('post:*:*:likes');
    
    for (const key of keys) {
      const [_, postId, userId] = key.split(':');
      try {
        const redisLikes = await redisClient.get(key);
        console.log(`Likes for ${key}:`, redisLikes);

        await postModel.findByIdAndUpdate(postId, {
          $inc: { likescount: parseInt(redisLikes) }
        });

        await likesModel.create({ userId, postId });

      } catch (err) {
        console.error(`Failed syncing key ${key}:`, err);
      } finally {
        await redisClient.del(key);
      }
    }

    console.log('Likes sync complete');
  } catch (err) {
    console.error('Likes sync job failed:', err);
  }
};

export const syncDisLikesToMongo = async () => {
  try {
    const keys = await redisClient.keys('post:*:*:dislikes');
    
    for (const key of keys) {
      const [_, postId, userId] = key.split(':');
      try {
        const redisDisLikes = await redisClient.get(key);
        console.log(`Dislikes for ${key}:`, redisDisLikes);

        await postModel.findByIdAndUpdate(postId, {
          $inc: { likescount: parseInt(redisDisLikes) }
        });

        await likesModel.findOneAndDelete({ userId, postId });

      } catch (err) {
        console.error(`Failed syncing key ${key}:`, err);
      } finally {
        await redisClient.del(key);
      }
    }

    console.log('Dislikes sync complete');
  } catch (err) {
    console.error('Dislikes sync job failed:', err);
  }
};
