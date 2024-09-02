import path from "path"
const environment = process.env.NODE_ENV || 'dev';
export default {

    PORT: process.env.PORT || 4000,
    MONGO_DB_URL: process.env.MONGO_DB_URL || 'mongodb://localhost:27017/',
    MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN || 'user',
    JWT_SECRET: process.env.JWT_SECRET || 'njkjcrenkjfvrekjvf',
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1d',
    HOME_DOMAIN_URL: process.env.HOME_DOMAIN_URL ||'http://localhost',
    Confirm_mail: process.env.Confirm_mail || 'admin@gmail.com'
 
}