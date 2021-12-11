//Import Model
import Seen from "../models/seen.js"
import User from "../models/user.js";

// Mark as read
export const markRead = async (req, res) => {
    try {
        await Seen.create(req.body);
        res.json({
            "message": "Marked as read!"
        });
    } catch (err) {
        console.log(err);
    }
}

//Get all User posts read

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