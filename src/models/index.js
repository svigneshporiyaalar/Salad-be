const dbConfig = require("../config/db.config.js");
const env = process.env.NODE_ENV || "development";
const config = dbConfig[env];
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DATABASE_NAME,
  config.DATABASE_USER,
  config.DATABASE_PASSWORD,
  config
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.partner = require("./partner.model.js")(sequelize, Sequelize);
db.admin = require("./admin.model.js")(sequelize, Sequelize);
db.userPartner = require("./userPartner.model.js")(sequelize, Sequelize);
db.badge = require("./badge.model.js")(sequelize, Sequelize);
db.goal = require("./goal.model.js")(sequelize, Sequelize);
db.badgeStatus = require("./badgeStatus.model.js")(sequelize, Sequelize);
db.userOnboard = require("./userOnboard.model.js")(sequelize, Sequelize);
db.userTracking = require("./userTracking.model.js")(sequelize, Sequelize);
db.moodTracking = require("./moodTracking.model.js")(sequelize, Sequelize);
db.badgeGoal = require("./badgeGoal.model")(sequelize, Sequelize);
db.symptom = require("./symptom.model")(sequelize, Sequelize);
db.birthControl = require("./birthControl.model")(sequelize, Sequelize);
db.userIntegration = require("./userIntegration.model")(sequelize, Sequelize);
db.integration = require("./integration.model")(sequelize, Sequelize);


// db.goal.hasMany(db.badge);
// db.badge.belongsTo(db.goal);



module.exports = db;
