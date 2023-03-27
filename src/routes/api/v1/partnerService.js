const Router = require('koa-router');
const { v1 } = require('../../../constants/RouterConstants');
// const {  Otp_partner, Otp_partnerVerify } = require('../../../controllers/otpController');
const { partnerToken, userToken } = require('../../../middleware/authenticated');
const { updateProfile, getUsers,  partnerOnboard, getUserRequest, acceptUserRequest, userTracking, userIndividualBadgeTracking, pokeUser } = require('../../../controllers/partnerController');
const router = new Router({ prefix: v1.partnerService });


// router.post("/partnerOtp" , Otp_partner);

// router.post("/verifypartnerOtp" ,verifyKey, Otp_partnerVerify);

router.put("/updateprofile", partnerToken, updateProfile)

router.get("/getusers",partnerToken, getUsers)

router.get("/user-requests",partnerToken, getUserRequest)

router.put("/accept-requests", partnerToken, acceptUserRequest)

router.get("/user-tracking",partnerToken, userTracking)

router.get("/user-badgeTracker",partnerToken, userIndividualBadgeTracking)

router.get("/user-tracking",partnerToken, userTracking)

router.post("/poke-user",partnerToken, pokeUser )



module.exports = router;
