const db = require('../models');
const moment = require('moment')
const HttpStatusCodes = require("../constants/HttpStatusCodes");
const UserOnboard = db.userOnboard;
const Badge = db.badge




exports.getMenstrualPhase = async(userId) => {
  let {data, periodStart,  periodEnd, cycle, nextPeriodStart,follicularStart, 
    follicularEnd, ovulationStart , ovulationEnd,lutealStart, lutealEnd } = {};
  let { today, condition, isMenstruation, isFollicular, isLuteal, isOvulation}  ={}
  let error = null;
  try {
    today = moment.utc(new Date()).format('YYYY-MM-DD HH:mm')
    data = await UserOnboard.findOne({
        raw:true, 
        where: {
          userId: userId,
        },
        attributes: ['lastPeriodStart','lastPeriodEnd', 
         ['menstrualCycle', 'periodCycle'] , 'birthControlId' ]
      });
      periodStart = moment.utc(data.lastPeriodStart).format('YYYY-MM-DD HH:mm')
      periodEnd = moment.utc(data.lastPeriodEnd).format('YYYY-MM-DD HH:mm')
      cycle= data.periodCycle
      if(cycle === 29.5 ){
        follicularStart = moment.utc(periodStart).add(5,'d').format('YYYY-MM-DD HH:mm')
        follicularEnd = moment.utc(periodStart).add(13,'d').format('YYYY-MM-DD HH:mm')
        ovulationStart = moment.utc(periodStart).add(14,'d').format('YYYY-MM-DD HH:mm')
        ovulationEnd = moment.utc(periodStart).add(17,'d').format('YYYY-MM-DD HH:mm')
        lutealStart = moment.utc(periodStart).add(18,'d').format('YYYY-MM-DD HH:mm')
        lutealEnd = moment.utc(periodStart).add(29,'d').add(12 ,'h').format('YYYY-MM-DD HH:mm')
      }
      else{
       follicularStart = moment.utc(periodEnd, 'YYYY-MM-DD').add(1,'d').format('YYYY-MM-DD HH:mm')
       follicularEnd = moment.utc(nextPeriodStart, 'YYYY-MM-DD').subtract(17,'d').format('YYYY-MM-DD HH:mm')
       ovulationStart = moment.utc(nextPeriodStart).subtract(16,'d').format('YYYY-MM-DD HH:mm')
       ovulationEnd = moment.utc(nextPeriodStart).subtract(12,'d').format('YYYY-MM-DD HH:mm')
       lutealStart = moment.utc(nextPeriodStart).subtract(11,'d').format('YYYY-MM-DD HH:mm')
       lutealEnd = moment.utc(nextPeriodStart).subtract(1,'d').format('YYYY-MM-DD HH:mm')
      }
      isFollicular =moment(today).isBetween(follicularStart , follicularEnd ,undefined, '[]'); 
      isOvulation =moment(today).isBetween(ovulationStart , ovulationEnd ,undefined, '[]'); 
      isLuteal =moment(today).isBetween(lutealStart , lutealEnd ,undefined, '[]'); 
      isMenstruation =moment(today).isBetween(periodStart , periodEnd ,undefined, '[]'); 
      condition ={ isFollicular,isOvulation,isLuteal,isMenstruation}
      return condition
  } catch (err) {
    error = err;
    console.log(err)
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
};

exports.getBadgeDetails = async (badgeList) => {
  let badgeDetails ={}
  let error = null
  try{
    badgeDetails = await Badge.findAll({
      raw:true,
      where:{
        badgeId:badgeList,
      },
      attributes : ["name","badgeId","frequency" , "grantBadge", "type"]
    })
    return badgeDetails
  } catch (err) {
    error = err;
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
  }
}
