'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('badgeItems', [{
      itemId: '5b16eae5-5073-4966-978f-79569af028b1',
      badgeId: '4b16eae5-5073-4966-978f-79569af028bd',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      itemId: '5c16eae5-5073-4966-978f-79569af028b2',
      badgeId: '6b16eae5-5073-4966-978f-79569af028bd',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
    itemId: '5d16eae5-5073-4966-978f-79569af028b3',
    badgeId: '5b16eae5-5073-4966-978f-79569af028bd',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    itemId: '5e16eae5-5073-4966-978f-79569af028b4',
    badgeId: '6b16eae5-5073-4966-978f-79569af028bd',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    itemId: '5f16eae5-5073-4966-978f-79569af028b5',
    badgeId: '4b16eae5-5073-4966-978f-79569af028bd',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    itemId: '6fc7ce3e-75c3-47f6-afa5-8c49a58793e4',
    badgeId: '5b16eae5-5073-4966-978f-79569af028bd',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    itemId: 'a8973c14-faeb-4cb8-8e7d-82b9608495cf',
    badgeId: '3b16eae5-5073-4966-978f-79569af028bd',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    itemId: '78f728c7-703d-4bf1-bbe8-4aefdf32810b',
    badgeId: '5b16eae5-5073-4966-978f-79569af028bd',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    itemId: 'f8feae34-3ad9-4940-ba5d-e9af90c2330f',
    badgeId: '5b16eae5-5073-4966-978f-79569af028bd',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('badgeItems', null, {});

  }
};
