const db = require("../models");
const config = require("../config/auth.config");
const Admin = db.admin;
const Role = db.role;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { ERR_SBEE_0016, ERR_SBEE_0999 } = require("../constants/ApplicationErrorConstants");
const HttpStatusCodes = require("../constants/HttpStatusCodes");
const responseHelper = require("../helpers/responseHelper");
const secret = process.env.JWT_SECRET3


const adminSignup = async (ctx) => {
    let {data , token ,payload}={}
    let error= null
    let responseCode = HttpStatusCodes.SUCCESS;
    const { firstName,lastName, email,password,contactNumber} = ctx.request.body;
    let user = {firstName,lastName,email, contactNumber,
      password: bcrypt.hashSync(password, 8)}
    try{
      data = await Admin.create(user)
      token = jwt.sign({ id: user.id ,
        email:user.email, phoneNumber:user.contactNumber,
        name:user.firstName + " " + user.lastName}, config.secret, {
        expiresIn: "2h"
      });
      payload = {
        user: {
          id: user.id,
          name: user.firstName + " " + user.lastName,
          email: user.email,
          phoneNumber:user.contactNumber,
          roles: user.roles,
        },
        accessToken: token,
      };
    }catch (err) {
    error = err;
    responseCode = HttpStatusCodes.BAD_REQUEST;
   }
  ctx.body = responseHelper.buildResponse(error, { payload, token });
  ctx.response.status = responseCode;
}

   const adminSignin =async(ctx) => {
    let {data , token ,payload , validPassword}={}
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
    payload = { id: data.id,
      name: data.firstName + " " + data.lastName,
      email: data.email,
      phoneNumber: data.contactNumber,
  }
    }catch (err) {
      error = err;
      responseCode = HttpStatusCodes.BAD_REQUEST;
     }
    ctx.body = responseHelper.buildResponse(error, { payload, token });
    ctx.response.status = responseCode;
  }

  

module.exports = {
  adminSignup:adminSignup,
  adminSignin:adminSignin
}
