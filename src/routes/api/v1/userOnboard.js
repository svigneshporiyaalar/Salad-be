const Router = require('koa-router');
const { v1 } = require('../../../constants/RouterConstants');
const { getAllGoals } = require('../../../controllers/goalBadgeController');
const { updateActiveGoal, primaryGoal, editProfile, menstrualDetails, 
    completeOnboard } = require('../../../controllers/userOnboardController');
const router = new Router({ prefix: v1.userOnboard });


router.post("/primaryGoal" , primaryGoal );

router.put("/editProfile" , editProfile );

router.put("/switchGoal" , updateActiveGoal );

router.put("/menstrualDetails" , menstrualDetails );

router.get("/allGoals" , getAllGoals);

router.put("/complete" , completeOnboard );






module.exports = router;
