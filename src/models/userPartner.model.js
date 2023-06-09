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
      partnerNumber: {
        type: Sequelize.STRING,
      }, 
      partnerName: {
        type: Sequelize.STRING,
      }, 
      action: {
        type: Sequelize.STRING,
      }, 
    },{
      timestamps: true
    }
    );
  }
  