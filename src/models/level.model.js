module.exports = (sequelize, Sequelize) => {
    return sequelize.define("level", {
      levelId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
    });
  };
  