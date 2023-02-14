const Router = require('koa-router');
const { v1 } = require('../../../constants/RouterConstants');
const { updateActiveGoal, primaryGoal, editProfile, menstrualDetails, 
    completeOnboard, getProfile, birthControlList, medicalHistoryList,
     addIntegration, removeIntegration }= require('../../../controllers/userOnboardController');
const { verifyToken } = require('../../../middleware/authenticated');
const router = new Router({ prefix: v1.userOnboard });


router.post("/primaryGoal" , verifyToken, primaryGoal );

router.post("/integration" , verifyToken, addIntegration );

router.post("/remove/integration" , verifyToken, removeIntegration );

router.put("/editProfile" , verifyToken, editProfile );

router.get("/getProfile" , verifyToken, getProfile );

router.put("/switchGoal" , verifyToken, updateActiveGoal );

router.get("/birthcontrol/list" , verifyToken, birthControlList );

router.get("/medicalhistory/list" , verifyToken, medicalHistoryList );

router.put("/menstrualDetails" , verifyToken, menstrualDetails );

router.put("/complete" , verifyToken, completeOnboard );





module.exports = router;
