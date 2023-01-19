const HttpStatusCodes = require("../constants/HttpStatusCodes");
const responseHelper = require("../helpers/responseHelper");
const db = require("../models");
const {  ERR_SBEE_0011 } = require("../constants/ApplicationErrorConstants");
const { Op } = require("sequelize");
const _ = require("lodash");
const { USR_SBEE_0004 } = require("../constants/userConstants");
const User = db.user;
const Badge = db.badge;
const Goal = db.goal;
const UserOnboard=db.userOnboard


const onboardDetails = async (ctx) => {
  let data = {};
  let error = null;
  const {goal ,goalId } = ctx.request.body
  const userId = _.get(ctx.request.user, "userId", "Bad Response");
  try {
    data = await UserOnboard.create({
      activeGoal: goal,
      goalId:goalId,
      userId:userId
    });
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = HttpStatusCodes.SUCCESS;
};

const otherDetails = async (ctx) => {
  let data = {};
  let error = null;
  const { height, weight,last_period,cycle  } = ctx.request.body
  const userId = _.get(ctx.request.user, "userId", "Bad Response");
  try {
    data = await UserOnboard.update({
      height:height,
      weight:weight,
      lastPeriodDate: last_period,
      menstrualcycle: cycle
    },{
      where :
      {
      userId:userId,
      }
    })
    } catch (err) {
      error = err;
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
    }
    ctx.body = responseHelper.buildResponse(error, data);
    ctx.response.status = HttpStatusCodes.SUCCESS;
  };
  


 
  

module.exports = {
  onboardDetails:onboardDetails,
  otherDetails:otherDetails
};
