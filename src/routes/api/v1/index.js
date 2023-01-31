const Router = require("koa-router");
const HttpStatusCodes = require("../../../constants/HttpStatusCodes");
const userService = require("./userService");
const partnerService = require("./partnerService");
const goal = require("./goal");
const badge = require("./badge");
const userOnboard = require("./userOnboard");
const adminAuth = require("./adminAuth");
const userTracking = require("./userTracking");
const app = new Router();

app.get("/", (ctx) => {
  ctx.body = "Hello there";
  ctx.response.status = HttpStatusCodes.SUCCESS;
});


module.exports = {
  userService,
  partnerService,
  adminAuth,
  goal,
  badge,
  userOnboard,
  userTracking,
};
