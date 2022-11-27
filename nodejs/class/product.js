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
	constructor(id, name, details, images) {
		this.id = id;
		this.name = name;
		this.details = details;
		this.images = images !== undefined ? images : null;
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
}

Product.prototype.toString = () => {
	return '${this.name}';
}

module.exports = Product;
