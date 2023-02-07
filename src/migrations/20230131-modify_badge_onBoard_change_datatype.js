'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.changeColumn("userOnboards", "height", {
      type: Sequelize.FLOAT,
     })
    await queryInterface.changeColumn("userOnboards", "weight", {
      type: Sequelize.FLOAT,
     })
    await queryInterface.renameColumn("userOnboards", "lastPeriodDate", "lastPeriodStart")
    await queryInterface.addColumn("userOnboards", "lastPeriodEnd", {
      type: Sequelize.Date,
    });
    await queryInterface.renameColumn("badges", "menstualPhase", "menstrualPhase")
  },


  async down (queryInterface, Sequelize) {

    await queryInterface.changeColumn("userOnboards", "height", {
      type: Sequelize.INTEGER,
     })
    await queryInterface.changeColumn("userOnboards", "weight", {
      type: Sequelize.INTEGER,
     })
    await queryInterface.renameColumn("userOnboards", "lastPeriodStart", "lastPeriodDate")
    await queryInterface.removeColumn("userOnboards", "lastPeriodEnd", {
      type: Sequelize.Date,
    });
    await queryInterface.renameColumn("badges", "menstrualPhase", "menstualPhase")
  }
};

