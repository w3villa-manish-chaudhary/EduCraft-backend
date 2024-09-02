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

// CORS configuration to allow all origins
app.use(cors({
    origin: '*', // This allows all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true // Allows cookies and other credentials to be sent with requests
}));

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // Logging HTTP requests

// Initialize session and passport
app.use(session({
    secret: process.env.SESSION_SECRET || 'defaultsecret', // Use environment variable for session secret
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        httpOnly: true, // Helps to mitigate XSS attacks
        sameSite: 'lax' // Helps to protect CSRF
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// Initialize the database and handle potential errors
initializeDatabase().catch(error => {
    console.error("Failed to initialize database:", error);
    process.exit(1); // Exit the process if the database fails to connect
});

// Route handling
app.use("/", routes);

// Start the server and log the listening port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
