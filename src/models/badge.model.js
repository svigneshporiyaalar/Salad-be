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
      },
      badge: {
        type: Sequelize.STRING,
        allowNull: false
      },
      goalId: {
        type: Sequelize.UUID,
      },
      badgeProps: {
        type: Sequelize.JSON,
      },

    },{
      timestamps: true
    }
    );
  }
  