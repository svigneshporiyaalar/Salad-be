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
      daysFollowed : {
        type: Sequelize.INTEGER,
      },
      grantBadge : {
        type: Sequelize.INTEGER,
      },
      badgeRunway : {
        type: Sequelize.INTEGER,
      },
      timeOfTheDay : {
        type: Sequelize.TIME,
      },
      frequency: {
        type: Sequelize.STRING,
      },
      menstrualPhase: {
        type: Sequelize.STRING,
      },
      difficultyLevel : {
        type: Sequelize.INTEGER, 
      },
      type : {
        type: Sequelize.STRING, 
      },
      cycleDays: {
        type: Sequelize.STRING,
      },
      onboarding : {
        type: Sequelize.TEXT, 
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
  