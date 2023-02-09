'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('goals', [{
      goalId: '1b16eae5-5073-4966-978f-79569af028b1',
      goal: 'Manage period pain',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      goalId: '1b16eae5-5073-4966-978f-79569af028b2',
      goal: 'weight loss',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
    goalId: '1b16eae5-5073-4966-978f-79569af028b3',
    goal: 'improve stamina',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    goalId: '1b16eae5-5073-4966-978f-79569af028b4',
    goal: 'less period cramps',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    goalId: '1b16eae5-5073-4966-978f-79569af028b5',
    goal: 'improve flexibility',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('goals', null, {});

  }
};
