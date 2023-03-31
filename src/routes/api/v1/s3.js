const Router = require("koa-router");
const { v1 } = require("../../../constants/RouterConstants");
const HttpStatusCodes = require("../../../constants/HttpStatusCodes");
const responseHelper = require("../../../helpers/responseHelper");
const { getProfileURL,getUserProfilePhotoURL, getPartnerProfilePhotoURL } = require("../../../controllers/S3Controller");
const { userToken, partnerToken } = require("../../../middleware/authenticated");
const router = new Router({ prefix: v1.s3 });


router.get("/live-check", userToken, async (ctx) => {
  let data = { status: "s3 Service is live" };
  let error = null;
  let responseCode = HttpStatusCodes.SUCCESS;
  ctx.body = responseHelper.buildResponse(error,data);
  ctx.response.status = responseCode;
});


router.get("/user-profile/photo", userToken, async (ctx, next) => {
  let data = {};
  let error = null;
  let responseCode = HttpStatusCodes.SUCCESS;
  try {
     data = await getUserProfilePhotoURL(ctx)
  } catch (err) {
    error = err;
    responseCode = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = responseCode;
  next();
});

router.get("/partner-profile/photo", partnerToken, async (ctx, next) => {
  let data = {};
  let error = null;
  let responseCode = HttpStatusCodes.SUCCESS;
  try {
     data = await getPartnerProfilePhotoURL(ctx)
  } catch (err) {
    error = err;
    responseCode = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = responseCode;
  next();
});



module.exports = router;
