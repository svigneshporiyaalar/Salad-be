module.exports = (sequelize, Sequelize) => {
    return sequelize.define("mood", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      moodId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      mood: {
        type: Sequelize.STRING,
        allowNull: false
      },
    });
  };
  