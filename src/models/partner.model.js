module.exports = (sequelize, Sequelize) => {
    return sequelize.define("partner", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,  
        primaryKey: true,
      },
      partnerId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      contactNumber: {
        type: Sequelize.BIGINT,
        allowNull:false
      },
      onboardingComplete: {
        type: Sequelize.BOOLEAN,
        defaultValue: "false"
      },
    },{
      timestamps: true
    }
    );
  }
  