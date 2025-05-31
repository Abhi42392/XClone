import mongoose from "mongoose";

const replySchema=mongoose.Schema({
    postId:{type:mongoose.Schema.Types.ObjectId,ref:'post',required:true},
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

const replyModel=mongoose.models.reply||mongoose.model("reply",replySchema)
export default replyModel