//Import express
import express from "express";
//Import Post Controller
import {
    markRead,
    getAllUserSeen,
} from "../controllers/seen.js";
//Import middleware
import {
authToken
} from "../middleware/auth.js"
// Init express router
const seenRouter = express.Router();

// Route mark as read
seenRouter.post('/seen', authToken, markRead);
// Route get all post seen by one User
seenRouter.get('/seen/auth/:id', authToken, getAllUserSeen);


export default seenRouter;