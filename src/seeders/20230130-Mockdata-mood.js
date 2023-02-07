'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('moods', [{
      moodId: '1',
      mood: 'happy',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      moodId: '2',
      mood: 'tired',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      moodId: '3',
      mood: 'exhausted',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      moodId: '4',
      mood: 'energetic',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      moodId: '5',
      mood: 'sick',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      moodId: '6',
      mood: 'hyperactive',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      moodId: '7',
      mood: 'torn-out',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('moods', null, {});

  }
};
