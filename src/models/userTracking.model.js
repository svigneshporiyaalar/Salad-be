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
        allowNull: false,
      },
      badgeId: {
        type: Sequelize.UUID,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
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
        allowNull: false,
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
