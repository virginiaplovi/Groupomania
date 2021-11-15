// Import sequelize
import { Sequelize } from "sequelize";

// Create connection

const db = new Sequelize('groupomania_db', 'root', 'a6EpS9NA&jmYYLmG', {
    host: 'localhost' ,
    dialect: 'mysql'
});

// Export connection
export default db;