const { Router } = require('express'),
      getProductMockups = require('./products.mocks')

const productsRouter = new Router()
productsRouter.get('/api/productos-test', (req, res) => {
	const testProducts = getProductMockups(4);
	res.render('product_table.ejs', { data: testProducts, status: '' });
});