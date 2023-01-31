'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('moods', [{
      moodId: '1b16eae5-5073-4966-978f-79569af028bd',
      mood: 'happy',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      moodId: '2b16eae5-5073-4966-978f-79569af028bd',
      mood: 'tired',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('moods', null, {});

  }
};
