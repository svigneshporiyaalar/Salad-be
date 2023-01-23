const db = require("../models");
const HttpStatusCodes = require("../constants/HttpStatusCodes");
const responseHelper = require("../helpers/responseHelper");
const Cron = require("node-cron");
const chalk = require("chalk");
const log = console.log
const UserOnboard = db.userOnboard;


module.exports={
   cronFile(){
    Cron.schedule("06 49 18 * * *", async(ctx) => {
    log(chalk.bgMagenta("Cron job running 🚀"))
    let {data, todayDate,date , periodDate ='',periodList,newdate ='' }={}
    let error = null
    try {
      data = await UserOnboard.findAll({
        raw:true,
        })
      data.map((element) =>{
        periodDate += element.lastPeriodDate.slice(8) + ","
      })
      // periodDate = data.lastPeriodDate
      console.log(periodDate)
      periodList= periodDate.split(",").slice(0,-1)
      console.log( periodList)
      newdate = periodList.map(function increment(number) {
        return number + 12;
      });
      console.log(newdate)

      // console.log(periodList)
      // console.log(periodDate.getDate())
      todayDate = new Date
      date = todayDate.getFullYear()+'-'+(todayDate.getMonth()+1)+'-'+(todayDate.getDate()-1); 
      console.log(todayDate)
      console.log(date)
      // newdate=date.getDate()
      // console.log(newdate)
      console.log(todayDate.toLocaleDateString('en-US', { day: '2-digit'}))
      console.log(periodDate.getDate())



    //   today= Date.parse(date)
    //   log(chalk.blue(date ))
    //   data = await Booking.update(
    //     {
    //       vendorStatus: BookingConstants.COMPLETED,
    //       status: BookingConstants.COMPLETED
    //     },
    //     {
    //       where: {
    //         eventDate: date,
    //         status: BookingConstants.CONFIRMED,
    //       },
    //     }
    //   );
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
