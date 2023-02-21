require('dotenv').config();
const Koa = require('koa');
const koaBody = require('koa-body');
const routes = require('./routes');
const db = require('./models');
const { errorHandler } = require('./middleware');
const cors = require('@koa/cors');
const logger = require("koa-logger");
const { cronFile } = require("./services/cronService");
const PORT = 8030;


const app = new Koa();
app.use(logger());
app.use(errorHandler);
app.use(cors());


db.sequelize.sync({ force : false });

app.use(koaBody());
routes.createRoute(app);
cronFile()


app.listen(process.env.PORT || PORT, () => {
  console.log('Server listening in PORT:%s', process.env.PORT || PORT);
});
