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

class Product {
	constructor(_id, name, details, images) {
		this._id = _id;
		this.name = name;
		this.details = details;
		this.images = images !== undefined ? images : [];
		this.views = 0;
		this.like = 0;
		const today = new Date();
		this.regist_date = today.toJSON();
		this.update_date = today.toJSON();
	}

	static byRedis(id, product_info) {
		let product = new Product(id, product_info.name, product_info.details, product_info.images);
		product.views = product_info.views;
		product.like = product_info.like;
		product.regist_date = product_info.regist_date;
		product.update_date = product_info.update_date;
		return product;
	}

	static async getAll() {
		await redis_client.connect();
		let list = [];
		const product_keys = await redis_client.KEYS('product:id:*');
		if (product_keys.length > 0) {
			for (const id of product_keys) {
				list.push(this.byRedis(id, await redis_client.HGETALL(id)));
			}
		}
		list.sort(function (a, b) {
			return new Date(b.update_date) - new Date(a.update_date);
		});
		list.forEach((product) => {
			console.log(product.id, product.name);
		});
		await redis_client.disconnect();
		return list;
	}

	static async get(id) {
		await redis_client.connect();
		const product = this.byRedis(id, await redis_client.hGetAll(id));
		// this.id = id;
		// this.name = product.name;
		// this.details = product.details;
		// this.images = product.images;
		// this.views = product.views;
		// this.like = product.like;
		// this.regist_date = product.regist_date;
		// this.update_date = product.update_date;
		await redis_client.disconnect();
		return product;
	}

	static async registration(data) {
		await redis_client.connect();
		let id = await redis_client.incr('product:index:1');
		id = 'product:id:' + id;
		console.log(id, data.name);
		const newProduct = new Product(id, data.name, data.details, data.images);
		console.log(newProduct);
		await redis_client.hSet(id, 'name', newProduct.name);
		await redis_client.hSet(id, 'details', newProduct.details);
		await redis_client.hSet(id, 'views', newProduct.views);
		await redis_client.hSet(id, 'like', newProduct.like);
		await redis_client.hSet(id, 'images', JSON.stringify(newProduct.images));
		await redis_client.hSet(id, 'regist_date', newProduct.regist_date);
		await redis_client.hSet(id, 'update_date', newProduct.update_date);
		await redis_client.disconnect();
		return newProduct;
	}

	static async remove(id) {
		await redis_client.connect();
		console.log(id);
		console.log(await redis_client.HKEYS(id));
		await redis_client.HDEL(id, await redis_client.HKEYS(id));
		await redis_client.disconnect();
		return id;
	}

	static async modify(data) {
		console.log(data);
		const id = data.id;
		await redis_client.connect();
		await redis_client.hSet(id, 'name', data.name);
		await redis_client.hSet(id, 'details', data.details);
		await redis_client.hSet(id, 'images', JSON.stringify(data.images !== undefined ? data.images : []));
		const today = new Date();
		await redis_client.hSet(id, 'update_date', today.toJSON());
		await redis_client.disconnect();
		return id;
	}

	static async increaseLike(id) {
		await redis_client.connect();
		const result = await redis_client.hIncrBy(id, 'like', 1);
		await redis_client.disconnect();
		return result;
	}
}

Product.prototype.toString = () => {
	return '${this.name}';
}

module.exports = Product;
