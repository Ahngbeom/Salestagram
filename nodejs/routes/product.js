var express = require('express');
var router = express.Router();

const redis = require('redis');
// const redis_client = redis.createClient();
const redis_client = redis.createClient({
  socket: {
    host: 'localhost',
    // host: 'redis',
    port: 6379
  }
  // url: "redis://redis:6379",
  // legacyMode: true
});

redis_client.on('error', (err) => {
  console.log(`Error ${err}`)
})

class Product {
  constructor(id, name, details) {
    this.id = id;
    this.name = name;
    this.details = details;
  }
}

/* GET home page. */
router.get('/', async (req, res, next) => {
  res.render('index', { title: 'Salestagram' });
});

router.get('/product/list', async (req, res, next) => {
  await redis_client.connect();
  let list = [];
  const product_keys = await redis_client.KEYS('product:id:*');
  // console.log(product_keys);
  // console.log("is Array? ", Array.isArray(product_keys));
  // console.log(product_keys.length);
  if (product_keys.length > 0) {
    for (const id of product_keys) {
      const product_info = await redis_client.HGETALL(id);
      list.push(new Product(id.split(':')[2], product_info.name, product_info.details));
    }
  }
  console.log(list);
  res.json(list)
  await redis_client.disconnect();
});

router.post('/product/registration', async (req, res, next) => {
  await redis_client.connect();
  const id = await redis_client.incr('product:index:1');
  console.log(id, req.body);
  await redis_client.hSet('product:id:' + id, 'name', req.body.name);
  await redis_client.hSet('product:id:' + id, 'details', req.body.details);
  await redis_client.disconnect();
});

router.post('/product/delete', async (req, res, next) => {
  await redis_client.connect();
  const id = 'product:id:' + req.body.id;
  console.log(id);
  console.log(await redis_client.HKEYS(id));
  await redis_client.HDEL(id, await redis_client.HKEYS(id))
  await redis_client.disconnect();
});

module.exports = router;
