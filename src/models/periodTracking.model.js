module.exports = (sequelize, Sequelize) => {
  return sequelize.define("periodTracking",
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
      lastPeriodDate: {
        type: Sequelize.DATE,
      },
      menstrualCycle: {
        type: Sequelize.INTEGER,
      },
      day1: {
        type: Sequelize.STRING,
      },
      day2: {
        type: Sequelize.STRING,
      },
      day3: {
        type: Sequelize.STRING,
      },
      day4: {
        type: Sequelize.STRING,
      },
      day5: {
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
