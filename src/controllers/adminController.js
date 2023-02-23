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
const BadgeGoal = db.badgeGoal;
const BadgeItem = db.badgeItem
const Goal = db.goal;
const Feedback = db.feedback
const chalk = require("chalk");
const Item=db.item
const log= console.log
const { ERR_SBEE_0016, ERR_SBEE_0999 } = require("../constants/ApplicationErrorConstants");
const HttpStatusCodes = require("../constants/HttpStatusCodes");
const responseHelper = require("../helpers/responseHelper");
const badgeConstants = require("../constants/badgeConstants");
const { USR_SBEE_0006, USR_SBEE_0007, USR_SBEE_0008, USR_SBEE_0009, 
  USR_SBEE_0010, USR_SBEE_0011, USR_SBEE_0012 } = require("../constants/userConstants");
const secret = process.env.JWT_SECRET4;

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
    log(chalk.green.underline.bold('-- Admin signing in --'))
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
  const { admin }=ctx.request;
  let adminId = _.get(admin, "id" );
  log(chalk.bold("adminId :",adminId))
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
  let {data, goalId ='', goalList, goalData, goalAndBadges } = {};
  let error = null;
  const { admin ,query }=ctx.request;
  let adminId = _.get(admin, "id" );
  log("adminId :",adminId)
  const { userId } = query;
  try {
    data = await BadgeStatus.findAll({
      raw: true,
      where: {
        userId: userId,
        goalStatus: badgeConstants.INPROGRESS,
      },
      order: [["createdAt", "DESC"]],
    });
    data.forEach(element => {
      goalId += element.goalId + ","
    });
    goalList= goalId.split(",").slice(0,-1)
    goalData = await Goal.findAll({
      raw:true,
        where: {
          goalId: goalList,
        },
      });
    goalAndBadges = data.map((item) => 
    ({...item, ...goalData.find(itm => itm.goalId === item.goalId)}));  
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, goalAndBadges);
  ctx.response.status = HttpStatusCodes.SUCCESS;
};


const newBadge = async (ctx) => {
  let { data, message } = {};
  let error = null;
  let { admin }= ctx.request
  let badgeData = {...ctx.request.body}
  let adminId = _.get(admin, "id" );
  log(chalk.bold("adminId :",adminId))
  try {
    data = await Badge.create(badgeData);
    message = "badge added";
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error,  message );
  ctx.response.status = HttpStatusCodes.SUCCESS;
};

