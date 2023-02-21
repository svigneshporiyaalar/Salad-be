module.exports = (sequelize, Sequelize) => {
    return sequelize.define("badge", {
      badgeId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
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
      status: {
        type: Sequelize.STRING,
        defaultValue: "active"
      },
    });
  }
  