'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('birthControls', [{
      description: 'I am not on any birth control',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      description: 'Birth control pill',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      description: 'Hormonal IUD',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      description: 'Copper IUD',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      description: 'implant',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      description: 'patch',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      description: 'shot',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      description: 'ring',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      description: 'other',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('birthControls', null, {});

  }
};
