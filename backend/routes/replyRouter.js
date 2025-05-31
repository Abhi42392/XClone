import { addReply, deleteReply, getAllReplies, getReplyById } from "../controllers/replyController.js";
import express from "express"
import upload from '../middlewares/multer.js'
import checkAuthenticated from '../middlewares/checkAuthenticated.js'
const replyRouter=express.Router();

replyRouter.post("/add-reply",checkAuthenticated,upload.array("media",4),addReply)
replyRouter.post("/delete-reply",checkAuthenticated,deleteReply)
replyRouter.post("/get-all-replies",checkAuthenticated,getAllReplies)
replyRouter.post("/get-replybyid",checkAuthenticated,getReplyById)

export default replyRouter