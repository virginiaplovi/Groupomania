//Import express
import express from "express";
//Import Post Controller
import {
    signup,
    login,
    getAllUsers,
    getOneUser,
    deleteUser,
    // getAllUsersPost     TEST
} from "../controllers/user.js";

// import {authToken} from "../middleware/auth.js"

// Init express router
const userRouter = express.Router();

userRouter.post('/auth/signup', signup);
userRouter.post('/auth/login', login);
userRouter.get('/auth', getAllUsers);
userRouter.get('/auth/:id', getOneUser);
userRouter.delete('/auth/:id', deleteUser);
// userRouter.get('/auth/post', getAllUsersPost);   TEST

export default userRouter;