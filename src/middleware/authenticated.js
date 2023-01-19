const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config");
const _ = require("lodash");
const { ERR_SBEE_0001,ERR_SBEE_0998,
} = require("../constants/ApplicationErrorConstants");
const db = require("../models");
const User = db.user;
const signup_secret = process.env.JWT_SECRET
const secret = process.env.JWT_SECRET1
const partnersecret = process.env.JWT_SECRET2


const verifyKey = async (ctx, next) => {
  if (!ctx.headers.authorization) {
    ctx.throw(401, ERR_SBEE_0001);
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


// const isAdmin = async (ctx, next) => {
//   try {
//     const user = await User.findByPk(ctx.request.userId.id);
//     const roles = await user.getRoles();
//     const roleNames = _.map(roles, (role) => role.name);
//     if (_.includes(roleNames, "admin")) {
//       await next();
//     } else {
//       ctx.throw(403, "Require Admin Role!");
//     }
//   } catch (err) {
//     ctx.throw(err.status || 403, err.text);
//   }
// };




module.exports = {
  verifyToken: verifyToken,
  partnerToken: partnerToken,
  // isAdmin: isAdmin,
  verifyKey: verifyKey,
  // isPartner:isPartner
};
