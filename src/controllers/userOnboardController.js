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
const BirthControl = db.birthControl
const UserOnboard = db.userOnboard;
const UserIntegration = db.userIntegration
const log = console.log

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

const addIntegration = async (ctx) => {
  let data = {};
  let error = null;
  const { user, body }=ctx.request;
  const { integration } = body;
  const userId = _.get(user, "userId" );
  try {
    data = await UserIntegration.create({
      userId: userId,
      integration: integration,
      status: "active",
    });
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = HttpStatusCodes.SUCCESS;
};

const removeIntegration = async (ctx) => {
  let data = {};
  let error = null;
  const { user, body }=ctx.request;
  const { integration } = body;
  const userId = _.get(user, "userId" );
  try {
    data = await UserIntegration.update({
      status: "inactive",
    },{
      where :
      {
        userId: userId,
        integration: integration,  
      }
    })
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
  const { name, email, age, height,medicalHistoryId, 
    weight, allowReminder } = body;
  const userId = _.get(user, "userId");
  try {
    uptData = await UserOnboard.update(
      {
        height: height,
        weight: weight,
        age: age,
        medicalHistoryId:medicalHistoryId,
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
  let { startDate, endDate, cycle , birthControlId } = body;
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
    log(`milliseconds : ${moment(endDate).valueOf()}`)
    if(userData){
    uptData = await UserOnboard.update(
      {
        lastPeriodStart: startDate,
        lastPeriodEnd: endDate,
        menstrualCycle: cycle,
        birthControlId: birthControlId
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
      birthControlId: birthControlId,
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

const birthControlList = async (ctx) => {
  let {data } ={}
  let error = null
  const { user }=ctx.request;
  const userId = _.get(user, "userId");
  log( "userId :" , userId)
  try{
    data = await BirthControl.findAll({
      where :{
        tag : "birth control"
      },
      attributes:['id', 'description' , 'tag']
    })
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
    }
    ctx.body = responseHelper.buildResponse(error, data);
    ctx.response.status = HttpStatusCodes.SUCCESS;
  }

  const medicalHistoryList = async (ctx) => {
    let {data } ={}
    let error = null
    const { user }=ctx.request;
    const userId = _.get(user, "userId");
    log( "userId :" , userId)
    try{
      data = await BirthControl.findAll({
        where :{
          tag : "medical history"
        },
        attributes:['id', 'description' , 'tag']
      })
    } catch (err) {
      error = err;
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
      }
      ctx.body = responseHelper.buildResponse(error, data);
      ctx.response.status = HttpStatusCodes.SUCCESS;
    }
  


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
  getProfile:getProfile,
  birthControlList:birthControlList,
  medicalHistoryList:medicalHistoryList,
  addIntegration:addIntegration,
  removeIntegration:removeIntegration
};
