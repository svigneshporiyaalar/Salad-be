const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config");
const _ = require("lodash");
const { ERR_SBEE_0998 } = require("../constants/ApplicationErrorConstants");
const db = require("../models");
const HttpStatusCodes = require("../constants/HttpStatusCodes");
const responseHelper = require("../helpers/responseHelper");
const Admin = db.admin;
const User = db.user;
const signup_secret = process.env.JWT_SECRET
const secret = process.env.JWT_SECRET1
const usersecret = process.env.JWT_SECRET2
const partnersecret = process.env.JWT_SECRET3
const aSecret = process.env.JWT_SECRET4



const verifyKey = async (ctx, next) => {
  if (!ctx.headers.authorization) {
    ctx.throw(401, ERR_SBEE_0998);
  }
  const token = ctx.headers.authorization.split(" ")[1];
  console.log(token)
  try {
    ctx.request.key = jwt.verify(token, signup_secret);
    console.log("Verified user", ctx.request.key)
    await next();
  } catch (err) {
    ctx.throw(err.status || 401, err.text);
  }
};

const verifyToken = async (ctx, next) => {
  if (!ctx.headers.authorization) {
    ctx.throw(401, ERR_SBEE_0998);
  }
  const token = ctx.headers.authorization.split(" ")[1];
  console.log(token)
  try {
    ctx.request.user = jwt.verify(token, secret);
    console.log("REACHED", ctx.request.user);
    await next();
  } catch (err) {
    ctx.throw(err.status || 401, err.text);
  }
};

const userToken = async (ctx, next) => {
  if (!ctx.headers.authorization) {
    ctx.throw(401, ERR_SBEE_0998);
  }
  const token = ctx.headers.authorization.split(" ")[1];
  console.log(token)
  try {
    ctx.request.user = jwt.verify(token, usersecret);
    console.log("REACHED", ctx.request.user);
    await next();
  } catch (err) {
    ctx.throw(err.status || 401, err.text);
  }
};


const partnerToken = async (ctx, next) => {
  if (!ctx.headers.authorization) {
    ctx.throw(401, ERR_SBEE_0998);
  }
  const token = ctx.headers.authorization.split(" ")[1];
  console.log(token)
  try {
    ctx.request.partner = jwt.verify(token, partnersecret);
    console.log("REACHED", ctx.request.partner);
    await next();
  } catch (err) {
    ctx.throw(err.status || 401, err.text);
  }
};

const isAdmin = async (ctx, next) => {
  if (!ctx.headers.authorization) {
    ctx.throw(401, ERR_SBEE_0998);
  }
  const token = ctx.headers.authorization.split(" ")[1];
  console.log(token)
  try {
    ctx.request.admin = jwt.verify(token, aSecret);
    console.log("Admin status reached", ctx.request.admin);
    await next();
  } catch (err) {
    ctx.throw(err.status || 401, err.text);
  }
};


// const isPartner = async (ctx, next) => {
//   try {
//     const user = await User.findByPk(ctx.request.user.id);
//     const roles = await user.getRoles();
//     const roleNames = _.map(roles, (role) => role.name);
//     if (_.includes(roleNames, "partner")) {
//       await next();
//     } else {
//       ctx.throw(401, "Require partner role!");
//     }
//   } catch (err) {
//     ctx.throw(err.status || 403, err.text);
//   }
// };

const validateDuplicate = async (ctx, next) => {
  const { email, contactNumber } = ctx.request.body;
  try {
    const emailExists = await Admin.findOne({
      raw:true,
      where: 
      {
       email: email 
      },
      });
    console.log(emailExists)
    const contactNumberExists = await Admin.findOne({
      where: 
      {
        contactNumber: contactNumber 
      },
      });
    if (emailExists) {
      ctx.body = responseHelper.errorResponse({ code: "ERR_SBEE_0012" });
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
      return;
    }
    if (contactNumberExists) {
      ctx.body = responseHelper.errorResponse({ code: "ERR_SBEE_0017" });
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
      return;
    } else {
      console.log("Creating user:", { email, contactNumber });
      await next();
    } 
    }catch (err) {
      ctx.throw(err.status || 401, err.text);
    }
  }



module.exports = {
  verifyToken: verifyToken,
  userToken:userToken,
  partnerToken: partnerToken,
  isAdmin: isAdmin,
  verifyKey: verifyKey,
  validateDuplicate:validateDuplicate
  // isPartner:isPartner
};
