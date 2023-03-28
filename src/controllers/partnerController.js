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
const userConstants = require("../constants/userConstants");
const User = db.user;
const Userpartner = db.userPartner;
const partnerSecret = process.env.JWT_SECRET3;
const MoodTracker = db.moodTracker;
const UserTracking = db.userTracking;
const BadgeStatus = db.badgeStatus;
const Badge = db.badge;
const UserpartnerTracker = db.userPartnerTracker;



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

const getUserRequest = async (ctx) => {
  let {data, userList, userData, newData, pokeData, pokedList} ={}
  let error = null
  const {partner}=ctx.request;
  const phoneNumber = _.get(partner, "phoneNumber");
  const partnerId = _.get(partner, "userId");
  try{
    data = await Userpartner.findAll({
      raw:true,
      where:{
        partnerNumber:phoneNumber,
        action: userConstants.REQUESTED
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
    newData = await UserpartnerTracker.findAll({
      raw:true,
      where:{
        userId:partnerId,
      }
    })
     pokedList= data.map((element) =>{
      return element.partnerId
    })
    pokeData = await User.findAll({
      raw:true,
      where:{
        userId:pokedList,
      },
      order:[["createdAt", "DESC"]]
    })

  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, {userData, newData, pokeData});
  ctx.response.status = HttpStatusCodes.SUCCESS;
}

const acceptUserRequest = async (ctx) => {
  let { data } = {};
  let error = null;
  const { partner }=ctx.request;
  const { userId } = get(partner, "userId");
  const phoneNumber = _.get(partner, "phoneNumber");
  try {
    data = await Userpartner.update({
      action: userConstants.ACCEPTED
    },
     {
      where: {
        userId:userId,
        partnerNumber:phoneNumber
       },
      });
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = HttpStatusCodes.SUCCESS;
};



const getUsers = async (ctx) => {
    let {data, userList, userData} ={}
    let error = null
    const { partner }=ctx.request;
    const phoneNumber = _.get(partner, "phoneNumber");
    try{
      data = await Userpartner.findAll({
        raw:true,
        where:{
          partnerNumber:phoneNumber,
          action: userConstants.ACCEPTED

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
    let { date, startDate, endDate, trackingData,
       badgeList, badgeData } ={}
    let error = null
    const { partner , query}=ctx.request;
    const phoneNumber = _.get(partner, "phoneNumber");
    const { userId }= query
    date= new Date()
    endDate = moment.utc(date).subtract(1,'d').format('YYYY-MM-DD')
    startDate = moment.utc(endDate).subtract(6,'d').format('YYYY-MM-DD')
    try {
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
      {trackingData, badgeData});
    ctx.response.status = HttpStatusCodes.SUCCESS;
  }


  const userIndividualBadgeTracking = async (ctx) => {
    let { date, startDate, endDate, trackingData, badgeData} ={}
    let error = null
    const { partner, query}=ctx.request;
    const phoneNumber = _.get(partner, "phoneNumber");
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
          onboardingComplete: badgeConstants.TRUE
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

  const pokeUser = async (ctx) => {
    let data = {};
    let error = null;
    const { partner , query }=ctx.request;
    const { partnerId } = get(partner, "userId");
    const { userId  }= query
    try {
      data = await UserpartnerTracker.create({
        partnerId: partnerId,
        userId: userId,
        date: new Date(),
        action:userConstants.POKED

      });
    } catch (err) {
      error = err;
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
    }
    ctx.body = responseHelper.buildResponse(error, data);
    ctx.response.status = HttpStatusCodes.SUCCESS;
  };
  
  
  

module.exports = {
  updateProfile: updateProfile,
  getUserRequest:getUserRequest,
  acceptUserRequest:acceptUserRequest,
  getUsers:getUsers,
  partnerOnboard:partnerOnboard,
  userTracking:userTracking,
  userIndividualBadgeTracking:userIndividualBadgeTracking,
  pokeUser:pokeUser
};
