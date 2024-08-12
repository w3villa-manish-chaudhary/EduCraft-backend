'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require("../dbconfig");
const BaseModel = require('./base.model');

class Users extends BaseModel {
    static associate(models) {
     
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
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isMobileVerify: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    isEmailVerify: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    }

  }, {
    sequelize,
    modelName: 'Users',
    timestamps: true
  });


module.exports = Users;
