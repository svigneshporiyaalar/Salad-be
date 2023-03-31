module.exports = (sequelize, Sequelize) => {
  return sequelize.define("admin", {
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true,
      }
    },
    password: {
      type: Sequelize.STRING,
    },
    contactNumber: {
      type: Sequelize.STRING,
    },
  });
};
