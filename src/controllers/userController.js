const HttpStatusCodes = require("../constants/HttpStatusCodes");
const responseHelper = require("../helpers/responseHelper");
const db = require("../models");
const _ = require("lodash");
const {  USR_SBEE_0005 } = require("../constants/userConstants");
const { ERR_SBEE_0015 } = require("../constants/ApplicationErrorConstants");
const badgeConstants = require("../constants/badgeConstants");
const log= console.log
const chalk = require("chalk")
const User = db.user;
const Userpartner = db.userPartner;
const UserOnboard = db.userOnboard;
const Feedback = db.feedback
const BadgeItem = db.badgeItem
const Item = db.item



const addPartner = async (ctx) => {
  let { data, userData, oldData } = {};
  let error = null;
  const {user, body}=ctx.request;
  const { partner_number } = body;
  const userId = _.get(user, "userId" );
  try {
    data = await User.findOne({
      raw: true,
      where: {
        contactNumber: partner_number,
      },
    });
    if( data === null){
      console.log("partner account does not exist")
    }
    oldData = await Userpartner.findOne({
      where: {
        userId: userId,
          partnerNumber: partner_number,
        },
  });
    if(oldData) {
      ctx.body = responseHelper.errorResponse({ code: "ERR_SBEE_0007" });
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
      return;
    }
    userData = await Userpartner.create({
      userId: userId,
      partnerNumber: partner_number,
    });
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, {data, userData});
  ctx.response.status = HttpStatusCodes.CREATED;
};

const removePartner = async (ctx) => {
  let { data, message } = {};
  let error = null;
  const { user, query }=ctx.request;
  const { partner_number } = query;
  const userId = _.get(user, "userId" );
  try {
    data = await Userpartner.destroy({
      where: {
        partnerNumber: partner_number,
        userId: userId
      },
    });
    console.log(data);
    if(data===1) {
      message = USR_SBEE_0005
    }
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error,{ message });
  ctx.response.status = HttpStatusCodes.CREATED;
};

const checkPoint = async (ctx) => {
  let { data,isCompletedUser}  ={}
  let error = null
  let { user } = ctx.request
  const userId = _.get(user, "userId");
  const id = _.get(user, "id");
  const phoneNumber = _.get(user, "phoneNumber");
  try{
    data = await Userpartner.findAndCountAll({
      raw:true,
      where:{
        partnerNumber:phoneNumber,
      }
    })
    isCompletedUser = await User.findOne({
      where:{
        id:id,
        contactNumber:phoneNumber,
        onboardingComplete: badgeConstants.TRUE,
        type: 'user'
      }
    })
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, {data ,isCompletedUser});
  ctx.response.status = HttpStatusCodes.SUCCESS;
}

const updateName = async (ctx) => {
  let data  ={}
  let error = null
  let { user, body } = ctx.request
  let {name} = body
  const id = _.get(user, "id");
  const phoneNumber = _.get(user, "phoneNumber");
  try{
    data = await User.update({
      name:name
    },{
      where:{
        id:id,
        contactNumber:phoneNumber,
      }
    })
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error,data);
  ctx.response.status = HttpStatusCodes.SUCCESS;
}


const partnerList = async (ctx) => {
  let {data, partnerNumbers, partnerData } ={}
  let error = null
  const { user } = ctx.request;
  const userId = _.get(user, "userId");
  console.log("userId:" ,userId)
  try{
    data = await Userpartner.findAll({
      raw:true,
      where:{
        userId:userId,
      }
    })
    if (data===null){
      ctx.body = responseHelper.errorResponse({ code: "ERR_SBEE_0015" });
      ctx.response.status = HttpStatusCodes.NOT_FOUND;
      return;
    } 
    partnerNumbers= data.map((element) =>{
      return element.partnerNumber
    })
    console.log("partner numbers List:" ,partnerNumbers )
    partnerData = await User.findAll({
      raw:true,
      where:{
        contactNumber: partnerNumbers,
      }
    })
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, {data ,partnerData});
  ctx.response.status = HttpStatusCodes.SUCCESS;
}

const feedbackList = async (ctx) => {
  let {data } ={}
  let error = null
  const { user }=ctx.request;
  const userId = _.get(user, "userId");
  console.log( "userId :" , userId)
  try{
    data = await Feedback.findAll({
    })
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
    }
    ctx.body = responseHelper.buildResponse(error, data);
    ctx.response.status = HttpStatusCodes.SUCCESS;
  }

  const getBadgeItems = async (ctx) => {
    let {data , itemData, exerciseIds } ={}
    let error = null
    const { user, query }=ctx.request;
    const { badgeId  } = query
    const userId = _.get(user, "userId");
    console.log( "userId :" , userId)
    try{
      data = await BadgeItem.findAll({
        where:
        { 
          badgeId: badgeId,
        }
      })
      exerciseIds= data.map((element) =>{
        return element.itemId
      })
      itemData = await Item.findAll({
        raw:true,
        where:{
          exerciseId: exerciseIds,
          status: badgeConstants.ACTIVE
        }
      })
    } catch (err) {
      error = err;
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
    }
    ctx.body = responseHelper.buildResponse(error, itemData);
    ctx.response.status = HttpStatusCodes.SUCCESS;
  }






module.exports = {
  addPartner: addPartner,
  removePartner:removePartner,
  partnerList: partnerList,
  checkPoint:checkPoint,
  updateName:updateName,
  feedbackList:feedbackList,
  getBadgeItems:getBadgeItems
};
