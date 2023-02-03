module.exports = (sequelize, Sequelize) => {
    return sequelize.define("userPartner", {
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
      relation: {
        type: Sequelize.STRING,
      }, 
    },{
      timestamps: true
    }
    );
  }
  