'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('symptoms', [{
      symptomId: '1',
      symptom: 'feeling on the low side',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      symptomId: '2',
      symptom: 'feeling on the high side',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      symptomId: '3',
      symptom: 'soreness from last workout',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      symptomId: '4',
      symptom: 'not sore from last workout',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      symptomId: '5',
      symptom: 'not enough sleep last night',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      symptomId: '6',
      symptom: 'enough sleep last night',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      symptomId: '7',
      symptom: 'Difficulty of workout was high',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      symptomId: '8',
      symptom: 'Difficulty of workout was low',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      symptomId: '9',
      symptom: 'Did not like the workout',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      symptomId: '10',
      symptom: 'Like the workout',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('symptoms', null, {});

  }
};
