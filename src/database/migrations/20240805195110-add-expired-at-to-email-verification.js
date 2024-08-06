'use strict';
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('emailVerification', 'emailCreatedAt', {
      allowNull: true,
      type: Sequelize.DOUBLE
    });

    await queryInterface.addColumn('emailVerification', 'emailExpiredAt', {
      allowNull: true,
      type: Sequelize.DOUBLE
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('emailVerification', 'emailCreatedAt');
    await queryInterface.removeColumn('emailVerification', 'emailExpiredAt');
  }
};
