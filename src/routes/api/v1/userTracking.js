const Router = require('koa-router');
const { v1 } = require('../../../constants/RouterConstants');
const { dateTrack,dailyTrack, updateDayTracking, lastPeriod,trackDailyMood,
     postDailyMood,postSymptom, removeSymptom,todayWorkoutComplete, badgeTracker, 
     trackWeeklyMood, postSleep, trackWeeklySleep, productivityList, postProductivity, 
     trackWeeklyProductivity, 
     activeAndEarned} = require('../../../controllers/trackingController');
const { symptomList, moodList } = require('../../../controllers/UserController');
const { userToken } = require('../../../middleware/authenticated');
const router = new Router({ prefix: v1.userTracking });



router.get("/symptom-list", userToken, symptomList )  //ok

router.get("/mood-list", userToken, moodList )

router.get("/weekly-mood" , userToken, trackWeeklyMood );

router.get("/everyday-mood" ,  userToken, trackDailyMood );

router.post("/daily-mood" ,userToken, postDailyMood );

router.post("/daily-symptom" ,userToken, postSymptom ); //ok

router.delete("/remove-symptom" ,userToken, removeSymptom );

router.get("/daily-workout" , userToken, dailyTrack );

router.get("/range-workout" , userToken, dateTrack );

router.post("/everyday/work-out" , userToken, todayWorkoutComplete );

router.put("/work-out/update" , userToken, updateDayTracking );

router.get("/lastperiod" , userToken, lastPeriod );   //ok

router.get("/badge-status", userToken, badgeTracker ) //ok

router.get("/badges/active-earned", userToken, activeAndEarned ) //ok

router.post("/daily-sleep" ,userToken, postSleep);   //ok

router.get("/weekly-sleep" ,userToken, trackWeeklySleep); //ok

router.get("/productivity-list" ,userToken, productivityList); //ok

router.post("/daily-productivity" ,userToken, postProductivity); //ok

router.get("/weekly-productivity" ,userToken, trackWeeklyProductivity); //ok






module.exports = router;
