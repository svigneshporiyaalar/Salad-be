const Router = require('koa-router');
const { v1 } = require('../../../constants/RouterConstants');
const { updateActiveGoal, primaryGoal, editProfile, menstrualDetails, 
    completeOnboard, getProfile, birthControlList, medicalHistoryList,
     addIntegration, removeIntegration , profileImage }= require('../../../controllers/userOnboardController');
const { verifyToken, userToken } = require('../../../middleware/authenticated');
const router = new Router({ prefix: v1.userOnboard });


router.post("/primaryGoal" , userToken, primaryGoal );

router.post("/integration" , userToken, addIntegration );

router.post("/remove/integration" , userToken, removeIntegration );

router.put("/editProfile" , userToken, editProfile );

router.put("/profile-image" , userToken, profileImage );

router.get("/getProfile" , userToken, getProfile );

router.put("/switchGoal" , userToken, updateActiveGoal );

router.get("/birthcontrol/list" , userToken, birthControlList );

router.get("/medicalhistory/list" , userToken, medicalHistoryList );

router.put("/menstrualDetails" , userToken, menstrualDetails );

router.put("/complete" , userToken, completeOnboard );





module.exports = router;
