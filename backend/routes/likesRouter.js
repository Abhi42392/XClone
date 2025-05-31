import express from 'express'
import checkAuthenticated from '../middlewares/checkAuthenticated.js'
import { getAllLikedPostsOfUser, isLiked } from '../controllers/likesController.js';
const likesRouter=express.Router();

likesRouter.post("/get-liked-posts-of-user",checkAuthenticated,getAllLikedPostsOfUser)
likesRouter.post("/check-is-liked",checkAuthenticated,isLiked)

export default likesRouter