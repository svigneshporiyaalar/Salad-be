'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('goals', [{
      goalId: '1b16eae5-5073-4966-978f-79569af028bd',
      goal: 'weight gain',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      goalId: '2b16eae5-5073-4966-978f-79569af028bd',
      goal: 'height gain',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
    goalId: '3b16eae5-5073-4966-978f-79569af028bd',
    goal: 'improve stamina',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('goals', null, {});

  }
};
