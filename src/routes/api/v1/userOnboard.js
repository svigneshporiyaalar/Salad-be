const Router = require('koa-router');
const { v1 } = require('../../../constants/RouterConstants');
const { individualBadge, badgeStatus } = require('../../../controllers/goalBadgeController');
const { updateActiveGoal, primaryGoal, editProfile, menstrualDetails, 
    completeOnboard, getProfile, birthControlList, medicalHistoryList,
     addIntegration, removeIntegration , profileImage, 
     lunarCycle, getUserBadges}= require('../../../controllers/userOnboardController');
const { userToken } = require('../../../middleware/authenticated');
const router = new Router({ prefix: v1.userOnboard });


router.post("/primaryGoal" , userToken, primaryGoal );

router.post("/integration" , userToken, addIntegration );

router.post("/remove/integration" , userToken, removeIntegration );

router.put("/edit-profile" , userToken, editProfile );

router.put("/profile-image" , userToken, profileImage );

router.get("/profile" , userToken, getProfile );

router.put("/switchGoal" , userToken, updateActiveGoal );

router.get("/birthcontrol/list" , userToken, birthControlList );

router.get("/medicalhistory/list" , userToken, medicalHistoryList );

router.put("/menstrual-details" , userToken, menstrualDetails );

router.put("/lunar-cycle" , userToken, lunarCycle );

router.get("/badge-details" , userToken, getUserBadges );

router.get("/individual/badge-details" , userToken, individualBadge );

router.put("/complete" , userToken, completeOnboard );





module.exports = router;
