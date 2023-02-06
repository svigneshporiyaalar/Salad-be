const HttpStatusCodes = require("../constants/HttpStatusCodes");
const responseHelper = require("../helpers/responseHelper");
const db = require("../models");
const { Op } = require("sequelize");
const _ = require("lodash");
const { USR_SBEE_0003, USR_SBEE_0005 } = require("../constants/userConstants");
const { ERR_SBEE_0015 } = require("../constants/ApplicationErrorConstants");
const User = db.user;
const Partner = db.partner;
const Userpartner = db.userPartner;


const addPartner = async (ctx) => {
  let { data, userData, reData, partnerId, message } = {};
  let error = null;
  const { partner_number , relation } = ctx.request.body;
  const userId = _.get(ctx.request.user, "userId", "Bad Response");
  try {
    data = await Partner.findOne({
      raw: true,
      where: {
        contactNumber: partner_number,
      },
    });
    console.log(data);
    if (data === null) {
      ctx.body = responseHelper.errorResponse({ code: "ERR_SBEE_0015" });
      ctx.response.status = HttpStatusCodes.NOT_FOUND;
      return;
    } else {
      partnerId = data.partnerId;
      reData = await Userpartner.findOne({
        where: {
          userId: userId,
          partnerId: partnerId,
        },
      });
      if (reData) {
        ctx.body = responseHelper.errorResponse({ code: "ERR_SBEE_0007" });
        ctx.response.status = HttpStatusCodes.BAD_REQUEST;
        return;
      }
      userData = await Userpartner.create({
        userId: userId,
        partnerId: partnerId,
        relation: relation
      });
      message = "Partner added";
    }
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, { message });
  ctx.response.status = HttpStatusCodes.CREATED;
};

const removePartner = async (ctx) => {
  let { data, message } = {};
  let error = null;
  const { partnerId } = ctx.request.query;
  const userId = _.get(ctx.request.user, "userId", "Bad Response");
  try {
    data = await Userpartner.destroy({
      where: {
        partnerId: partnerId,
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

const partnerList = async (ctx) => {
  let {data, partnerId ='',partnerIds , newData} ={}
  let error = null
  const userId = _.get(ctx.request.user, "userId", "Bad Response");
  console.log(userId)
  try{
    data = await Userpartner.findAll({
      raw:true,
      where:{
        userId:userId,
      }
    })
    console.log(data)
    if (data===null){
      ctx.throw(404, ERR_SBEE_0015);
      return; 
    } 
    data.map((element) =>{
      partnerId += element.partnerId + ","
    })
    partnerIds= partnerId.split(",").slice(0,-1)
    newData = await Partner.findAll({
      raw:true,
      where:{
        partnerId: partnerIds
      },
      order:[["createdAt", "DESC"]]
    })
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, newData);
  ctx.response.status = HttpStatusCodes.SUCCESS;
}




module.exports = {
  addPartner: addPartner,
  removePartner:removePartner,
  partnerList: partnerList
};
