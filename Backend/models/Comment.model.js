import mongoose, { mongo } from "mongoose";

const CommentSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true,
        maxlength:1000,
    },
    commentedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post',
        required:true
    },
    parentComment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment",
        default:null
    },
    reply:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment",
    }]

},

{
timestamps:true
}
)



const Comment = mongoose.model("Comment",CommentSchema)
export {Comment}



