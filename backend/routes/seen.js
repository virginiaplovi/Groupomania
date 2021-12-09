//Import express
import express from "express";
//Import Post Controller
import {
    markRead,
    getAllUserSeen,
    markUnread,
} from "../controllers/seen.js";
//Import middleware
import {
authToken
} from "../middleware/auth.js"
// Init express router
const seenRouter = express.Router();

seenRouter.post('/seen', authToken, markRead);
seenRouter.get('/seen/auth/:id', getAllUserSeen);
seenRouter.delete('/seen/:id', authToken, markUnread);


export default seenRouter;