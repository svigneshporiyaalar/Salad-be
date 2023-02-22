'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('feedbacks', [{
      feedback: 'feeling on the low side',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      feedback: 'feeling on the high side',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      feedback: 'soreness from last workout',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      feedback: 'not sore from last workout',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      feedback: 'not enough sleep last night',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      feedback: 'enough sleep last night',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      feedback: 'Difficulty of workout was high',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      feedback: 'Difficulty of workout was low',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      feedback: 'Did not like the workout',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      feedback: 'Like the workout',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('feedbacks', null, {});

  }
};
