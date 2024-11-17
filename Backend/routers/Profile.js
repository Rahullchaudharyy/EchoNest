import express from "express";
import { validateAuth } from "../middleware/validateAuth.js";
import { User } from "../models/User.model.js";
const ProfileRouter = express.Router()

const SAFE_USER_DATA = 'username firstName lastName profileUrl bio posts';

ProfileRouter.get('/api/profile/view', validateAuth, (req, res) => {
    try {
        const user = req.user;
        res.send(user)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})
ProfileRouter.patch('/api/profile/update', validateAuth, async (req, res) => {
    try {
        const user = req.user
        const data = req.body;
        const ALLOWED_UPDATE = ['firstName', 'lastName', 'profileUrl', 'bio']

        const isAllowed = Object.keys(data).every((key) => ALLOWED_UPDATE.includes(key))

        if (!isAllowed) {
            throw new Error("Can't update the recieved value ");
        }


        const updatedUser = await User.findByIdAndUpdate({ _id: user._id }, {
            firstName: data?.firstName,
            lastName: data?.lastName,
            profileUrl: data?.profileUrl,
            bio: data?.bio,
        })

        res.status(201).json({
            message: 'Profile Updated successfully !! '
        })
    } catch (error) {

        res.status(400).json({
            message: error.message
        })
    }
})
ProfileRouter.get('/api/profile/view/:username', validateAuth, async (req, res) => {
    try {
        const username = req.params.username
        const FoundUser = await User.find({
            username
        },
        // {_id:0,password:0,emailId:0,createdAt:0,updatedAt:0}
    ).select('username firstName lastName profileUrl bio posts') 
        // {_id:0,password:0,emailId:0,createdAt:0,updatedAt:0}
        // Here its shows that what are the field we dont want . so we just write the field name and give it a value of 0 , So thats how it happens , like this = {_id:0}
        if (!FoundUser) {
            throw new Error("User Not Found !!");
        }
        res.status(200).json({
            message:"User Found",
            data:FoundUser
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})
export { ProfileRouter }
// res.status(400).json({
//     message: error.message
// })

