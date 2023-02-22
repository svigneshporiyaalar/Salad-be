module.exports = (sequelize, Sequelize) => {
    return sequelize.define("item", {
      exerciseId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      exerciseName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      exerciseMedia: {
        type: Sequelize.STRING,
      },
      exerciseType : {
        type: Sequelize.STRING, 
      },
      exerciseMeta : {
        type: Sequelize.JSON, 
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "active"
      },
    });
  }
  