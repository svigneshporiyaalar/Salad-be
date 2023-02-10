const Router = require('koa-router');
const { v1 } = require('../../../constants/RouterConstants');
const { newBadge, removeBadge, getGoalbadges, addToGoal, delinkGoal, 
  activeBadges,inactiveBadges, archivedBadges } = require('../../../controllers/adminController');
const { getGoalbadge, badgeStatus, getAllBadges, badgeComplete, 
  completedBadges, activeBadgeStatus} = require('../../../controllers/goalBadgeController');
const { isAdmin, verifyToken } = require('../../../middleware/authenticated');
const router = new Router({ prefix: v1.badge });


router.get("/allBadges", verifyToken, getAllBadges)

router.get("/goalBadge", verifyToken, getGoalbadge)

router.post("/status" , verifyToken, badgeStatus );

router.get("/completed-badges", verifyToken, completedBadges)

router.get("/active-badges", verifyToken, activeBadgeStatus)

router.put("/complete", verifyToken , badgeComplete )

router.post("/new" , isAdmin , newBadge );

router.post("/link-goal" , isAdmin , addToGoal );

router.get("/allBadges/admin", isAdmin, activeBadges)

router.get("/inactive", isAdmin, inactiveBadges)

router.get("/archived", isAdmin, archivedBadges )

router.get("/goal/admin", isAdmin, getGoalbadges)

router.put("/remove", isAdmin , removeBadge )

router.delete("/delink-goal", isAdmin , delinkGoal )



module.exports = router;
