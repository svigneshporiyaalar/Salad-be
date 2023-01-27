const Router = require('koa-router');
const { v1 } = require('../../../constants/RouterConstants');
const { getAllGoals, getAllBadges, getGoalbadge } = require('../../../controllers/goalBadgeController');
const { updateActiveGoal, primaryGoal, editProfile, menstrualDetails, 
    completeOnboard } = require('../../../controllers/userOnboardController');
const { verifyToken } = require('../../../middleware/authenticated');
const router = new Router({ prefix: v1.userOnboard });


router.post("/primaryGoal" , verifyToken, primaryGoal );

router.put("/editProfile" , verifyToken, editProfile );

router.put("/switchGoal" , verifyToken, updateActiveGoal );

router.put("/menstrualDetails" , verifyToken, menstrualDetails );

router.get("/goalBadge", verifyToken, getGoalbadge)

router.put("/complete" , verifyToken, completeOnboard );





module.exports = router;
