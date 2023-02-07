'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('badges', [{
      goalId: '1b16eae5-5073-4966-978f-79569af028bd',
      badgeId: '4b16eae5-5073-4966-978f-79569af028bd',
      name: 'Add omega 3 rich foods to diet',
      description: '"Add omega 3 rich foods: seafood, flax,sabja,chia seeds (1-2tbsp/day) fish oil capsule (1000mg/day)"',
      quantity: null,
      unit: null,
      frequency : "daily",
      phase : "follicular1",
      type : "nutrtion",
      cycleDays: "5 - 10",
      naturalProgressionIntermediate: "",
      naturalProgressionAdvanced: "",
      naturalRegression: "",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      goalId: '1b16eae5-5073-4966-978f-79569af028bd',
      badgeId: '5b16eae5-5073-4966-978f-79569af028bd',
      name: 'Cardio',
      description: "walk 10k steps",
      quantity: null,
      unit: null,
      frequency : "daily",
      phase : "follicular1",
      type : "fitness",
      cycleDays: "5 - 10",
      naturalProgressionIntermediate: "walk 15k steps",
      naturalProgressionAdvanced: "walk 20k steps",
      naturalRegression: "walk 5k steps",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      goalId: '1b16eae5-5073-4966-978f-79569af028bd',
      badgeId: '6b16eae5-5073-4966-978f-79569af028bd',
      name: 'S&C',
      description: "Strenght & Conditioning Routine1 (medium intensity)",
      quantity: null,
      unit: null,
      frequency : "3 days/phase",
      phase : "follicular1",
      type : "fitness",
      cycleDays: "5 - 10",
      naturalProgressionIntermediate: "Strenght & Conditioning Routine2 (high intensity)",
      naturalProgressionAdvanced: "HIIT Routine 0 (low difficulty)",
      naturalRegression: "Strenght & Conditioning Routine0 (low intensity)",
      createdAt: new Date(),
      updatedAt: new Date()
  },
  {
    goalId: '1b16eae5-5073-4966-978f-79569af028bd',
    badgeId: '7b16eae5-5073-4966-978f-79569af028bd',
    name: 'dark chocolate daily',
    description: "Dark chocolate (low added sugar) - 1 square per day",
    quantity: "1",
    unit: "square",
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
  goalId: '1b16eae5-5073-4966-978f-79569af028bd',
  badgeId: '8b16eae5-5073-4966-978f-79569af028bd',
  name: 'Take b-complex capsule',
  description: "1 B-complex supplement daily ",
  quantity: "1",
  unit: "capsule",
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
  goalId: '1b16eae5-5073-4966-978f-79569af028bd',
  badgeId: '9b16eae5-5073-4966-978f-79569af028bd',
  name: 'Yoga',
  description: "Core Yoga Exercises Routine1 (medium intensity)",
  quantity: "1",
  unit: "capsule",
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
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('badges', null, {});

  }
};