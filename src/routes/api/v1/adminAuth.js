const Router = require("koa-router");
const { v1 } = require("../../../constants/RouterConstants");
const { validateDuplicate, isAdmin } = require('../../../middleware/authenticated');
const { adminSignup, adminSignin, allUsers, newGoal, newBadge } = require("../../../controllers/adminController.js");
const router = new Router({ prefix: v1.adminAuth });


router.post("/signin", adminSignin);

router.post("/signup", validateDuplicate,adminSignup);

router.get("/allUsers", isAdmin , allUsers )

router.post("/postGoal" , newGoal)

router.post("/newBadge" , newBadge );





module.exports = router;
