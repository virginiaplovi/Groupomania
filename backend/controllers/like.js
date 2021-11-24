//Import Like Model
import Like from "../models/like.js"

// Add a new like
export const sendLike = async (req, res) => {
    try {
        await Like.create(req.body);
        res.json({
            "message": "Like added!"
        });
    } catch (err) {
        console.log(err);
    }
}

//Remove Like
export const removeLike = async (req, res) => {
    try {
        await Like.destroy({
            where: {
                LikeID: req.params.id
            }
        });
        res.json({
            "message": "Like Deleted!"
        });
    } catch (err) {
        console.log(err);
    }
}