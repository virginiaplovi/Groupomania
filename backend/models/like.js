// import sequelize
import { Sequelize } from "sequelize";
//import connection
import db from "../config/database.js";
import Post from "./post.js";
import User from "./user.js";


// init DataTypes
const { DataTypes } = Sequelize;

// Define schema

const Like = db.define('like', {
    // Define attributes
    LikeID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
}, {
    freezeTableName: true
});

User.hasMany(Like, { foreignKey: 'UserID' });
Like.belongsTo(User, { foreignKey: 'UserID'});

Post.hasMany(Like, { foreignKey: 'PostID'});
Like.belongsTo(Post, { foreignKey: 'PostID'});
//Export model Post

export default Like;