import mongoose from "mongoose";
import validator from "validator";
import { Filter } from "bad-words";
import bcrypt from 'bcrypt'
const filter = new Filter()


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
    },
    lastName:{
        type:String,
    },
    emailId: {
        type: String,
        unique: true,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email ID ");
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    profileUrl: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    },
    bio: {
        type: String,
        max: 70,
        default: "Hey there! I'm using EchoNest to share my thoughts and ideas. Stay tuned for updates!",
        

    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
    
},{
    timestamps:true
})



const User = mongoose.model('User', UserSchema)
export { User }
