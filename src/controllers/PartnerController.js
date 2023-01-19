const get = require("lodash/get");
const HttpStatusCodes = require("../constants/HttpStatusCodes");
const responseHelper = require("../helpers/responseHelper");
const db = require("../models");
const {  ERR_SBEE_0011 } = require("../constants/ApplicationErrorConstants");
const { Op } = require("sequelize");
const _ = require("lodash");
const { USR_SBEE_0004 } = require("../constants/userConstants");
const User = db.user;
const Partner = db.partner;
const Userpartner = db.userPartner;


const updateProfile = async (ctx) => {
  let {data , message} = {};
  let error = null;
  const { ...rest } = get(ctx.request, "body");
  const partnerId = _.get(ctx.request.partner, "partnerId", "Bad Response");
  try {
      data = await Partner.update({ ...rest },
        {
          where: {
            partnerId:partnerId,
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
    let {data, userId ='',userList , newData} ={}
    let error = null
    const partnerId = _.get(ctx.request.partner, "partnerId", "Bad Response");
    try{
      data = await Userpartner.findAll({
        raw:true,
        where:{
          partnerId:partnerId,
        }
      })
      if (data===null){
        ctx.throw(404, ERR_SBEE_0011);
        return; 
      } 
      data.map((element) =>{
        userId += element.userId + ","
      })
      userList= userId.split(",").slice(0,-1)
      newData = await User.findAll({
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
    ctx.body = responseHelper.buildResponse(error, newData);
    ctx.response.status = HttpStatusCodes.SUCCESS;
  }
  

module.exports = {
  updateProfile: updateProfile,
  getUsers:getUsers
};
