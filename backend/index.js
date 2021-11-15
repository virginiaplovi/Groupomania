//Import express
import express from "express";
//Import cors
import cors from "cors";
// Import connection MySQL
import db from "./config/database.js";
//Import router
import Router from './routes/post.js';
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
app.use(Router);
//..to add userRoutes...

//listen on port
app.listen(5000, () => console.log('Server running at http://localhost:5000'));