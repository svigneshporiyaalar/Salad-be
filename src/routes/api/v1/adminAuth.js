const Router = require("koa-router");
const { v1 } = require("../../../constants/RouterConstants");
const AuthController = require("../../../controllers/AuthController.js");
const HttpStatusCodes = require("../../../constants/HttpStatusCodes");
const responseHelper = require("../../../helpers/responseHelper");
const { validateDuplicate } = require('../../../middleware/authenticated');
const { adminSignup, adminSignin } = require("../../../controllers/AuthController.js");
const router = new Router({ prefix: v1.adminAuth });


router.post("/signin", adminSignin);

router.post("/signup", validateDuplicate,adminSignup);


module.exports = router;
