const HttpStatusCodes = require("../constants/HttpStatusCodes");
const responseHelper = require("../helpers/responseHelper");
const db = require("../models");
const {  ERR_SBEE_0011 } = require("../constants/ApplicationErrorConstants");
const { Op } = require("sequelize");
const _ = require("lodash");
const { USR_SBEE_0004 } = require("../constants/userConstants");
const badgeConstants = require("../constants/badgeConstants");
const Badge = db.badge;
const Goal = db.goal;
const BadgeStatus = db.badgeStatus;
const UserOnboard = db.userOnboard;



const getAllGoals = async (ctx) => {
  let {data } ={}
  let error = null
  // const userId = _.get(ctx.request.user, "userId", "Bad Response");
  try{
    data = await Goal.findAll({
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
    // const partnerId = _.get(ctx.request.partner, "partnerId", "Bad Response");
  // const userId = _.get(ctx.request.user, "userId", "Bad Response");
  try{
    data = await Badge.findAll({
    })
    } catch (err) {
      error = err;
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
    }
    ctx.body = responseHelper.buildResponse(error, data);
    ctx.response.status = HttpStatusCodes.SUCCESS;
  }

 const getGoalbadge = async (ctx) => {
    let {data } ={}
    let error = null
    const { goalId  } = ctx.request.query
    const userId = _.get(ctx.request.user, "userId", "Bad response");
    // const partnerId = _.get(ctx.request.partner, "partnerId", "Bad Response");
    try{
      data = await Badge.findAll({
        where:
        { goalId: goalId
        }
      })
    } catch (err) {
      error = err;
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
    }
    ctx.body = responseHelper.buildResponse(error, data);
    ctx.response.status = HttpStatusCodes.SUCCESS;
  }

  const badgeStatus = async (ctx) => {
    let {data } = {};
    let error = null;
    const { badgeId, badge , userId , goalId } = ctx.request.body
    // const userId = _.get(ctx.request.user, "userId", "Bad Response");
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


  const getBadgeStatus = async (ctx) => {
    let {data } ={}
    let error = null
    const userId = _.get(ctx.request.user, "userId", "Bad response");
    // const partnerId = _.get(ctx.request.partner, "partnerId", "Bad Response");
    try{
      data = await BadgeStatus.findAll({
        where:
        { userId: userId
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
    const { badgeId } = ctx.request.body
    const userId = _.get(ctx.request.user, "userId", "Bad Response");
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
    const { goalId } = ctx.request.body
    const userId = _.get(ctx.request.user, "userId", "Bad Response");
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
  getAllGoals:getAllGoals,
  badgeStatus:badgeStatus,
  getBadgeStatus:getBadgeStatus,
  badgeComplete:badgeComplete,
  goalComplete:goalComplete
};
