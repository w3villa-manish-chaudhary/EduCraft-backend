const Users = require('../database/models/user.model');



const hello = async (req, res, next) => {

    console.log("hello i am home page:::::>>>>>");

    const results = await Users.findAll( );

    res.send(results);
    
}
module.exports = hello;
