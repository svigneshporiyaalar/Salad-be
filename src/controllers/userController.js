const HttpStatusCodes = require("../constants/HttpStatusCodes");
const responseHelper = require("../helpers/responseHelper");
const db = require("../models");
const _ = require("lodash");
const { USR_SBEE_0005 } = require("../constants/userConstants");
const { ERR_SBEE_0015 } = require("../constants/ApplicationErrorConstants");
const badgeConstants = require("../constants/badgeConstants");
const log = console.log;
const chalk = require("chalk");
const moment = require('moment')
const { Op } = require('sequelize');
const userConstants = require("../constants/userConstants");
const User = db.user;
const Userpartner = db.userPartner;
const UserOnboard = db.userOnboard;
const UserTracking = db.userTracking;
const MoodTracker = db.moodTracker;
const SleepTracker = db.sleepTracker;
const BadgeStatus = db.badgeStatus;
const Productivity = db.productivityTracker;
const UserIntegration = db.userIntegration;
const Feedback = db.feedback;
const BadgeItem = db.badgeItem;
const Item = db.item;


const addPartner = async (ctx) => {
  let { newData, oldData, accountExists, data } = {};
  let error = null;
  const { user, body } = ctx.request;
  const { partner_number , name } = body;
  const userId = _.get(user, "userId");
  try {
    oldData = await Userpartner.findOne({
      where: {
        userId: userId,
        partnerNumber: partner_number,
      },
    });
    if (oldData) {
      ctx.body = responseHelper.errorResponse({ code: "ERR_SBEE_0007" });
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
      return;
    }
    accountExists = await User.findOne({
      raw: true,
      where: {
        contactNumber: partner_number,
      },
    });
    if (accountExists === null) {
      console.log("partner account does not exist");
    }
    newData = await Userpartner.create({
      userId: userId,
      partnerNumber: partner_number,
      partnerName:name,
      action: userConstants.REQUESTED
    });
    data = { newData, accountExists };
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = HttpStatusCodes.CREATED;
};


const removePartner = async (ctx) => {
  let { data, message } = {};
  let error = null;
  const { user, query } = ctx.request;
  const { partner_number } = query;
  const userId = _.get(user, "userId");
  try {
    data = await Userpartner.destroy({
      where: {
        partnerNumber: partner_number,
        userId: userId,
      },
    });
    console.log(data);
    if (data === 1) {
      message = USR_SBEE_0005;
    }
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, { message });
  ctx.response.status = HttpStatusCodes.CREATED;
};

const deleteUserData = async (ctx) => {
  let { data } = {};
  let error = null;
  const { user } = ctx.request;
  const userId = _.get(user, "userId");
  try {
    data = await UserTracking.destroy({
      where: {
        userId: userId,
      },
    }),
    await MoodTracker.destroy({
      where: {
        userId: userId,
      }
    }),
    await SleepTracker.destroy({
        where: {
          userId: userId,
        }
      }),
    await Productivity.destroy({
        where: {
          userId: userId,
        },
      }) ,
    await UserIntegration.destroy({
        where: {
          userId: userId,
        },
      }),
    await BadgeStatus.destroy({
        where: {
          userId: userId,
        },
      }) ,
    await UserOnboard.destroy({
        where: {
          userId: userId,
        },
      }) ,
    await Userpartner.destroy({
        where: {
          userId: userId,
        },
      })   
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = HttpStatusCodes.CREATED;
};


const deleteUserAccount = async (ctx) => {
  let { data } = {};
  let error = null;
  const { user } = ctx.request;
  const userId = _.get(user, "userId");
  try {
    data = await User.destroy({
      where: {
        userId: userId,
      },
    }),
    await UserTracking.destroy({
      where: {
        userId: userId,
      },
    }),
    await MoodTracker.destroy({
      where: {
        userId: userId,
      }
    }),
    await SleepTracker.destroy({
        where: {
          userId: userId,
        }
      }),
    await Productivity.destroy({
        where: {
          userId: userId,
        },
      }) ,
    await UserIntegration.destroy({
        where: {
          userId: userId,
        },
      }),
    await BadgeStatus.destroy({
        where: {
          userId: userId,
        },
      }) ,
    await UserOnboard.destroy({
        where: {
          userId: userId,
        },
      }) ,
    await Userpartner.destroy({
        where: {
          userId: userId,
        },
      })   
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = HttpStatusCodes.CREATED;
};


const checkPoint = async (ctx) => {
  let { data, isCompletedUser } = {};
  let error = null;
  let { user } = ctx.request;
  const userId = _.get(user, "userId");
  const id = _.get(user, "id");
  const phoneNumber = _.get(user, "phoneNumber");
  try {
    data = await Userpartner.findAndCountAll({
      raw: true,
      where: {
        partnerNumber: phoneNumber,
      },
    });
    isCompletedUser = await User.findOne({
      where: {
        id: id,
        contactNumber: phoneNumber,
        onboardingComplete: badgeConstants.TRUE,
        type: "user",
      },
    });
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, { data, isCompletedUser });
  ctx.response.status = HttpStatusCodes.SUCCESS;
};

const updateName = async (ctx) => {
  let data = {};
  let error = null;
  let { user, body } = ctx.request;
  let { name } = body;
  const id = _.get(user, "id");
  const phoneNumber = _.get(user, "phoneNumber");
  try {
    data = await User.update(
      {
        name: name,
      },
      {
        where: {
          id: id,
          contactNumber: phoneNumber,
        },
      }
    );
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = HttpStatusCodes.SUCCESS;
};

const partnerList = async (ctx) => {
  let { data, partnerNumbers, partnerData , partnerDetails } = {};
  let error = null;
  const { user } = ctx.request;
  const userId = _.get(user, "userId");
  console.log("userId:", userId);
  try {
    partnerDetails = await Userpartner.findAll({
      raw: true,
      where: {
        userId: userId,
      },
    });
    if (partnerDetails === null) {
      ctx.body = responseHelper.errorResponse({ code: "ERR_SBEE_0015" });
      ctx.response.status = HttpStatusCodes.NOT_FOUND;
      return;
    }
    partnerNumbers = partnerDetails.map((element) => {
      return element.partnerNumber;
    });
    console.log("partner numbers List:", partnerNumbers);
    partnerData = await User.findAll({
      raw: true,
      where: {
        contactNumber: partnerNumbers,
      },
    });
    data ={partnerDetails , partnerData}

  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = HttpStatusCodes.SUCCESS;
};

const symptomList = async (ctx) => {
  let { data } = {};
  let error = null;
  const { user } = ctx.request;
  const userId = _.get(user, "userId");
  console.log("userId :", userId);
  try {
    data = await Feedback.findAll({
      where :{
        tag:"symptom"
      }
    });
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = HttpStatusCodes.SUCCESS;
};

const moodList = async (ctx) => {
  let { data } = {};
  let error = null;
  const { user } = ctx.request;
  const userId = _.get(user, "userId");
  console.log("userId :", userId);
  try {
    data = await Feedback.findAll({
      where :{
        tag:"mood"
      }
    });
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = HttpStatusCodes.SUCCESS;
};


const getBadgeItems = async (ctx) => {
  let { data, itemData, exerciseIds } = {};
  let error = null;
  const { user, query } = ctx.request;
  const { badgeId } = query;
  const userId = _.get(user, "userId");
  console.log("userId :", userId);
  try {
    data = await BadgeItem.findAll({
      where: {
        badgeId: badgeId,
      },
    });
    exerciseIds = data.map((element) => {
      return element.itemId;
    });
    itemData = await Item.findAll({
      raw: true,
      where: {
        exerciseId: exerciseIds,
        status: badgeConstants.ACTIVE,
      },
    });
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, itemData);
  ctx.response.status = HttpStatusCodes.SUCCESS;
};

const badgeRunway = async (ctx) => {
  let { data, runwayCheck, cycle, today, newData } = {};
  let error = null;
  const { user } = ctx.request;
  const userId = _.get(user, "userId");
  console.log("userId :", userId);
  try {
    data = await UserOnboard.findOne({
      raw:true, 
        where: {
          userId: userId,
        },
      });
      cycle= data.menstrualCycle
      today = moment().utc().toISOString()
      runwayCheck=moment(moment().subtract(cycle, 'days')).utc().toISOString()
      log(cycle, today, runwayCheck)
    newData = await BadgeStatus.findAll({
      where :{
        userId:userId,
        badgeStatus: badgeConstants.COMPLETED,
        updatedAt:{ [Op.lt]: moment(runwayCheck)}
     }
    });
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, newData);
  ctx.response.status = HttpStatusCodes.SUCCESS;
};

const badgeArchived = async (ctx) => {
  let  data = {};
  let error = null;
  const { user, query } = ctx.request;
  const userId = _.get(user, "userId");
  const { badgeId } = query;
  console.log("userId :", userId);
  try {
    data = await BadgeStatus.update({
      badgeStatus: badgeConstants.ARCHIVED
    },
     {
      where :{
        userId:userId,
        badgeId:badgeId,
        badgeStatus: badgeConstants.COMPLETED,
     }
    });
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, data);
  ctx.response.status = HttpStatusCodes.SUCCESS;
};



module.exports = {
  addPartner: addPartner,
  removePartner: removePartner,
  partnerList: partnerList,
  checkPoint: checkPoint,
  updateName: updateName,
  symptomList:symptomList,
  moodList:moodList,
  getBadgeItems: getBadgeItems,
  deleteUserData:deleteUserData,
  deleteUserAccount:deleteUserAccount,
  badgeRunway:badgeRunway,
  badgeArchived:badgeArchived
};
