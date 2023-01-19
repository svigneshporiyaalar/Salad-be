module.exports = (sequelize, Sequelize) => {
    return sequelize.define("badgeStatus", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      badgeId: {
        type: Sequelize.UUID,
      },
      badge: {
        type: Sequelize.STRING,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      badgeStatus: {
        type: Sequelize.STRING,
      },
    },{
      timestamps: true
    }
    );
  }
  