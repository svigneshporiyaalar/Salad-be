module.exports = (sequelize, Sequelize) => {
    return sequelize.define("productivity", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      points: {
        type: Sequelize.INTEGER,
      },
      tag: {
        type: Sequelize.STRING,
      },
    });
  };
  