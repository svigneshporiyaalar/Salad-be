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
      frequency : {
        type: Sequelize.STRING,
      },
      grantBadge : {
        type: Sequelize.INTEGER,
      },
      badgeRunway : {
        type: Sequelize.INTEGER,
      },
      timeOfTheDay : {
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
      onboarding : {
        type: Sequelize.STRING, 
      },
      excludes : {
        type: Sequelize.JSON, 
      },
      naturalProgression: {
        type: Sequelize.STRING,
      },
      defaultTimeInMins: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "active"
      },
    });
  }
  