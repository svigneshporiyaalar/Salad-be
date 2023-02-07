const Router = require('koa-router');
const { v1 } = require('../../../constants/RouterConstants');
const {  Otp_partner, Otp_partnerVerify } = require('../../../controllers/otpController');
const { partnerToken, verifyKey } = require('../../../middleware/authenticated');
const { updateProfile, getUsers } = require('../../../controllers/partnerController');
const router = new Router({ prefix: v1.partnerService });



router.post("/partnerOtp" , Otp_partner);

router.post("/verifypartnerOtp" ,verifyKey, Otp_partnerVerify);

router.put("/updateprofile", partnerToken, updateProfile)

router.get("/getusers",partnerToken, getUsers)




module.exports = router;
