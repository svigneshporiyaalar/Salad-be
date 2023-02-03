module.exports = (sequelize, Sequelize) => {
    return sequelize.define("badge", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      badgeId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      item: {
        type: Sequelize.JSON,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      unit: {
        type: Sequelize.STRING,
      },
      frequency: {
        type: Sequelize.STRING,
      },
      phase: {
        type: Sequelize.STRING,
      },
      type : {
        type: Sequelize.STRING, 
      },
      cycleDays: {
        type: Sequelize.STRING,
      },
      naturalProgressionIntermediate: {
        type: Sequelize.STRING,
      },
      naturalProgressionAdvanced: {
        type: Sequelize.STRING,
      },
      naturalRegression: {
        type: Sequelize.STRING,
      },
      goalId: {
        type: Sequelize.UUID,
      },
    });
  }
  