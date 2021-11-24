//Import express
import express from "express";
//Import Post Controller
import {
    sendLike,
    removeLike,
} from "../controllers/like.js";
//Import middleware
import {
authToken
} from "../middleware/auth.js"
// Init express router
const likeRouter = express.Router();

likeRouter.post('/like', authToken, sendLike);
likeRouter.delete('/like/:id', authToken, removeLike);


export default likeRouter;