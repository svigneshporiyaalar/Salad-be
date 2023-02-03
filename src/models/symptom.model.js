module.exports = (sequelize, Sequelize) => {
    return sequelize.define("symptom", {
      symptomId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      symptom: {
        type: Sequelize.STRING,
        allowNull: false
      },
    });
  };
  