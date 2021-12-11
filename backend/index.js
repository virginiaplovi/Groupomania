//Import express
import express from "express";
//Import cors
import cors from "cors";

import path from 'path';
const __dirname = path.resolve();
// Import connection MySQL
import db from "./config/database.js";
//Import router
import postRouter from './routes/post.js';
import userRouter from "./routes/user.js";
import seenRouter from "./routes/seen.js";


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

app.use('/images', express.static(path.join(__dirname, 'images')));
//use router
app.use(postRouter);
app.use(userRouter);
app.use(seenRouter);

//listen on port
app.listen(5000, () => console.log('Server running at http://localhost:5000'));