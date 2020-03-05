// Server
import Koa from 'koa'
const app = new Koa();

// Templates
import Pug from 'koa-pug'
new Pug({
  viewPath: './res/views',
  basedir: './res/views',
  app: app
});

// Router
import Router from '@koa/router'
const router = new Router();

router.get('/', async (ctx) => {
  await ctx.render('index')
});

app
  .use(router.routes())
  .use(router.allowedMethods());

const PORT = 3000
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
});
