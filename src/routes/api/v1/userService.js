const Router = require('koa-router');
const { v1 } = require('../../../constants/RouterConstants');
const { getBadgeStatus, activateBadge , badgeStatus, deactivateBadge, removeBadge} = require('../../../controllers/goalBadgeController');
const { Otp_phone , Otp_phoneVerify, verifyType, extendedAccess } = require('../../../controllers/otpController');
const { addPartner, removePartner, partnerList,getBadgeItems, checkPoint, 
    updateName, deleteUserData, deleteUserAccount} = require('../../../controllers/userController');
const { editProfile, profileImage, getProfile, updateActiveGoal, notificationData } = require('../../../controllers/userOnboardController');
const { verifyKey, userToken, verifyRefreshtoken } = require('../../../middleware/authenticated');
const router = new Router({ prefix: v1.userService });


router.post("/phoneOtp" , Otp_phone);

router.post("/verifyphoneOtp", verifyKey, Otp_phoneVerify);

router.post("/refresh-token",  verifyRefreshtoken, extendedAccess);

router.get("/user-check", userToken, checkPoint)

router.put("/add-name", userToken, updateName )

router.post("/partner-switch", userToken, verifyType)

router.post("/addpartner", userToken, addPartner)

router.delete("/removepartner", userToken, removePartner)

router.get("/partner-list", userToken, partnerList)

router.get("/items", userToken , getBadgeItems)

router.post("/activate-badge" , userToken, activateBadge );

router.put("/badge/de-activate" , userToken, deactivateBadge );

router.put("/badge/remove" , userToken, removeBadge);

// router.get("/activated-badge/status" , userToken , activeBadgeStatus);

router.delete("/delete/user-data", userToken, deleteUserData)

router.delete("/delete/user-account", userToken, deleteUserAccount)

router.put("/edit-profile" , userToken, editProfile );

router.put("/profile-image" , userToken, profileImage )

router.get("/profile" , userToken, getProfile ); 

router.get("/notifications" , userToken, notificationData ); 

router.put("/switchGoal" , userToken, updateActiveGoal );







module.exports = router;
