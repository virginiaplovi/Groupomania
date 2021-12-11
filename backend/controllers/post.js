//Import Models
import Post from "../models/post.js";
import User from "../models/user.js";
import fs from 'fs'

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
            },
            include: [User]
        });
        res.send(post[0]);
    } catch (err) {
        console.log(err)
    }
}

//Create a new post
export const createPost = async (req, res) => {
    try {
        let image = null;
        if (req.file) {
            image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        }
        await Post.create({
            PostID: req.body.PostID,
            UserID: req.body.UserID,
            Message: req.body.Message,
            ImageUrl: image,
            CreatedAt: req.body.CreatedAt
        });
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
        let image = req.body.ImageUrl;
        let Message = req.body.Message;
        if (req.file) {
            image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
            Message = req.body.Message;
        }
        await Post.update({
            Message: req.body.Message,
            ImageUrl: image,
        }, { where: { PostID: req.params.id } }
        );
        res.json({ "message": "Post updated successfully!" })
    } catch (err) {
        console.log(err);
    }
}

//Delete post by id
export const deletePost = (req, res) => {
    const post = Post.findOne({
        where: {
            PostID: req.params.id
        }
    }).then((post) => {
        if (req.file) {
            const filename = post.ImageUrl.split('/images/')[1];
            fs.unlink('images/' + filename, () => {
                Post.destroy({
                    where: {
                        PostID: req.params.id
                    }
                }).then(
                    () => {
                        res.json({
                            "message": "Post Deleted"
                        });
                    }
                ).catch((err) => {
                    console.log(err);
                })
            })
        } else {
            Post.destroy({
                where: {
                    PostID: req.params.id
                }
            }).then(
                () => {
                    res.json({
                        "message": "Post Deleted"
                    });
                }
            ).catch((err) => {
                console.log(err);
            })
        }

    }).catch((err) => {
        console.log(err)
    })


}