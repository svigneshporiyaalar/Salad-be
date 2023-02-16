'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('birthControls', [{
      description: 'I am not on any birth control',
      tag: "birth control",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      description: 'Birth control pill',
      tag: "birth control",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      description: 'Hormonal IUD',
      tag: "birth control",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      description: 'Copper IUD',
      tag: "birth control",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      description: 'implant',
      tag: "birth control",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      description: 'patch',
      tag: "birth control",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      description: 'shot',
      tag: "birth control",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      description: 'ring',
      tag: "birth control",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      description: 'other',
      tag: "birth control",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      description: 'I have not been diagnosed',
      tag: "medical history",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      description: 'PCOS',
      tag: "medical history",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      description: 'PMDD',
      tag: "medical history",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      description: 'PMS',
      tag: "medical history",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      description: 'Fibroids',
      tag: "medical history",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      description: 'Endometriosis',
      tag: "medical history",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      description: 'Depression',
      tag: "medical history",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      description: 'Insomnia',
      tag: "medical history",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      description: 'Other health related problems',
      tag: "medical history",
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('birthControls', null, {});

  }
};
