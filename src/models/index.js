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
db.admin = require("./admin.model.js")(sequelize, Sequelize);
db.userPartner = require("./userPartner.model.js")(sequelize, Sequelize);
db.badge = require("./badge.model.js")(sequelize, Sequelize);
db.goal = require("./goal.model.js")(sequelize, Sequelize);
db.badgeStatus = require("./badgeStatus.model.js")(sequelize, Sequelize);
db.userOnboard = require("./userOnboard.model.js")(sequelize, Sequelize);
db.userTracking = require("./userTracking.model.js")(sequelize, Sequelize);
db.moodTracker = require("./moodTracker.model.js")(sequelize, Sequelize);
db.productivity = require("./productivity.model")(sequelize, Sequelize);
db.sleepTracker = require("./sleepTracker.model")(sequelize, Sequelize);
db.productivityTracker = require("./productivityTracker.model")(sequelize, Sequelize);
db.badgeGoal = require("./badgeGoal.model")(sequelize, Sequelize);
db.badgeItem = require("./badgeItem.model")(sequelize, Sequelize);
db.feedback = require("./feedback.model")(sequelize, Sequelize);
db.birthControl = require("./birthControl.model")(sequelize, Sequelize);
db.userIntegration = require("./userIntegration.model")(sequelize, Sequelize);
db.integration = require("./integration.model")(sequelize, Sequelize);
db.item = require("./item.model")(sequelize, Sequelize);
db.level = require("./level.model")(sequelize, Sequelize);




module.exports = db;
