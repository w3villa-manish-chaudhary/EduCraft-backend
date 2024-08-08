require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require("./routes/index")
const {initializeDatabase} = require('./database/dbconfig');
const session = require('express-session');
const passport = require('passport');
require('./config/passport');

const app = express();


app.use(session({ secret: 'zxcvbnmasdfghjkl', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

initializeDatabase();

app.use("/", routes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
