const Router = require('koa-router');
const { v1 } = require('../../../constants/RouterConstants');
const { Otp_phone , Otp_phoneVerify, verifyType } = require('../../../controllers/otpController');
const { addPartner, removePartner, partnerList, partnerCheck, getItems } = require('../../../controllers/userController');
const { verifyKey, verifyToken, userToken } = require('../../../middleware/authenticated');
const router = new Router({ prefix: v1.userService });


router.post("/phoneOtp" , Otp_phone);

router.post("/verifyphoneOtp", verifyKey, Otp_phoneVerify);

router.get("/partner-check", userToken, partnerCheck)

router.post("/partner-switch", userToken, verifyType)

router.post("/addpartner", userToken, addPartner)

router.delete("/removepartner", userToken, removePartner)

router.get("/partner-list", userToken, partnerList)

router.get("/items", userToken , getItems)





module.exports = router;
