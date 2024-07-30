const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const routes = require("./routes/index")



dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

// app.use(cors);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


app.use("/", routes)



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
