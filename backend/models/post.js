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
        type: DataTypes.NUMBER
    },
    Dislikes: {
        type: DataTypes.NUMBER
    },
    UsersLiked: {
        type: DataTypes.NUMBER
    },
    UsersDisliked: {
        type: DataTypes.NUMBER
    },
    ReadPost: {
        type: DataTypes.NUMBER
    },
    ReadBy: {
        type: DataTypes.NUMBER
    }
}, {
    freezeTableName: true
});

//Export model Post

export default Post;