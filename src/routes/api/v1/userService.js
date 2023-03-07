const Router = require('koa-router');
const { v1 } = require('../../../constants/RouterConstants');
const { getBadgeStatus, activeBadgeStatus, activateBadge } = require('../../../controllers/goalBadgeController');
const { Otp_phone , Otp_phoneVerify, verifyType } = require('../../../controllers/otpController');
const { addPartner, removePartner, partnerList,
    getBadgeItems, checkPoint, updateName} = require('../../../controllers/userController');
const { verifyKey, userToken } = require('../../../middleware/authenticated');
const { badgeStatus } = require('../../../models');
const router = new Router({ prefix: v1.userService });


router.post("/phoneOtp" , Otp_phone);

router.post("/verifyphoneOtp", verifyKey, Otp_phoneVerify);

router.get("/user-check", userToken, checkPoint)

router.put("/add-name", userToken, updateName )

router.post("/partner-switch", userToken, verifyType)

router.post("/addpartner", userToken, addPartner)

router.delete("/removepartner", userToken, removePartner)

router.get("/partner-list", userToken, partnerList)

router.get("/items", userToken , getBadgeItems)

router.post("/activate-badge" , userToken, activateBadge );

router.get("/activated-badge/status" , userToken , activeBadgeStatus);






module.exports = router;
