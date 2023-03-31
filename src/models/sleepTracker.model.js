module.exports = (sequelize, Sequelize) => {
  return sequelize.define("sleepTracker",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.DATEONLY,
      },
      hoursOfSleep: {
        type: Sequelize.TIME,
      },
  },
  );
};
