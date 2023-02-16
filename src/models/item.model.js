module.exports = (sequelize, Sequelize) => {
    return sequelize.define("item", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      activity: {
        type: Sequelize.STRING,
        allowNull: false
      },
      frequency: {
        type: Sequelize.STRING,
      },
      phase: {
        type: Sequelize.STRING,
      },
      type : {
        type: Sequelize.STRING, 
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "active"
      },
    });
  }
  