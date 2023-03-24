const get = require("lodash/get");
const HttpStatusCodes = require("../constants/HttpStatusCodes");
const responseHelper = require("../helpers/responseHelper");
const db = require("../models");
const {  ERR_SBEE_0011 } = require("../constants/ApplicationErrorConstants");
const _ = require("lodash");
const { USR_SBEE_0004 } = require("../constants/userConstants");
const log = console.log
const chalk = require("chalk");
const badgeConstants = require("../constants/badgeConstants");
const User = db.user;
const Userpartner = db.userPartner;
const partnerSecret = process.env.JWT_SECRET3;
const MoodTracker = db.moodTracker;
const UserTracking = db.userTracking;
const BadgeStatus = db.badgeStatus;
const Badge = db.badge;


const updateProfile = async (ctx) => {
  let { data, message} = {};
  let error = null;
  const { partner }=ctx.request;
  const { ...rest } = get(partner, "body");
  const partnerId = _.get(partner, "userId");
  try {
    data = await User.update({ ...rest },
     {
      where: {
        userId:partnerId,
       },
      });
      message= USR_SBEE_0004
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, {message});
  ctx.response.status = HttpStatusCodes.SUCCESS;
};

const getUsers = async (ctx) => {
    let {data, userList, userData} ={}
    let error = null
    const { user}=ctx.request;
    const phoneNumber = _.get(user, "phoneNumber");
    try{
      data = await Userpartner.findAll({
        raw:true,
        where:{
          partnerNumber:phoneNumber,
        }
      })
       userList= data.map((element) =>{
        return element.userId
      })
      userData = await User.findAll({
        raw:true,
        where:{
          userId:userList,
        },
        order:[["createdAt", "DESC"]]
      })
    } catch (err) {
      error = err;
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
    }
    ctx.body = responseHelper.buildResponse(error, userData);
    ctx.response.status = HttpStatusCodes.SUCCESS;
  }


  const userTracking = async (ctx) => {
    let { date, startDate, endDate, moodData, trackingData,
       badgeList, badgeData } ={}
    let error = null
    const { user , query}=ctx.request;
    const phoneNumber = _.get(user, "phoneNumber");
    const { userId }= query
    date= new Date()
    endDate = moment.utc(date).subtract(1,'d').format('YYYY-MM-DD')
    startDate = moment.utc(endDate).subtract(6,'d').format('YYYY-MM-DD')
    try {
      moodData = await MoodTracker.findAll({
        raw:true,
        where:{
          userId:userId,
          date : { [Op.lte]: moment(endDate), [Op.gte]: moment(startDate) }
        },
        order:[["createdAt", "DESC"]]
      })
      statusData = await BadgeStatus.findAll({
        raw:true,
        where:{
          userId:userId,
          badgeStatus: badgeConstants.ACTIVATE
        },
      })
      badgeList= statusData.map((element) =>{
        return element.badgeId
      })
      trackingData = await UserTracking.findAll({
        raw:true,
        where:{
          userId:userId,
          badgeId:badgeList
        },
        order:[["createdAt", "DESC"]]
      })
      badgeData = await Badge.findAll({
        raw:true,
        where:{
          badgeId:badgeList,
        },
        attributes : ["name","badgeId","frequency" , "grantBadge", "type"]
      })
    } catch (err) {
      error = err;
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
    }
    ctx.body = responseHelper.buildResponse(error, 
      {moodData, trackingData, badgeData});
    ctx.response.status = HttpStatusCodes.SUCCESS;
  }


  const userIndividualBadgeTracking = async (ctx) => {
    let { date, startDate, endDate, trackingData, badgeData} ={}
    let error = null
    const { user , query}=ctx.request;
    const phoneNumber = _.get(user, "phoneNumber");
    const { userId , badgeId }= query
    date= new Date()
    endDate = moment.utc(date).subtract(1,'d').format('YYYY-MM-DD')
    startDate = moment.utc(endDate).subtract(6,'d').format('YYYY-MM-DD')
    try {
      badgeData = await Badge.findOne({
        raw:true,
        where:{
          badgeId:badgeId,
        },
      })
      trackingData = await UserTracking.findAll({
        raw:true,
        where:{
          userId:userId,
          badgeId:badgeId
        },
        order:[["createdAt", "DESC"]]
      })
    } catch (err) {
      error = err;
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
    }
    ctx.body = responseHelper.buildResponse(error, { badgeData, trackingData });
    ctx.response.status = HttpStatusCodes.SUCCESS;
  }



  const partnerOnboard = async (ctx) => {
    let data = {};
    let error = null;
    const { user }=ctx.request;
    const userId = _.get(user, "userId");
    const phoneNumber = _.get(user, "phoneNumber");
    const name = _.get(user, "name");
    const type = "partner"
    try {
      data = await User.update(
        {
          type: type,
          onboardingComplete: "true"
        },
        {
          where: {
            userId: userId,
          },
        })
        payload = {
          phoneNumber: phoneNumber,
          userId: userId,
          name:name,
          type:type
        }
        token = jwt.sign(payload, partnerSecret, { expiresIn: "2h" });
        log(chalk.green('Continuing as partner'))
    } catch (err) {
      error = err;
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
    }
    ctx.body = responseHelper.buildResponse(error, token);
    ctx.response.status = HttpStatusCodes.SUCCESS;
  };
  
  

module.exports = {
  updateProfile: updateProfile,
  getUsers:getUsers,
  partnerOnboard:partnerOnboard,
  userTracking:userTracking,
  userIndividualBadgeTracking:userIndividualBadgeTracking
};
