import mongoose from 'mongoose'
const userSchema=mongoose.Schema({
    googleId:{type:String,unique:true,sparse: true },
    appleId:{type:String,unique:true,sparse: true },
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    dob:{type:String,default:""},
    bio:{type:String,default:""},
    dateofjoin:{type:Date,default:Date.now},
    username:{type:String,required:true},
    avatar:{type:String,default:""},
    background:{type:String,default:""},
    website:{type:String,default:""},
    location:{type:String,default:""},
    premium:{type:Boolean,default:false}
})

const userModel=mongoose.models.user||mongoose.model("user",userSchema);

export default userModel;