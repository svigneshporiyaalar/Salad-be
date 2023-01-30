const Router = require('koa-router');
const { v1 } = require('../../../constants/RouterConstants');
const { everyDayTracking, periodSymptoms, trackPeriod,
     trackPeriodDay } = require('../../../controllers/trackingController');
const { verifyToken } = require('../../../middleware/authenticated');
const router = new Router({ prefix: v1.userTracking });




router.post("/everyDay" , verifyToken, everyDayTracking );

router.get("/dailyTrack" , verifyToken, everyDayTracking );

router.post("/periodSymptoms" , verifyToken, periodSymptoms );

router.get("/periodTrack" , verifyToken, trackPeriod );

router.get("/periodTrack/day" ,  verifyToken, trackPeriodDay );







module.exports = router;
