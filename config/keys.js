// dbPassword = 'mongodb+srv://khushi:deployst@cluster0.tadzkvq.mongodb.net/?retryWrites=true&w=majority'
require("dotenv").config();

dbPassword = process.env.MONGO_URI;

module.exports = {
  mongoURI: dbPassword
};