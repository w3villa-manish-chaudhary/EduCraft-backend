require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require("./routes/index");
const { initializeDatabase } = require('./database/dbconfig');
const session = require('express-session');
const passport = require('passport');
require('./config/passport');

const app = express();
const PORT = process.env.PORT || 8000;

const URL = process.env.FRONTEND_URL;




app.use(cors({
    origin: "*",
    credentials: true 
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); 

app.use(session({
    secret: process.env.SESSION_SECRET || 'defaultsecret', 
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true, 
        sameSite: 'lax'
    }
}));

app.use(passport.initialize());
app.use(passport.session());

initializeDatabase().catch(error => {
    console.error("Failed to initialize database:", error);
    process.exit(1); 
});

app.use("/", routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
