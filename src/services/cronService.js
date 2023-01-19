const db = require("../models");
const HttpStatusCodes = require("../constants/HttpStatusCodes");
const responseHelper = require("../helpers/responseHelper");
const Cron = require("node-cron");
const chalk = require("chalk");
const log = console.log
const UserOnboard = db.userOnboard;


module.exports={
   cronFile(){
    Cron.schedule("06 44 16 * * *", async(ctx) => {
    log(chalk.bgMagenta("Cron job running 🚀"))
    let {data}={}
    let error = null
    try {
      data = await UserOnboard.findAll({
        where: { 
            lastPeriodDate,
        },
        })
        console.log(data)
    //   todayDate = new Date
    //   date = todayDate.getFullYear()+'-'+(todayDate.getMonth()+1)+'-'+(todayDate.getDate()-1); 
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
