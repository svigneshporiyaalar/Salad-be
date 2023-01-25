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
      goalStatus: {
        type: Sequelize.STRING,
        defaultValue:"inprogress"
      },
    },{
      timestamps: true
    }
    );
  }
  