const Router = require('koa-router');
const { v1 } = require('../../../constants/RouterConstants');
const { everyDayTracking } = require('../../../controllers/trackingController');
const { menstrualDetails } = require('../../../controllers/userOnboardController');
const { verifyToken } = require('../../../middleware/authenticated');
const router = new Router({ prefix: v1.userTracking });



router.put("/menstrualDetails" , verifyToken, menstrualDetails );

router.post("/everyDay" , verifyToken , everyDayTracking );





module.exports = router;
