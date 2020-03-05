import Koa from 'koa'

const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

const PORT = 3000
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
});
