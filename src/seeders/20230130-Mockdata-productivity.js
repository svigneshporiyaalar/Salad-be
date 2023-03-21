'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('productivities', [{
      points: 1,
      tag: "Not productive",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      points: 2,
      tag: "Somewhat productive",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      points: 3,
      tag: "Productive enough",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      points: 4,
      tag: "Highly productive",
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('productivities', null, {});

  }
};
