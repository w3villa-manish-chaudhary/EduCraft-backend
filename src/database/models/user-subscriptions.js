'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbconfig');
const BaseModel = require('./base.model');

class user_subscriptions extends BaseModel {
    static associate(models) {
        user_subscriptions.belongsTo(models.Users, { foreignKey: 'userId' });
        user_subscriptions.belongsTo(models.subscription, { foreignKey: 'subscriptionId' });
    }
}

user_subscriptions.init({
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    subscriptionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'subscription',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
}, {
    sequelize,
    modelName: 'user_subscriptions',
    tableName: 'user_subscriptions',
});

module.exports = user_subscriptions;
