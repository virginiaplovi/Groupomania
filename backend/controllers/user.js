// Import bcrypt 
import bcrypt from 'bcrypt';

// Import jsonwebtoken
import jwt from 'jsonwebtoken';

// Import User model
import User from "../models/user.js"

// Sign up

export const signup = (req, res, next) => {
    bcrypt.hash(req.body.Password, 10).then(
        (hash) => {
            const user = new User({
                Email: req.body.Email,
                Password: hash,
                FirstName: req.body.FirstName,
                LastName: req.body.LastName
            });
            user.save(req.body).then(
                () => {
                    res.status(201).json({
                        message: 'New user added successfully!'
                    });
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error: error
                    });
                }
            );
        }
    ).catch(
        (error) => {
            res.status(500).json({
                error: error
            });
        }
    );
};

export const login = (req, res, next) => {
    User.findOne({
        where: {
            Email: req.body.Email
        }
    }).then(
        (user) => {
            //if the email is not in the database
            if (!user) {
                return res.status(401).json({
                    error: new Error('User not found!')
                });
            }
            //compare hashed password
            bcrypt.compare(req.body.Password, user.Password).then(
                (valid) => {
                    if (!valid) {
                        return res.status(401).json({
                            error: new Error('Incorrect password!')
                        });
                    }
                    //create token
                    const token = jwt.sign(
                        { UserID: user.UserID },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' });
                    res.status(200).json({
                        UserID: user.UserID,
                        token: token
                    });
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error: error
                    });
                }
            );
        }
    ).catch(
        (error) => {
            res.status(500).json({
                error: error
            });
        }
    );
}