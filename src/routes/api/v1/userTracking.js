const Router = require('koa-router');
const { v1 } = require('../../../constants/RouterConstants');
const { getBadgeStatus } = require('../../../controllers/goalBadgeController');
const { everyDayTracking,dateTrack,dailyTrack, updateDayTracking, 
     removeSymptoms,lastPeriod,postSymptoms,trackMood,
     trackDailyMood} = require('../../../controllers/trackingController');
const { verifyToken, userToken } = require('../../../middleware/authenticated');
const router = new Router({ prefix: v1.userTracking });


router.post("/everyday" , userToken, everyDayTracking );

router.put("/updatetrack" , userToken, updateDayTracking );

router.get("/dailytrack" , userToken, dailyTrack );

router.get("/datetrack" , userToken, dateTrack );

router.post("/symptoms" ,userToken, postSymptoms );

router.delete("/remove/symptom" ,userToken, removeSymptoms );

router.get("/moodtrack" , userToken, trackMood );

router.get("/daily/moodtrack" ,  userToken, trackDailyMood );

router.get("/lastperiod" , userToken, lastPeriod );

router.get("/badgeStatus", userToken, getBadgeStatus)





module.exports = router;
