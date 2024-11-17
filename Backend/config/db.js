import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv()

const conectDB = async ()=>{
    await mongoose.connect(process.env.DB_URL)
    console.log('Database connected successfully 🍃🌿');
}

export {conectDB}