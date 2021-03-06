/* eslint-disable no-undef */
require('dotenv').config();
const { container } = require('../../src/config.js'),
	Cart = require('../../src/controller/file/Cart'),
	cart_id = container.file.name.cart,
	cart = new Cart(cart_id);

let product_id;

const { faker } = require('@faker-js/faker');

describe(' [ FILE ] My cart works if', () => {
	it('Can init cart', async () => {
		const msg = await cart.init();
		expect(msg).toMatchObject({ done: true });
	});

	it('Can Assign a cart', () => {
		expect(cart.assignCart(cart_id)).toMatchObject({ done: true });
	});

	it('Can update database/file', () => {
		expect(cart.syncLocalData()).toMatchObject({ done: true });
	});

	it('Can add product to cart', () => {
		const product = {
			name: faker.commerce.product(),
			description: faker.commerce.productDescription(),
			price: faker.commerce.price(),
			stock: faker.datatype.number(),
			img: faker.image.imageUrl(),
			timestamp: faker.time.recent(),
		};
		expect(cart.addProduct(product)).toMatchObject({ done: true });
	});

	it('Can add another product', () => {
		const product = {
			name: faker.commerce.product(),
			description: faker.commerce.productDescription(),
			price: faker.commerce.price(),
			stock: faker.datatype.number(),
			img: faker.image.imageUrl(),
			timestamp: faker.time.recent(),
		};
		expect(cart.addProduct(product)).toMatchObject({ done: true });
	});

	it('Can get all products from cart', () => {
		expect(cart.get()).toMatchObject({ done: true });
	});

	it('Can get Index of product', () => {
		expect(cart.getIndex(0)).toEqual(expect.any(Number));
	});

	it('Can get first product Index', () => {
		expect(cart.getProductByIndex(0)).toMatchObject({ done: true });
	});

	it('Can get first product from cart', () => {
		expect(cart.get(0)).toMatchObject({ done: true });
	});

	it('Can delete first product from cart', () => {
		product_id = cart.getProductByIndex(0).result.id;
        console.log(product_id);
		const product = cart.delete(product_id);
        console.log(product);
		expect(product).toMatchObject({ done: true });
	});

	// it('Can empty the cart', () => {
	// 	const msg = cart.delete();
	// 	// console.log(msg);
	// 	expect(msg).toMatchObject({ done: true });
	// });
});
