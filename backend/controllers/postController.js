import mongoose from 'mongoose';
import {v2 as cloudinary} from 'cloudinary'
import postModel from '../models/postModel.js';
const addPost=async(req,res)=>{
    const{title}=req.body;
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

        const post=await postModel.insertOne({title,files:media,userId})
        await post.save();
        return res.json({success:true,message:"Post added"})
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

const deletePost=async(req,res)=>{
    const{postId}=req.body;
    try{
        const post=await postModel.findById(postId);
        if(post.files.length>0){
           await Promise.all( 
             post.files.map(async(file) => {
                try{
                    await deleteMedia(file)
                }catch(err){
                    console.log(err)
                    return res.json({success:false,message:err.message})  
                }
                await deleteMedia(file.media);
            }))
        }
        await postModel.findByIdAndDelete(postId);
        return res.json({success:true,message:"Post deleted"}) 
    }catch(err){
        console.log(err);
        return res.json({success:false,message:err.message||"Something went wrong"})
    }
}

const getAllPosts=async(req,res)=>{
    const userId = req.user?._id || req.userId;
    try{
        const objectId = new mongoose.Types.ObjectId(userId);
        const posts=(await postModel.find({userId:{$ne:objectId}}).populate('userId')).reverse();
        return res.json({success:true,message:posts})
    }catch(err){
        console.log(err);
        return res.json({success:false,message:err.message||"Something went wrong"})
    }
}

const getPostById=async(req,res)=>{
    const{postId}=req.body;
    try{
        const post=await postModel.findById(postId).populate("userId");
        return res.json({success:true,message:post})
    }catch(err){
        console.log(err);
        return res.json({success:false,message:err.message||"Something went wrong"})
    }
}



export {addPost,deletePost,getAllPosts,getPostById}