const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passportConfig = require("./lib/passportConfig");
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require("uuid");
var cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
require("dotenv").config()
// // MongoDsB
// mongoose
//   .connect("mongodb://localhost:27017/jobPortal", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   })
//   .then((res) => console.log("Connected to DB.."))
//   .catch((err) => console.log(err));


const db = require('./config/keys').mongoURI;
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// app.use("/tmp", express.static(path.join(__dirname, 'tmp')));

// initialising directories
// if (!fs.existsSync("./tmp")) {
//     fs.mkdirSync("./tmp");
// }
// if (!fs.existsSync("./tmp/resume")) {
//     fs.mkdirSync("./tmp/resume");
// }
// if (!fs.existsSync("./tmp/profile")) {
//     fs.mkdirSync("./tmp/profile");
// }

const port = process.env.PORT || 4444;

app.get("/", (req, res) => {
    res.send("hey!");
})

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Setting up middlewares
app.use(cors());
app.use(express.json());
app.use(passportConfig.initialize());

// Routing
app.use("/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/apiRoutes"));
app.use("/upload", require("./routes/uploadRoutes"));
app.use("/host", require("./routes/downloadRoutes"));

app.listen(port, () => {
    console.log(`Server started on port ${port}!`);
});
