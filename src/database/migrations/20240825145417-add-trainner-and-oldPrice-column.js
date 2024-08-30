'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('CourseDetails', 'trainer', {
      type: Sequelize.STRING, 
      allowNull: false,
    });

    await queryInterface.addColumn('CourseDetails', 'oldprice', {
      type: Sequelize.INTEGER, 
      allowNull: false, 
      defaultValue: 999, 
    });

    await queryInterface.addColumn('CourseDetails', 'rating_count', {
      type: Sequelize.INTEGER, 
      allowNull: true, 
      defaultValue: 50, 
    });

    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('CourseDetails', 'trainner');
    await queryInterface.removeColumn('CourseDetails', 'oldprice');
    await queryInterface.removeColumn('CourseDetails', 'rating_count');

    
   
  }
};
