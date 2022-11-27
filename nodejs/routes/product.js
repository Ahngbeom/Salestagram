const express = require('express');
const router = express.Router();

const redis = require('redis');
const redis_client = redis.createClient({
	socket: {
		host: 'localhost',
		// host: 'redis',
		port: 6379
	}
});

redis_client.on('error', (err) => {
	console.log(`Error ${err}`)
});

/* GET home page. */
router.get('/', async (req, res, next) => {
	res.render('index', { title: 'Salestagram' });
});

router.get('/product/register', async (req, res, next) => {
	res.render('product/register', { title: 'Salestagram - Register' });
});

const Product = require('../class/product.js');
// var product = new Product();

router.get('/api/product/list', async (req, res, next) => {
	res.json(await Product.getAll());
});

router.get('/api/product/info', async (req, res, next) => {
	const id = req.query.id;
	const product = await Product.get(id);
	console.log(product);
	res.json(product);
});

router.post('/api/product/registration', async (req, res, next) => {
	await redis_client.connect();
	let id = await redis_client.incr('product:index:1');
	id = 'product:id:' + id;
	console.log(id, req.body.name);
	const newProduct = new Product(id, req.body.name, req.body.details, req.body.images);
	console.log(newProduct);
	await redis_client.hSet(id, 'name', newProduct.name);
	await redis_client.hSet(id, 'details', newProduct.details);
	await redis_client.hSet(id, 'views', newProduct.views);
	await redis_client.hSet(id, 'like', newProduct.like);
	await redis_client.hSet(id, 'images', JSON.stringify(newProduct.images));
	await redis_client.hSet(id, 'regist_date', newProduct.regist_date);
	await redis_client.hSet(id, 'update_date', newProduct.update_date);
	await redis_client.disconnect();
	res.json(newProduct);
});

router.post('/api/product/remove', async (req, res, next) => {
	await redis_client.connect();
	const id = req.body.id;
	console.log(id);
	console.log(await redis_client.HKEYS(id));
	await redis_client.HDEL(id, await redis_client.HKEYS(id));
	await redis_client.disconnect();
	res.json(id);

});

router.post('/api/product/modify', async (req, res, next) => {
	await redis_client.connect();
	console.log(req.body);
	const id = req.body.id;
	await redis_client.hSet(id, 'name', req.body.name);
	await redis_client.hSet(id, 'details', req.body.details);
	const today = new Date();
	await redis_client.hSet(id, 'update_date', today.toJSON());
	await redis_client.disconnect();
	res.json(id);
});

router.post('/api/product/like/increase', async (req, res, next) => {
	await redis_client.connect();
	const id = req.body.id;
	res.json(await redis_client.hIncrBy(id, 'like', 1));
	await redis_client.disconnect();
});


module.exports = router;
