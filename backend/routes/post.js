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

// Init express router
const router = express.Router();

// Route get all post
router.get('/post', getAllPost);
// Route get post by id
router.get('/post/:id', getPostById);
// Route create a new post
router.post('/post', createPost);
// Route update post by id
router.put('/post/:id', updatePost);
// Route delete post by id
router.delete('/post/:id', deletePost);

//export router
export default router;