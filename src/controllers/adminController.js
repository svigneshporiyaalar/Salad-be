const db = require("../models");
const config = require("../config/auth.config");
const Admin = db.admin;
const Op = db.Sequelize.Op;
const _ = require("lodash");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const User = db.user;
const BadgeStatus = db.badgeStatus;
const Badge = db.badge;
const Goal = db.goal;
const {
  ERR_SBEE_0016,
  ERR_SBEE_0999,
} = require("../constants/ApplicationErrorConstants");
const HttpStatusCodes = require("../constants/HttpStatusCodes");
const responseHelper = require("../helpers/responseHelper");
const { isEmpty } = require("lodash");
const secret = process.env.JWT_SECRET3;

const adminSignup = async (ctx) => {
  let { data, token, payload } = {};
  let error = null;
  let responseCode = HttpStatusCodes.SUCCESS;
  const { firstName, lastName, email, password, contactNumber } =
    ctx.request.body;
  let admin = {
    firstName,
    lastName,
    email,
    contactNumber,
    password: bcrypt.hashSync(password, 8),
  };
  try {
    data = await Admin.create(admin);
    token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        phoneNumber: admin.contactNumber,
        name: admin.firstName + " " + admin.lastName,
      },
      config.secret,
      {
        expiresIn: "2h",
      }
    );
    payload = {
      admin: {
        id: admin.id,
        name: admin.firstName + " " + admin.lastName,
        email: admin.email,
        phoneNumber: admin.contactNumber,
      },
    };
  } catch (err) {
    error = err;
    responseCode = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, { payload, token });
  ctx.response.status = responseCode;
};

const adminSignin = async (ctx) => {
  let { data, token, admin, validPassword } = {};
  let error = null;
  let responseCode = HttpStatusCodes.SUCCESS;
  const { email, password } = ctx.request.body;
  try {
    data = await Admin.findOne({
      where: {
        [Op.or]: [{ email: email || "" }],
      },
    });
    if (!data) {
      ctx.throw(404, ERR_SBEE_0999);
      return;
    }
    validPassword = bcrypt.compareSync(password, data.password);
    if (!validPassword) {
      ctx.throw(401, ERR_SBEE_0016);
      return;
    }
    token = jwt.sign(
      {
        id: data.id,
        email: data.email,
        firstname: data.firstName,
        phoneNumber: data.contactNumber,
      },
      secret,
      { expiresIn: "2h" }
    );
    admin = {
      id: data.id,
      name: data.firstName + " " + data.lastName,
      email: data.email,
      phoneNumber: data.contactNumber,
    };
  } catch (err) {
    error = err;
    responseCode = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, { admin, token });
  ctx.response.status = responseCode;
};

const allUsers = async (ctx) => {
  let data = {};
  let error = null;
  let adminId = _.get(ctx.request.admin, "id", "Bad Response");
  console.log(adminId)
  try {
    data = await User.findAll({
      raw: true,
    });
    if(_.isEmpty(data)) {
      ctx.body = responseHelper.errorResponse({ code: "ERR_SBEE_0011" });
      ctx.response.status = HttpStatusCodes.NOT_FOUND;
      return;
    }
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = HttpStatusCodes.SUCCESS;
};

const userBadges = async (ctx) => {
  let data = {};
  let error = null;
  let adminId = _.get(ctx.request.admin, "id", "Bad Response");
  console.log(adminId)
  const { userId } = ctx.request.query;
  try {
    data = await BadgeStatus.findAll({
      raw: true,
      where: {
        userId: userId,
      },
      order: [["createdAt", "DESC"]],
    });
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error,  data);
  ctx.response.status = HttpStatusCodes.SUCCESS;
};


const newBadge = async (ctx) => {
  let { data, message } = {};
  let error = null;
  const { ...rest } = get(ctx.request, "body");
  const adminId = _.get(ctx.request.admin, "id", "Bad Response");
  try {
    data = await Badge.create({...rest});
    message = "badge added";
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, { message });
  ctx.response.status = HttpStatusCodes.SUCCESS;
};

const newGoal = async (ctx) => {
  let { data, message } = {};
  let error = null;
  const { goal } = ctx.request.body;
  const adminId = _.get(ctx.request.admin, "id", "Bad Response");
  try {
    data = await Goal.create({
      goal: goal,
    });
    message = "goal added";
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, { message });
  ctx.response.status = HttpStatusCodes.SUCCESS;
};

const getAllGoals = async (ctx) => {
  let { data } = {};
  let error = null;
  // const adminId = _.get(ctx.request.admin, "id", "Bad Response");
  try {
    data = await Goal.findAll({});
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = HttpStatusCodes.SUCCESS;
};

const getAllBadges = async (ctx) => {
  let { data } = {};
  let error = null;
  const adminId = _.get(ctx.request.admin, "id", "Bad Response");
  try {
    data = await Badge.findAll({});
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = HttpStatusCodes.SUCCESS;
};

const removeBadge = async (ctx) => {
  let data = {}
  let error = null;
  let responseCode = HttpStatusCodes.SUCCESS;
  const  adminId  = _.get(ctx.request.vendor, "id", "Bad Response")
  const { badgeId } = ctx.request.query;
  try {
    data = Badge.destroy({
      where: 
      {
        badgeId: badgeId,
      },
    })
  } catch (err) {
    error = err;
    responseCode = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = responseCode;
}

const updateBadge = async (ctx) => {
  let data = {}
  let error = null;
  let responseCode = HttpStatusCodes.SUCCESS;
  const  adminId  = _.get(ctx.request.vendor, "id", "Bad Response")
  const { badgeId, ...rest } = get(ctx.request, "body");
  try {
    data = Badge.update({...rest},
      {
      where: 
      {
        badgeId: badgeId,
      },
    })
  } catch (err) {
    error = err;
    responseCode = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = responseCode;
}





module.exports = {
  adminSignup: adminSignup,
  adminSignin: adminSignin,
  allUsers: allUsers,
  userBadges:userBadges,
  newGoal: newGoal,
  newBadge: newBadge,
  getAllBadges:getAllBadges,
  getAllGoals:getAllGoals,
  updateBadge:updateBadge,
  removeBadge:removeBadge

};
