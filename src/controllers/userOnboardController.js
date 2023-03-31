const HttpStatusCodes = require("../constants/HttpStatusCodes");
const responseHelper = require("../helpers/responseHelper");
const db = require("../models");
const { Op } = require("sequelize");
const _ = require("lodash");
const chalk = require("chalk");
const moment = require('moment')
const log = console.log
const badgeConstants = require("../constants/badgeConstants");
const userConstants = require("../constants/userConstants")
const { getMenstrualPhase, getBadgeDetails } = require("../helpers/userHelper");
const { USR_SBEE_0008, USR_SBEE_0013 } = require("../constants/userConstants");
const User = db.user;
const Badge = db.badge;
const BadgeStatus = db.badgeStatus;
const BirthControl = db.birthControl
const UserOnboard = db.userOnboard;
const UserIntegration = db.userIntegration
const UserpartnerTracker = db.userPartnerTracker;


const primaryGoal = async (ctx) => {
  let data = {};
  let error = null;
  const {user, body}=ctx.request;
  const { goal, goalId } = body;
  const userId = _.get(user, "userId" );
  try {
    data = await UserOnboard.update({
      activeGoal: goal,
      goalId: goalId,
      goalStatus: badgeConstants.INPROGRESS
    },
    { 
      where :
      { userId: userId }
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
      status: badgeConstants.ACTIVE,
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
      status: badgeConstants.INACTIVE,
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
  const {  email, height, medicalHistoryId, 
    weight, DOB , allowReminder } = body;
  const userId = _.get(user, "userId");
  try {
    uptData = await UserOnboard.update(
      {
        height: height,
        weight: weight,
        birthDate:DOB,
        medicalHistoryId:medicalHistoryId,
        allowReminder:allowReminder
      },
      {
        where: {
          userId: userId,
        },
      });
    userData = await User.update(
      {
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
  let {data, userData, birthControl, newData, onboardData} = {};
  let error = null;
  const { user }=ctx.request;
  const userId = _.get(user, "userId");
  try {
    data = await UserOnboard.findOne({
      raw:true,
        where: {
          userId: userId,
        },
      });
    birthControl = data.birthControlId 
    newData = await BirthControl.findOne({
      raw:true,
      where:{
        id: birthControl,
      },
      attributes: [ ['id', 'birthControlId'], 'tag', 'description'] ,
    })
    onboardData ={ ...data , ...newData}
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
  ctx.body = responseHelper.buildResponse(error, {onboardData , userData});
  ctx.response.status = HttpStatusCodes.SUCCESS;
};

const profileImage = async (ctx) => {
  let data = {};
  let error = null;
  const {user, body}=ctx.request;
  const { imageURL } = body;
  const userId = _.get(user, "userId");
  try {
    data = await User.update({
        profileImage: imageURL,
      },
      {
        where: {
          userId: userId,
        },
      });
      log(data)
     if(data == 1){
      message= USR_SBEE_0013
     }else{
      message= USR_SBEE_0008
     } 
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, { message });
  ctx.response.status = HttpStatusCodes.SUCCESS;
};

const notificationData = async (ctx) => {
  let { pokeData, requestData } = {};
  let error = null;
  const { user }=ctx.request;
  const userId = _.get(user, "userId");
  const phoneNumber = _.get(user, "phoneNumber");
  try {
    pokeData = await UserpartnerTracker.findAll({
      raw:true,
        where: {
          userId: userId,
          action:userConstants.POKED
        },
      });
    requestData = await Userpartner.findAll({
      raw:true,
      where: {
        partnerNumber: phoneNumber,
        action:userConstants.REQUESTED
      },
    });
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, {pokeData, requestData});
  ctx.response.status = HttpStatusCodes.SUCCESS;
};


const getUserBadges = async (ctx) => {
  let {data , badgeList, badgeData } ={}
  let error = null
  const {user}=ctx.request;
  const userId = _.get(user, "userId");
  try{
    data = await BadgeStatus.findAll({
      raw:true,
      where:{
        userId:userId,
        badgeStatus: badgeConstants.ACTIVATE
      },
    })
    badgeList= data.map((element) =>{
      return element.badgeId
    })
    badgeData = await getBadgeDetails(badgeList)
    } catch (err) {
      error = err;
      log(err)
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
    }
    ctx.body = responseHelper.buildResponse(error, {data,badgeData});
    ctx.response.status = HttpStatusCodes.SUCCESS;
  }


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
  let { data , userData } = {};
  let error = null;
  let {user, body}=ctx.request;
  let { startDate, endDate, cycle , birthControlId } = body;
  const userId = _.get(user, "userId");
  try {
    data = await UserOnboard.findOne({
      where :
      { 
        userId : userId
      }
    })
    if(data){
    userData = await UserOnboard.update(
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
    }
    else
    {
    userData = await UserOnboard.create({
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
  ctx.body = responseHelper.buildResponse(error, userData );
  ctx.response.status = HttpStatusCodes.SUCCESS;
};

const lunarCycle = async (ctx) => {
  let { data, userData, startDate, endDate, 
    cycle, birthControlId } = {};
  let error = null;
  let { user }=ctx.request;
  const userId = _.get(user, "userId");
  try {
    startDate = moment(new Date).format('YYYY-MM-DD')
    endDate = moment(startDate).add(4, 'd').format('YYYY-MM-DD')
    cycle = 29.5
    birthControlId= 1
    log(chalk.blue.bold(`UserId:${userId} entering lunar cycle`))
    log(`Start date: ${chalk.yellow.bold(startDate)}, End date: ${chalk.yellow.bold(endDate)}`)
    // log(`start date in MS : ${moment(startDate).valueOf()},end date in MS : ${moment(endDate).valueOf()}`)
    data = await UserOnboard.findOne({
      where :
      { 
        userId : userId
      }
    })
    if(data){
    userData = await UserOnboard.update(
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
    }
    else{
    userData = await UserOnboard.create({
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
  ctx.body = responseHelper.buildResponse(error, userData );
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
  const type = _.get(user, "type");
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
        onboardingComplete : badgeConstants.TRUE,
        type:type
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
  profileImage:profileImage,
  menstrualDetails: menstrualDetails,
  lunarCycle:lunarCycle,
  updateActiveGoal: updateActiveGoal,
  completeOnboard:completeOnboard,
  getProfile:getProfile,
  notificationData:notificationData,
  birthControlList:birthControlList,
  medicalHistoryList:medicalHistoryList,
  addIntegration:addIntegration,
  removeIntegration:removeIntegration,
  getUserBadges:getUserBadges
};
