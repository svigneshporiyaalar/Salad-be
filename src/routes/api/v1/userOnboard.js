const Router = require('koa-router');
const { v1 } = require('../../../constants/RouterConstants');
const { individualBadge, badgeStatus } = require('../../../controllers/goalBadgeController');
const { partnerOnboard } = require('../../../controllers/partnerController');
const { primaryGoal, menstrualDetails, completeOnboard, birthControlList, medicalHistoryList,
     addIntegration, removeIntegration, lunarCycle, getUserBadges}= require('../../../controllers/userOnboardController');
const { userToken } = require('../../../middleware/authenticated');
const router = new Router({ prefix: v1.userOnboard });


router.put("/primaryGoal" , userToken, primaryGoal ); //ok A17

router.post("/integration" , userToken, addIntegration ); //A29

router.put("/remove/integration" , userToken, removeIntegration );

router.get("/birthcontrol/list" , userToken, birthControlList ); //A15

router.get("/medicalhistory/list" , userToken, medicalHistoryList );

router.put("/menstrual-details" , userToken, menstrualDetails ); //A12

router.put("/lunar-cycle" , userToken, lunarCycle ); //A14

router.get("/badge-details" , userToken, getUserBadges ); //ok A21 ,A24, B01

router.get("/individual/badge-details" , userToken, individualBadge ); //C04 ,06,07,08,09,10

router.put("/complete" , userToken, completeOnboard ); //AFTER A25

router.put("/partner/complete" , userToken, partnerOnboard ); //AFTER A08






module.exports = router;
