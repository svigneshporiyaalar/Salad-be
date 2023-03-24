const Router = require('koa-router');
const { v1 } = require('../../../constants/RouterConstants');
const { newBadge, removeBadge, getGoalbadges, addToGoal, delinkGoal,
   updateBadge, allBadges } = require('../../../controllers/adminController');
const { getGoalbadge, badgeStatus, getAllBadges, badgeComplete, 
  completedBadges, activeBadgeStatus} = require('../../../controllers/goalBadgeController');
const { isAdmin, verifyToken, userToken } = require('../../../middleware/authenticated');
const router = new Router({ prefix: v1.badge });


router.get("/allBadges", userToken, getAllBadges)

router.get("/goalBadge", userToken, getGoalbadge)

// router.post("/user/status" , userToken, badgeStatus );

router.get("/completed-badges", userToken, completedBadges)

router.get("/active-badges", userToken, activeBadgeStatus)

router.put("/complete", userToken , badgeComplete )

router.post("/new" , isAdmin , newBadge );

router.post("/link-goal" , isAdmin , addToGoal );

router.get("/allBadges/admin", isAdmin, allBadges)

router.get("/goal/admin", isAdmin, getGoalbadges)

router.put("/update", isAdmin, updateBadge )

router.put("/remove", isAdmin , removeBadge )

router.delete("/delink-goal", isAdmin , delinkGoal )



module.exports = router;
