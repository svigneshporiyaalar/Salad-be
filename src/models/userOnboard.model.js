module.exports = (sequelize, Sequelize) => {
    return sequelize.define("userOnboard", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      activeGoal: {
        type: Sequelize.STRING,
      },
      goalId: {
        type: Sequelize.UUID,
      },
      goalStatus: {
        type: Sequelize.STRING,
        defaultValue:"inprogress"
      },
      age: {
        type: Sequelize.INTEGER,
      },
      height: {
        type: Sequelize.INTEGER,
      },
      weight: {
        type: Sequelize.INTEGER,
      },
      lastPeriodDate: {
        type: Sequelize.DATEONLY,
      },
      menstrualCycle: {
        type: Sequelize.INTEGER,
      },
      integration: {
        type: Sequelize.STRING,
      },
      allowReminder:{
        type: Sequelize.BOOLEAN,
      },
      onboardStatus:{
        type: Sequelize.STRING,
        defaultValue:"pending"
      }
    },{
      timestamps: true
    }
    );
  }
  