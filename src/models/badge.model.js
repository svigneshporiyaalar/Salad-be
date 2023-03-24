module.exports = (sequelize, Sequelize) => {
    return sequelize.define("badge", {
      badgeId: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      frequency : {
        type: Sequelize.STRING,
      },
      grantBadge : {
        type: Sequelize.STRING,
      },
      badgeRunway : {
        type: Sequelize.STRING,
      },
      timeOfTheDay : {
        type: Sequelize.STRING,
      },
      phase: {
        type: Sequelize.STRING,
      },
      difficultyLevel : {
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
      trackParameter: {
        type: Sequelize.STRING,
      },
      defaultTrack: {
        type: Sequelize.STRING,
      },
      possibleTrackRange: {
        type: Sequelize.STRING,
      },
      trackChangeValue: {
        type: Sequelize.STRING,
      },
      type : {
        type: Sequelize.STRING, 
      },
      media : {
        type: Sequelize.JSON, 
      },
      meta : {
        type: Sequelize.JSON, 
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "active"
      },
    });
  }
  