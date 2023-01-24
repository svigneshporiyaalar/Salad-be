const db = require("../models");
const config = require("../config/auth.config");
const Admin = db.admin;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const User = db.user;
const BadgeStatus = db.badgeStatus;
const Badge = db.badge;
const Goal = db.goal;
const { ERR_SBEE_0016, ERR_SBEE_0999 } = require("../constants/ApplicationErrorConstants");
const HttpStatusCodes = require("../constants/HttpStatusCodes");
const responseHelper = require("../helpers/responseHelper");
const secret = process.env.JWT_SECRET3


const adminSignup = async (ctx) => {
    let {data , token ,payload}={}
    let error= null
    let responseCode = HttpStatusCodes.SUCCESS;
    const { firstName,lastName, email,password,contactNumber} = ctx.request.body;
    let admin = {firstName,lastName,email, contactNumber,
      password: bcrypt.hashSync(password, 8)}
    try{
      data = await Admin.create(admin)
      token = jwt.sign({ id: admin.id ,
        email:admin.email, phoneNumber:admin.contactNumber,
        name:admin.firstName + " " + admin.lastName}, config.secret, {
        expiresIn: "2h"
      });
      payload = {
        admin: {
          id: admin.id,
          name: admin.firstName + " " + admin.lastName,
          email: admin.email,
          phoneNumber:admin.contactNumber
        },
      };
    }catch (err) {
    error = err;
    responseCode = HttpStatusCodes.BAD_REQUEST;
   }
  ctx.body = responseHelper.buildResponse(error, { payload, token });
  ctx.response.status = responseCode;
}

   const adminSignin =async(ctx) => {
    let {data, token, admin, validPassword}={}
    let error= null
    let responseCode = HttpStatusCodes.SUCCESS;
    const { email, password } = ctx.request.body;
    try{
      data = await Admin.findOne({
        where: {
          [Op.or]: [{ email: email || "" }],
        },
      })
      if (!data) {
        ctx.throw(404, ERR_SBEE_0999);
        return;
      }
      validPassword = bcrypt.compareSync(password, data.password);
      if (!validPassword) {
        ctx.throw(401, ERR_SBEE_0016);
        return;
      }
    token = jwt.sign({ id: data.id,email:data.email,firstname:data.firstName, 
      phoneNumber: data.contactNumber }, secret, { expiresIn: "2h"});
    admin = { id: data.id,
      name: data.firstName + " " + data.lastName,
      email: data.email,
      phoneNumber: data.contactNumber,
  }
    }catch (err) {
      error = err;
      responseCode = HttpStatusCodes.BAD_REQUEST;
     }
    ctx.body = responseHelper.buildResponse(error, { admin, token });
    ctx.response.status = responseCode;
  }

  const allUsers = async (ctx) => {
    let {data, userId ='',userList , newData} ={}
    let error = null
    const adminId = _.get(ctx.request.admin, "id", "Bad Response");
    try{
      data = await User.findAll({
        raw:true,
      })
      if (data===null){
        ctx.body = responseHelper.errorResponse({ code: "ERR_SBEE_0011" });
        ctx.response.status = HttpStatusCodes.NOT_FOUND;
        return; 
      } 
      data.map((element) =>{
        userId += element.userId + ","
      })
      userList= userId.split(",").slice(0,-1)
      newData = await BadgeStatus.findAll({
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
    ctx.body = responseHelper.buildResponse(error, {data, newData});
    ctx.response.status = HttpStatusCodes.SUCCESS;
  }

  const newBadge = async (ctx) => {
    let { data, message  } = {};
    let error = null;
    const {badgeId, badges ,goalId } = ctx.request.body
    const adminId = _.get(ctx.request.admin, "id", "Bad Response");
    try {
      data = await Badge.create({
        badge: badges,
        goalId:goalId,
        badgeId:badgeId
      }); 
      message= "badge added"
    } catch (err) {
      error = err;
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
    }
    ctx.body = responseHelper.buildResponse(error, {message});
    ctx.response.status = HttpStatusCodes.SUCCESS;
  };
  
  const newGoal = async (ctx) => {
      let {data , message} = {};
      let error = null;
      const { goal  } = ctx.request.body
      const adminId = _.get(ctx.request.admin, "id", "Bad Response");
      try {
          data = await Goal.create({
            goal: goal,
            });
            message= "goal added"
      } catch (err) {
        error = err;
        ctx.response.status = HttpStatusCodes.BAD_REQUEST;
      }
      ctx.body = responseHelper.buildResponse(error, {message});
      ctx.response.status = HttpStatusCodes.SUCCESS;
    };
  


  

module.exports = {
  adminSignup:adminSignup,
  adminSignin:adminSignin,
  allUsers:allUsers,
  newGoal:newGoal,
  newBadge:newBadge
}