const addToGoal = async (ctx) => {
  let { data, message } = {};
  let error = null;
  const { admin, body } = ctx.request;
  const adminId = _.get(admin, "id" );
  log(chalk.bold("adminId :",adminId))
  try {
    data = await BadgeGoal.bulkCreate(body,
      { ignoreDuplicates: true })
    if(_.isEmpty(data)){
      message = USR_SBEE_0009;
    } else{
      message = USR_SBEE_0007;
    }
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = HttpStatusCodes.SUCCESS;
};


const newGoal = async (ctx) => {
  let { data, message } = {};
  let error = null;
  const { admin, body } = ctx.request;
  const { goal } = body;
  const adminId = _.get(admin, "id" );
  log(chalk.bold("adminId :",adminId))
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
  let  data  = {};
  let error = null;
  const { admin } = ctx.request;
  const adminId = _.get(admin, "id" );
  log(chalk.bold("adminId :",adminId))
  try {
    data = await Goal.findAll({
      where :{
        status : badgeConstants.ACTIVE
      }
    });
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = HttpStatusCodes.SUCCESS;
};

const inactiveGoals = async (ctx) => {
  let { data } = {};
  let error = null;
  const { admin } = ctx.request;
  const adminId = _.get(admin, "id" );
  log(chalk.bold("adminId :",adminId))
  try {
    data = await Goal.findAll({
      where :{
        status : badgeConstants.INACTIVE
      }
    });
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = HttpStatusCodes.SUCCESS;
};


const activeBadges = async (ctx) => {
  let { data } = {};
  let error = null;
  const { admin } = ctx.request;
  const adminId = _.get(admin, "id" );
  log(chalk.bold("adminId :",adminId))
  try {
    data = await Badge.findAll({
      where :{
        status : badgeConstants.ACTIVE
      }
    });
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = HttpStatusCodes.SUCCESS;
};

const inactiveBadges = async (ctx) => {
  let {data } ={}
  let error = null
  try{
    data = await Badge.findAll({
      where :{
        status : badgeConstants.INACTIVE
      }
    })
    } catch (err) {
      error = err;
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
    }
    ctx.body = responseHelper.buildResponse(error, data);
    ctx.response.status = HttpStatusCodes.SUCCESS;
  }

 const archivedBadges = async (ctx) => {
  let {data } ={}
  let error = null
  try{
    data = await Badge.findAll({
      where :{
        status : badgeConstants.ARCHIVED
      }
    })
    } catch (err) {
      error = err;
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
    }
    ctx.body = responseHelper.buildResponse(error, data);
    ctx.response.status = HttpStatusCodes.SUCCESS;
  }


const getGoalbadges = async (ctx) => {
  let {data , badgeIds , badgeData } ={}
  let error = null
  const { goalId  } = ctx.request.query
  const adminId = _.get(ctx.request.admin, "id" );
  log(chalk.bold("adminId :",adminId))
  try{
    data = await BadgeGoal.findAll({
      where:
      { 
        goalId: goalId,
      }
    })
    badgeIds= data.map((element) =>{
      return element.badgeId
    })
    badgeData = await Badge.findAll({
      raw:true,
      where:{
        badgeId: badgeIds,
        status:badgeConstants.ACTIVE
      }
    })
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, badgeData);
  ctx.response.status = HttpStatusCodes.SUCCESS;
}


const removeBadge = async (ctx) => {
  let {data , badgeData} = {}
  let error = null;
  const { admin, query } = ctx.request;
  let responseCode = HttpStatusCodes.SUCCESS;
  const  adminId  = _.get(admin, "id" )
  const { badgeId } = query;
  log(chalk.bold("adminId :",adminId))
  try {
    badgeData = await BadgeStatus.findOne({
      raw: true,
      where: {
        badgeId: badgeId,
        badgeStatus: badgeConstants.INPROGRESS
      },
    });
    if(badgeData) {
      data =  await Badge.update({
        status: badgeConstants.ARCHIVED
      },{
        where: 
        {
          badgeId: badgeId,
        },
      })
      } else {
    data = await Badge.update({
      status: badgeConstants.INACTIVE
    },{
      where: 
      {
        badgeId: badgeId,
      },
    })
  }
  } catch (err) {
    error = err;
    responseCode = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = responseCode;
}

const removeGoal = async (ctx) => {
  let {data, goalData}  = {}
  let error = null;
  const { admin, query } = ctx.request;
  let responseCode = HttpStatusCodes.SUCCESS;
  const  adminId  = _.get(admin, "id" )
  const { goalId } = query;
  log(chalk.bold("adminId :",adminId))
  try {
    goalData = await BadgeStatus.findOne({
      raw: true,
      where: {
        goalId: goalId,
        goalStatus: badgeConstants.INPROGRESS
      },
    });
    if(goalData) {
      data =  await Goal.update({
        status: badgeConstants.ARCHIVED
      },{
        where: 
        {
          goalId: goalId,
        },
      })
      } else {
    data =  await Goal.update({
      status: badgeConstants.INACTIVE
    },{
      where: 
      {
        goalId: goalId,
      },
    })
  }
  } catch (err) {
    error = err;
    responseCode = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = responseCode;
}

const updateGoal = async (ctx) => {
  let data  = {}
  let error = null;
  const { admin, body } = ctx.request;
  let responseCode = HttpStatusCodes.SUCCESS;
  const  adminId  = _.get(admin, "id")
  const { goalId , goal } = body;
  log(chalk.bold("adminId :",adminId))
  try {
     data = await  Goal.update({
        goal: goal
      },{
        where: 
        {
          goalId: goalId,
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
  let data  = {}
  let error = null;
  const { admin, body } = ctx.request;
  let responseCode = HttpStatusCodes.SUCCESS;
  const  adminId  = _.get(admin, "id")
  const { badgeId, intermediate, advanced,regression } = body;
  log(chalk.bold("adminId :",adminId))
  try {
     data = await  Badge.update({
      naturalProgressionIntermediate:intermediate,
      naturalProgressionAdvanced: advanced,
      naturalRegression: regression
      },{
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


const delinkGoal = async (ctx) => {
  let {data, message }  = {}
  let error = null;
  const { admin, query} = ctx.request;
  const  adminId  = _.get(admin, "id")
  const { goalId , badgeId } = query;
  log(chalk.bold("adminId :",adminId))
  try {
    data = await BadgeGoal.destroy({
      where: {
        goalId: goalId,
        badgeId: badgeId
      },
    });
    console.log(data);
    if(data===1){
      message = USR_SBEE_0006
    } else{
      message = USR_SBEE_0008
    }
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, message);
  ctx.response.status = HttpStatusCodes.SUCCESS
};

const feedbackList = async (ctx) => {
  let {data } ={}
  let error = null
  const { admin} = ctx.request;
  const  adminId  = _.get(admin, "id")
  log(chalk.bold("adminId :",adminId))
  try{
    data = await Feedback.findAll({
    })
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
    }
    ctx.body = responseHelper.buildResponse(error, data);
    ctx.response.status = HttpStatusCodes.SUCCESS;
  }

  const addFeedback = async (ctx) => {
    let data = {};
    let error = null;
    const { admin, body} = ctx.request;
    const  adminId  = _.get(admin, "id")
    const { feedback } = body
    log(chalk.bold("adminId :",adminId))
      try {
      data = await Feedback.create({
        feedback: feedback
      });
    } catch (err) {
      error = err;
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
    }
    ctx.body = responseHelper.buildResponse(error, data);
    ctx.response.status = HttpStatusCodes.SUCCESS;
  };

  const deleteFeedback = async (ctx) => {
    let data = {};
    let error = null;
    const { admin, query} = ctx.request;
    const  adminId  = _.get(admin, "id")
    const { feedbackId } = query
    log(chalk.bold("adminId :",adminId))
      try {
      data = await Feedback.destroy({
        where:{
        feedbackId: feedbackId
        }
      });
    } catch (err) {
      error = err;
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
    }
    ctx.body = responseHelper.buildResponse(error, data);
    ctx.response.status = HttpStatusCodes.SUCCESS;
  };

  const getAllItems = async (ctx) => {
    let data ={}
    let error = null
    const { admin, query} = ctx.request;
    const  adminId  = _.get(admin, "id")
    const { status } = query
    log(chalk.bold("adminId :",adminId))
    try{
      data = await Item.findAll({
        raw:true,
        where:{
          status: status
        }
      })
    } catch (err) {
      error = err;
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
    }
    ctx.body = responseHelper.buildResponse(error, data);
    ctx.response.status = HttpStatusCodes.SUCCESS;
  }

  const getBadgeItems = async (ctx) => {
    let {data , itemData, exerciseIds } ={}
    let error = null
    const { admin, query} = ctx.request;
    const  adminId  = _.get(admin, "id")
    const { badgeId } = query
    log(chalk.bold("adminId :",adminId))
    try{
      data = await BadgeItem.findAll({
        where:
        { 
          badgeId: badgeId,
        }
      })
      exerciseIds= data.map((element) =>{
        return element.itemId
      })
      itemData = await Item.findAll({
        raw:true,
        where:{
          exerciseId: exerciseIds,
          status: badgeConstants.ACTIVE
        }
      })
    } catch (err) {
      error = err;
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
    }
    ctx.body = responseHelper.buildResponse(error, itemData);
    ctx.response.status = HttpStatusCodes.SUCCESS;
  }

  const deleteItems = async (ctx) => {
    let {data , itemData} = {};
    let error = null;
    const { admin, query} = ctx.request;
    const  adminId  = _.get(admin, "id")
    const { itemId } = query
    log(chalk.bold("adminId :",adminId))
    try {
      data = await BadgeItem.findOne({
        where:
        { 
          itemId: itemId,
        }
      })
      log(data)
     if(data){
      ctx.body = responseHelper.errorResponse({ code: "ERR_SBEE_0020" });
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
      return;
     } else {
      itemData = await Item.update({
        status: badgeConstants.INACTIVE
      },{
        where:
        {
        exerciseId: itemId
        }
      });
    }
    } catch (err) {
      error = err;
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
    }
    ctx.body = responseHelper.buildResponse(error, itemData);
    ctx.response.status = HttpStatusCodes.SUCCESS;
  };

  const addItem = async (ctx) => {
    let data = {};
    let error = null;
    const { admin, body} = ctx.request;
    const  adminId  = _.get(admin, "id")
    const { name , type, meta, media } = body
    log(chalk.bold("adminId :",adminId))
    try {
      data = await Item.create({
        exerciseName:name,
        exerciseType: type,
        exerciseMedia: media,
        exerciseMeta: meta,
      });
    } catch (err) {
      error = err;
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
    }
    ctx.body = responseHelper.buildResponse(error, data);
    ctx.response.status = HttpStatusCodes.SUCCESS;
  };

  const linkItem = async (ctx) => {
    let { data, message } = {};
    let error = null;
    const { admin, body } = ctx.request;
    const adminId = _.get(admin, "id" );
    log(chalk.bold("adminId :",adminId))
    try {
      data = await BadgeItem.bulkCreate(body,
        { ignoreDuplicates: true })
      if(_.isEmpty(data)){
        message = USR_SBEE_0010;
      } else{
        message = USR_SBEE_0011;
      }
    } catch (err) {
      error = err;
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
    }
    ctx.body = responseHelper.buildResponse(error, data);
    ctx.response.status = HttpStatusCodes.SUCCESS;
  };

  const delinkItem = async (ctx) => {
    let {data, message }  = {}
    let error = null;
    const { admin, query} = ctx.request;
    const  adminId  = _.get(admin, "id")
    const { itemId , badgeId } = query;
    log(chalk.bold("adminId :",adminId))
    try {
      data = await BadgeItem.destroy({
        where: {
          itemId: itemId,
          badgeId: badgeId
        },
      });
      console.log(data);
      if(data===1){
        message = USR_SBEE_0012
      } else{
        message = USR_SBEE_0008
      }
    } catch (err) {
      error = err;
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
    }
    ctx.body = responseHelper.buildResponse(error, message);
    ctx.response.status = HttpStatusCodes.SUCCESS
  };
  
  


  

module.exports = {
  adminSignup: adminSignup,
  adminSignin: adminSignin,
  allUsers: allUsers,
  userBadges:userBadges,
  getGoalbadges:getGoalbadges,
  newGoal: newGoal,
  newBadge: newBadge,
  addToGoal:addToGoal,
  activeBadges:activeBadges,
  inactiveBadges:inactiveBadges,
  archivedBadges:archivedBadges,
  getAllGoals:getAllGoals,
  inactiveGoals:inactiveGoals,
  removeBadge:removeBadge,
  removeGoal:removeGoal,
  updateGoal:updateGoal,
  updateBadge:updateBadge,
  delinkGoal:delinkGoal,
  feedbackList:feedbackList,
  addFeedback:addFeedback,
  deleteFeedback:deleteFeedback,
  getAllItems:getAllItems,
  getBadgeItems:getBadgeItems,
  deleteItems:deleteItems,
  addItem:addItem,
  linkItem:linkItem,
  delinkItem:delinkItem
};
