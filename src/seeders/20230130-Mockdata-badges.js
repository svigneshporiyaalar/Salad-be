'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('badges', [{
      badgeId: '1b16eae5-5073-4966-978f-79569af028bd',
      name: 'Add omega 3 rich foods to diet',
      description: '"Add omega 3 rich foods: seafood, flax,sabja,chia seeds (1-2tbsp/day) fish oil capsule (1000mg/day)"',
      frequency : "daily",
      phase : "follicular1",
      type : "nutrition",
      cycleDays: "5 - 10",
      naturalProgressionIntermediate: "",
      naturalProgressionAdvanced: "",
      naturalRegression: "",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      badgeId: '2b16eae5-5073-4966-978f-79569af028bd',
      name: 'Cardio',
      description: "walk 10k steps",
      frequency : "daily",
      phase : "follicular1",
      type : "fitness",
      cycleDays: "5 - 10",
      naturalProgressionIntermediate: "2c16eae5-5073-4966-978f-79569af028bd",
      naturalProgressionAdvanced: "2d16eae5-5073-4966-978f-79569af028bd",
      naturalRegression: "2e16eae5-5073-4966-978f-79569af028bd",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      badgeId: '3b16eae5-5073-4966-978f-79569af028bd',
      name: 'S&C',
      description: "Strenght & Conditioning Routine1 (medium intensity)",
      frequency : "3 days/phase",
      phase : "follicular1",
      type : "fitness",
      cycleDays: "5 - 10",
      naturalProgressionIntermediate: "6b26eae5-5073-4966-978f-79569af028bd",
      naturalProgressionAdvanced: "6b36eae5-5073-4966-978f-79569af028bd",
      naturalRegression: "6b46eae5-5073-4966-978f-79569af028bd",
      createdAt: new Date(),
      updatedAt: new Date()
  },
  {
    badgeId: '4b16eae5-5073-4966-978f-79569af028bd',
    name: 'S&C',
    description: "Strenght & Conditioning Routine2 (high intensity)",
    frequency : "3 days/phase",
    phase : "follicular1",
    type : "fitness",
    cycleDays: "5 - 10",
    naturalProgressionIntermediate: "6b36eae5-5073-4966-978f-79569af028bd",
    naturalProgressionAdvanced: "",
    naturalRegression: "6b16eae5-5073-4966-978f-79569af028bd",
    createdAt: new Date(),
    updatedAt: new Date()
},{
  badgeId: '5b16eae5-5073-4966-978f-79569af028bd',
  name: 'S&C',
  description: "HIIT Routine 0 (low difficulty)",
  frequency : "3 days/phase",
  phase : "follicular1",
  type : "fitness",
  cycleDays: "5 - 10",
  naturalProgressionIntermediate: "",
  naturalProgressionAdvanced: "",
  naturalRegression: "6b26eae5-5073-4966-978f-79569af028bd",
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  badgeId: '6b16eae5-5073-4966-978f-79569af028bd',
  name: 'S&C',
  description: "Strenght & Conditioning Routine0 (low intensity)",
  frequency : "3 days/phase",
  phase : "follicular1",
  type : "fitness",
  cycleDays: "5 - 10",
  naturalProgressionIntermediate: "6b16eae5-5073-4966-978f-79569af028bd",
  naturalProgressionAdvanced: "6b26eae5-5073-4966-978f-79569af028bd",
  naturalRegression: "",
  createdAt: new Date(),
  updatedAt: new Date()
},
  {
    badgeId: '7b16eae5-5073-4966-978f-79569af028bd',
    name: 'dark chocolate daily',
    description: "Dark chocolate (low added sugar) - 1 square per day",
    frequency : "daily",
    phase : "luteal2",
    type : "nutrition",
    cycleDays: "22 - 28",
    naturalProgressionIntermediate: "",
    naturalProgressionAdvanced: "",
    naturalRegression: "",
    createdAt: new Date(),
    updatedAt: new Date()
},
{
  badgeId: '8b16eae5-5073-4966-978f-79569af028bd',
  name: 'Take b-complex capsule',
  description: "1 B-complex supplement daily ",
  frequency : "daily",
  phase : "menstruation",
  type : "nutrition",
  cycleDays: "1 - 5",
  naturalProgressionIntermediate: "",
  naturalProgressionAdvanced: "",
  naturalRegression: "",
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  badgeId: '9b16eae5-5073-4966-978f-79569af028bd',
  name: 'Yoga',
  description: "Core Yoga Exercises Routine1 (medium intensity)",
  frequency : "2 days/phase",
  phase : "menstruation",
  type : "nutrition",
  cycleDays: "1 - 5",
  naturalProgressionIntermediate: "",
  naturalProgressionAdvanced: "",
  naturalRegression: "",
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  badgeId: '1c16eae5-5073-4966-978f-79569af028bd',
  name: 'Cardio',
  description: "walk 15k steps",
  frequency : "daily",
  phase : "follicular1",
  type : "fitness",
  cycleDays: "5 - 10",
  naturalProgressionIntermediate: "2d16eae5-5073-4966-978f-79569af028bd",
  naturalProgressionAdvanced: "",
  naturalRegression: "5b16eae5-5073-4966-978f-79569af028bd",
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  badgeId: '2c16eae5-5073-4966-978f-79569af028bd',
  name: 'Cardio',
  description: "walk 20k steps",
  frequency : "daily",
  phase : "follicular1",
  type : "fitness",
  cycleDays: "5 - 10",
  naturalProgressionIntermediate: "",
  naturalProgressionAdvanced: "",
  naturalRegression: "2c16eae5-5073-4966-978f-79569af028bd",
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  badgeId: '3c16eae5-5073-4966-978f-79569af028bd',
  name: 'Cardio',
  description: "walk 5k steps",
  frequency : "daily",
  phase : "follicular1",
  type : "fitness",
  cycleDays: "5 - 10",
  naturalProgressionIntermediate: "5b16eae5-5073-4966-978f-79569af028bd",
  naturalProgressionAdvanced: "2c16eae5-5073-4966-978f-79569af028bd",
  naturalRegression: "",
  createdAt: new Date(),
  updatedAt: new Date()
},
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('badges', null, {});

  }
};
