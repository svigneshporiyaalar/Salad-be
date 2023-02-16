module.exports = (sequelize, Sequelize) => {
    return sequelize.define("integration", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      integration: {
        type: Sequelize.STRING,
        allowNull:false
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "active"
      },
    });
  };
  