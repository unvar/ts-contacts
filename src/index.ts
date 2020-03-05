// Server
import Koa from 'koa'
const app = new Koa();

// Database
import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
const adapter = new FileSync('res/db.json')
const db = low(adapter)

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
  const contacts = db.get('contacts').value()
  await ctx.render('index', { contacts })
});

router.post('/:id/delete', async (ctx) => {
  db.get('contacts').remove({ id: +ctx.params.id }).write()
  await ctx.redirect('/')
});

app
  .use(router.routes())
  .use(router.allowedMethods());

const PORT = 3000
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
});
