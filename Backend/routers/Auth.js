import express from 'express'
import { User } from '../models/User.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { validateAuth } from '../middleware/validateAuth.js'
import { upload } from '../middleware/Multer.js'
import { UploadOnCloudinary } from '../utils/Cloudinary.js'
import validator from 'validator'
import fs from 'fs'

const authRouter = express.Router()

authRouter.post('/api/auth/signup', upload.single('file'), async (req, res) => {
    try {
        const { username, firstName, lastName, emailId, password } = req.body;
        const profileFile = req.file; 
        const profileUrl = req.body.profileUrl; 

        const existingUser = await User.findOne({ emailId });
        if (existingUser) {
            throw new Error("A user with this email already exists. Please try logging in or register with a different email.");
        }
        const EncryptedPassword = await bcrypt.hash(password, 10);

        let cloudinaryResponse = null;
        if (profileUrl && validator.isURL(profileUrl)) {
            cloudinaryResponse = profileUrl;
        } else if (profileFile) {
            const localFilePath = profileFile.path;
            cloudinaryResponse = await UploadOnCloudinary(localFilePath);

            fs.unlinkSync(localFilePath);
        }

        const user = new User({
            username,
            emailId,
            firstName,
            lastName,
            password: EncryptedPassword,
            profileUrl: cloudinaryResponse?.secure_url || cloudinaryResponse || null, 
        });

        await user.save();

        res.status(201).json({
            status: 'success',
            message: "User created successfully!",
        });
    } catch (error) {
        console.error("Error during user creation:", error.message);
        res.status(400).json({
            status: 'error',
            message: error.message,
        });
    }
});

authRouter.post('/api/auth/signin', async (req, res) => {
    try {

        const { emailId, password } = req.body
        const user = await User.findOne({ emailId })
        if (!user) {
            throw new Error("Invalid Credential");
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            throw new Error("Invalid Credential ! Wrong Password ");
        }

        const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY,{expiresIn:'1d'})




        res.cookie('token', token)
        res.status(201).json({
            message: `Welcome ${user.firstName} You successfully loggedIn`,
            yourProfile: user
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})
authRouter.patch('/api/auth/password',validateAuth, async (req, res) => {
    try {

        const user = req.user;
        const { Newpassword, oldPassword } = req.body
      

        const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password)

        if (!isPasswordCorrect) {
            throw new Error("Invalid Credential ! Wrong Password ");
        }

        const EncryptedPassword = await bcrypt.hash(Newpassword,10)
          await User.findByIdAndUpdate({_id:user._id},{
            password:EncryptedPassword
          })



        res.status(201).json({
            message: `Password updated successfully !`,
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})
authRouter.post('/api/auth/logout',async (req,res) => {
    try {
          res.cookie("token", null,{
        expires:new Date(Date.now())
    })
         res.status(200).json({
            message:"LogOut successfully"
         })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

export { authRouter }