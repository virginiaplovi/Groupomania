// import sequelize
import { Sequelize } from "sequelize";
//import connection
import db from "../config/database.js";

import Post from "./post.js";
import User from "./user.js";


// init DataTypes
const { DataTypes } = Sequelize;

// Define schema

const Seen = db.define('seen', {
    // Define attributes
    SeenID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
}, {
    freezeTableName: true
});

//Associations
User.hasMany(Seen, { foreignKey: 'UserID' });
Seen.belongsTo(User, { foreignKey: 'UserID'});

Post.hasMany(Seen, { foreignKey: 'PostID'});
Seen.belongsTo(Post, { foreignKey: 'PostID'});

//Export model Post
export default Seen;