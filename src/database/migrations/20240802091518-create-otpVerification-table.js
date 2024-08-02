'use strict';
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('otpVerification', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      uniqueId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },

      isActive: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
      comment: {
        allowNull: true,
        type: Sequelize.STRING
      },

      
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
      }
    });
  },

  async down(queryInterface, Sequelize) {
     await queryInterface.dropTable('otpVerification');
  }
};
