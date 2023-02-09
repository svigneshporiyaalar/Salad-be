module.exports = (sequelize, Sequelize) => {
    return sequelize.define("badgeGoal", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      goalId: {
        type: Sequelize.UUID,
      },
      badgeId: {
        type: Sequelize.UUID,
      },
    });
  };
  