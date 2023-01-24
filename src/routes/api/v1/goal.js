const Router = require('koa-router');
const { v1 } = require('../../../constants/RouterConstants');
const { getAllGoals, goalComplete } = require('../../../controllers/goalBadgeController');
const router = new Router({ prefix: v1.goal });



router.get("/allGoals" , getAllGoals);

router.put("/updateGoal" , goalComplete);



module.exports = router;
