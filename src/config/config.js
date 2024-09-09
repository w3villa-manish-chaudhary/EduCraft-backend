require('dotenv').config(); 

module.exports = 
{
  "development": {
    "username": "root",
    "password": "1122334455",
    "database": "testsqlnode",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "1122334455",
    "database": "testsqlnode_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
    "production": {
      "username": process.env.DB_USER,
      "password": process.env.DB_PASS,
      "database": process.env.DB_NAME,
      "host": process.env.DB_HOST,
      "port": process.env.DB_PORT,
      "dialect": "mysql",
      "dialectOptions": {
        "ssl": {
          "require": true,
          "rejectUnauthorized": false
        }
      }
    }
  }