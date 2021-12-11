// import sequelize
import { Sequelize } from "sequelize";
//import connection
import db from "../config/database.js";

import User from "./user.js"

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
    CreatedAt: {
        type: DataTypes.DATE
    },
}, {
    freezeTableName: true
});

//Associations
User.hasMany(Post, { foreignKey: 'UserID' });
Post.belongsTo(User, { foreignKey: 'UserID'});

//Export model Post
export default Post;