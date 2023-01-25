const Router = require('koa-router');
const { v1 } = require('../../../constants/RouterConstants');
const HttpStatusCodes = require('../../../constants/HttpStatusCodes');
const responseHelper = require('../../../helpers/responseHelper');
const {  Otp_partner, Otp_partnerVerify } = require('../../../controllers/otpController');
const { partnerToken, verifyKey } = require('../../../middleware/authenticated');
const { updateProfile, getUsers } = require('../../../controllers/partnerController');
const router = new Router({ prefix: v1.partnerService });



router.post("/partnerOtp" , Otp_partner);

router.post("/verifypartnerOtp" ,verifyKey, Otp_partnerVerify);

router.put("/updateprofile", partnerToken, updateProfile)

router.get("/getusers",partnerToken, getUsers)




router.post("/check", partnerToken ,async (ctx) => {
    let error = null;
    let responseCode = HttpStatusCodes.SUCCESS;
    let data= ctx.request.user
    ctx.body = responseHelper.buildResponse(error, data);
    ctx.response.status = responseCode;
  })


module.exports = router;
