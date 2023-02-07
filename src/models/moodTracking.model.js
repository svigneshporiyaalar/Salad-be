module.exports = (sequelize, Sequelize) => {
  return sequelize.define("moodTracking",
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
      date: {
        type: Sequelize.DATEONLY,
      },
      symptoms: {
        type: Sequelize.INTEGER,
      },
    });
};
