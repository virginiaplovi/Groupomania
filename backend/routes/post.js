//Import express
import express from "express";
//Import Post Controller
import {
    getAllPost,
    getPostById,
    createPost,
    updatePost,
    deletePost
} from "../controllers/post.js";
//Import authorization middleware
import {authToken} from "../middleware/auth.js"

// Init express router
const postRouter = express.Router();

// Route get all post
postRouter.get('/post', authToken, getAllPost);
// Route get post by id
postRouter.get('/post/:id', authToken, getPostById);
// Route create a new post
postRouter.post('/post', authToken, createPost);
// Route update post by id
postRouter.put('/post/:id', authToken, updatePost);
// Route delete post by id
postRouter.delete('/post/:id', authToken, deletePost);

//export router
export default postRouter;