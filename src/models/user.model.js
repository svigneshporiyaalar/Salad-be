module.exports = (sequelize, Sequelize) => {
    return sequelize.define("user", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,  
        primaryKey: true,
      },
      userId: {
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
        allowNull:false,
      },
      type:{
        type: Sequelize.STRING,
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
  