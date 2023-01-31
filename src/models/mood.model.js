module.exports = (sequelize, Sequelize) => {
    return sequelize.define("mood", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      moodId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      mood: {
        type: Sequelize.STRING,
        allowNull: false
      },
    });
  };
  