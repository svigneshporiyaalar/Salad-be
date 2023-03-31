const Router = require("koa-router");
const { v1 } = require("../../../constants/RouterConstants");
const { validateDuplicate, isAdmin } = require('../../../middleware/authenticated');
const { adminSignup, adminSignin, allUsers, userBadges, feedbackList,
     addFeedback, deleteFeedback, getAllItems, getBadgeItems, 
     deleteItems,addItem, linkItem, delinkItem} = require("../../../controllers/adminController.js");
const router = new Router({ prefix: v1.adminAuth });


router.post("/signup", validateDuplicate, adminSignup);

router.post("/signin", adminSignin);

router.get("/allUsers", isAdmin, allUsers )

router.get("/user/badges", isAdmin, userBadges )

router.get("/feedback-list", isAdmin , feedbackList )

router.post("/new-feedback", isAdmin , addFeedback )

router.delete("/remove-feedback", isAdmin , deleteFeedback )

router.get("/items-list", isAdmin , getAllItems )

router.get("/badge/items-list", isAdmin , getBadgeItems )

router.delete("/remove/item", isAdmin , deleteItems )

router.post("/new/item", isAdmin , addItem )

router.post("/link/badge-item" , isAdmin , linkItem );

router.post("/de-link/badge-item" , isAdmin , delinkItem );











module.exports = router;
