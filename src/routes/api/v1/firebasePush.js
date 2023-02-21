const Router = require("koa-router");
const { v1 } = require("../../../constants/RouterConstants");
const router = new Router({ prefix: v1.firebasePush });
// var serviceAccount = require("../../../../firebase_config/salad-28df2-firebase-adminsdk-gw508-8ddb753829.json");
// const { admin } = require("../../../services/firebasePushNotify")

const notification_options = {
  priority: "high",
  timeToLive: 60 * 60 * 24
};
const message_notification = {
  notification: {
     title: "Hi Salad user",
     body: "Try our new feature"
    }
  };

router.post("/notifications", async (ctx) => {
  let data = {};
  let error = null;
  let  { token } = ctx.request.body
  const options =  notification_options
  const message = message_notification
  console.log( "body:" )
  try {
    admin.messaging().sendToDevice(token, message, options)

  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse("Notification sent successfully");
  ctx.response.status = HttpStatusCodes.SUCCESS;
})

  








module.exports = router;
