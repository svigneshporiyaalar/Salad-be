const db = require("../models");
const HttpStatusCodes = require("../constants/HttpStatusCodes");
const Cron = require("node-cron");
const chalk = require("chalk");
const moment = require('moment');
const badgeConstants = require("../constants/badgeConstants");
const log = console.log
const UserOnboard = db.userOnboard;
const Badge = db.badge
const UserTracking = db.userTracking;
const MoodTracker = db.moodTracker
const BadgeStatus = db.badgeStatus;



module.exports={
   cronFile() {
    Cron.schedule("06 23 16 * * *", async(ctx) => {
    log(chalk.bgMagenta("Badge runway check running 🚀"))
    let {data, today, badgeCheck,todayDate, cycle, date }={}
    let error = null
    try {
      date= new Date()
      // todayDate= moment.utc(date).format('YYYY-MM-DD')
      // log(todayDate)
      cycle=moment(moment(new Date()).subtract(28, 'days').calendar()).utc().toISOString()
      log(cycle)
      data = await BadgeStatus.findOne({
        raw:true,
        where:{
          badgeStatus: badgeConstants.COMPLETED,
          updateAt
        }
        }) 
        log(data.updatedAt)
      // badgeCheck=data.map((element) =>{
      //   const thresholdDay = moment.utc(element.updatedAt).add(28,'d').format('YYYY-MM-DD ')
      //   const userId = element.userId
      //   const badgeId= element.badgeId
      //   if(thresholdDay === today)
      //   return {
          
      //   }
      // })

      //    { 
      //    thresholdDay , userId
      //   }
      // }
    
    } catch (err) {
      error = err;
      responseCode = HttpStatusCodes.BAD_REQUEST;
    }
      ctx.response.status = HttpStatusCodes.SUCCESS;
  })
}
}

// module.exports={
//  badgeRunway() {
//   Cron.schedule("06 01 18 * * *", async(ctx) => {
//   log(chalk.bgMagenta("badge runway check running 🚀"))
//   let {data, todayDate,date , periodDate ,userId, today , ovulationDay, filter='' }={}
//   let error = null
//   try {
//     todayDate = new Date
//     date = moment.utc(todayDate).format('YYYY-MM-DD ')
//     ovulationDay = moment.utc(date).subtract(14,'d').format('YYYY-MM-DD ')
//     log(ovulationDay)
//     data = await UserOnboard.findAll({
//       raw:true,
//       where:{
//         onboardStatus: badgeConstants.COMPLETED

//       }
//       }) 
//     periodDate=data.map((element) =>{
//       const ovulationDay = moment.utc(element.lastPeriodStart).add(14,'d').format('YYYY-MM-DD ')
//       const userId = element.userId
//       return {
//        ovulationDay , userId
//       }
//     })
//     log(periodDate)
//     todayDate = new Date
//     date = moment.utc(todayDate).format('YYYY-MM-DD ')
//     log(date)
//     if (periodDate[1].ovulationDay.includes(date)) {
//       log(chalk.green("🍺 Ovulation day notification sent "))
//     } else{
//       log(chalk.red("🍺 No Ovulation day notification for today "))
//     }
//   } catch (err) {
//     error = err;
//     responseCode = HttpStatusCodes.BAD_REQUEST;
//   }
//     ctx.response.status = HttpStatusCodes.SUCCESS;
// })
// }
// }





