'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('symptoms', [{
      symptomId: '1',
      symptom: 'stomach cramps',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      symptomId: '2',
      symptom: 'back pain',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      symptomId: '3',
      symptom: 'swollen feet',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      symptomId: '4',
      symptom: 'leg pain',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      symptomId: '5',
      symptom: 'feverish',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      symptomId: '6',
      symptom: 'stomach bloat',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('symptoms', null, {});

  }
};
