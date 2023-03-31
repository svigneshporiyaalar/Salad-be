module.exports = (sequelize, Sequelize) => {
  return sequelize.define("productivityTracker",
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
      productivityPoints: {
        type: Sequelize.INTEGER,
      },
  },
  );
};
