const Router = require('koa-router');
const { v1 } = require('../../../constants/RouterConstants');
const { newGoal, getAllGoals, removeGoal, updateGoal, inactiveGoals } = require('../../../controllers/adminController');
const { goalComplete, getAllUserGoals } = require('../../../controllers/goalBadgeController');
const { isAdmin, verifyToken, userToken } = require('../../../middleware/authenticated');
const router = new Router({ prefix: v1.goal });


router.post("/postGoal" , isAdmin, newGoal)

router.get("/allGoals/admin" , isAdmin, getAllGoals);

router.get("/inactive" , isAdmin, inactiveGoals);

router.get("/allGoals" , userToken, getAllUserGoals);

router.put("/complete", userToken , goalComplete )

router.put("/remove", isAdmin , removeGoal )

router.put("/update", isAdmin , updateGoal )





module.exports = router;
