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
const Userpartner = db.userPartner;
const BadgeStatus = db.badgeStatus;



const newBadge = async (ctx) => {
  let {data , message  } = {};
  let error = null;
  const {badgeId, badges ,goalId } = ctx.request.body
//   const userId = _.get(ctx.request.user, "partnerId", "Bad Response");
  try {
    data = await Badge.create({
      badge: badges,
      goalId:goalId,
      badgeId:badgeId
    }); 
    message= "badge added"
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, {message});
  ctx.response.status = HttpStatusCodes.SUCCESS;
};

const newGoal = async (ctx) => {
    let {data , message} = {};
    let error = null;
    const { goal  } = ctx.request.body
  //   const userId = _.get(ctx.request.user, "partnerId", "Bad Response");
    try {
        data = await Goal.create({
          goal: goal,
          });
          message= "goal added"
    } catch (err) {
      error = err;
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
    }
    ctx.body = responseHelper.buildResponse(error, {message});
    ctx.response.status = HttpStatusCodes.SUCCESS;
  };

  const getGoal = async (ctx) => {
    let {data } ={}
    let error = null
    // const partnerId = _.get(ctx.request.partner, "partnerId", "Bad Response");
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


const getBadges = async (ctx) => {
    let {data } ={}
    let error = null
    // const partnerId = _.get(ctx.request.partner, "partnerId", "Bad Response");
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
    const { badgeStatus , badgeId, badge } = ctx.request.body
    const userId = _.get(ctx.request.user, "userId", "Bad Response");
    try {
        data = await BadgeStatus.create(
          { 
            badgeId:badgeId,
            badgeStatus: badgeStatus,
            userId:userId,
            badge:badge
          })
    } catch (err) {
      error = err;
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
    }
    ctx.body = responseHelper.buildResponse(error, data);
    ctx.response.status = HttpStatusCodes.SUCCESS;
  };
  
 
  

module.exports = {
  newBadge:newBadge,
  newGoal:newGoal,
  getBadges:getBadges,
  getGoalbadge:getGoalbadge,
  getGoal:getGoal,
  badgeStatus:badgeStatus
};
