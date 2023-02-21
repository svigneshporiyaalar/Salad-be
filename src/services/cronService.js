const db = require("../models");
const HttpStatusCodes = require("../constants/HttpStatusCodes");
const responseHelper = require("../helpers/responseHelper");
const Cron = require("node-cron");
const chalk = require("chalk");
const moment = require('moment')
const log = console.log
const UserOnboard = db.userOnboard;


module.exports={
   cronFile(){
    Cron.schedule("06 59 18 * * *", async(ctx) => {
    log(chalk.bgMagenta("Cron job running 🚀"))
    let {data, todayDate,date , periodDate ,periodList,ovulationDay='', today , filter='' }={}
    let error = null
    try {
      data = await UserOnboard.findAll({
        raw:true,
        }) 
      periodDate=data.map((element) =>{
        return element.lastPeriodStart
      })
      log(periodDate)
      todayDate = new Date
      // date = todayDate.getFullYear()+'-'+(todayDate.getMonth()+1)+'-'+(todayDate.getDate()); 
      // today =todayDate.toLocaleDateString('en-US', { day: '2-digit'})
      // log(date)
      // filter = periodDate.filter((date) =>{
      //   const ischecking = periodDate.includes(date);
      //   return ischecking
      // })
      // log(filter)
    } catch (err) {
      error = err;
      responseCode = HttpStatusCodes.BAD_REQUEST;
    }
    // if (data[0]===0 ) {
    //   log(chalk.red("No event to be updated"))
    // } else {
      log(chalk.blue("🍺 Updated "))
      ctx.response.status = HttpStatusCodes.SUCCESS;
    // }
  })
}
}
