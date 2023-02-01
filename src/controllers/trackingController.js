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
const PeriodTracking = db.periodTracking


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
    console.log(data.createdAt)
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


const periodSymptoms = async (ctx) => {
  let data = {};
  let error = null;
  const { date , symptoms, userId } = ctx.request.body;
  // const userId = _.get(ctx.request.user, "userId", "Bad Response");
  try {
    data = await PeriodTracking.create({
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


const trackPeriod = async (ctx) => {
  let {data, symptom='' , periodData, symptomList , mergedData} = {};
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
    data = await PeriodTracking.findAll(condition)
    data.forEach(element => {
      symptom += element.symptomId + ","
    });
    symptomList= symptom.split(",").slice(0,-1)
    periodData = await Symptom.findAll({
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

const trackPeriodDay = async (ctx) => {
  let {data, symptomId , periodSymptom} = {};
  let error = null;
  const userId = _.get(ctx.request.user, "userId", "Bad Response");
  let { date } = ctx.request.query;
  try {
    data = await PeriodTracking.findOne(
      {
        where: {
          userId: userId,
          date : date
        },
      });
      symptomId = data.symptoms
    periodSymptom = await Symptom.findOne(
        {
          where: {
            symptomId: symptomId,
          },
        });
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, periodSymptom );
  ctx.response.status = HttpStatusCodes.SUCCESS;
};





module.exports = {
  everyDayTracking:everyDayTracking,
  updateDayTracking:updateDayTracking,
  dailyTrack: dailyTrack,
  dateTrack: dateTrack,
  periodSymptoms:periodSymptoms,
  trackPeriod: trackPeriod,
  trackPeriodDay: trackPeriodDay
};
