'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('levels', [{
      description: 'very easy',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      description: 'easy',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      description: 'average',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      description: 'hard',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      description: 'extreme',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('levels', null, {});

  }
};
