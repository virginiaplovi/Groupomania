//Import Seen Model
import Seen from "../models/seen.js"

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