const Users = require('../database/models/user.model');

const hello = async (req, res, next) => {
  try {
    console.log("hello i am home page:::::>>>>>");

    const results = await Users.findAll( );

    res.send(results);
  } catch (error) {
    next(error); 
  }
}

module.exports = hello;
