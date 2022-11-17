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
});

redis_client.on('error', (err) => {
	console.log(`Error ${err}`)
})

class Product {
	constructor(id, name, details) {
		this.id = id;
		this.name = name;
		this.details = details;
		this.views = 0;
		const today = new Date();
		this.regist_date = today.toJSON();
		this.update_date = today.toJSON();
	}

	static byRedis(id, product_info) {
		let product = new Product(id, product_info.name, product_info.details);
		product.views = product_info.views;
		product.regist_date = product_info.regist_date;
		product.update_date = product_info.update_date;
		return product;
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
			list.push(Product.byRedis(id, await redis_client.HGETALL(id)));
		}
	}
	console.log(list);
	res.json(list)
	await redis_client.disconnect();
});

router.post('/product/registration', async (req, res, next) => {
	await redis_client.connect();
	const id = await redis_client.incr('product:index:1');
	// console.log(id, req.body);
	const newProduct = new Product(id, req.body.name, req.body.details);
	await redis_client.hSet('product:id:' + newProduct.id, 'name', newProduct.name);
	await redis_client.hSet('product:id:' + newProduct.id, 'details', newProduct.details);
	await redis_client.hSet('product:id:' + newProduct.id, 'views', newProduct.views);
	await redis_client.hSet('product:id:' + newProduct.id, 'regist_date', newProduct.regist_date);
	await redis_client.hSet('product:id:' + newProduct.id, 'update_date', newProduct.update_date);
	await redis_client.disconnect();
	res.json(newProduct);
});

router.post('/product/remove', async (req, res, next) => {
	await redis_client.connect();
	const id = req.body.id;
	console.log(id);
	console.log(await redis_client.HKEYS(id));
	await redis_client.HDEL(id, await redis_client.HKEYS(id));
	await redis_client.disconnect();
	res.json(id);

});

router.post('/product/modify', async (req, res, next) => {
	await redis_client.connect();
	console.log(req.body);
	const id = req.body.id;
	await redis_client.hSet('product:id:' + id, 'name', req.body.name);
	await redis_client.hSet('product:id:' + id, 'details', req.body.details);
	await redis_client.disconnect();
	res.json(id);
});


module.exports = router;
