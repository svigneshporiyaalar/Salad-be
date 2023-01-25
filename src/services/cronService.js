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
    Cron.schedule("06 33 18 * * *", async(ctx) => {
    log(chalk.bgMagenta("Cron job running 🚀"))
    let {data, todayDate,date , periodDate ='',periodList,ovulationDay='', today , filter='' }={}
    let error = null
    try {
      data = await UserOnboard.findAll({
        raw:true,
        })
      data.map((element) =>{
        periodDate += element.lastPeriodDate.toLocaleDateString('en-US', { day: '2-digit'}) + ","
      })
      log(periodDate)
      periodList= periodDate.split(",").slice(0,-1)
      log(periodList)
      ovulationDay = periodList.map((element) =>{
        return (+element) + (+12)
      })
      log(ovulationDay)
      todayDate = new Date
      date = todayDate.getFullYear()+'-'+(todayDate.getMonth()+1)+'-'+(todayDate.getDate() +12); 
      today =todayDate.toLocaleDateString('en-US', { day: '2-digit'})
      log(`timeZone : ${todayDate} , Date : ${date} , Day : ${today}`)
      filter = ovulationDay.filter((element) =>{
        return element = today
      })
      log(filter)
    } catch (err) {
      error = err;
      responseCode = HttpStatusCodes.BAD_REQUEST;
    }
    // if (data[0]===0 ) {
    //   log(chalk.red("No event to be updated"))
    // } else {
      log(chalk.blue("🍺 Updated -> completed event"))
      ctx.response.status = HttpStatusCodes.SUCCESS;
    // }
  })
}
}
