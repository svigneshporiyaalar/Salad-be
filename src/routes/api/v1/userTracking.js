const Router = require('koa-router');
const { v1 } = require('../../../constants/RouterConstants');
const { getBadgeStatus } = require('../../../controllers/goalBadgeController');
const { everyDayTracking,dateTrack,dailyTrack, updateDayTracking, 
     removeSymptoms,lastPeriod,postSymptoms,trackMood,
     trackDailyMood} = require('../../../controllers/trackingController');
const { verifyToken } = require('../../../middleware/authenticated');
const router = new Router({ prefix: v1.userTracking });


router.post("/everyday" , verifyToken, everyDayTracking );

router.put("/updatetrack" , verifyToken, updateDayTracking );

router.get("/dailytrack" , verifyToken, dailyTrack );

router.get("/datetrack" , verifyToken, dateTrack );

router.post("/symptoms" ,verifyToken, postSymptoms );

router.delete("/remove/symptom" ,verifyToken, removeSymptoms );

router.get("/moodtrack" , verifyToken, trackMood );

router.get("/daily/moodtrack" ,  verifyToken, trackDailyMood );

router.get("/lastperiod" , verifyToken, lastPeriod );

router.get("/badgeStatus", verifyToken, getBadgeStatus)





module.exports = router;
