import { addPost, deletePost, getAllPosts, getPostById } from "../controllers/postController.js";
import express from "express"
import upload from '../middlewares/multer.js'
import checkAuthenticated from '../middlewares/checkAuthenticated.js'
const postRouter=express.Router();

postRouter.post("/add-post",checkAuthenticated,upload.array("media",4),addPost)
postRouter.post("/delete-post",checkAuthenticated,deletePost)
postRouter.post("/get-all-posts",checkAuthenticated,getAllPosts)
postRouter.post("/get-postbyid",checkAuthenticated,getPostById)



export default postRouter