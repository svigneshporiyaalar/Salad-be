const HttpStatusCodes = require("../constants/HttpStatusCodes");
const responseHelper = require("../helpers/responseHelper");
const db = require("../models");
const moment = require('moment')
const _ = require("lodash");
const { Op } = require("sequelize");
const badgeConstants = require("../constants/badgeConstants");
const log = console.log
const chalk = require("chalk");
const Feedback = db.feedback
const Badge = db.badge
const UserTracking = db.userTracking;
const MoodTracker = db.moodTracker
const UserOnboard = db.userOnboard;
const ProductivityTracker = db.productivityTracker
const Productivity = db.productivity
const SleepTracker = db.sleepTracker



const dailyTrack = async (ctx) => {
  let { data, date } = {};
  let error = null;
  const { user  }=ctx.request;
  const userId = _.get(user, "userId");
  date = new Date()
  try {
    data = await UserTracking.findAll(
      {
        where: {
          userId: userId,
          date : date
        },
      });
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = HttpStatusCodes.SUCCESS;
};

const dateTrack = async (ctx) => {
  let {data, condition, date} = {}
  let error = null;
  const {user, query}=ctx.request;
  let responseCode = HttpStatusCodes.SUCCESS;
  const userId = _.get(user, "userId");
  date = new Date()
  let { startDate, endDate  } = query;
  if (startDate && endDate) {
    condition = {
      where : {
        userId: userId,
        date : { [Op.lte]: moment(endDate), [Op.gte]: moment(startDate) }
      }
    }
  } else {
    condition= {
      where: { userId: userId },
   }
  }
  try {
    data = await UserTracking.findAll(condition)
  } catch (err) {
    error = err;
    responseCode = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = responseCode;
}

const todayWorkoutComplete = async (ctx) => {
  let {data, badgeDetails, defaultValue,newData, badgeType} = {};
  let error = null;
  const {user, body}=ctx.request;
  let {  badgeId,preMood,parameter, trackValue} = body;
  let userId = _.get(user, "userId");
  let today = moment.utc(new Date()).format('YYYY-MM-DD')
  let time = moment(new Date()).format('HH:mm')
  try {
    data = await UserTracking.create({
      userId: userId,
      badgeId: badgeId,
      trackParameter:parameter,
      defaultTrack: trackValue,
      date:today,
      time:time,
      preWorkoutMood: preMood,
    });
    badgeDetails = await Badge.findOne({
      raw:true,
      where:{
        badgeId:badgeId,
      },
      attributes : ["name","badgeId","frequency" , "grantBadge", "type","defaultTrack"]
    })
    defaultValue = badgeDetails.defaultTrack
    badgeType = badgeDetails.type
    log(trackValue, defaultValue , badgeType)
    if (badgeType == "Nutrition" || trackValue >= defaultValue){
      log("hello" , userId, badgeId)
      newData = await UserTracking.update({
        isDayWorkoutComplete: badgeConstants.TRUE
      },
      {
      where : {
        userId: userId,
        badgeId: badgeId,
        // date:date,
        // time:time
      }
    }) 
  } else {
     log("hello 2", userId,badgeId,date,time)
      newData = await UserTracking.update({
        isDayWorkoutComplete: badgeConstants.FALSE
      },
      {
      where : {
        userId: userId,
        badgeId: badgeId,
        // date:date,
        // time:time
      }
    });
    }
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, newData);
  ctx.response.status = HttpStatusCodes.SUCCESS;
};

const updateDayTracking = async (ctx) => {
  let data = {};
  let error = null;
  const {user, body}=ctx.request;
  const { badgeId, date, postMood, level  } = body;
  const userId = _.get(user, "userId");
  try {
    data = await UserTracking.update({
      postWorkoutMood: postMood,
      difficultyLevel:level
     },
    {
      where :
      {
        userId: userId,
        badgeId: badgeId,
        date:date,
      }
    });
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = HttpStatusCodes.SUCCESS;
};


const postSymptom = async (ctx) => {
  let {data , symptomData, symptomId} = {};
  let error = null;
  const {user, body}=ctx.request;
  const { date , symptom } = body;
  const userId = _.get(user, "userId");
  try {
    symptomData = await Feedback.findOne({
      raw:true,
        where: {
          tag:"symptom",
          description: symptom,
        },
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      });
     symptomId = symptomData.feedbackId
    data = await MoodTracker.create({
      userId: userId,
      date: moment(date),
      symptoms: symptomId
    });
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = HttpStatusCodes.SUCCESS;
};


const removeSymptom = async (ctx) => {
  let {data , symptomData, symptomId} = {};
  let error = null;
  const {user, body}=ctx.request;
  const { date , symptom } = body;
  const userId = _.get( user, "userId");
  try {
    symptomData = await Feedback.findOne({
      raw:true,
        where: {
          tag:"symptom",
          description: symptom,
        },
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      });
     symptomId = symptomData.feedbackId
    data = await MoodTracker.destroy({
      userId: userId,
      date: moment(date),
      symptoms: symptomId
    });
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = HttpStatusCodes.SUCCESS;
};

const postDailyMood = async (ctx) => {
  let {data , moodData , moodId , today , time} = {};
  let error = null;
  const {user, body}=ctx.request;
  const { mood } = body;
  const userId = _.get(user, "userId");
  today = moment.utc(new Date()).format('YYYY-MM-DD')
  time = moment(new Date()).format('HH:mm')
  try {
    moodData = await Feedback.findOne({
      raw:true,
        where: {
          tag:"mood",
          description: mood,
        },
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      });
     moodId = moodData.feedbackId
    data = await MoodTracker.create({
      userId: userId,
      date: today,
      time:time,
      mood:moodId
    })
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = HttpStatusCodes.SUCCESS;
};


const trackWeeklyMood = async (ctx) => {
  let {data, feedback, moodData, mergedData, condition, 
    date, startDate, endDate} = {};
  let error = null;
  const {user }=ctx.request;
  let responseCode = HttpStatusCodes.SUCCESS;
  const userId = _.get(user, "userId");
  date= new Date()
  endDate = moment.utc(date).subtract(1,'d').format('YYYY-MM-DD')
  startDate = moment.utc(endDate).subtract(6,'d').format('YYYY-MM-DD')
  condition = {
      raw:true,
      where : {
        userId: userId,
        date : { [Op.lte]: moment(endDate), [Op.gte]: moment(startDate) }
      },
      attributes: [ ['mood', 'moodId'], 'date', 'userId'] ,
    }
  try {
    data = await MoodTracker.findAll(condition)
    feedback = data.map(element => {
      return element.moodId
    });
    moodData = await Feedback.findAll({
      raw:true,
        where: {
          feedbackId: feedback,
        },
      });
    mergedData = data.map((item) => 
    ({...item, ...moodData.find(itm => itm.feedbackId === item.moodId)}));  
  } catch (err) {
    error = err;
    responseCode = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error,mergedData);
  ctx.response.status = responseCode;
}

const trackDailyMood = async (ctx) => {
  let {data, feedbackId , feedback, date} = {};
  let error = null;
  const { user }=ctx.request;
  const userId = _.get(user, "userId", "Bad Response");
  date = new Date()
  try {
    data = await MoodTracker.findOne(
      {
        where: {
          userId: userId,
          date : date
        },
      });
      feedbackId = data.mood
    feedback = await Feedback.findOne(
        {
          where: {
            feedbackId: feedbackId,
          },
        });
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, feedback );
  ctx.response.status = HttpStatusCodes.SUCCESS;
};


const lastPeriod = async (ctx) => {
  let {data, periodStart,  periodEnd, cycle, ovulationPeak, periodData, 
    nextPeriodStart, periodStatus,follicularStart, follicularEnd, 
    ovulationStart , ovulationEnd,lutealStart, lutealEnd, periodGraph } = {};
  let { today, condition, isMenstruation, isFollicular, isLuteal, isOvulation}  ={}
  let error = null;
  const { user }=ctx.request;
  const userId = _.get(user, "userId");
  try {
    today = moment.utc(new Date()).format('YYYY-MM-DD HH:mm')
    data = await UserOnboard.findOne(
      {
        raw:true, 
        where: {
          userId: userId,
        },
        attributes: ['lastPeriodStart','lastPeriodEnd', 
         ['menstrualCycle', 'periodCycle'] , 'birthControlId' ]
      });
      periodStart = moment.utc(data.lastPeriodStart).format('YYYY-MM-DD HH:mm')
      periodEnd = moment.utc(data.lastPeriodEnd).format('YYYY-MM-DD HH:mm')
      log(periodStart , periodEnd)
      cycle= data.periodCycle
      if(cycle === 29.5 ){
        log(chalk.blue.bold("Lunar cycle mode"))
        periodStatus = "Lunar cycle"
        follicularStart = moment.utc(periodStart).add(5,'d').format('YYYY-MM-DD HH:mm')
        follicularEnd = moment.utc(periodStart).add(13,'d').format('YYYY-MM-DD HH:mm')
        ovulationStart = moment.utc(periodStart).add(14,'d').format('YYYY-MM-DD HH:mm')
        ovulationPeak = moment.utc(periodStart).add(16,'d').format('YYYY-MM-DD HH:mm')
        ovulationEnd = moment.utc(periodStart).add(17,'d').format('YYYY-MM-DD HH:mm')
        lutealStart = moment.utc(periodStart).add(18,'d').format('YYYY-MM-DD HH:mm')
        lutealEnd = moment.utc(periodStart).add(29,'d').add(12 ,'h').format('YYYY-MM-DD HH:mm')
        nextPeriodStart = moment.utc(periodStart).add(29,'d').add(12 ,'h').add(1,'m').format('YYYY-MM-DD HH:mm')
      }
      else{
       log(chalk.green.bold("Normal"))
       nextPeriodStart = moment.utc(periodStart,'YYYY-MM-DD').add(cycle,'d').format('YYYY-MM-DD HH:mm')
       periodStatus = "normal"
       follicularStart = moment.utc(periodEnd, 'YYYY-MM-DD').add(1,'d').format('YYYY-MM-DD HH:mm')
       follicularEnd = moment.utc(nextPeriodStart, 'YYYY-MM-DD').subtract(17,'d').format('YYYY-MM-DD HH:mm')
       ovulationStart = moment.utc(nextPeriodStart).subtract(16,'d').format('YYYY-MM-DD HH:mm')
       ovulationPeak = moment.utc(nextPeriodStart).subtract(14,'d').format('YYYY-MM-DD HH:mm')
       ovulationEnd = moment.utc(nextPeriodStart).subtract(12,'d').format('YYYY-MM-DD HH:mm')
       lutealStart = moment.utc(nextPeriodStart).subtract(11,'d').format('YYYY-MM-DD HH:mm')
       lutealEnd = moment.utc(nextPeriodStart).subtract(1,'d').format('YYYY-MM-DD HH:mm')
      }
      isFollicular =moment(today).isBetween(follicularStart , follicularEnd ,undefined, '[]'); 
      isOvulation =moment(today).isBetween(ovulationStart , ovulationEnd ,undefined, '[]'); 
      isLuteal =moment(today).isBetween(lutealStart , lutealEnd ,undefined, '[]'); 
      isMenstruation =moment(today).isBetween(periodStart , periodEnd ,undefined, '[]'); 
      condition ={ isFollicular,isOvulation,isLuteal,isMenstruation}
     periodGraph =[{ ["follicular"]:{"start" : follicularStart, "end" : follicularEnd }},
     { ["ovulation"]: {"start" : ovulationStart, "peak": ovulationPeak, "end" : ovulationEnd }},
     { ["luteal"]:{"start" : lutealStart, "end" : lutealEnd }}]
     periodData = {...data,  nextPeriodStart, periodStatus , periodGraph, ...condition}
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, periodData);
  ctx.response.status = HttpStatusCodes.SUCCESS;
};

const badgeTracker = async (ctx) => {
  let {data, statusData, badgeList, badgeDetails } ={}
  let error = null
  const { user  }=ctx.request;
  const userId = _.get(user, "userId");
  try{
    statusData = await BadgeStatus.findAll({
      raw:true,
      where:{
        userId:userId,
        badgeStatus: badgeConstants.ACTIVATE
      },
    })
    badgeList= statusData.map((element) =>{
      return element.badgeId
    })
    data = await UserTracking.findAll({
      where:
      { 
        userId: userId,
        badgeId:badgeList
      },
      order:[["createdAt", "DESC"]]
    })
    badgeDetails = await Badge.findAll({
      raw:true,
      where:{
        badgeId:badgeList,
      },
      attributes : ["name","badgeId","frequency" , "grantBadge", "type"]
    })
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, {data, badgeDetails});
  ctx.response.status = HttpStatusCodes.SUCCESS;
}

const activeAndEarned = async (ctx) => {
  let {data, statusData, badgeList, badgeDetails, earnedBadges } ={}
  let error = null
  const { user  }=ctx.request;
  const userId = _.get(user, "userId");
  try{
    statusData = await BadgeStatus.findAll({
      raw:true,
      where:{
        userId:userId,
        badgeStatus: badgeConstants.ACTIVATE
      },
    })
    earnedBadges = await BadgeStatus.findAll({
      raw:true,
      where:{
        userId:userId,
        badgeStatus: badgeConstants.COMPLETED
      },
    })
    badgeList= statusData.map((element) =>{
      return element.badgeId
    })
    data = await UserTracking.findAll({
      where:
      { 
        userId: userId,
        badgeId:badgeList
      },
      order:[["createdAt", "DESC"]]
    })
    badgeDetails = await Badge.findAll({
      raw:true,
      where:{
        badgeId:badgeList,
      },
      attributes : ["name","badgeId","frequency" , "grantBadge", "type"]
    })
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, {data, badgeDetails, earnedBadges});
  ctx.response.status = HttpStatusCodes.SUCCESS;
}


const postSleep = async (ctx) => {
  let {data, date, yesterday} = {};
  let error = null;
  const {user, body}=ctx.request;
  const { sleepHour } = body;
  const userId = _.get(user, "userId");
  date = new Date()
  yesterday = moment.utc(new Date()).subtract(1,'d').format('YYYY-MM-DD')
  try {
    data = await SleepTracker.create({
      userId: userId,
      date: yesterday,
      hoursOfSleep: sleepHour
    });
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = HttpStatusCodes.SUCCESS;
};

const trackWeeklySleep = async (ctx) => {
  let {data, condition, date, startDate, endDate} = {};
  let error = null;
  const {user }=ctx.request;
  let responseCode = HttpStatusCodes.SUCCESS;
  const userId = _.get(user, "userId");
  date= new Date()
  endDate = moment.utc(date).subtract(1,'d').format('YYYY-MM-DD')
  startDate = moment.utc(endDate).subtract(6,'d').format('YYYY-MM-DD')
  condition = {
      raw:true,
      where : {
        userId: userId,
        date : { [Op.lte]: moment(endDate), [Op.gte]: moment(startDate) }
      },
    }
  try {
    data = await SleepTracker.findAll(condition)
  } catch (err) {
    error = err;
    responseCode = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = responseCode;
}

const productivityList = async (ctx) => {
  let data  ={}
  let error = null
  const { user }=ctx.request;
  const userId = _.get(user, "userId");
  try{
    data = await Productivity.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt', 'id'] }
    })
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = HttpStatusCodes.SUCCESS;
}

const postProductivity = async (ctx) => {
  let { data, date, today , prodData , prodPoint } = {};
  let error = null;
  const {user, body}=ctx.request;
  const { productivity } = body;
  const userId = _.get(user, "userId");
  date = new Date()
  today = moment.utc(new Date()).format('YYYY-MM-DD')
  try {
    prodData = await Productivity.findOne({
      raw:true,
        where: {
          tag: productivity,
        },
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      });
     prodPoint = prodData.points
    data = await ProductivityTracker.create({
      userId: userId,
      date: today,
      productivityPoints: prodPoint
    });
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = HttpStatusCodes.SUCCESS;
};

const trackWeeklyProductivity = async (ctx) => {
  let {data, condition, date, startDate, endDate} = {};
  let error = null;
  const {user }=ctx.request;
  let responseCode = HttpStatusCodes.SUCCESS;
  const userId = _.get(user, "userId");
  date= new Date()
  endDate = moment.utc(date).subtract(1,'d').format('YYYY-MM-DD')
  startDate = moment.utc(endDate).subtract(6,'d').format('YYYY-MM-DD')
  condition = {
      raw:true,
      where : {
        userId: userId,
        date : { [Op.lte]: moment(endDate), [Op.gte]: moment(startDate) }
      },
    }
  try {
    data = await ProductivityTracker.findAll(condition)
  } catch (err) {
    error = err;
    responseCode = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = responseCode;
}





module.exports = {
  todayWorkoutComplete:todayWorkoutComplete,
  updateDayTracking:updateDayTracking,
  dailyTrack: dailyTrack,
  dateTrack: dateTrack,
  postSymptom,postSymptom,
  removeSymptom: removeSymptom,
  postDailyMood:postDailyMood,
  trackWeeklyMood:trackWeeklyMood,
  trackDailyMood: trackDailyMood,
  lastPeriod:lastPeriod,
  badgeTracker:badgeTracker,
  activeAndEarned:activeAndEarned,
  postSleep:postSleep,
  trackWeeklySleep:trackWeeklySleep,
  productivityList:productivityList,
  postProductivity:postProductivity,
  trackWeeklyProductivity:trackWeeklyProductivity
};
