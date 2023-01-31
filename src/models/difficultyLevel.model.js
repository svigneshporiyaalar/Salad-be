module.exports = (sequelize, Sequelize) => {
    return sequelize.define("difficultyLevel", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      levelId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      level: {
        type: Sequelize.STRING,
        allowNull: false
      },
    });
  };
  