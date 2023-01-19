const Router = require('koa-router');
const { v1 } = require('../../../constants/RouterConstants');
const { newGoal, getGoal } = require('../../../controllers/goalBadgeController');
const router = new Router({ prefix: v1.goal });


router.post("/postGoal" , newGoal);

router.get("/allGoals" , getGoal);





module.exports = router;
