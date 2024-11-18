import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({

    title:{
        type:String,
        minlength:3,
        maxlength:50,
        required:true,
    },
    content:{
        type:String,
        maxlength:10000,
        required:true,
    },
    imageUrl:{
        type:String,
        default:'https://placehold.co/600x400',
    },
    postBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    likedBy:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"User"
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }],
    status:{
        type:String,
        enum:['private','published'],
        default:'published'
    }

},{
    timestamps:true
})


const Post = mongoose.model('Post',PostSchema)

export {Post}