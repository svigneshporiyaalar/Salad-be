module.exports = (sequelize, Sequelize) => {
    return sequelize.define("mood", {
      moodId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      mood: {
        type: Sequelize.STRING,
        allowNull: false
      },
    });
  };
  