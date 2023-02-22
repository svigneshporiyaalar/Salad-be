const HttpStatusCodes = require("../constants/HttpStatusCodes");
const responseHelper = require("../helpers/responseHelper");
const db = require("../models");
const moment = require('moment')
const _ = require("lodash");
const { Op } = require("sequelize");
const badgeConstants = require("../constants/badgeConstants");
const log = console.log
const chalk = require("chalk");
const User = db.user;
const Symptom = db.symptom;
const UserTracking = db.userTracking;
const MoodTracking = db.moodTracking
const UserOnboard = db.userOnboard;



const dailyTrack = async (ctx) => {
  let data = {};
  let error = null;
  const { user, query }=ctx.request;
  const userId = _.get(user, "userId");
  let { date } = query;
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
  let data = {}
  let error = null;
  let condition = {}
  const {user, query}=ctx.request;
  let responseCode = HttpStatusCodes.SUCCESS;
  const userId = _.get(user, "userId");
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

const everyDayTracking = async (ctx) => {
  let data = {};
  let error = null;
  const {user, body}=ctx.request;
  const { description, badgeId, day, time, 
    preMood,postMood } = body;
  const userId = _.get(user, "userId");
  try {
    data = await UserTracking.create({
      userId: userId,
      description:description,
      badgeId: badgeId,
      day:day,
      time:time,
      preWorkoutMood: preMood,
      postWorkoutMood: postMood,
      badgeStatus: badgeConstants.INPROGRESS
    });
   log(data.createdAt)
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = HttpStatusCodes.SUCCESS;
};

const updateDayTracking = async (ctx) => {
  let data = {};
  let error = null;
  const {user, body}=ctx.request;
  const { description, badgeId, day, time,
     preMood,postMood } = body;
  const userId = _.get(user, "userId");
  try {
    data = await UserTracking.update({
      description:description,
      preWorkoutMood: preMood,
      postWorkoutMood: postMood
    },{
      where :
      {
        userId: userId,
        badgeId: badgeId,
        day:day,
        time:time,
      }
    });
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = HttpStatusCodes.SUCCESS;
};


const trackFeedback = async (ctx) => {
  let data = {};
  let error = null;
  const {user, body}=ctx.request;
  const { date , symptoms } = body;
  const userId = _.get(user, "userId");
  try {
    data = await MoodTracking.create({
      userId: userId,
      date: moment(date),
      symptoms: symptoms
    });
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = HttpStatusCodes.SUCCESS;
};

const removeFeedback = async (ctx) => {
  let data = {};
  let error = null;
  const {user, body}=ctx.request;
  const { date , symptoms } = body;
  const userId = _.get( user, "userId");
  try {
    data = await MoodTracking.destroy({
      userId: userId,
      date: moment(date),
      symptoms: symptoms
    });
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = HttpStatusCodes.SUCCESS;
};



const trackMood = async (ctx) => {
  let {data, symptom='' , moodData, symptomList , mergedData} = {};
  let error = null;
  let condition = {}
  const {user, query}=ctx.request;
  let responseCode = HttpStatusCodes.SUCCESS;
  const userId = _.get(user, "userId");
  let { startDate, endDate  } = query;
  if (startDate && endDate) {
    condition = {
      raw:true,
      where : {
        userId: userId,
        date : { [Op.lte]: moment(endDate), [Op.gte]: moment(startDate) }
      },
      attributes: [ ['symptoms', 'symptomId'] , 'date', 'userId'] ,
    }
  } else {
    condition= {
      where: { userId: userId },
      attributes: { exclude: ['createdAt', 'updatedAt'] }
   }
  }
  try {
    data = await MoodTracking.findAll(condition)
    data.forEach(element => {
      symptom += element.symptomId + ","
    });
    symptomList= symptom.split(",").slice(0,-1)
    moodData = await Symptom.findAll({
      raw:true,
        where: {
          symptomId: symptomList,
        },
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      });
    mergedData = data.map((item) => 
    ({...item, ...periodData.find(itm => itm.symptomId == item.symptomId)}));  
  } catch (err) {
    error = err;
    responseCode = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error,mergedData);
  ctx.response.status = responseCode;
}

const trackDailyMood = async (ctx) => {
  let {data, symptomId , symptom} = {};
  let error = null;
  const {user, query}=ctx.request;
  const userId = _.get(user, "userId", "Bad Response");
  let { date } = query;
  try {
    data = await MoodTracking.findOne(
      {
        where: {
          userId: userId,
          date : date
        },
      });
      symptomId = data.symptoms
    symptom = await Symptom.findOne(
        {
          where: {
            symptomId: symptomId,
          },
        });
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, symptom );
  ctx.response.status = HttpStatusCodes.SUCCESS;
};

const lastPeriod = async (ctx) => {
  let {data, periodStart,  periodEnd, cycle, ovulationPeak, periodData, 
    nextPeriodStart, periodStatus,follicularStart, follicularEnd, 
    ovulationStart , ovulationEnd,lutealStart, lutealEnd, periodGraph } = {};
  let error = null;
  const { user }=ctx.request;
  const userId = _.get(user, "userId");
  try {
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
      periodEnd = moment.utc(data.lastPeriodEnd).add(5,'d').format('YYYY-MM-DD HH:mm')
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
       follicularEnd = moment.utc(nextPeriodStart, 'YYYY-MM-DD').subtract(19,'d').format('YYYY-MM-DD HH:mm')
       ovulationStart = moment.utc(nextPeriodStart).subtract(18,'d').format('YYYY-MM-DD HH:mm')
       ovulationPeak = moment.utc(nextPeriodStart).subtract(14,'d').format('YYYY-MM-DD HH:mm')
       ovulationEnd = moment.utc(nextPeriodStart).subtract(13,'d').format('YYYY-MM-DD HH:mm')
       lutealStart = moment.utc(nextPeriodStart).subtract(12,'d').format('YYYY-MM-DD HH:mm')
       lutealEnd = moment.utc(nextPeriodStart).subtract(1,'d').format('YYYY-MM-DD HH:mm')
      }
     periodGraph =[{ ["follicular"]:{"start" : follicularStart, "end" : follicularEnd }},
     { ["ovulation"]: {"start" : ovulationStart, "peak": ovulationPeak, "end" : ovulationEnd }},
     { ["luteal"]:{"start" : lutealStart, "end" : lutealEnd }}]
     periodData = {...data,  nextPeriodStart, periodStatus , periodGraph}

  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, periodData);
  ctx.response.status = HttpStatusCodes.SUCCESS;
};






module.exports = {
  everyDayTracking:everyDayTracking,
  updateDayTracking:updateDayTracking,
  dailyTrack: dailyTrack,
  dateTrack: dateTrack,
  trackFeedback:trackFeedback,
  removeFeedback:removeFeedback,
  trackMood: trackMood,
  lastPeriod:lastPeriod,
  trackDailyMood: trackDailyMood
};
