'use strict';
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('otpVerification', 'otpCreatedAt', {
      allowNull: true,
      type: Sequelize.DOUBLE
    });

    await queryInterface.addColumn('otpVerification', 'otpExpiredAt', {
      allowNull: true,
      type: Sequelize.DOUBLE
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('otpVerification', 'otpCreatedAt');
    await queryInterface.removeColumn('otpVerification', 'otpExpiredAt');
  }
};
