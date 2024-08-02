'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require("../dbconfig");
const BaseModel = require('./base.model');

class Users extends BaseModel {
    static associate(models) {
      // define association here
    }
  }

  Users.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Users',
  });


module.exports = Users;
