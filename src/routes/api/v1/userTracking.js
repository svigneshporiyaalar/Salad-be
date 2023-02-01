const Router = require('koa-router');
const { v1 } = require('../../../constants/RouterConstants');
const { everyDayTracking, periodSymptoms, trackPeriod,
     trackPeriodDay,dateTrack,dailyTrack, updateDayTracking} = require('../../../controllers/trackingController');
const { verifyToken } = require('../../../middleware/authenticated');
const router = new Router({ prefix: v1.userTracking });


router.post("/everyDay" , verifyToken, everyDayTracking );

router.put("/updateTrack" , verifyToken, updateDayTracking );

router.get("/dailyTrack" , verifyToken, dailyTrack );

router.get("/dateTrack" , verifyToken, dateTrack );

router.post("/periodSymptoms" ,verifyToken, periodSymptoms );

router.get("/periodTrack" , verifyToken, trackPeriod );

router.get("/daily/periodTrack" ,  verifyToken, trackPeriodDay );




module.exports = router;
