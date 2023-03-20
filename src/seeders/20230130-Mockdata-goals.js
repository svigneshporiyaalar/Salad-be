'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('goals', [{
      goalId: '1b16eae5-5073-4966-978f-79569af028b1',
      goal: 'Decreased period pain',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      goalId: '1b16eae5-5073-4966-978f-79569af028b2',
      goal: 'Lose weight safely',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
    goalId: '1b16eae5-5073-4966-978f-79569af028b3',
    goal: 'Increase energy levels',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    goalId: '1b16eae5-5073-4966-978f-79569af028b4',
    goal: 'Manage irregular periods',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    goalId: '1b16eae5-5073-4966-978f-79569af028b5',
    goal: 'General fitness goals',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  ]);
  },
  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('goals', null, {});

  }
};
