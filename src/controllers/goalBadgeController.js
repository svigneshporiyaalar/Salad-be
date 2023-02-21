const HttpStatusCodes = require("../constants/HttpStatusCodes");
const responseHelper = require("../helpers/responseHelper");
const db = require("../models");
const { Op } = require("sequelize");
const _ = require("lodash");
const log =console.log
const badgeConstants = require("../constants/badgeConstants");
const Badge = db.badge;
const Goal = db.goal;
const BadgeStatus = db.badgeStatus;
const UserOnboard = db.userOnboard;



const getAllUserGoals = async (ctx) => {
  let {data } ={}
  let error = null
  const { user }=ctx.request;
  const userId = _.get(user, "userId");
  log( "userId :" , userId)
  try{
    data = await Goal.findAll({
      where :{
        status : badgeConstants.ACTIVE
      }
    })
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
    }
    ctx.body = responseHelper.buildResponse(error, data);
    ctx.response.status = HttpStatusCodes.SUCCESS;
  }


const getAllBadges = async (ctx) => {
  let {data } ={}
  let error = null
  try{
    data = await Badge.findAll({
      where :{
        status : badgeConstants.ACTIVE
      }
    })
    } catch (err) {
      error = err;
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
    }
    ctx.body = responseHelper.buildResponse(error, data);
    ctx.response.status = HttpStatusCodes.SUCCESS;
  }

 const getGoalbadge = async (ctx) => {
    let {data , badgeData, badgeIds } ={}
    let error = null
    const { user, query }=ctx.request;
    const { goalId  } = query
    const userId = _.get(user, "userId");
    console.log( "userId :" , userId)
    try{
      data = await BadgeGoal.findAll({
        where:
        { 
          goalId: goalId,
        }
      })
      badgeIds= data.map((element) =>{
        return element.badgeId
      })
      badgeData = await Badge.findAll({
        raw:true,
        where:{
          badgeId: badgeIds,
          status: badgeConstants.ACTIVE
        }
      })
    } catch (err) {
      error = err;
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
    }
    ctx.body = responseHelper.buildResponse(error, badgeData);
    ctx.response.status = HttpStatusCodes.SUCCESS;
  }
  
  const badgeStatus = async (ctx) => {
    let {data } = {};
    let error = null;
    const { user, body }=ctx.request;
    const { badgeId, badge , goalId } = body
    const userId = _.get(user, "userId");
    log( "userId :" , userId)
    try {
     data = await BadgeStatus.create(
      { 
        badgeId:badgeId,
        goalId: goalId,
        userId:userId,
        badge:badge,
        badgeStatus: badgeConstants.INPROGRESS,
        goalStatus: badgeConstants.INPROGRESS
      })
    } catch (err) {
      error = err;
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
    }
    ctx.body = responseHelper.buildResponse(error, data);
    ctx.response.status = HttpStatusCodes.SUCCESS;
  };


  const activeBadgeStatus = async (ctx) => {
    let {data } ={}
    let error = null
    const { user }=ctx.request;
    const userId = _.get(user, "userId");
    try{
      data = await BadgeStatus.findAll({
        where:
        { 
          userId: userId,
          badgeStatus:badgeConstants.INPROGRESS
        }
      })
    } catch (err) {
      error = err;
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
    }
    ctx.body = responseHelper.buildResponse(error, data);
    ctx.response.status = HttpStatusCodes.SUCCESS;
  }

  const completedBadges = async (ctx) => {
    let {data } ={}
    let error = null
    const { user }=ctx.request;
    const userId = _.get(user, "userId");
    try{
      data = await BadgeStatus.findAll({
        where:
        { 
          userId: userId,
          badgeStatus:badgeConstants.COMPLETED
        }
      })
    } catch (err) {
      error = err;
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
    }
    ctx.body = responseHelper.buildResponse(error, data);
    ctx.response.status = HttpStatusCodes.SUCCESS;
  }


  const getBadgeStatus = async (ctx) => {
    let {data } ={}
    let error = null
    const { user, query }=ctx.request;
    const userId = _.get(user, "userId");
    const { badgeId } = query
    try{
      data = await BadgeStatus.findOne({
        where:
        { 
          userId: userId,
          badgeId:badgeId
        }
      })
    } catch (err) {
      error = err;
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
    }
    ctx.body = responseHelper.buildResponse(error, data);
    ctx.response.status = HttpStatusCodes.SUCCESS;
  }


  const badgeComplete = async (ctx) => {
    let data = {};
    let error = null;
    const { user, body }=ctx.request;
    const { badgeId } = body
    const userId = _.get(user, "userId");
    try {
      data = await BadgeStatus.update(
      { 
        badgeStatus: badgeConstants.COMPLETED
      },
      {
        where:
        {
          userId:userId,
          badgeId:badgeId
        }
      })
    } catch (err) {
      error = err;
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
    }
    ctx.body = responseHelper.buildResponse(error, data);
    ctx.response.status = HttpStatusCodes.SUCCESS;
  };


  const goalComplete = async (ctx) => {
    let {data, reData } = {};
    let error = null;
    const { user, body }=ctx.request;
    const { goalId } = body
    const userId = _.get(user, "userId" );
    try {
      data = await BadgeStatus.update(
      { 
        goalStatus: badgeConstants.COMPLETED
      },
      {
        where:
        {
          userId:userId,
          goalId:goalId
        }
      })
      reData = await UserOnboard.update(
        { 
          goalStatus: badgeConstants.COMPLETED
        },
        {
          where:
          {
            userId:userId,
            goalId:goalId
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
  getAllBadges:getAllBadges,
  getGoalbadge:getGoalbadge,
  getAllUserGoals:getAllUserGoals,
  badgeStatus:badgeStatus,
  getBadgeStatus:getBadgeStatus,
  activeBadgeStatus:activeBadgeStatus,
  completedBadges:completedBadges,
  badgeComplete:badgeComplete,
  goalComplete:goalComplete
};
