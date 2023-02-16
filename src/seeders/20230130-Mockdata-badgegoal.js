'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('badgeGoals', [{
      goalId: '1b16eae5-5073-4966-978f-79569af028b1',
      badgeId: '1b16eae5-5073-4966-978f-79569af028bd',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      goalId: '1b16eae5-5073-4966-978f-79569af028b1',
      badgeId: '7b16eae5-5073-4966-978f-79569af028bd',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
    goalId: '1b16eae5-5073-4966-978f-79569af028b1',
    badgeId: '8b16eae5-5073-4966-978f-79569af028bd',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    goalId: '1b16eae5-5073-4966-978f-79569af028b1',
    badgeId: '9b16eae5-5073-4966-978f-79569af028bd',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    goalId: '1b16eae5-5073-4966-978f-79569af028b2',
    badgeId: '2b16eae5-5073-4966-978f-79569af028bd',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    goalId: '1b16eae5-5073-4966-978f-79569af028b2',
    badgeId: '3b16eae5-5073-4966-978f-79569af028bd',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    goalId: '1b16eae5-5073-4966-978f-79569af028b2',
    badgeId: '4b16eae5-5073-4966-978f-79569af028bd',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    goalId: '1b16eae5-5073-4966-978f-79569af028b2',
    badgeId: '5b16eae5-5073-4966-978f-79569af028bd',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    goalId: '1b16eae5-5073-4966-978f-79569af028b2',
    badgeId: '6b16eae5-5073-4966-978f-79569af028bd',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    goalId: '1b16eae5-5073-4966-978f-79569af028b2',
    badgeId: '1c16eae5-5073-4966-978f-79569af028bd',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    goalId: '1b16eae5-5073-4966-978f-79569af028b2',
    badgeId: '2c16eae5-5073-4966-978f-79569af028bd',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    goalId: '1b16eae5-5073-4966-978f-79569af028b2',
    badgeId: '3c16eae5-5073-4966-978f-79569af028bd',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('badgeGoals', null, {});

  }
};
