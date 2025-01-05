import jwt from 'jsonwebtoken'
import { User } from '../models/User.model.js'

import { config, configDotenv } from 'dotenv';
configDotenv()

const validateAuth = async (req,res,next)=>{
    try {
        const cookeis = req.cookies;
        const {token} = cookeis;
        if (!token) {
            throw new Error("Invalid Token !! ");
        }
        const decodedMessage = jwt.verify(token,process.env.JWT_SECRET_KEY)
        const user = await User.findOne({_id:decodedMessage._id})
        
        if(!user){
            throw new Error("User Not Found");
            
        }
        req.user = user
        next()
    } catch (error) {
        res.status(401).send("Error : " + error.message)

    }
}

export {validateAuth}