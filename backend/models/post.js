// import sequelize
import { Sequelize } from "sequelize";
//import connection
import db from "../config/database.js";

// init DataTypes
const { DataTypes } = Sequelize;

// Define schema

const Post = db.define('post', {
    // Define attributes
    PostID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Message: {
        type: DataTypes.STRING
    },
    ImageUrl: {
        type: DataTypes.STRING
    },
    Likes: {
        type: DataTypes.INTEGER
    },
    Dislikes: {
        type: DataTypes.INTEGER
    },
    UsersLiked: {
        type: DataTypes.INTEGER
    },
    UsersDisliked: {
        type: DataTypes.INTEGER
    },
    ReadPost: {
        type: DataTypes.INTEGER
    },
    ReadBy: {
        type: DataTypes.INTEGER
    }
}, {
    freezeTableName: true
});

//Export model Post

export default Post;