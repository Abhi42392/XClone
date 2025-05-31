import express from 'express'
import {login, register,editUserInfo,getUserInfo,getAllPostsOfUser, getAllRepliesOfUser} from '../controllers/userController.js';
import checkAuthenticated from '../middlewares/checkAuthenticated.js'
import upload from '../middlewares/multer.js'
import { getAllLikedPostsOfUser } from '../controllers/likesController.js';
const userRouter=express.Router();

userRouter.post("/login",login)
userRouter.post("/register",register)
userRouter.post("/edit-user-info",checkAuthenticated,upload.fields([{name:"avatar",maxCount:1},{name:"background",maxCount:1}]),editUserInfo)
userRouter.post("/get-user-info",checkAuthenticated,getUserInfo)
userRouter.post("/get-all-posts-of-user",checkAuthenticated,getAllPostsOfUser)
userRouter.post("/get-all-replies-of-user",checkAuthenticated,getAllRepliesOfUser)


export default userRouter