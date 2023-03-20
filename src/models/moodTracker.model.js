module.exports = (sequelize, Sequelize) => {
  return sequelize.define("moodTracker",
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
      time: {
        type: Sequelize.TIME,
      },
      symptom: {
        type: Sequelize.INTEGER,
      },
      mood: {
        type: Sequelize.INTEGER,
      },
    });
};
