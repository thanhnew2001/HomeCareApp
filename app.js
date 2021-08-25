require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const path = require('path')
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(cors())




// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../jwt-project/client/build')));

//routers
const products = require("./router/productRouter.js")
app.use('/', products)
const f0s = require("./router/f0Router.js")
app.use('/', f0s)
const users = require("./router/userRouter.js")
app.use('/', users)
const doctors = require("./router/doctorRouter.js")
app.use('/', doctors)
const exams = require("./router/examRouter.js")
app.use('/', exams)

const uploads = require("./router/uploadRouter.js")
app.use('/', uploads)

//for everyone to view files uploaded
app.use('/uploads', express.static('uploads'))

const auth = require("./middleware/auth");

app.get("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});





// All other GET requests not handled before will return our React app
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../jwt-project/client/build', 'index.html'));
// });

module.exports = app;