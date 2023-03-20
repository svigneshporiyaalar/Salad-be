'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('feedbacks', [{
      tag: "symptom",
      description: 'feeling on the low side',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tag: "symptom",
      description: 'feeling on the high side',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tag: "symptom",
      description: 'soreness from last workout',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tag: "symptom",
      description: 'not sore from last workout',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tag: "symptom",
      description: 'not enough sleep last night',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tag: "symptom",
      description: 'enough sleep last night',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tag: "symptom",
      description: 'Difficulty of workout was high',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tag: "symptom",
      description: 'Difficulty of workout was low',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tag: "symptom",
      description: 'Did not like the workout',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tag: "symptom",
      description: 'Like the workout',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tag: "mood",
      description: 'Happy',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tag: "mood",
      description: 'Gloomy',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tag: "mood",
      description: 'Cheerful',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tag: "mood",
      description: 'Dull',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tag: "mood",
      description: 'Confused',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('feedbacks', null, {});

  }
};
