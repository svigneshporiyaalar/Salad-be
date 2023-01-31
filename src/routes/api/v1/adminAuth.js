const Router = require("koa-router");
const { v1 } = require("../../../constants/RouterConstants");
const { validateDuplicate, isAdmin } = require('../../../middleware/authenticated');
const { adminSignup, adminSignin, allUsers } = require("../../../controllers/adminController.js");
const router = new Router({ prefix: v1.adminAuth });


router.post("/signup", validateDuplicate, adminSignup);

router.post("/signin", adminSignin);

router.get("/allUsers", isAdmin, allUsers )







module.exports = router;
