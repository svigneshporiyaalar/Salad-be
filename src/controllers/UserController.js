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
  const {user, body}=ctx.request;
  const { name, partner_number , relation } = body;
  const userId = _.get(user, "userId" );
  try {
    data = await Partner.findOne({
      raw: true,
      where: {
        contactNumber: partner_number,
        onboardingComplete: "true"
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
  const { user, query }=ctx.request;
  const { partnerId } = query;
  const userId = _.get(user, "userId" );
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
  let {data, partnerIds, partnerData , relation , userData} ={}
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
    console.log(data)
    if (data===null){
      ctx.throw(404, ERR_SBEE_0015);
      return; 
    } 
    partnerIds= data.map((element) =>{
      return element.partnerId
    })
    console.log("partnerIds List:" ,partnerIds )
    partnerData = await Partner.findAll({
      raw:true,
      where:{
        partnerId: partnerIds,
      }
    })
     relation = await Userpartner.findAll({
      raw:true,
      where:{
        userId:userId,
        partnerId: partnerIds
      }
    })
    console.log(relation)
    userData = partnerData.map((item) => 
    ({...item, ...relation.find(itm => itm.partnerId === item.partnerId)}));  
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, userData);
  ctx.response.status = HttpStatusCodes.SUCCESS;
}




module.exports = {
  addPartner: addPartner,
  removePartner:removePartner,
  partnerList: partnerList
};
