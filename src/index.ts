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

app.use(async ctx => {
  await ctx.render('index')
});

const PORT = 3000
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
});
