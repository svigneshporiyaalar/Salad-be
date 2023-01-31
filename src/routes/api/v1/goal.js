const Router = require('koa-router');
const { v1 } = require('../../../constants/RouterConstants');
const { newGoal, getAllGoals } = require('../../../controllers/adminController');
const { goalComplete } = require('../../../controllers/goalBadgeController');
const { isAdmin, verifyToken } = require('../../../middleware/authenticated');
const router = new Router({ prefix: v1.goal });


router.post("/postGoal" , isAdmin, newGoal)

router.get("/allGoals/admin" , isAdmin, getAllGoals);

router.get("/allGoals" , verifyToken, getAllGoals);

router.put("/complete", verifyToken , goalComplete )







module.exports = router;
