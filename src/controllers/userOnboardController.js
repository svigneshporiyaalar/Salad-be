const HttpStatusCodes = require("../constants/HttpStatusCodes");
const responseHelper = require("../helpers/responseHelper");
const db = require("../models");
const { ERR_SBEE_0011 } = require("../constants/ApplicationErrorConstants");
const { Op } = require("sequelize");
const _ = require("lodash");
const moment = require('moment')
const badgeConstants = require("../constants/badgeConstants");
const { DATE } = require("sequelize");
const User = db.user;
const Badge = db.badge;
const UserOnboard = db.userOnboard;

const primaryGoal = async (ctx) => {
  let data = {};
  let error = null;
  const {user, body}=ctx.request;
  const { goal, goalId } = body;
  const userId = _.get(user, "userId" );
  try {
    data = await UserOnboard.create({
      activeGoal: goal,
      goalId: goalId,
      userId: userId,
    });
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = HttpStatusCodes.SUCCESS;
};

const editProfile = async (ctx) => {
  let {data, userData , uptData } = {};
  let error = null;
  const {user, body}=ctx.request;
  const { name, email, age, height, 
    weight, allowReminder } = body;
  const userId = _.get(user, "userId");
  try {
    uptData = await UserOnboard.update(
      {
        height: height,
        weight: weight,
        age: age,
        allowReminder: allowReminder
      },
      {
        where: {
          userId: userId,
        },
      });
    userData = await User.update(
      {
        name:name,
        email:email,
      },
      {
        where: {
          userId: userId,
        },
      })
    data = await UserOnboard.findOne({
      where :
        { 
          userId : userId
        }
      }) 
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = HttpStatusCodes.SUCCESS;
};

const getProfile = async (ctx) => {
  let {data, userData} = {};
  let error = null;
  const { user }=ctx.request;
  const userId = _.get(user, "userId");
  try {
    data = await UserOnboard.findOne(
      {
        where: {
          userId: userId,
        },
      });
    userData = await User.findOne(
      {
        where: {
          userId: userId,
        },
      })
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, {data , userData});
  ctx.response.status = HttpStatusCodes.SUCCESS;
};


const updateActiveGoal = async (ctx) => {
  let data = {};
  let error = null;
  const {user, body}=ctx.request;
  const { goal, goalId } = body;
  const userId = _.get(user, "userId");
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

const menstrualDetails = async (ctx) => {
  let { data , userData, uptData } = {};
  let error = null;
  let {user, body}=ctx.request;
  let { startDate, endDate, cycle } = body;
  const userId = _.get(user, "userId");
  try {
    userData = await UserOnboard.findOne({
      where :
      { 
        userId : userId
      }
    })
    if(!endDate){
      endDate = new Date;
    }
    console.log(`milliseconds : ${moment(endDate).valueOf()}`)
    if(userData){
    uptData = await UserOnboard.update(
      {
        lastPeriodStart: startDate,
        lastPeriodEnd: endDate,
        menstrualCycle: cycle,
      },
      {
        where: {
          userId: userId,
        },
      })
    data = await UserOnboard.findOne({
      where :
        { 
          userId : userId
        }
      })
    } 
    else{
    data = await UserOnboard.create({
      lastPeriodStart: startDate,
      lastPeriodEnd: endDate,
      menstrualCycle: cycle,
      userId: userId,
      });
    }
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data );
  ctx.response.status = HttpStatusCodes.SUCCESS;
};

const completeOnboard = async (ctx) => {
  let {data, userData } = {};
  let error = null;
  const { user }=ctx.request;
  const userId = _.get(user, "userId");
  try {
    data = await UserOnboard.update(
      {
        onboardStatus: badgeConstants.COMPLETED
      },
      {
        where: {
          userId: userId,
        },
      });
    userData = await User.update(
      {
        onboardingComplete : badgeConstants.TRUE
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
  primaryGoal: primaryGoal,
  editProfile: editProfile,
  menstrualDetails: menstrualDetails,
  updateActiveGoal: updateActiveGoal,
  completeOnboard:completeOnboard,
  getProfile:getProfile
};
