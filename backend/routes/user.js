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

import {authToken} from "../middleware/auth.js"

// Init express router
const userRouter = express.Router();

// Route to create a new user
userRouter.post('/auth/signup', signup);
// Route login
userRouter.post('/auth/login', login);
// Route to get all user
userRouter.get('/auth', authToken, getAllUsers);
// Route to get one user
userRouter.get('/auth/:id', authToken, getOneUser);
// Route to delete a user
userRouter.delete('/auth/:id', authToken, deleteUser);


export default userRouter;