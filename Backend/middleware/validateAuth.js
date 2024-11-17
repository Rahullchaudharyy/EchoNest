import jwt from 'jsonwebtoken'
import { User } from '../models/User.model.js'

const validateAuth = async (req,res,next)=>{
    try {
        const {token} = req.cookies

        const decodedMessage =await jwt.verify(token,process.env.JWT_SECRET_KEY)
        const user = await User.findOne({_id:decodedMessage._id})
        if (!user) {
            throw new Error("Invalid Token !! ");
            
        }
        req.user = user
        next()
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export {validateAuth}