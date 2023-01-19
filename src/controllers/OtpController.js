const HttpStatusCodes = require("../constants/HttpStatusCodes");
const responseHelper = require("../helpers/responseHelper");
const {
  ERR_SBEE_0010,
  ERR_SBEE_0003,
  ERR_SBEE_0006,
  ERR_SBEE_0005,
  ERR_SBEE_0009,
  ERR_SBEE_0014,
  ERR_SBEE_0998,
} = require("../constants/ApplicationErrorConstants");
const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const _ = require("lodash");
const db = require("../models");
const User = db.user;
const Partner = db.partner;
var otpGenerator = require("otp-generator");
const twilio = require("twilio");
const { USR_SBEE_0001, USR_SBEE_0002 } = require("../constants/userConstants");
const signup_secret = process.env.JWT_SECRET;
const secret = process.env.JWT_SECRET1;
const partnerSecret = process.env.JWT_SECRET2;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;
const partner_serviceSid = process.env.TWILIO_PARTNER_SERVICE_SID;
const client = new twilio(accountSid, authToken);

function AddMinutesToDate(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

const Otp_phone = async (ctx) => {
  let { userData, otpResponse, userId, otpId,
    token,otpMessage} = {};
  let error = null;
  let responseCode = HttpStatusCodes.SUCCESS;
  const { cc, phone_number, type } = ctx.request.body
  try {
    if (!phone_number) {
      ctx.throw(401, ERR_SBEE_0009);
      return;
    }
    if (type!== "user") {
      ctx.body = responseHelper.errorResponse({ code: "ERR_SBEE_0998" });
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
      return;
    }
    userData = await User.findOne({
      raw:true,
      where: {
        contactNumber: phone_number,
      },
    });
    if(userData){
      console.log("User exists")
    } else{

    // otp = otpGenerator.generate(6, {
    //   alphabets: false,
    //   upperCase: false,
    //   specialChars: false,
    // });
    // now = new Date();
    // expirationTime = AddMinutesToDate(now, 10);
    // console.log(otp, expirationTime);
    userData = await User.create({
      contactNumber: phone_number,
    },
    );
  }
    otpId = userData.id;
    userId = userData.userId;
    const payload = {
      cc:cc,
      phone_number: phone_number,
      id: otpId,
      userId: userId,
      type:type
    };
    token = jwt.sign(payload, signup_secret, { expiresIn: "10m" });
    otpResponse = await client.verify
      .services(serviceSid)
      .verifications.create({
        // customCode: `${otp}`,
        to: `+${cc}${phone_number}`,
        channel: "sms",
      });
    otpMessage = USR_SBEE_0001
    console.log(otpResponse);
  } catch (err) {
    error = err;
    responseCode = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, { otpMessage, token });
  ctx.response.status = responseCode;
};

const Otp_phoneVerify = async (ctx) => {
  let { data, verifiedResponse, otpMessage, token } = {};
  let error = null;
  let responseCode = HttpStatusCodes.SUCCESS;
  const {  otp } = ctx.request.body;
  try {
    if (!otp) {
      ctx.throw(403, ERR_SBEE_0010);
      return;
    }
    const id = _.get(ctx.request.key, "id", "Bad Response");
    const userId = _.get(ctx.request.key, "userId", "Bad Response");
    const phoneNumber = _.get(ctx.request.key, "phone_number", "Bad Response");
    const type = _.get(ctx.request.key, "type", "Bad Response");
    data = await User.findOne({
      where: {
        id: id,
      },
    });
    if(data===null) {
      ctx.throw(401, ERR_SBEE_0014);
      return; 
    }
    verifiedResponse = await client.verify
      .services(serviceSid)
      .verificationChecks.create({
        to: `+91${phoneNumber}`,
        code: otp,
      });
    if (verifiedResponse.valid) {
      console.log(verifiedResponse)
      otpMessage = USR_SBEE_0002
      token = jwt.sign({id:id,userId:userId,phone_number:phoneNumber,
      type:type}, secret, { expiresIn: "2h" });
    } else {
      otpMessage = ERR_SBEE_0005;
    }
  } catch (err) {
    error = err;
    responseCode = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, {otpMessage,token});
  ctx.response.status = responseCode;
};

const Otp_partner = async (ctx) => {
  let { otp,partnerData, otpResponse,partnerId, otpId,
    token,otpMessage} = {};
  let error = null;
  let responseCode = HttpStatusCodes.SUCCESS;
  const {cc ,phone_number, type } = ctx.request.body;
  try {
    if (!phone_number) {
      ctx.throw(401, ERR_SBEE_0009);
      return;
    }
    if (type!== "partner") {
      ctx.throw(401, ERR_SBEE_0998);
      return;
    }
    partnerData = await Partner.findOne({
      where: {
        contactNumber: phone_number,
      },
    });
    if(partnerData){
      console.log("Partner account exists")
    } else{
    partnerData = await Partner.create({
      contactNumber: phone_number,
    });
  }
    otpId = partnerData.id;
    partnerId = partnerData.partnerId;
    const payload = {
      cc:cc,
      phone_number: phone_number,
      id: otpId,
      otp:otp,
      partnerId: partnerId,
      type:type
    };
    token = jwt.sign(payload, signup_secret, { expiresIn: "10m" });
    otpResponse = await client.verify
      .services(partner_serviceSid)
      .verifications.create({
        to: `+${cc}${phone_number}`,
        channel: "sms",
      });
    otpMessage = USR_SBEE_0001;
    console.log(otpResponse);
  } catch (err) {
    error = err;
    responseCode = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, {token, otpMessage});
  ctx.response.status = responseCode;
};

const Otp_partnerVerify = async (ctx) => {
  let { data, verifiedResponse, otpMessage, token } = {};
  let error = null;
  let responseCode = HttpStatusCodes.SUCCESS;
  const { otp } = ctx.request.body;
  try {
    if (!otp) {
      ctx.throw(403, ERR_SBEE_0010);
      return;
    }
    const id = _.get(ctx.request.key, "id", "Bad Response");
    const partnerId = _.get(ctx.request.key, "partnerId", "Bad Response");
    const phoneNumber = _.get(ctx.request.key, "phone_number", "Bad Response");
    const type = _.get(ctx.request.key, "type", "Bad Response");
    data = await Partner.findOne({
      raw:true,
      where: {
        id: id,
      },
    });
    console.log(data)
    if(data===null) {
      ctx.throw(401, ERR_SBEE_0014);
      return; 
    }
    verifiedResponse = await client.verify
      .services(partner_serviceSid)
      .verificationChecks.create({
        to: `+91${phoneNumber}`,
        code: otp,
      });
    if(verifiedResponse.valid) {
      console.log(verifiedResponse)
      otpMessage = USR_SBEE_0002
      token = jwt.sign({id:id,partnerId:partnerId,phone_number:phoneNumber,
      type:type}, partnerSecret, { expiresIn: "2h" });
    } else {
      otpMessage = ERR_SBEE_0005
    }
  } catch (err) {
    error = err;
    responseCode = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, {otpMessage,token});
  ctx.response.status = responseCode;
};


module.exports = {
  Otp_phone: Otp_phone,
  Otp_phoneVerify: Otp_phoneVerify,
  Otp_partner:Otp_partner,
  Otp_partnerVerify:Otp_partnerVerify

};
