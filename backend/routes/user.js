//Import express
import express from "express";
//Import Post Controller
import {
    signup,
    login
} from "../controllers/user.js";

// Init express router
const userRouter = express.Router();

userRouter.post('/auth/signup', signup);
userRouter.post('/auth/login', login);

export default userRouter;