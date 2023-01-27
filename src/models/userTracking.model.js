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
      description: {
        type: Sequelize.STRING,
      },
      day: {
        type: Sequelize.DATEONLY,
      },
      time: {
        type: Sequelize.TIME,
      },
      difficultyLevel: {
        type: Sequelize.STRING,
      },
      preWorkoutMood: {
        type: Sequelize.STRING,
      },
      postWorkoutMood: {
        type: Sequelize.STRING,
      },
      badgeStatus: {
        type: Sequelize.STRING,
        defaultValue: "inprogress"
      },
    },
    {
      timestamps: true,
    }
  );
};
