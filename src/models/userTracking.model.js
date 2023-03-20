module.exports = (sequelize, Sequelize) => {
  return sequelize.define("userTracking",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      badgeId: {
        type: Sequelize.UUID,
      },
      itemId: {
        type: Sequelize.UUID,
      },      
      date: {
        type: Sequelize.DATEONLY,
      },
      durationInMins: {
        type: Sequelize.INTEGER,
      },
      difficultyLevel: {
        type: Sequelize.INTEGER,
      },
      preWorkoutMood: {
        type: Sequelize.INTEGER,
      },
      postWorkoutMood: {
        type: Sequelize.INTEGER,
      },
      isDayWorkoutComplete: {
        type: Sequelize.STRING,
        validate: {
          isIn: [['yes', 'no']],
      },
    }
  },
    {
      timestamps: true,
    }
  );
};
