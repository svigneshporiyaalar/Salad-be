const Router = require('koa-router');
const { v1 } = require('../../../constants/RouterConstants');
const { newBadge, getBadges, getGoalbadge, badgeStatus } = require('../../../controllers/goalBadgeController');
const router = new Router({ prefix: v1.badge });


router.post("/newBadges" , newBadge );

router.get("/allBadges", getBadges)

router.get("/goalBadge", getGoalbadge)

router.post("/status" , badgeStatus );







module.exports = router;
