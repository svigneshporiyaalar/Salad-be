const { verify } = require('jsonwebtoken');
const Router = require('koa-router');
const { v1 } = require('../../../constants/RouterConstants');
const { newBadge, updateBadge, removeBadge, getGoalbadges } = require('../../../controllers/adminController');
const { getGoalbadge, badgeStatus, getAllBadges, 
  badgeComplete, getAllBadgeStatus} = require('../../../controllers/goalBadgeController');
const { isAdmin, verifyToken } = require('../../../middleware/authenticated');
const router = new Router({ prefix: v1.badge });


router.get("/allBadges", verifyToken, getAllBadges)

router.get("/goalBadge", verifyToken, getGoalbadge)

router.post("/status" , verifyToken, badgeStatus );

router.get("/userStatus", verifyToken, getAllBadgeStatus)

router.put("/complete", verifyToken , badgeComplete )

router.post("/new" , isAdmin , newBadge );

router.get("/allBadges/admin", isAdmin, getAllBadges)

router.get("/goal/admin", isAdmin, getGoalbadges)

router.put("/update", isAdmin , updateBadge )

router.delete("/remove", isAdmin , removeBadge )



module.exports = router;
