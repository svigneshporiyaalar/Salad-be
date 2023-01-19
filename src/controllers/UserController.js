const get = require("lodash/get");
const HttpStatusCodes = require("../constants/HttpStatusCodes");
const responseHelper = require("../helpers/responseHelper");
const db = require("../models");
const { Op } = require("sequelize");
const _ = require("lodash");
const { USR_SBEE_0003, USR_SBEE_0005 } = require("../constants/userConstants");
const User = db.user;
const Partner = db.partner;
const Userpartner = db.userPartner;

const updateProfile = async (ctx) => {
  let { data, message } = {};
  let error = null;
  const { ...rest } = get(ctx.request, "body");
  const userId = _.get(ctx.request.user, "userId", "Bad Response");
  try {
    data = await User.update(
      { ...rest },
      {
        where: {
          userId: userId,
        },
      }
    );
    message = USR_SBEE_0003;
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, { message });
  ctx.response.status = HttpStatusCodes.SUCCESS;
};

const addPartner = async (ctx) => {
  let { data, userData, reData, partnerId, message } = {};
  let error = null;
  const { partner_number } = ctx.request.body;
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



module.exports = {
  updateProfile: updateProfile,
  addPartner: addPartner,
  removePartner:removePartner
};
