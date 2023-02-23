module.exports = (sequelize, Sequelize) => {
    return sequelize.define("feedback", {
      feedbackId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      feedback: {
        type: Sequelize.STRING,
      },
    });
  };
  