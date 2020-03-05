// Server
import Koa from 'koa'
const app = new Koa();

// http body parser
import bodyparser from 'koa-bodyparser'
app.use(bodyparser())

// Database
import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
const adapter = new FileSync('res/db.json')
const db = low(adapter)

interface IContact {
  id: number
  firstname: string
  lastname: string
  phone: string
  email: string
}

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

router.post('/', async (ctx) => {
  // get all contacts
  const contacts: IContact[] = db.get('contacts').value()

  // get the max id
  const maxId = contacts.reduce((prev, curr) => {
    return Math.max(prev, curr.id)
  }, 0)

  // create new contact
  contacts.push({
    ...ctx.request.body,
    id: maxId + 1
  })

  // write to db
  db.setState({ contacts }).write()
  
  await ctx.redirect('/')
});

app
  .use(router.routes())
  .use(router.allowedMethods());

const PORT = 3000
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
});
