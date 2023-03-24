module.exports = (sequelize, Sequelize) => {
    return sequelize.define("userPartnerTracker", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      partnerId: {
        type: Sequelize.INTEGER,
      },
      action: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.DATEONLY,
      },
    },
    );
  }
  