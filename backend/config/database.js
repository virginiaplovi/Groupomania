//Import .env
import dotenv from 'dotenv'
dotenv.config()

// Import sequelize
import { Sequelize } from "sequelize";

// Create connection

const db = new Sequelize('groupomania_db', process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

// Export connection
export default db;