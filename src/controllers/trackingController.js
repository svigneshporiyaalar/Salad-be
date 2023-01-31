const HttpStatusCodes = require("../constants/HttpStatusCodes");
const responseHelper = require("../helpers/responseHelper");
const db = require("../models");
const moment = require('moment')
const _ = require("lodash");
const { Op } = require("sequelize");
const User = db.user;
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

const periodSymptoms = async (ctx) => {
  let data = {};
  let error = null;
  const { date , symptoms } = ctx.request.body;
  const userId = _.get(ctx.request.user, "userId", "Bad Response");
  try {
    data = await PeriodTracking.create({
      userId: userId,
      date: date,
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
    data = await PeriodTracking.findAll(condition)
  } catch (err) {
    error = err;
    responseCode = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = responseCode;
}

const trackPeriodDay = async (ctx) => {
  let data = {};
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
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = HttpStatusCodes.SUCCESS;
};







module.exports = {
  everyDayTracking:everyDayTracking,
  dailyTrack: dailyTrack,
  dateTrack: dateTrack,
  periodSymptoms:periodSymptoms,
  trackPeriod: trackPeriod,
  trackPeriodDay: trackPeriodDay
};
