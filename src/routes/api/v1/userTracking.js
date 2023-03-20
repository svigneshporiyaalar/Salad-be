const Router = require('koa-router');
const { v1 } = require('../../../constants/RouterConstants');
const { dateTrack,dailyTrack, updateDayTracking, lastPeriod,trackDailyMood,
     postDailyMood,postSymptom, removeSymptom, activatedBadges,
     todayWorkoutComplete, badgeTracker, trackWeeklyMood} = require('../../../controllers/trackingController');
const { symptomList, moodList } = require('../../../controllers/UserController');
const { userToken } = require('../../../middleware/authenticated');
const router = new Router({ prefix: v1.userTracking });


router.get("/symptom-list", userToken, symptomList )

router.get("/mood-list", userToken, moodList )

router.get("/weekly-mood" , userToken, trackWeeklyMood );

router.get("/everyday-mood" ,  userToken, trackDailyMood );

router.post("/daily-mood" ,userToken, postDailyMood );

router.post("/daily-symptom" ,userToken, postSymptom );

router.delete("/remove-symptom" ,userToken, removeSymptom );

router.get("/daily-workout" , userToken, dailyTrack );

router.get("/range-workout" , userToken, dateTrack );

router.post("/everyday/work-out" , userToken, todayWorkoutComplete );

router.put("/work-out/update" , userToken, updateDayTracking );

router.get("/lastperiod" , userToken, lastPeriod );

router.get("/badge-status", userToken, badgeTracker )













module.exports = router;
