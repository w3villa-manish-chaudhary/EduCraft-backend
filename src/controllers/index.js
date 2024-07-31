const {executeRawQuery} = require('../database/dbconfig');

const hello = async (req, res, next) => {
    console.log("hello i am home page:::::>>>>>"); 
    const response = await executeRawQuery("SELECT 2*4 AS result;");
    console.log("::::::::::::::", response);

    res.send("<h1>Hello! this is a home page.</h1>");
}

module.exports = hello;

