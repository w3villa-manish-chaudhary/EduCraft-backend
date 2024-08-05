'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require("../dbconfig");
const BaseModel = require('./base.model');

class otpVerification extends BaseModel {
  static associate(models) {
  }
}

otpVerification.init({
  otpReceiver: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  verificationOtp: {
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
  otpCreatedAt:{
    type: DataTypes.BOOLEAN,
    defaultValue: false

  },
  otpUpdatedAt:{
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

}, {
  sequelize,
  modelName: 'otpVerification',
});

module.exports = otpVerification;
