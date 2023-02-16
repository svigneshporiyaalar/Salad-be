module.exports = (sequelize, Sequelize) => {
    return sequelize.define("userIntegration", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      integrationId: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      status: {
        type: Sequelize.STRING,
      },
    });
  };
  