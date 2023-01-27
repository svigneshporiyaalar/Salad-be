const Router = require('koa-router');
const { v1 } = require('../../../constants/RouterConstants');
const { everyDayTracking, periodSymptoms, trackPeriod } = require('../../../controllers/trackingController');
const { menstrualDetails } = require('../../../controllers/userOnboardController');
const { verifyToken } = require('../../../middleware/authenticated');
const router = new Router({ prefix: v1.userTracking });



router.put("/menstrualDetails" , verifyToken, menstrualDetails );

router.post("/everyDay" , verifyToken , everyDayTracking );

router.post("/periodSymptoms" , verifyToken , periodSymptoms );

router.get("/periods" , verifyToken , trackPeriod );







module.exports = router;
