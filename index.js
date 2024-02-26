/**
 * @Date        2024/02/19 15:59:03
 * @Author      zono
 * @Description 配置koa
 * */

const Koa = require("koa");
const Router = require("koa-router");
const mockList = require("./mock/index");

const app = new Koa();
const router = new Router();

/**
 * 模拟响应延时
 * */
async function getRes(fn, ctx) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(fn(ctx));
    }, 1000);
  });
}

/**
 * 注册 mock路由
 * */
mockList.forEach((item) => {
  const { method, url, response } = item;
  router[method](url, async ctx => {
    ctx.body = await getRes(response, ctx);
  });
});

app.use(router.routes());
app.listen(3001); // port 端口
