var express = require('express');
var router = express.Router();

const redis = require('redis');
const redis_client = redis.createClient();

redis_client.on('error', (err) => {
  console.log(`Error ${err}`)
})

/* GET home page. */
router.get('/', async (req, res, next) => {
  res.render('index', { title: 'Salestagram' });
});

router.get('/product/list', async (req, res, next) => {
  await redis_client.connect();
  res.json(await redis_client.hGetAll('products'))
  await redis_client.disconnect();
});

router.post('/product/registration', async (req, res, next) => {
  await redis_client.connect();
  console.log(req.body);
  // res.json(await redis_client.hSet('products', req.body.product_name, req.body.product_details))
  await redis_client.disconnect();
});

module.exports = router;
