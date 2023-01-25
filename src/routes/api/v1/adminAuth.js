const Router = require("koa-router");
const { v1 } = require("../../../constants/RouterConstants");
const { validateDuplicate, isAdmin } = require('../../../middleware/authenticated');
const { adminSignup, adminSignin, allUsers, newGoal, 
     newBadge, removeBadge, updateBadge } = require("../../../controllers/adminController.js");
const { getAllGoals, getAllBadges } = require("../../../controllers/adminController");
const router = new Router({ prefix: v1.adminAuth });


router.post("/signup", validateDuplicate, adminSignup);

router.post("/signin", adminSignin);

router.get("/allUsers", isAdmin, allUsers )

router.post("/postGoal" , isAdmin, newGoal)

router.post("/newBadge" , isAdmin, newBadge );

router.get("/allGoals" , isAdmin, getAllGoals);

router.get("/allBadges", isAdmin, getAllBadges)

router.put("/updateBadge", isAdmin , updateBadge )

router.delete("/removeBadge", isAdmin , removeBadge )






module.exports = router;
