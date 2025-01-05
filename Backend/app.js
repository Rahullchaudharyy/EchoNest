import express from 'express';
import { conectDB } from './config/db.js';
import { authRouter } from './routers/Auth.js';
import cookieParser from 'cookie-parser';
import { ProfileRouter } from './routers/Profile.js';
import { PostRoute } from './routers/Posts.js';
import cors from 'cors'

const allowedOrigins = [
    'https://echo-nest-o5b34pori-rahullchaudharyys-projects.vercel.app',
    'http://localhost:3000' // Local origin for testing
];

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));
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


