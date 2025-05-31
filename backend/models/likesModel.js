import mongoose from "mongoose";

const likeSchema=mongoose.Schema({
    dateliked:{type:Date,default:Date.now},
    userId:{type:String,required:true},
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'post', default: null},
})

const likesModel=mongoose.models.like||mongoose.model("like",likeSchema)
export default likesModel