const Router = require('koa-router');
const { v1 } = require('../../../constants/RouterConstants');
const { goalComplete } = require('../../../controllers/goalBadgeController');
const { Otp_phone , Otp_phoneVerify } = require('../../../controllers/otpController');
const { addPartner, removePartner } = require('../../../controllers/userController');
const { verifyKey, verifyToken } = require('../../../middleware/authenticated');
const router = new Router({ prefix: v1.userService });


router.post("/phoneOtp" , Otp_phone);

router.post("/verifyphoneOtp", verifyKey, Otp_phoneVerify);

router.post("/addpartner", verifyToken, addPartner)

router.delete("/removepartner", verifyToken, removePartner)

router.put("/updateGoal" , goalComplete);




module.exports = router;
