const HttpStatusCodes = require("../constants/HttpStatusCodes");
const responseHelper = require("../helpers/responseHelper");
const db = require("../models");
const { Op } = require("sequelize");
const _ = require("lodash");
const log =console.log
const badgeConstants = require("../constants/badgeConstants");
const { getMenstrualPhase, getActiveBadgestatus } = require("../helpers/userHelper");
const Badge = db.badge;
const Goal = db.goal;
const BadgeStatus = db.badgeStatus;
const UserOnboard = db.userOnboard;
const UserTracking = db.userTracking




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

  const individualBadge = async (ctx) => {
    let {data, activeBadgeCount, userPhase, 
      badgeStatus, isBadgeActivated}  ={}
    let error = null
    const { user, query }=ctx.request;
    const { badgeId } = query
    const userId = _.get(user, "userId");
    console.log( "userId :" , userId)
    try{
      userPhase= await getMenstrualPhase(userId)
       data = await Badge.findOne({
        where :{
          badgeId: badgeId,
        }
      })
      isBadgeActivated = await BadgeStatus.findOne({
        raw:true,
        where:{
          userId:userId,
          badgeId:badgeId,
        },
      })
      badgeStatus = await getActiveBadgestatus(userId)
      activeBadgeCount= badgeStatus.count
    } catch (err) {
      error = err;
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
    }
      ctx.body = responseHelper.buildResponse(error, {userPhase, data, 
        activeBadgeCount, isBadgeActivated});
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
      log(data)
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
  
  const activateBadge = async (ctx) => {
    let {data, badgeCount, count}  = {};
    let error = null;
    const { user, body }=ctx.request;
    const { badgeId, badge } = body
    const userId = _.get(user, "userId");
    log( "userId :" , userId)
    try {
      badgeCount = await BadgeStatus.findAndCountAll({
        raw:true,
        where:
        { 
          userId: userId,
          badgeStatus:badgeConstants.ACTIVATE
        }
      })
      count= badgeCount.count
    if(count === 3)  {
      ctx.body = responseHelper.errorResponse({ code: "ERR_SBEE_0021" });
      ctx.response.status = HttpStatusCodes.BAD_REQUEST
      return; 
    } else{
     data = await BadgeStatus.create(
      { 
        badgeId:badgeId,
        userId:userId,
        badge:badge,
        badgeStatus: badgeConstants.ACTIVATE,
      })
    }
    } catch (err) {
      error = err;
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
    }
    ctx.body = responseHelper.buildResponse(error, data);
    ctx.response.status = HttpStatusCodes.SUCCESS;
  };

  const removeBadge = async (ctx) => {
    let data  = {};
    let error = null;
    const { user, query }=ctx.request;
    const userId = _.get(user, "userId");
    const { badgeId } = query
    log( "userId :" , userId)
    try {
      data = await BadgeStatus.destroy({
        where:
        { 
          userId: userId,
          badgeId:badgeId,
          badgeStatus:badgeConstants.ACTIVATE
         },
      })
      } catch (err) {
      error = err;
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
    }
    ctx.body = responseHelper.buildResponse(error, data);
    ctx.response.status = HttpStatusCodes.SUCCESS;
  };



  // const activateBadge = async (ctx) => {
  //   let {data ,badgeData, badgesExists, removeBadges }  = {};
  //   let error = null;
  //   const { user, body }=ctx.request;
  //   const userId = _.get(user, "userId");
  //   log( "userId :" , userId)
  //   try {
  //     badgeData=body.map(element =>({
  //        ...element, userId
  //     }))
  //     badgesExists = await BadgeStatus.findAll({
  //       where:
  //       { 
  //         userId: userId,
  //         badgeStatus:badgeConstants.ACTIVATE
  //       }
  //     })
  //     if(badgesExists){
  //       removeBadges = await BadgeStatus.destroy({
  //         where: {
  //           userId: userId,
  //           badgeStatus: badgeConstants.ACTIVATE
  //         },
  //       });
  //     }
  //     data = await BadgeStatus.bulkCreate(badgeData,
  //     )
  //     } catch (err) {
  //     error = err;
  //     ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  //   }
  //   ctx.body = responseHelper.buildResponse(error, data);
  //   ctx.response.status = HttpStatusCodes.SUCCESS;
  // };

  const deactivateBadge = async (ctx) => {
    let {data, removeBadgeData }  = {};
    let error = null;
    const { user, query }=ctx.request;
    const userId = _.get(user, "userId");
    const { badgeId } = query
    log( "userId :" , userId)
    try {
      data = await BadgeStatus.update({
        badgeStatus:badgeConstants.DEACTIVATE },
      {
        where:
        { 
          userId: userId,
          badgeId:badgeId,
        }
      })
     removeBadgeData = await UserTracking.destroy({
          where: {
            userId: userId,
            badgeId: badgeId,
          },
        });
      log(removeBadgeData)  
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
    const { user } = ctx.request;
    const userId = _.get(user, "userId");
    try{
      data = await BadgeStatus.findAll({
        where:
        { 
          userId: userId,
          badgeStatus:badgeConstants.ACTIVATE
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

  const getAllBadgeStatus = async (ctx) => {
    let {data } ={}
    let error = null
    const { user }=ctx.request;
    const userId = _.get(user, "userId");
    try{
      data = await BadgeStatus.findAll({
        where:
        { 
          userId: userId,
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
  individualBadge:individualBadge,
  getGoalbadge:getGoalbadge,
  getAllUserGoals:getAllUserGoals,
  // badgeStatus:badgeStatus,
  getBadgeStatus:getBadgeStatus,
  getAllBadgeStatus:getAllBadgeStatus,
  activateBadge:activateBadge,
  removeBadge:removeBadge,
  deactivateBadge:deactivateBadge,
  // activeBadgeStatus:activeBadgeStatus,
  completedBadges:completedBadges,
  badgeComplete:badgeComplete,
  goalComplete:goalComplete
};
