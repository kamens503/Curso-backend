const express = require('express'),
      { Router } = express,
      Product = require('../controller/file/Product.js'),
      config = require('../config'),

      user = config.user,
      products = new Product('products');


/** Product API component, contains all the CRUD routes
 * @type { Router } 
 * @method get - Path: '/ ', returns { Array } all products
 * @method get - Path: ' /:id ', returns { Object } single product
 * @method post - Path: ' / ', Add new product, returns product added
 * @method put - Path: ' /:id ', Edit product, returns message
 * @method delete - Path: ' /:id ', Delete product, returns message
 * 
 * */
const productApi = Router()

productApi.use(express.json());
productApi.use(express.urlencoded({extended : true}));

// Producto -- /api/productos
productApi.get('/', (req, res) => {
    console.log('ENV', test);
    msg = products.get(user.can('read','product'))
    if (msg.status) {
        res.status(401).send(msg.result)
    }
    res.status(200).send(msg.result)
});

productApi.get('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    // console.log(id)
    msg = products.get(user.can('read','product'),id)
    if (msg.status) {
        res.status(401).send(msg.result)
    }
    res.status(200).send(msg.result)
});

productApi.post('/', (req, res) => {
    const newProduct = req.body

    if (!newProduct) {
        res.status(400).send('Error, debe usar body, no query')
    }
    msg = products.create(user.can('create','product'), newProduct)

    if (!msg.done) {
        res.status(500).send(msg.result)
    }
    res.status(200).send(msg.result)
});

productApi.put('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const newProduct = req.body
    msg = products.update(user.can('update','product'), id, newProduct)
    res.send(msg)
});

productApi.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    msg = products.delete(user.can('delete','product'), id)
    res.send(msg)
})


module.exports = productApi