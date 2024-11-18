import  {v2 as cloudinary} from 'cloudinary'
import dotenv from 'dotenv'

import fs from 'fs'
dotenv.config()
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})

const UploadOnCloudinary = async(localFilepath)=>{
    try {
        if (!localFilepath) {
            return null;
        }

        const response = await cloudinary.uploader.upload(localFilepath,{
            resource_type:'auto'
        })

        console.log("File Uploaded successfully on cloudinary",response.secure_url)

        return response
    } catch (error) {
        fs.unlinkSync(localFilepath)
      throw new Error(error.message);
      
    }
} 


export {UploadOnCloudinary}