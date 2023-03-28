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
      badgeName: {
        type: Sequelize.STRING,
      },
      itemId: {
        type: Sequelize.UUID,
      },      
      date: {
        type: Sequelize.DATEONLY,
      },
      time: {
        type: Sequelize.TIME,
      },
      trackParameter: {
        type: Sequelize.STRING,
      },
      defaultTrack: {
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
        type: Sequelize.BOOLEAN,  
    }
  },
    {
      timestamps: true,
    }
  );
};
