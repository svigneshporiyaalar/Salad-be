module.exports = (sequelize, Sequelize) => {
    return sequelize.define("birthControl", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      description: {
        type: Sequelize.STRING,
      },
    });
  };
  