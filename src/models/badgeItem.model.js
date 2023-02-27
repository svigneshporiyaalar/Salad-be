module.exports = (sequelize, Sequelize) => {
    return sequelize.define("badgeItem", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      itemId: {
        type: Sequelize.UUID,
      },
      badgeId: {
        type: Sequelize.UUID,
      },
    });
  };
  