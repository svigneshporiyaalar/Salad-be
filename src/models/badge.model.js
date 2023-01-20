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
      badge: {
        type: Sequelize.STRING,
        allowNull: false
      },
      goalId: {
        type: Sequelize.UUID,
      },
      items: {
        type: Sequelize.JSON,
      },
      daysFollowed: {
        type: Sequelize.INTEGER,
      },
      grantPeriod: {
        type: Sequelize.INTEGER,
      },
      runway: {
        type: Sequelize.INTEGER,
      },
      dailyTimePeriod: {
        type: Sequelize.TIME,
      },
      menstualPhase: {
        type: Sequelize.STRING,
      },
      difficultyLevel: {
        type: Sequelize.STRING,
      },
    },{
      timestamps: true
    }
    );
  }
  