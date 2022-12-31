//import express from "express"
const express = require("express");
// console.log(express)
const cors = require('cors');
//invoke express
const app = express();
//Cookies
const cookieParser = require('cookie-parser');
// console.log(app)
const PORT = 8000;
//name used in database for project
const DB = "movielog"


//-- MIDDLEWARE---
// make sure these lines are above any app.get or app.post code blocks
app.use(cors({credentials: true, origin: 'http://localhost:3000'}), express.json(), express.urlencoded({extended:true}));
app.use(cookieParser())


//.env
require('dotenv').config();


// Connect to database using mongoose
require("./config/mongoose.config")(DB);


// // //modularize routes
// require("./routes/movies.routes")(app);
require("./routes/users.route")(app)
require("./routes/movies.route")(app)


// ! starts the server
//always at the bottom of our app

app.listen(PORT, () => console.log(`>> SERVER is up on port ${PORT} and is listening for Requests to Respond to `))
