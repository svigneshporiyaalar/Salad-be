const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config");
const _ = require("lodash");
const { ERR_SBEE_0001,ERR_SBEE_0998,
} = require("../constants/ApplicationErrorConstants");
const db = require("../models");
const { ERR_SBEE_0012,ERR_SBEE_0017
} = require("../constants/ApplicationErrorConstants");
const HttpStatusCodes = require("../constants/HttpStatusCodes");
const responseHelper = require("../helpers/responseHelper");
const Admin = db.admin;
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

const isAdmin = async (ctx, next) => {
  try {
    const user = await Admin.findByPk(ctx.request.user.id);
    const roles = await user.getRoles();
    const roleNames = _.map(roles, (role) => role.name);
    if (_.includes(roleNames, "admin")) {
      await next();
    } else {
      ctx.throw(403, "Require Admin Role!");
    }
  } catch (err) {
    ctx.throw(err.status || 403, err.text);
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
      where: {
        [Op.or]: [{ email: email || "" }],
      },
    });
    const contactNumberExists = await Admin.findOne({
      where: {
        [Op.or]: [{ contactNumber: contactNumber || "" }],
      },
    });
    if (emailExists) {
      ctx.body = responseHelper.buildResponse({ message: ERR_SBEE_0012 });
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
      return;
    }
    if (contactNumberExists) {
      ctx.body = responseHelper.buildResponse({ message: ERR_SBEE_0017 });
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
      return;
    } else {
      console.log("Creating user:", { email, contactNumber });
      await next();
    }
  } catch (err) {
    ctx.body = responseHelper.buildResponse(err);
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
    return;
  }
};



module.exports = {
  verifyToken: verifyToken,
  partnerToken: partnerToken,
  isAdmin: isAdmin,
  verifyKey: verifyKey,
  validateDuplicate:validateDuplicate
  // isPartner:isPartner
};
