const Router = require('koa-router');
const { v1 } = require('../../../constants/RouterConstants');
const { getBadgeStatus } = require('../../../controllers/goalBadgeController');
const { everyDayTracking, periodSymptoms, trackPeriod,
     trackPeriodDay,dateTrack,dailyTrack, updateDayTracking, 
     removeSymptoms,
     lastPeriod} = require('../../../controllers/trackingController');
const { verifyToken } = require('../../../middleware/authenticated');
const router = new Router({ prefix: v1.userTracking });


router.post("/everyday" , verifyToken, everyDayTracking );

router.put("/updatetrack" , verifyToken, updateDayTracking );

router.get("/dailytrack" , verifyToken, dailyTrack );

router.get("/datetrack" , verifyToken, dateTrack );

router.post("/periodsymptoms" ,verifyToken, periodSymptoms );

router.delete("/remove/symptom" ,verifyToken, removeSymptoms );

router.get("/periodtrack" , verifyToken, trackPeriod );

router.get("/daily/periodtrack" ,  verifyToken, trackPeriodDay );

router.get("/lastperiod" , verifyToken, lastPeriod );

router.get("/badgeStatus", verifyToken, getBadgeStatus)






module.exports = router;
