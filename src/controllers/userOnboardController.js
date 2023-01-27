const HttpStatusCodes = require("../constants/HttpStatusCodes");
const responseHelper = require("../helpers/responseHelper");
const db = require("../models");
const { ERR_SBEE_0011 } = require("../constants/ApplicationErrorConstants");
const { Op } = require("sequelize");
const _ = require("lodash");
const User = db.user;
const Badge = db.badge;
const UserOnboard = db.userOnboard;

const primaryGoal = async (ctx) => {
  let data = {};
  let error = null;
  const { goal, goalId } = ctx.request.body;
  const userId = _.get(ctx.request.user, "userId", "Bad Response");
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
  let {data, userData} = {};
  let error = null;
  const { firstName, lastName, email, 
    age, height, weight, allowReminder } = ctx.request.body;
  const userId = _.get(ctx.request.user, "userId", "Bad Response");
  try {
    data = await UserOnboard.update(
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
        firstName:firstName,
        lastName:lastName,
        email:email,
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

const menstrualDetails = async (ctx) => {
  let data = {};
  let error = null;
  const { lastPeriod, cycle } = ctx.request.body;
  const userId = _.get(ctx.request.user, "userId", "Bad Response");
  try {
    data = await UserOnboard.update(
      {
        lastPeriodDate: lastPeriod,
        menstrualCycle: cycle,
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
  primaryGoal: primaryGoal,
  editProfile: editProfile,
  menstrualDetails: menstrualDetails,
  updateActiveGoal: updateActiveGoal,
  completeOnboard:completeOnboard
};
