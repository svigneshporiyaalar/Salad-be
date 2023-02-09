const Router = require('koa-router');
const { v1 } = require('../../../constants/RouterConstants');
const { updateActiveGoal, primaryGoal, editProfile, menstrualDetails, 
    completeOnboard, getProfile} = require('../../../controllers/userOnboardController');
const { verifyToken } = require('../../../middleware/authenticated');
const router = new Router({ prefix: v1.userOnboard });


router.post("/primaryGoal" , verifyToken, primaryGoal );

router.put("/editProfile" , verifyToken, editProfile );

router.get("/getProfile" , verifyToken, getProfile );

router.put("/switchGoal" , verifyToken, updateActiveGoal );

router.put("/menstrualDetails" , verifyToken, menstrualDetails );

router.put("/complete" , verifyToken, completeOnboard );





module.exports = router;
