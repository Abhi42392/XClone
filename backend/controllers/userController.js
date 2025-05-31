import validator from 'validator'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import mongoose from 'mongoose'
import replyModel from '../models/replyModel.js'
import postModel from '../models/postModel.js'

const register=async(req,res)=>{
    const{password,email,name,dob,username}=req.body;
    try{
        if(!name||!password||!email||!dob||!username){
            return res.json({success:false,message:"Credentials missing"})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Enter valid email"})
        }
        if(password.length<8){
            return res.json({success:false,message:"Password is too small"})
        }
        const user=await userModel.findOne({
           $or:[{email},{username}]
        });
        if(user){
            return res.json({success:false,message:"Account already exist, try changing Email or Username"})
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser=await userModel({name,email,password:hashedPassword,dob,username});
        await newUser.save();
        const token=createToken(newUser._id);
        return res.json({success:true,token})
    }catch(err){
        console.log(err)
        return res.json({success:false,message:err})
    }
}

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
}

const login=async(req,res)=>{
    const{userNameOrEmail,password}=req.body;
   try{
    if(!userNameOrEmail||!password){
        return res.json({success:false,message:"Not enough credentials"})
    }
    const user=await userModel.findOne({$or:[{username:userNameOrEmail},{email:userNameOrEmail}]});
    if(!user){
        return res.json({success:false,message:"Account doesn't exist, try register"})
    }
    const compare=await bcrypt.compare(password,user.password);
    if(!compare){
        return res.json({success:false,message:"Incorrect Password"})
    }
    const token=createToken(user._id);
    return res.json({success:true,token})
   }catch(err){
        console.log(err)
      return res.json({success:false,message:err.message})
   }
}
const getUserInfo=async(req,res)=>{
    try{
        const{userId}=req.body;
        const userData=await userModel.findById(userId).select("-password");
        if(!userData){
            return res.json({success:false,message:"No User found"})
        }
        return res.json({success:true,message:userData})
    }catch(err){
      return res.json({success:false,message:err.message})
    }
}

const deleteMedia=async(url)=>{
    if(url===""||url.includes("googleusercontent")){
        return;
    }
    const publicId=getPublicIdFromUrl(url)
    await cloudinary.uploader.destroy(publicId);
}
function getPublicIdFromUrl(url) {
    const parts = url.split('/');
    const fileName = parts[parts.length - 1]; // e.g., "abcxyz.jpg"
    const publicIdWithVersion = parts.slice(parts.indexOf('upload') + 1).join('/'); // e.g., "v1234567890/abcxyz.jpg"
    const versionRemoved = publicIdWithVersion.replace(/^v\d+\//, ''); // removes "v1234567890/"
    const publicId = versionRemoved.replace(/\.[^/.]+$/, ""); // removes file extension
    return publicId;
}
const editUserInfo=async(req,res)=>{
    const{name,bio,location,website}=req.body;
    const userId = req.user?._id || req.userId;
    console.log(userId)
    try{
       
        const background=req.files['background']?.[0];
        const avatar=req.files['avatar']?.[0];
        let backgroundUrl;
        let avatarUrl;
        const user=await userModel.findById(userId)
        console.log(user)
        if(background){
            try{
             await deleteMedia(user.background)
            }catch(err){
                console.log(err);
                throw new Error(err.message)
            }
            const backgroundUpload=await cloudinary.uploader.upload(background.path,{resource_type:"image"});
            backgroundUrl=backgroundUpload.secure_url;
        }else{
            backgroundUrl=user.background;
        }
        if(avatar){
            try{
                await deleteMedia(user.avatar)
               }catch(err){
                   console.log(err);
                   throw new Error(err.message)
               }
            const avatarUpload=await cloudinary.uploader.upload(avatar.path,{resource_type:"image"});
            avatarUrl=avatarUpload.secure_url;
        }else{
            avatarUrl=user.avatar;
        }
        const updatedUser=await userModel.findByIdAndUpdate(userId,{name,bio,location,website,avatar:avatarUrl,background:backgroundUrl})
        return res.json({success:true,message:updatedUser})
    }catch(err){
        console.log(err)
        return res.json({success:false,message:err.message||"Something went wrong"})
    }
}
const getAllPostsOfUser=async(req,res)=>{
    const userId = req.user?._id || req.userId;
    try{
        const objectId = new mongoose.Types.ObjectId(userId);
        const posts=(await postModel.find({userId:objectId}).populate('userId')).reverse();
        return res.json({success:true,message:posts})
    }catch(err){
        console.log(err);
        return res.json({success:false,message:err.message||"Something went wrong"})
    }
}

const getAllRepliesOfUser=async(req,res)=>{
    const userId = req.user?._id || req.userId;
    try{
        const objectId = new mongoose.Types.ObjectId(userId);
        const replies=(await replyModel.find({userId:objectId}).populate('userId')).reverse();
    
        return res.json({success:true,message:replies})
    }catch(err){
        console.log(err);
        return res.json({success:false,message:err.message||"Something swent wrong"})
    }
}



export {login,register,getUserInfo,editUserInfo,getAllPostsOfUser,getAllRepliesOfUser}