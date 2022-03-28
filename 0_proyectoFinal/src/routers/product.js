/* eslint-disable no-undef */
const express = require('express'),
	{ Router } = express,
    { validateNewProduct, validateProductChange } = require('../middleware'),
	{ products } = require('../dao'),
	{ container } = require('../config');

const productApi = Router();

productApi.use(express.json());
productApi.use(express.urlencoded({ extended: true }));

productApi.use( async (req, res, next) => {
	try {
		await products.init();
		return next();
	} catch (error) {
		throw `No se pudo iniciar el controller ${error}`;
	}
});

// Producto -- /api/productos
productApi.get('/', async (req, res) => {
	msg = await products.get();
	if (!msg.done) {
        const disc =await products.disconnect()
        console.log(disc);
		return res.status(401).send(msg.result);
	}
	return res.status(200).send(msg.result);
});

productApi.get('/:id', async (req, res) => {
	let id;
	if (container.provider == 'file') {
		id = parseInt(req.params.id);
	} else {
		id = req.params.id;
	}

	msg = await products.get(id);
	console.log(msg);
	if (!msg.done) {
		return res.status(401).send(msg.result);
	}
    await products.disconnect()
	return res.status(200).send(msg.result);
});

productApi.post('/', validateNewProduct, async (req, res) => {
	const newProduct = req.body;

	if (!newProduct) {
        await products.disconnect()
		return res.status(400).send('Error, debe usar body, no query');
	}
	msg = await products.addProduct(newProduct);

	if (!msg.done) {
        await products.disconnect()
		return res.status(500).send(msg.result);
	}
    await products.disconnect()
	return res.status(200).send(msg.result);
});

productApi.put('/:id', validateProductChange, async (req, res) => {
	let id;
	if (container.provider == 'file') {
		id = parseInt(req.params.id);
	} else {
		id = req.params.id;
	}
	const newProduct = req.body;
	msg = await products.update(id, newProduct);
	if (!msg.done) {
        await products.disconnect()
		return res.status(500).send(msg.result);
	}
    await products.disconnect()
	return res.status(200).send(msg.result);
});

productApi.delete('/:id', async (req, res) => {
	let id;
	if (container.provider == 'file') {
		id = parseInt(req.params.id);
	} else {
		id = req.params.id;
	}
	msg = await products.delete(id);
	if (!msg.done) {
        await products.disconnect()
		return res.status(500).send(msg.result);
	}
    await products.disconnect()
	return res.status(200).send(msg.result);
});

module.exports = productApi;
