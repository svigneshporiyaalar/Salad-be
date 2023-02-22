'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('items', [{
      exerciseId: '5b16eae5-5073-4966-978f-79569af028b1',
      exerciseName: '3 sets of burpees',
      exerciseType: "S&C",
      exerciseMedia: "https://www.youtube.com/watch?v=qLBImHhCXSw",
      exerciseMeta: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      exerciseId: '5c16eae5-5073-4966-978f-79569af028b2',
      exerciseName: '3 sets of push-ups',
      exerciseType: "S&C",
      exerciseMedia: "https://www.youtube.com/watch?v=IODxDxX7oi4",
      exerciseMeta: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
    exerciseId: '5d16eae5-5073-4966-978f-79569af028b3',
    exerciseName: '5km cycling',
    exerciseType: "cardio",
    exerciseMedia: "https://www.youtube.com/watch?v=ksJFLPDG22o",
    exerciseMeta: null,
    createdAt: new Date(),
    updatedAt: new Date()
},
  {
    exerciseId: '5e16eae5-5073-4966-978f-79569af028b4',
    exerciseName: '2 sets of side-planks',
    exerciseType: "S&C",
    exerciseMedia: "https://www.youtube.com/watch?v=NXr4Fw8q60o",
    exerciseMeta: null,
    createdAt: new Date(),
    updatedAt: new Date()
},
  {
    exerciseId: '5f16eae5-5073-4966-978f-79569af028b5',
    exerciseName: '4 sets of squats',
    exerciseType: "S&C",
    exerciseMedia: "https://www.youtube.com/watch?v=jjVpDI6x_ec",
    exerciseMeta: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    exerciseId: '6fc7ce3e-75c3-47f6-afa5-8c49a58793e4',
    exerciseName: '2 sets of high rope jump',
    exerciseType: "S&C",
    exerciseMedia: "https://www.youtube.com/watch?v=jjVpDI6x_ec",
    exerciseMeta: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    exerciseId: 'a8973c14-faeb-4cb8-8e7d-82b9608495cf',
    exerciseName: '3 sets of lunges',
    exerciseType: "S&C",
    exerciseMedia: "https://www.youtube.com/watch?v=jjVpDI6x_ec",
    exerciseMeta: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('items', null, {});

  }
};
