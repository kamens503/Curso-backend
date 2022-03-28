/* eslint-disable no-undef */

require('dotenv').config();
const { container } = require('../../src/config.js'),
	Product = require('../../src/controller/firebase/Product'),
	products = new Product(container.mongodb.host),
	{ faker } = require('@faker-js/faker');

describe(' [ Firebase ] My products works if', () => {
	it('Can init container', async () => {
		const msg = await products.init();
		expect(msg).toMatchObject({ done: true });
	});

	it('Can sync database data to local data', (done) => {
		products
			.syncLocalData()
			.then(() => {
				done();
			})
			.catch((e) => {
				done(e);
			});
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
		return products
			.addProduct(product)
			.then((r) => {
				expect(r).toMatchObject({ done: true });
			})
			.catch((e) => {
				console.log(e);
			});
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
		return products
			.addProduct(product)
			.then((r) => {
				expect(r).toMatchObject({ done: true });
			})
			.catch((e) => {
				console.log(e);
			});
	});

	it('Can get all products from products', async () => {
		return products.get().then((r) => {
			expect(r).toMatchObject({ done: true });
		});
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

		return products
			.delete(id)
			.then((r) => {
				expect(r).toMatchObject({ done: true });
			})
			.catch((e) => {
				console.log(e);
			});
	});

	it('Can empty the products', async () => {
		return products
			.delete()
			.then((r) => {
				expect(r).toMatchObject({ done: true });
			})
			.catch((e) => {
				console.log(e);
			});
	});

	it('Can disconect from Database', async () => {
		const msg = await products.disconnect();
		try {
			expect(msg).toMatchObject({ done: true });
		} catch (error) {
			console.log(msg);
		}
	});
});
