//Import express
import express from "express";
//Import Post Controller
import {
    markRead,
    markUnread,
} from "../controllers/seen.js";
//Import middleware
import {
authToken
} from "../middleware/auth.js"
// Init express router
const seenRouter = express.Router();

seenRouter.post('/like', authToken, markRead);
seenRouter.delete('/like/:id', authToken, markUnread);


export default seenRouter;