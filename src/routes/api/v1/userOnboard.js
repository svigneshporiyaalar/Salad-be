const Router = require('koa-router');
const { v1 } = require('../../../constants/RouterConstants');
const { onboardDetails } = require('../../../controllers/userOnboardController');
const router = new Router({ prefix: v1.userOnboard });


router.post("/details" , onboardDetails );

router.put("/otherDetails" , otherDetails );









module.exports = router;
