import likesModel from '../models/likesModel.js'
const getAllLikedPostsOfUser=async(req,res)=>{
    const userId = req.user?._id || req.userId;
    try{
        const userLikedPosts=(await likesModel.find({userId}).populate({
            path: 'postId',
            populate: {
              path: 'userId',  // this is the user who created the post
              model: 'user'
            }
          })).reverse();
        return res.json({success:true,message:userLikedPosts})
    }catch(err){
        console.log(err);
        return res.json({success:false,message:err.message||"Something swent wrong"})
    }
}


const isLiked=async(req,res)=>{
    const{postId}=req.body;
    const userId = req.user?._id || req.userId;
    try{
       const result=await likesModel.findOne({userId,postId})
       if(result){
        return res.json({success:true,message:true})
       }else{
        return res.json({success:true,message:false})

       }
       
    }catch(err){
        console.log(err);
        return res.json({success:false,message:err.message||"Something swent wrong"})
    }
}
export {getAllLikedPostsOfUser,isLiked}