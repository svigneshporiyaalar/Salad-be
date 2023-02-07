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
        type: Sequelize.INTEGER,
      },
      preWorkoutMood: {
        type: Sequelize.INTEGER,
      },
      postWorkoutMood: {
        type: Sequelize.INTEGER,
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
