module.exports = (sequelize, Sequelize) => {
    return sequelize.define("goal", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      goalId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      goal: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "active"
      },
    });
  };
  