const Router = require("koa-router");
const { v1 } = require("../../../constants/RouterConstants");
const { validateDuplicate, isAdmin } = require('../../../middleware/authenticated');
const { adminSignup, adminSignin, allUsers, userBadges, feedbackList,
     addFeedback, deleteFeedback} = require("../../../controllers/adminController.js");
const router = new Router({ prefix: v1.adminAuth });


router.post("/signup", validateDuplicate, adminSignup);

router.post("/signin", adminSignin);

router.get("/allUsers", isAdmin, allUsers )

router.get("/user/badges", isAdmin, userBadges )

router.get("/feedback-list", isAdmin , feedbackList )

router.post("/add/feedback", isAdmin , addFeedback )

router.delete("/remove/feedback", isAdmin , deleteFeedback )






module.exports = router;
