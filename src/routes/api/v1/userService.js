const Router = require('koa-router');
const { v1 } = require('../../../constants/RouterConstants');
const { Otp_phone , Otp_phoneVerify } = require('../../../controllers/OtpController');
const { updateProfile, addPartner, removePartner } = require('../../../controllers/UserController');
const { verifyKey, verifyToken } = require('../../../middleware/authenticated');
const router = new Router({ prefix: v1.userService });


router.post("/phoneOtp" , Otp_phone);

router.post("/verifyphoneOtp", verifyKey, Otp_phoneVerify);

router.put("/updateprofile", verifyToken, updateProfile)

router.post("/addpartner", verifyToken, addPartner)

router.delete("/removepartner", verifyToken, removePartner)



module.exports = router;
