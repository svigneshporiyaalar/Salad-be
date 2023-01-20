const Router = require('koa-router');
const { v1 } = require('../../../constants/RouterConstants');
const { newGoal, getAllGoals, goalComplete } = require('../../../controllers/goalBadgeController');
const router = new Router({ prefix: v1.goal });


router.post("/postGoal" , newGoal);

router.get("/allGoals" , getAllGoals);

router.put("/updateGoal" , goalComplete);



module.exports = router;
