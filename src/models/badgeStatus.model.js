module.exports = (sequelize, Sequelize) => {
    return sequelize.define("badgeStatus", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      goalId: {
        type: Sequelize.UUID,
      },
      goalStatus: {
        type: Sequelize.STRING,
        defaultValue:"inprogress"
      },
      badgeId: {
        type: Sequelize.UUID,
      },
      badge: {
        type: Sequelize.STRING,
        allowNull: false
      },
      badgeStatus: {
        type: Sequelize.STRING,
      },
    },{
      timestamps: true
    }
    );
  }
  