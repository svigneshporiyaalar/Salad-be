const db = require("../models");
const HttpStatusCodes = require("../constants/HttpStatusCodes");
const responseHelper = require("../helpers/responseHelper");
const Cron = require("node-cron");
const chalk = require("chalk");
const moment = require('moment');
const badgeConstants = require("../constants/badgeConstants");
const log = console.log
const UserOnboard = db.userOnboard;


module.exports={
   cronFile(){
    Cron.schedule("06 18 13 * * *", async(ctx) => {
    log(chalk.bgMagenta("Cron job running 🚀"))
    let {data, todayDate,date , periodDate ,userId, today , ovulationDay, filter='' }={}
    let error = null
    try {
      todayDate = new Date
      date = moment.utc(todayDate).format('YYYY-MM-DD ')
      ovulationDay = moment.utc(date).subtract(14,'d').format('YYYY-MM-DD ')
      log(ovulationDay)
      data = await UserOnboard.findAll({
        raw:true,
        where:{
          onboardStatus: badgeConstants.COMPLETED

        }
        }) 
      periodDate=data.map((element) =>{
        const ovulationDay = moment.utc(element.lastPeriodStart).add(14,'d').format('YYYY-MM-DD ')
        const userId = element.userId
        return {
         ovulationDay , userId
        }
      })
      log(periodDate)
      todayDate = new Date
      date = moment.utc(todayDate).format('YYYY-MM-DD ')
      log(date)
      if (periodDate[1].ovulationDay.includes(date)) {
        log(chalk.green("🍺 Ovulation day notification sent "))
      } else{
        log(chalk.red("🍺 No Ovulation day notification for today "))
      }
    } catch (err) {
      error = err;
      responseCode = HttpStatusCodes.BAD_REQUEST;
    }
      ctx.response.status = HttpStatusCodes.SUCCESS;
  })
}
}
