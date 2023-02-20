const HttpStatusCodes = require("../constants/HttpStatusCodes");
const responseHelper = require("../helpers/responseHelper");
const db = require("../models");
const _ = require("lodash");
const {  USR_SBEE_0005 } = require("../constants/userConstants");
const { ERR_SBEE_0015 } = require("../constants/ApplicationErrorConstants");
const badgeConstants = require("../constants/badgeConstants");
const User = db.user;
const Userpartner = db.userPartner;
const UserOnboard = db.userOnboard;



const addPartner = async (ctx) => {
  let { data, userData, reData, partnerId, message } = {};
  let error = null;
  const {user, body}=ctx.request;
  const { name, partner_number , relation } = body;
  const userId = _.get(user, "userId" );
  try {
    data = await User.findOne({
      raw: true,
      where: {
        contactNumber: partner_number,
        onboardingComplete: "true"
      },
    });
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
        relation: relation,
        shortName: name
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

const partnerCheck = async (ctx) => {
  let {data , isCompletedUser} ={}
  let error = null
  let { user } = ctx.request
  const userId = _.get(user, "userId");
  try{
    data = await Userpartner.findAndCountAll({
      raw:true,
      where:{
        partnerId:userId,
      }
    })
    isCompletedUser = await UserOnboard.findAll({
      raw:true,
      where:{
        userId:userId,
        onboardingComplete: badgeConstants.TRUE,
        type: 'user'
      }
    })

  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, {data, isCompletedUser});
  ctx.response.status = HttpStatusCodes.SUCCESS;
}


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
    partnerData = await User.findAll({
      raw:true,
      where:{
        userId: partnerIds,
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
  partnerList: partnerList,
  partnerCheck:partnerCheck
};
