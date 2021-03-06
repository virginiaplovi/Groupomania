//Import .env
import dotenv from 'dotenv'
dotenv.config()

import jwt from 'jsonwebtoken';

export const authToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; //extract the token from the incoming request's Authorization header
    const decodedToken = jwt.verify(token, process.env.USER_TOKEN); //verify function to decode the token
    const UserID = decodedToken.UserID; //extract the user ID
    //if the request userID is not the same to the one extracted from token throw an error
    if (req.body.UserID && req.body.UserID !== UserID) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};
