const { faker } = require('@faker-js/faker')

module.exports = function getProductMockups(n) {
    const testProducts = [];

	for (let index = 0; index < n; index++) {
		testProducts.push({
			thumbnail: faker.image.imageUrl(600, 600, 'food', true, true),
			title: faker.commerce.productName(),
			price: faker.commerce.price(),
		});
	}
    return testProducts
} 
