'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require("../dbconfig");
const BaseModel = require('./base.model');

class subscription extends BaseModel {
    static associate(models) {
    }
}

subscription.init({
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    subscription_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },

}, {
    sequelize,
    modelName: 'subscription',
    tableName: 'subscription',


});

module.exports = subscription;
