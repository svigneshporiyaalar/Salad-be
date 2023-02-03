const HttpStatusCodes = require("../constants/HttpStatusCodes");
const responseHelper = require("../helpers/responseHelper");
const db = require("../models");
const moment = require('moment')
const _ = require("lodash");
const { Op } = require("sequelize");
const log = console.log
const User = db.user;
const Symptom = db.symptom;
const UserTracking = db.userTracking;
const MoodTracking = db.moodTracking
const UserOnboard = db.userOnboard;



const dailyTrack = async (ctx) => {
  let data = {};
  let error = null;
  const userId = _.get(ctx.request.user, "userId", "Bad Response");
  let { date } = ctx.request.query;
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
  let responseCode = HttpStatusCodes.SUCCESS;
  const userId = _.get(ctx.request.user, "userId", "Bad Response");
  let { startDate, endDate  } = ctx.request.query;
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
  const { description, badgeId, day, time,
     level, preMood,postMood } = ctx.request.body;
  const userId = _.get(ctx.request.user, "userId", "Bad Response");
  try {
    data = await UserTracking.create({
      userId: userId,
      description:description,
      badgeId: badgeId,
      day:day,
      time:time,
      difficultyLevel:level,
      preWorkoutMood: preMood,
      postWorkoutMood: postMood
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
  const { description, badgeId, day, time,
     level, preMood,postMood } = ctx.request.body;
  const userId = _.get(ctx.request.user, "userId", "Bad Response");
  try {
    data = await UserTracking.update({
      description:description,
      difficultyLevel:level,
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
    }
    );
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = HttpStatusCodes.SUCCESS;
};


const postSymptoms = async (ctx) => {
  let data = {};
  let error = null;
  const { date , symptoms } = ctx.request.body;
  const userId = _.get(ctx.request.user, "userId", "Bad Response");
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

const removeSymptoms = async (ctx) => {
  let data = {};
  let error = null;
  const { date , symptoms } = ctx.request.body;
  const userId = _.get(ctx.request.user, "userId", "Bad Response");
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
  let responseCode = HttpStatusCodes.SUCCESS;
  const userId = _.get(ctx.request.user, "userId", "Bad Response");
  let { startDate, endDate  } = ctx.request.query;
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
  const userId = _.get(ctx.request.user, "userId", "Bad Response");
  let { date } = ctx.request.query;
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
  let data = {};
  let error = null;
  const userId = _.get(ctx.request.user, "userId", "Bad Response");
  try {
    data = await UserOnboard.findOne(
      {
        where: {
          userId: userId,
        },
        attributes: [ ['lastPeriodEnd', 'lastPeriod'] , 'menstrualCycle', 'createdAt', 'updatedAt'] ,

      });
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = HttpStatusCodes.SUCCESS;
};






module.exports = {
  everyDayTracking:everyDayTracking,
  updateDayTracking:updateDayTracking,
  dailyTrack: dailyTrack,
  dateTrack: dateTrack,
  postSymptoms:postSymptoms,
  removeSymptoms:removeSymptoms,
  trackMood: trackMood,
  lastPeriod:lastPeriod,
  trackDailyMood: trackDailyMood
};
