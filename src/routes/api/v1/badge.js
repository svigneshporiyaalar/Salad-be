const { verify } = require('jsonwebtoken');
const Router = require('koa-router');
const { v1 } = require('../../../constants/RouterConstants');
const { newBadge, updateBadge, removeBadge } = require('../../../controllers/adminController');
const { getGoalbadge, badgeStatus, getAllBadges, 
  getBadgeStatus, 
  badgeComplete} = require('../../../controllers/goalBadgeController');
const { isAdmin, verifyToken } = require('../../../middleware/authenticated');
const router = new Router({ prefix: v1.badge });


router.get("/allBadges", verifyToken, getAllBadges)

router.get("/goalBadge", verifyToken, getGoalbadge)

router.post("/status" , verifyToken, badgeStatus );

router.get("/userStatus", verifyToken, getBadgeStatus)

router.put("/complete", verifyToken , badgeComplete )

router.post("/new" , isAdmin , newBadge );

router.get("/allBadges/admin", isAdmin, getAllBadges)

router.put("/update", isAdmin , updateBadge )

router.delete("/remove", isAdmin , removeBadge )




module.exports = router;
