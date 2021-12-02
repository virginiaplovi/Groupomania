//Import Post Model
import Post from "../models/post.js"
import User from "../models/user.js";

//Get all posts
export const getAllPost = async (req, res) => {
    try {
        const post = await Post.findAll({
            include: [User],
            order: [
                ['CreatedAt', 'DESC']]
        });
        res.send(post);
    } catch (err) {
        console.log(err);
    }
}

//Get post by id
export const getPostById = async (req, res) => {
    try {
        const post = await Post.findAll({
            where: {
                PostID: req.params.id
            }
        });
        res.send(post[0]);
    } catch (err) {
        console.log(err)
    }
}

//Create a new post
export const createPost = async (req, res) => {
    try {
        await Post.create(req.body);
        res.json({
            "message": "Post Created"
        });
    } catch (err) {
        console.log(err);
    }
}

//Update post by id
export const updatePost = async (req, res) => {
    try {
        await Post.update(req.body, {
            where: {
                PostID: req.params.id
            }
        });
        res.json({
            "message": "Post Updated"
        });
    } catch (err) {
        console.log(err);
    }
}

//Delete post by id
export const deletePost = async (req, res) => {
    try {
        await Post.destroy({
            where: {
                PostID: req.params.id
            }
        });
        res.json({
            "message": "Post Deleted"
        });
    } catch (err) {
        console.log(err);
    }
}