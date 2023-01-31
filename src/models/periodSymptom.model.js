module.exports = (sequelize, Sequelize) => {
    return sequelize.define("symptom", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      symptomsId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      symptoms: {
        type: Sequelize.STRING,
        allowNull: false
      },
    });
  };
  