var nodemailer = require('nodemailer');


let transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: '465',
  secure: true,
  auth: {
    user: process.env.SERVER_EMAIL_ID,
    pass: process.env.SERVER_PASSWORD
  }
});
let mailOptions = {
  from: process.env.SERVER_EMAIL_ID,
  to: 'vignesh.fzs@gmail.com',
  subject: 'Weddsetgo - Password verification link',
  text: ` Dear ,

   We received a request to reset your Weddsetgo account password.
   Please click the verification link to reset your password.
   Do not forward or give this link to anyone. if you find any suspicious behaviour kindly contact the admin.
   -Link will be expired in 10 minutes`
};
module.exports = {
  mailOptions: mailOptions,
};


