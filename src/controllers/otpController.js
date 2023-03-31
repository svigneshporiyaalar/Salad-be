const HttpStatusCodes = require("../constants/HttpStatusCodes");
const responseHelper = require("../helpers/responseHelper");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const db = require("../models");
const User = db.user;
var otpGenerator = require("otp-generator");
const twilio = require("twilio");
const log = console.log
const chalk = require("chalk");
const { USR_SBEE_0001, USR_SBEE_0002 } = require("../constants/userConstants");
const signup_secret = process.env.JWT_SECRET;
const secret = process.env.JWT_SECRET1;
const userSecret = process.env.JWT_SECRET2;
const refreshSecret = process.env.JWT_SECRET5;
const partnerSecret = process.env.JWT_SECRET3;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;
const partner_serviceSid = process.env.TWILIO_PARTNER_SERVICE_SID;
const client = new twilio(accountSid, authToken);
const tempOtp = process.env.otp

function AddMinutesToDate(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

const Otp_phone = async (ctx) => {
  let { userData, channelResp, userId, otpId,
    token, otpMessage , smsResp, whatsappResp} = {};
  let error = null;
  let responseCode = HttpStatusCodes.SUCCESS;
  let  { phoneNumber, channel } = ctx.request.body
  try {
    if (!phoneNumber) {
      ctx.body = responseHelper.errorResponse({ code: "ERR_SBEE_0009" });
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
      return;
    }
    userData = await User.findOne({
      raw:true,
      where: {
        contactNumber: phoneNumber,
      },
    });
    if(userData){
      log(chalk.green.bold("Account exists"))
    } else{
      log(chalk.yellow.bold("--> Creating new account"))
      userData = await User.create({
      contactNumber: phoneNumber,
    },
    )}
    otpId = userData.id;
    userId = userData.userId;
    const payload = {
      phoneNumber: phoneNumber,
      id: otpId,
      userId: userId,
    };
    log(payload)
    token = jwt.sign(payload, signup_secret, { expiresIn: "10m" });
    // if(channel){
    // channelResp = await client.verify.services(serviceSid)
    //   .verifications.create({
    //     // customCode: `${otp}`,
    //     to: `+91${phoneNumber}`,
    //     channel: `${channel}`,
    //   });
    // log(chalk.yellow(`Verification status :${channelResp.status}`))
    // } else {
    // smsResp = await client.verify.services(serviceSid)
    //   .verifications.create({
    //     to: `+91${phoneNumber}`,
    //     channel: "sms",
    //   });
    // log(chalk.yellow(`Verification status :${smsResp.status}`))  
    // whatsappResp = await client.verify.services(serviceSid)
    //   .verifications.create({
    //     to: `+91${phoneNumber}`,
    //     channel: "whatsapp",
    //   });
    // log(chalk.yellow(`Verification status :${whatsappResp.status}`))
    //   }
    otpMessage = USR_SBEE_0001
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
      ctx.body = responseHelper.errorResponse({ code: "ERR_SBEE_0010" });
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
      return;
    }
    const id = _.get(ctx.request.key, "id");
    const userId = _.get(ctx.request.key, "userId");
    const phoneNumber = _.get(ctx.request.key, "phoneNumber");
    let type = "user"
    data = await User.findOne({
      where: {
        id: id,
      },
    });
    if(data===null) {
      ctx.body = responseHelper.errorResponse({ code: "ERR_SBEE_0014" });
      ctx.response.status = HttpStatusCodes.NOT_FOUND
      return; 
    }
    // verifiedResponse = await client.verify
    //   .services(serviceSid)
    //   .verificationChecks.create({
    //     to: `+91${phoneNumber}`,
    //     code: otp,
    //   });
    // if (verifiedResponse.valid) {
    //   log(verifiedResponse)
      if( tempOtp === otp){
      otpMessage = USR_SBEE_0002
      token = jwt.sign({id:id,userId:userId,phoneNumber:phoneNumber,
       type:type}, userSecret, { expiresIn: "8h" });
      refreshToken = jwt.sign({id:id,userId:userId,phoneNumber:phoneNumber,
        type:type}, refreshSecret, { expiresIn: "30d" });
    } else {
      ctx.body = responseHelper.errorResponse({ code: "ERR_SBEE_0005" });
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
      return;
    }
  } catch (err) {
    error = err;
    responseCode = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, {otpMessage,token, refreshToken});
  ctx.response.status = responseCode;
};

const verifyType = async (ctx) => {
  let { payload ,token } = {};
  let error = null;
  let responseCode = HttpStatusCodes.SUCCESS;
  let { user } = ctx.request
  let   type = "partner"
  const userId = _.get(user, "userId");
  const phoneNumber = _.get(user, "phoneNumber");
  log(userId,phoneNumber)
  try {
    payload = {
      phoneNumber: phoneNumber,
      userId: userId,
      type:type
    }
    token = jwt.sign(payload, partnerSecret, { expiresIn: "2h" });
    log(chalk.green(`Continuing as ${type}`))
  } catch (err) {
    error = err;
    responseCode = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, token);
  ctx.response.status = responseCode;
};

const extendedAccess = async (ctx) => {
  let { data, accessToken } = {};
  let error = null;
  let responseCode = HttpStatusCodes.SUCCESS;
  let { type } = ctx.request.body;
  try {
    const id = _.get(ctx.request.user, "id");
    const userId = _.get(ctx.request.user, "userId");
    const phoneNumber = _.get(ctx.request.user, "phoneNumber");
    data = await User.findOne({
      where: {
        id: id,
        contactNumber:phoneNumber
      },
    });
    if(data===null) {
      ctx.body = responseHelper.errorResponse({ code: "ERR_SBEE_0014" });
      ctx.response.status = HttpStatusCodes.NOT_FOUND
      return; 
    } else{
        if(type ==="user"){
      accessToken = jwt.sign({id:id,userId:userId,phoneNumber:phoneNumber,
       type:type}, userSecret, { expiresIn: "8h" });
    } else if(type ==="partner"){
      accessToken = jwt.sign({id:id,userId:userId,phoneNumber:phoneNumber,
       type:type}, partnerSecret, { expiresIn: "8h" });
  }} 
} catch (err) {
    error = err;
    console.log(err)
    responseCode = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, {accessToken});
  ctx.response.status = responseCode;
};



    // smsResp = otpGenerator.generate(7, { lowerCaseAlphabets: false, specialChars: false });
    // console.log(smsResp)

module.exports = {
  Otp_phone: Otp_phone,
  Otp_phoneVerify: Otp_phoneVerify,
  verifyType:verifyType,
  extendedAccess:extendedAccess

};
