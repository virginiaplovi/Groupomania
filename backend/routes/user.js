//Import express
import express from "express";
//Import Post Controller
import {
    signup,
    login,
    getAllUsers,
    // getAllUsersPost     TEST
} from "../controllers/user.js";

// Init express router
const userRouter = express.Router();

userRouter.post('/auth/signup', signup);
userRouter.post('/auth/login', login);
userRouter.get('/auth', getAllUsers);
// userRouter.get('/auth/post', getAllUsersPost);   TEST

export default userRouter;