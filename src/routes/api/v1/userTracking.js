const Router = require('koa-router');
const { v1 } = require('../../../constants/RouterConstants');
const { getBadgeStatus } = require('../../../controllers/goalBadgeController');
const { everyDayTracking,dateTrack,dailyTrack, updateDayTracking,
     lastPeriod,trackMood,trackDailyMood,trackFeedback,
     removeFeedback} = require('../../../controllers/trackingController');
const { feedbackList } = require('../../../controllers/UserController');
const { userToken } = require('../../../middleware/authenticated');
const router = new Router({ prefix: v1.userTracking });


router.post("/everyday" , userToken, everyDayTracking );

router.put("/updatetrack" , userToken, updateDayTracking );

router.get("/dailytrack" , userToken, dailyTrack );

router.get("/datetrack" , userToken, dateTrack );

router.post("/feedback" ,userToken, trackFeedback );

router.delete("/remove/feedback" ,userToken, removeFeedback );

router.get("/moodtrack" , userToken, trackMood );

router.get("/daily/moodtrack" ,  userToken, trackDailyMood );

router.get("/lastperiod" , userToken, lastPeriod );

router.get("/badgeStatus", userToken, getBadgeStatus)

router.get("/feedback-list", userToken, feedbackList )





module.exports = router;
