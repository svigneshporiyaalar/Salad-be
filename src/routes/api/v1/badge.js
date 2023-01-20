const Router = require('koa-router');
const { v1 } = require('../../../constants/RouterConstants');
const { newBadge, getGoalbadge, badgeStatus, getAllBadges, 
    getBadgeStatus } = require('../../../controllers/goalBadgeController');
const router = new Router({ prefix: v1.badge });


router.post("/new" , newBadge );

router.get("/allBadges", getAllBadges)

router.get("/goalBadge", getGoalbadge)

router.post("/status" , badgeStatus );

router.get("/userstatus", getBadgeStatus)





module.exports = router;
