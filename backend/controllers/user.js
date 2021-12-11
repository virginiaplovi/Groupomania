//Import .env
import dotenv from 'dotenv'
dotenv.config()

// Import bcrypt 
import bcrypt from 'bcrypt';

// Import jsonwebtoken
import jwt from 'jsonwebtoken';


// Import Models
import User from "../models/user.js"


// Create a new user
export const signup = (req, res, next) => {
    User.findOne({
        where: {
            Email: req.body.Email
        },
    }).then((user) => {
        if (user) {
            return res.status(400).json({ error: "This email is already being used" });
        } else {
            bcrypt.hash(req.body.Password, 10).then(  //salt and hash password
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
        }
    }).catch(
        (error) => {
            res.status(500).json({
                error: error
            });
        }
    );

};
// User Login
export const login = (req, res, next) => {
    User.findOne({
        where: {
            Email: req.body.Email
        }
    }).then(
        (user) => {
            //if the email is not in the database
            if (!user) {
                return res.status(404).json({
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
                        process.env.USER_TOKEN,
                        { expiresIn: '24h' });
                    res.status(200).json({
                        UserID: user.UserID,
                        FirstName: user.FirstName,
                        LastName: user.LastName,
                        Email: user.Email,
                        CreatedAt: user.CreatedAt,
                        token: token
                    });
                }
            ).catch(
                () => {
                    res.status(403).json({
                        error: "coudn't encrypt"
                    });
                }
            );
        }
    ).catch(
        (error) => {
            res.status(501).json({
                error: error
            });
        }
    );
}


export const getAllUsers = async (req, res, next) => {
    try {
        const user = await User.findAll();
        res.send(user);
    } catch (err) {
        console.log(err);
    }
}

export const getOneUser = (req, res, next) => {
        User.findAll({
            where: {
                UserID: req.params.id
            }
        }).then((user) => {
            if (!user) {
                return res.status(404).json({
                    error: new Error('User not found!')
                });
            }
            res.send(user[0]);
        }).catch(
            (error) => {
                res.status(404).json({
                    error: error
                });
            }
        );
}

export const deleteUser = async (req, res) => {
    try {
        await User.destroy({
            where: {
                UserID: req.params.id
            }
        });
        res.json({
            "message": "Account Deleted"
        });
    } catch (err) {
        console.log(err);
    }
}

