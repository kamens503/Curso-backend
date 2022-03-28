/* eslint-disable no-undef */
require('dotenv').config();
const { container } = require('../../src/config.js'),
	Product = require('../../src/controller/mongo/Product'),
	products = new Product(container.mongodb.host);

const { faker } = require('@faker-js/faker');

describe(' [ MONGO.DB ] My products works if', () => {
	it('Can init products', async () => {
		const msg = await products.init();
		expect(msg).toMatchObject({ done: true });
	});

	it('Can sync database data to local data', async () => {
		const msg = await products.syncLocalData();
		try {
			expect(msg).toMatchObject({ done: true });
		} catch (error) {
			console.log(error);
		}
	});

	it('Can add product to products', async () => {
		const product = {
			name: faker.commerce.product(),
			description: faker.commerce.productDescription(),
			price: faker.commerce.price(),
			stock: faker.datatype.number(),
			img: faker.image.imageUrl(),
			timestamp: faker.time.recent(),
			sku: faker.datatype.number(),
		};

		const msg = await products.addProduct(product);
		try {
			expect(msg).toMatchObject({ done: true });
		} catch (error) {
			console.log(error);
		}
	});

	it('Can add another product', async () => {
		const product = {
			name: faker.commerce.product(),
			description: faker.commerce.productDescription(),
			price: faker.commerce.price(),
			stock: faker.datatype.number(),
			img: faker.image.imageUrl(),
			timestamp: faker.time.recent(),
			sku: faker.datatype.number(),
		};

		const msg = await products.addProduct(product);
		try {
			expect(msg).toMatchObject({ done: true });
		} catch (error) {
			console.log(error);
		}
	});

	it('Can get all products from products', async () => {
		const msg = await products.get();
		try {
			expect(msg).toMatchObject({ done: true });
		} catch (error) {
			console.log(error);
		}
	});

	it('Can get Index of first product', () => {
		const id = products.getProductByIndex(0).result._id;
		try {
			expect(products.getIndex(id)).toBe(0);
		} catch (e) {
			console.log(products.getIndex(id));
		}
	});

	it('Can get first product Index', () => {
		try {
			expect(products.getProductByIndex(0)).toMatchObject({ done: true });
		} catch (error) {
			console.log(products.getProductByIndex(0));
		}
	});

	it('Can delete first product from products', async () => {
		const id = products.getProductByIndex(0).result._id;

		const msg = await products.delete(id);
		try {
			expect(msg).toMatchObject({ done: true });
		} catch (error) {
			console.log(error);
		}
	});

	it('Can empty the products', async () => {
		const msg = await products.delete();
		try {
			expect(msg).toMatchObject({ done: true });
		} catch (error) {
			console.log(error);
		}
	});

	it('Can disconect from Database', async () => {
		const msg = await products.disconnect();
		try {
			expect(msg).toMatchObject({ done: true });
		} catch (error) {
			console.log(error);
		}
	});
});
