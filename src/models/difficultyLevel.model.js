module.exports = (sequelize, Sequelize) => {
    return sequelize.define("difficultyLevel", {
      levelId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      level: {
        type: Sequelize.STRING,
        allowNull: false
      },
    });
  };
  