// import sequelize
import { Sequelize } from "sequelize";
//import connection
import db from "../config/database.js";


// init DataTypes
const { DataTypes } = Sequelize;

// Define schema

const User = db.define('user', {
    // Define attributes
    UserID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Email: {
        type: DataTypes.STRING,
        unique: true
    },
    Password: {
        type: DataTypes.STRING
    },
    FirstName: {
        type: DataTypes.STRING
    },
    LastName: {
        type: DataTypes.STRING
    },
    CreatedAt: {
        type: DataTypes.DATE
    },
}, {
    freezeTableName: true
});



//Export model Post
export default User;