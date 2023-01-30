'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('badges', [{
      goalId: '1b16eae5-5073-4966-978f-79569af028bd',
      badgeId: '4b16eae5-5073-4966-978f-79569af028bd',
      badge: 'average',
      items: "{ name }",
      daysFollowed: "5",
      runway: "3",
      grantPeriod : "30",
      dailyTimePeriod : "09:00",
      menstrualPhase : "",
      difficultyLevel: "low",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      goalId: '2b16eae5-5073-4966-978f-79569af028bd',
      badgeId: '5b16eae5-5073-4966-978f-79569af028bd',
      badge: 'good',
      items: "{ height }",
      daysFollowed: "7",
      runway: "3",
      grantPeriod : "20",
      dailyTimePeriod : "07:00",
      menstrualPhase : "",
      difficultyLevel: "low",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
    goalId: '3b16eae5-5073-4966-978f-79569af028bd',
    badgeId: '6b16eae5-5073-4966-978f-79569af028bd',
    badge: 'bad',
    items: "{ name }",
    daysFollowed: "5",
    runway: "3",
    grantPeriod : "30",
    dailyTimePeriod : "09:00",
    menstrualPhase : "",
    difficultyLevel: "low",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('goals', null, {});

  }
};
