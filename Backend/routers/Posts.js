import express from 'express'
import { validateAuth } from '../middleware/validateAuth.js'
import { Post } from '../models/Post.model.js';
import mongoose from 'mongoose';
import { User } from '../models/User.model.js';

const PostRoute = express.Router()

const SAFE_USER_DATA = '-_id username firstName lastName profileUrl bio posts';

PostRoute.post('/api/post/create', validateAuth, async (req, res) => {
    const session = await mongoose.startSession(); // Start a session for transaction
    session.startTransaction();

    try {
        const user = req.user
        const { title, content, imageUrl, status } = req.body;

        const CreatePost = new Post({
            title,
            content,
            imageUrl,
            status,
            postBy: user._id
        })



        await CreatePost.save({ session })

        await User.findByIdAndUpdate(
            user._id,

            { $push: { posts: CreatePost._id } },
            { new: true, session }
        )
        await session.commitTransaction()
        session.endSession()
        res.json({
            message: "PostCreated successfully !",

        })
    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        res.status(400).json({
            message: error.message
        })
    }
})
PostRoute.get('/api/post/myposts', validateAuth, async (req, res) => {
    try {
        const user = req.user;
        const UserPosts = await Post.find({
            postBy: user._id
        })
        if (UserPosts.length == 0) {
            throw new Error("You have't created any post yet .")
        }
        res.status(200).json({
            message: 'Your All posts',
            data: UserPosts
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})
// All posts
PostRoute.get('/api/post/posts?page=', validateAuth, async (req, res) => {
    try {
        const user = req.user;
        let AllPosts = await Post.find({
            status: 'published'
        })
        if (AllPosts.filter((status) => status.status == 'private')) {
            AllPosts = AllPosts.filter((status) => status.status == 'published')
        }
        res.status(200).json({
            message: 'All posts',
            totalNumberOfPosts: AllPosts.length,
            data: AllPosts
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})
PostRoute.get('/api/post/view/:postId', validateAuth, async (req, res) => {
    try {
        const LoggedInUser = req.user;

        const postid = req.params.postId;
        const post = await Post.findOne({
            _id: postid
        })

        if (!post) {
            return res.status(404).json({
                message: "Post not Found !! "
            })
        }

        if (post.status !== 'published') {

            console.log("Client Tried to access the private profile ")
            
            if (LoggedInUser._id !== post.postBy) {
                console.log("Client Tried to access the private profile again")
                return res.status(250).json({
                    message: 'You are tryin to find the private post that not suppose to find'
                })
            }
        }



       

        res.status(200).json({
            message: "Post found !! ",
            data: post
        })

    }
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})
// edit the post 
PostRoute.patch('/api/post/edit/:postId', validateAuth, async (req, res) => {
    try {
        const user = req.user;
        const { title, content, imageUrl, status } = req.body
        // const postId = new mongoose.Types.ObjectId(req.params.postId);
        const postId = req.params.postId;
        const post = await Post.findOne({
            postId
        })
        // if (user._id !== post._id) {
        //     return res.status(400).json({
        //         message:"Invalid Request"
        //     })
        // }
        const AllwedStatus = ['private', 'published']
        if (!status == 'private' && !status == 'published') {
            return res.status(400).json({ message: 'status formate is wrong' });
        }

        // Add the feature to that should validate whaether the fieds are thre or not . 



        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: 'Invalid postId format' });

        }

        const PostEdit = await Post.findOne({
            postBy: user._id,
            _id: postId,
        });
        if (!PostEdit) {
            return res.status(400).json({ message: 'You do not have any kind of post related to give Credential ' + postId });
        }

        await Post.findByIdAndUpdate({
            _id: PostEdit._id
        }, {
            title,
            content,
            imageUrl,
            status
        })



        if (!PostEdit) {
            return res.status(400).json({ message: 'Post Not Found ' });

        }

        res.send(PostEdit)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})
PostRoute.post('/api/post/like/:postId', validateAuth, async (req, res) => {
    try {
        const user = req.user;
        const PostId = req.params.postId;
        const post = await Post.findById(PostId)

        if (!post) {
            return res.status(500).json({
                message: "Post not found for the like !!! "
            })
        }

        if (post.likedBy?.includes(user._id)) {
            console.log("This person ", user.firstName, "Already Liked this post ")
            let updateQuery;
            updateQuery = { $pull: { likedBy: user._id } };
            const Unlike = await Post.findByIdAndUpdate(post._id, updateQuery, { new: true })
            if (!Unlike) {
                return res.status(400).json({
                    message: "Faild To unlike the post"
                })
            }
        } else {
            post.likedBy.push(user._id)
        }

        await post.save()
        res.status(201).json({
            message: "Post Liked successfully"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})
PostRoute.get('/api/post/likedby/:postId', validateAuth, async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            })
        }
        const PostLikedBy = await User.find({
            _id: post.likedBy
        }).select(SAFE_USER_DATA)

        res.status(200).json({
            message: "Found ",
            data: PostLikedBy
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})


export { PostRoute }



