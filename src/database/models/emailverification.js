'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require("../dbconfig");
const BaseModel = require('./base.model');

class emailVerification extends BaseModel {
  static associate(models) {
  }
}

emailVerification.init({
  emailReceiver: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  verificationHash: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
 
  retryCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  userData: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  assignUser: {
    type: DataTypes.INTEGER,
    allowNull: true
  },

  emailCreatedAt:{
    type: DataTypes.BOOLEAN,
    defaultValue: false

  },
  emailUpdatedAt:{
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
}, {
  sequelize,
  modelName: 'emailVerification',
});

module.exports = emailVerification;