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
//Import middleware
import {authToken} from "../middleware/auth.js"
import multer from "../middleware/multer-config.js"

// Init express router
const postRouter = express.Router();

// Route get all post
postRouter.get('/post', getAllPost);
// Route get post by id
postRouter.get('/post/:id', getPostById);
// Route create a new post
postRouter.post('/post', multer, createPost);
// Route update post by id
postRouter.put('/post/:id', multer, updatePost);
// Route delete post by id
postRouter.delete('/post/:id', deletePost);

//export router
export default postRouter;