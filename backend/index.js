//Import express
import express from "express";
//Import cors
import cors from "cors";
// Import connection MySQL
import db from "./config/database.js";
//Import router
import postRouter from './routes/post.js';
import userRouter from "./routes/user.js";
import likeRouter from "./routes/like.js";
//...to add userRoutes...

//Init express
const app = express();
//use express json
app.use(express.json());
// use cors
app.use(cors());

// TESTING DATABASE CONNECTION
try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database', error);
}

//use router
app.use(postRouter);
app.use(userRouter);
app.use(likeRouter);

//..to add userRoutes...

//listen on port
app.listen(5000, () => console.log('Server running at http://localhost:5000'));