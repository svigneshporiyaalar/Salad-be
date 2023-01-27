const HttpStatusCodes = require("../constants/HttpStatusCodes");
const responseHelper = require("../helpers/responseHelper");
const db = require("../models");
const moment = require('moment')
const _ = require("lodash");
const User = db.user;
const UserTracking = db.userTracking;
const PeriodTracking = db.periodTracking


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
  const { date , symptoms } = ctx.request.query;
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
  let {  startDate, endDate } = ctx.request.query;
  if (startDate && endDate) {
    let betweenDates = {
      [Op.lte]: moment(endDate).unix(),
      [Op.gte]: moment(startDate).unix(),
    }
    condition.where.date = betweenDates
  }
  console.log(betweenDates)
  try {
    data = await Booking.findAll(condition)
  } catch (err) {
    error = err;
    responseCode = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = responseCode;
}



const updateActiveGoal = async (ctx) => {
  let data = {};
  let error = null;
  const { goal, goalId } = ctx.request.body;
  const userId = _.get(ctx.request.user, "userId", "Bad Response");
  try {
    data = await UserOnboard.update(
      {
        activeGoal: goal,
        goalId: goalId,
      },
      {
        where: {
          userId: userId,
        },
      }
    );
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = HttpStatusCodes.SUCCESS;
};


const completeOnboard = async (ctx) => {
  let {data, userData } = {};
  let error = null;
  const userId = _.get(ctx.request.user, "userId", "Bad Response");
  try {
    data = await UserOnboard.update(
      {
        onboardStatus: "completed",
      },
      {
        where: {
          userId: userId,
        },
      });
    userData = await User.update(
      {
        onboardingComplete : "true",
      },
      {
        where: {
          userId: userId,
        },
      })
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = HttpStatusCodes.SUCCESS;
};


module.exports = {
  everyDayTracking:everyDayTracking,
  updateActiveGoal: updateActiveGoal,
  completeOnboard:completeOnboard,
  periodSymptoms:periodSymptoms,
  trackPeriod: trackPeriod
};
