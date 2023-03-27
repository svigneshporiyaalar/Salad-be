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
      },
      birthDate: {
        type: Sequelize.DATEONLY,
      },
      height: {
        type: Sequelize.FLOAT,
      },
      weight: {
        type: Sequelize.FLOAT,
      },
      lastPeriodStart: {
        type: Sequelize.DATEONLY,
      },
      lastPeriodEnd: {
        type: Sequelize.DATEONLY,
      },
      menstrualCycle: {
        type: Sequelize.FLOAT,
      },
      birthControlId: {
        type: Sequelize.INTEGER,
      },
      medicalHistoryId: {
        type: Sequelize.INTEGER,
      },
      allowReminder: {
        type: Sequelize.BOOLEAN,
        defaultValue: "false"
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
  