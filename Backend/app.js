import express from 'express';
import { conectDB } from './config/db.js';
import { authRouter } from './routers/Auth.js';
import cookieParser from 'cookie-parser';
import { ProfileRouter } from './routers/Profile.js';
import { PostRoute } from './routers/Posts.js';
import cors from 'cors'



const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:10000", "https://echonest-01.onrender.com"],
    credentials: true,
}));


// ["https://echonest-01.onrender.com","http://192.168.0.105:10000"]
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

conectDB().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`🚀 Server is up and running at http://localhost:${process.env.PORT}`);
    })
})
app.use('/',authRouter)
app.use('/',ProfileRouter)
app.use('/',PostRoute)


