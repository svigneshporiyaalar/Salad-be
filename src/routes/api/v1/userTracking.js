const Router = require('koa-router');
const { v1 } = require('../../../constants/RouterConstants');
const { dateTrack,dailyTrack, updateDayTracking, lastPeriod,trackDailyMood,
     postDailyMood,postSymptom, removeSymptom,todayWorkoutComplete, badgeTracker, 
     trackWeeklyMood, postSleep, trackWeeklySleep, productivityList, postProductivity, 
     trackWeeklyProductivity,activeAndEarned, nextUpBadges} = require('../../../controllers/trackingController');
const { symptomList, moodList, badgeRunway, badgeArchived } = require('../../../controllers/userController');
const { userToken } = require('../../../middleware/authenticated');
const router = new Router({ prefix: v1.userTracking });


router.get("/badge-runway", userToken, badgeRunway )  //ok

router.put("/badge-archived", userToken, badgeArchived )  //ok 

router.get("/symptom-list", userToken, symptomList )  //ok B07

router.get("/mood-list", userToken, moodList )

router.get("/weekly-mood" , userToken, trackWeeklyMood ); // ok B02

router.get("/everyday-mood" ,  userToken, trackDailyMood );

router.post("/daily-mood" ,userToken, postDailyMood );

router.post("/daily-symptom" ,userToken, postSymptom ); //ok

router.delete("/remove-symptom" ,userToken, removeSymptom );

router.get("/daily-workout" , userToken, dailyTrack ); //ok

router.get("/range-workout" , userToken, dateTrack );

router.post("/everyday/work-out" , userToken, todayWorkoutComplete ); //ok

router.put("/work-out/update" , userToken, updateDayTracking );

router.get("/lastperiod" , userToken, lastPeriod );   //ok B04,B05,B06

router.get("/badge-status", userToken, badgeTracker ) //ok B03

router.get("/badges/active-earned", userToken, activeAndEarned ) //ok

router.get("/badges/next-up", userToken, nextUpBadges ) //ok

router.post("/daily-sleep" ,userToken, postSleep);   //ok B02

router.get("/weekly-sleep" ,userToken, trackWeeklySleep); //ok C05

router.get("/productivity-list" ,userToken, productivityList); //ok

router.post("/daily-productivity" ,userToken, postProductivity); //ok

router.get("/weekly-productivity" ,userToken, trackWeeklyProductivity); //ok C04






module.exports = router;
