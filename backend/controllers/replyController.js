import mongoose from 'mongoose';
import {v2 as cloudinary} from 'cloudinary'
import replyModel from '../models/replyModel.js';
import postModel from '../models/postModel.js';

const addReply=async(req,res)=>{
    const{title,postId}=req.body;
    const userId = req.user?._id || req.userId;

    try{
        const files=req.files;
        if(!title){
            return res.json({success:false,message:"Data is not enough"})
        }
        const media = await Promise.all(
            files.map(async (element) => {
            const mediatype = element.mimetype.split("/")[0];
            const uploadFile = await cloudinary.uploader.upload(element.path, {
                resource_type: mediatype,
            });
            return { media: uploadFile.secure_url, mediaType: mediatype };
            })
        );
        const post =await postModel.findById(postId)
        if(post){
            await postModel.findByIdAndUpdate(postId,{$inc:{commentscount:1}},{new:true})
        }else{
            await replyModel.findByIdAndUpdate(postId,{$inc:{commentscount:1}},{new:true})
        }
        const reply=await replyModel.insertOne({title,postId,files:media,userId})
        await reply.save();
        return res.json({success:true,message:"Reply added"})
    }catch(err){
        console.log(err)
        return res.json({success:false,message:err.message||"Something went wrong"})
    }
}

const deleteMedia=async(url)=>{
    if(url===""){
        return;
    }
    const publicId=getPublicIdFromUrl(url)
    await cloudinary.uploader.destroy(publicId);
}

function getPublicIdFromUrl(url) {
    const parts = url.split('/');
    const publicIdWithVersion = parts.slice(parts.indexOf('upload') + 1).join('/'); // e.g., "v1234567890/abcxyz.jpg"
    const versionRemoved = publicIdWithVersion.replace(/^v\d+\//, ''); // removes "v1234567890/"
    const publicId = versionRemoved.replace(/\.[^/.]+$/, ""); // removes file extension
    return publicId;
}

const deleteReply=async(req,res)=>{
    const{replyId}=req.body;
    try{
        const reply=await replyModel.findById(replyId);
        if(reply.files.length>0){
           await Promise.all( 
             reply.files.map(async(file) => {
                try{
                    await deleteMedia(file)
                }catch(err){
                    console.log(err)
                    return res.json({success:false,message:err.message})  
                }
                await deleteMedia(file.media);
            }))
        }
        await postModel.findByIdAndUpdate(postId,{$dec:{commentscount:1}},{new:true})
        await replyModel.findByIdAndDelete(replyId);
        return res.json({success:true,message:"Reply deleted"}) 
    }catch(err){
        console.log(err);
        return res.json({success:false,message:err.message||"Something went wrong"})
    }
}

const getAllReplies=async(req,res)=>{
    const userId = req.user?._id || req.userId;
    const{postId}=req.body;
    try{
        const replies=await replyModel.find({postId:postId}).populate('userId');
        return res.json({success:true,message:replies})
    }catch(err){
        console.log(err);
        return res.json({success:false,message:err.message||"Something went wrong"})
    }
}

const getReplyById=async(req,res)=>{
    const{replyId}=req.body;
    try{
        const reply=await replyModel.findById(replyId).populate("userId");
        return res.json({success:true,message:reply})
    }catch(err){
        console.log(err);
        return res.json({success:false,message:err.message||"Something went wrong"})
    }
}

export {addReply,deleteReply,getAllReplies,getReplyById}