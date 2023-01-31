module.exports = (sequelize, Sequelize) => {
    return sequelize.define("symptom", {
      symptomsId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      symptoms: {
        type: Sequelize.STRING,
        allowNull: false
      },
    });
  };
  