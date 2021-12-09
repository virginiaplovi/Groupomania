//Import Seen Model
import Seen from "../models/seen.js"
import User from "../models/user.js";

// Mark as read
export const markRead = async (req, res) => {
    try {
        // const seen = Seen.findOne({
        //     where: {
        //         UserID: req.body.UserID,
        //         PostID: req.body.PostID
        //     }
        // });
        // if (seen) {
        //     return res.status(400).json({ error: "You have already mark this post as read" });
        // }
        await Seen.create(req.body);
        res.json({
            "message": "Marked as read!"
        });
    } catch (err) {
        console.log(err);
    }
}

//Check if read

export const getAllUserSeen = async (req, res, next) => {
    try {
        const user = await User.findAll({
            where: {UserID: req.params.id},
            include: [Seen]
        });
        res.send(user[0]);
    } catch (err) {
        console.log(err);
    }
}

//Mark as unread
export const markUnread = async (req, res) => {
    try {
        await Seen.destroy({
            where: {
                SeenID: req.params.id
            }
        });
        res.json({
            "message": "Marked as unread!"
        });
    } catch (err) {
        console.log(err);
    }
}