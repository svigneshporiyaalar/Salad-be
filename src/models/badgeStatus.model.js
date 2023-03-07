module.exports = (sequelize, Sequelize) => {
    return sequelize.define("badgeStatus", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      goalId: {
        type: Sequelize.UUID,
      },
      goalStatus: {
        type: Sequelize.STRING,
        defaultValue:"in progress"
      },
      badgeId: {
        type: Sequelize.UUID,
      },
      badge: {
        type: Sequelize.STRING,
      },
      badgeStatus: {
        type: Sequelize.STRING,
        defaultValue:"activated"

      },
    },{
      timestamps: true
    }
    );
  }
  