'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn("userOnboards", "height", {
      type: Sequelize.FLOAT,
     })
    await queryInterface.changeColumn("userOnboards", "weight", {
      type: Sequelize.FLOAT,
     })
     await queryInterface.renameColumn("badges", "menstualPhase", "menstrualPhase")
     

  },


  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn("userOnboards", "height", {
      type: Sequelize.INTEGER,
     })
    await queryInterface.changeColumn("userOnboards", "weight", {
      type: Sequelize.INTEGER,
     })
     await queryInterface.renameColumn("badges", "menstrualPhase", "menstualPhase")

  }
};

