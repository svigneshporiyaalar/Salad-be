'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('difficultyLevels', [{
      levelId: '1',
      level: 'low',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      levelId: '2',
      level: 'medium',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      levelId: '3',
      level: 'hard',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      levelId: '4',
      level: 'extreme',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('difficultyLevels', null, {});

  }
};
