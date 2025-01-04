import express from "express";
import { validateAuth } from "../middleware/validateAuth.js";
import { User } from "../models/User.model.js";
const ProfileRouter = express.Router()
import { upload } from '../middleware/Multer.js'
import { UploadOnCloudinary } from '../utils/Cloudinary.js'
import fs from 'fs'
import { Post } from "../models/Post.model.js";
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
// ProfileRouter.patch('/api/profile/update',  upload.single('imageFile'), validateAuth, async (req, res) => {
//     try {
//         const user = req.user
//         const data = req.body;
//         const ALLOWED_UPDATE = ['firstName', 'lastName', 'profileUrl', 'bio','imageFile']

//         const isAllowed = Object.keys(data).every((key) => ALLOWED_UPDATE.includes(key))

//         if (!isAllowed) {
//             throw new Error("Can't update the recieved value ");
//         }
//         const imageUrl = req.body.imageUrl;
//         const imageFile = req.file;
//         console.log(imageFile)
//         let cloudinaryResponse = null;
//         if (imageUrl && validator.isURL(imageUrl)) {
//             cloudinaryResponse = imageUrl;
//         } else if (imageFile) {
//             const localFilePath = imageFile.path;
//             cloudinaryResponse = await UploadOnCloudinary(localFilePath);
//             fs.unlinkSync(localFilePath);
//         }




//         const updatedUser = await User.findByIdAndUpdate({ _id: user._id }, {
//             firstName: data?.firstName,
//             lastName: data?.lastName,
//             imageUrl:cloudinaryResponse?.secure_url || cloudinaryResponse || null,
//             bio: data?.bio,
//         })

//         res.status(201).json({
//             message: 'Profile Updated successfully !! '
//         })
//     } catch (error) {

//         res.status(400).json({
//             message: error.message
//         })
//     }
// })

ProfileRouter.patch(
    '/api/profile/update',
    upload.single('file'),
    validateAuth,
    async (req, res) => {
        try {
            const user = req.user; 
            const data = req.body;
            const ALLOWED_UPDATE = ['firstName', 'lastName', 'profileUrl', 'bio', 'file'];

            const isAllowed = Object.keys(data).every((key) => ALLOWED_UPDATE.includes(key));
            if (!isAllowed) {
                throw new Error("Can't update the received value.");
            }

            const imageUrl = req.body.profileUrl; 
            const imageFile = req.file; 
            let cloudinaryResponse = null;

            if (imageUrl && validator.isURL(imageUrl)) {
                cloudinaryResponse = imageUrl;
            } else if (imageFile) {
                const localFilePath = imageFile.path;
                const uploadResult = await UploadOnCloudinary(localFilePath);

                if (uploadResult && uploadResult.secure_url) {
                    cloudinaryResponse = uploadResult.secure_url;
                }
                fs.unlinkSync(localFilePath); 
            }
            // Update user in the database
            const updatedUser = await User.findByIdAndUpdate(
                user._id,
                {
                    firstName: data?.firstName,
                    lastName: data?.lastName,
                    profileUrl: cloudinaryResponse || user.profileUrl, // Retain existing URL if no new one is provided
                    bio: data?.bio,
                },
                { new: true }
            );

            // Update profile URL in posts only if there is a new URL
            if (cloudinaryResponse) {
                await Post.updateMany(
                    {
                        "postBy.userId": user._id,
                    },
                    {
                        $set: {
                            "postBy.profileUrl": cloudinaryResponse, // Only update when a new profile URL exists
                        },
                    }
                );
            }

            // Response
            res.status(200).json({
                message: 'Profile updated successfully!',
                user: updatedUser, 
            });
        } catch (error) {
            console.error(error); 
            res.status(400).json({
                message: error.message,
            });
        }
    }
);

ProfileRouter.get('/api/profile/view/:usernameOrId', validateAuth, async (req, res) => {
    try {
        const usernameOrId = req.params.usernameOrId
        const FoundUser = await User.find({
            // username
            $or: [
                { _id: usernameOrId }, // MongoDB will skip invalid ObjectId values automatically
                { username: usernameOrId }
              ]
        },
        // {_id:0,password:0,emailId:0,createdAt:0,updatedAt:0}
    ).select('username firstName lastName profileUrl bio posts') 


        // {_id:0,password:0,emailId:0,createdAt:0,updatedAt:0}
        // Here its shows that what are the field we dont want . so we just write the field name and give it a value of 0 , So thats how it happens , like this = {_id:0}
        if (!FoundUser || FoundUser.length <  1) {
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
