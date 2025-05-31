import mongoose from "mongoose";

const postSchema=mongoose.Schema({
    
    files:{type:Array,default:[]},
    title:{type:String,required:true},
    viewscount:{type:Number,default:0},
    likescount:{type:Number,default:0},
    commentscount:{type:Number,default:0},
    repostcount:{type:Number,default:0},
    dateposted:{type:Date,default:Date.now},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true},
    repost: { type: mongoose.Schema.Types.ObjectId, ref: 'post', default: null },
   
})

const postModel=mongoose.models.post||mongoose.model("post",postSchema)
export default postModel