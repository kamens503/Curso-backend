const express = require('express'),
      { Router } = express,
      { v4: uuidv1 } = require('uuid'),
      config = require('../config'),
      Cart = require('../controller/file/Cart.js')

      user = config.user;

/** Cart API component, contains all the CRUD routes
 * @type { Router } 
 * @method post - Path: '/ ' . Add new cart, returns message
 * @method get - Path: ' /:id/productos ' . Returns { Array } all products
 * @method get - Path: ' /:id/productos ' . Returns { Object } single product
 * @method post - Path: ' /:id/productos ' . Add new product, returns product added
 * @method delete - Path: ' /:id/productos/:idProduct ' . Delete product, returns message
 * @method delete - Path: ' /:id ', Delete cart, returns message
 * 
 * */      
const cartApi = Router()

cartApi.use(express.json());
cartApi.use(express.urlencoded({extended : true}));

// Carrito  -- /api/
cartApi.post('/', (req, res) => {
    const id = uuidv1()

    const cart = new Cart(id, user.getName())
    msg = cart.get(user.can('read','cart'))
    if (!msg.done) {
        res.status(401).send(msg.result)
    }
    res.status(200).send(id)
});

cartApi.get('/:id/productos', (req, res) => {
    const id = req.params.id

    const cart = new Cart(id, user.getName())
    msg = cart.get(user.can('read','cart'))
    if (!msg.done) {
        res.status(401).send(msg.result)
    }
    res.status(200).send(msg.result)
});

cartApi.get('/:id/productos/:idProduct', (req, res) => {
    const id = req.params.id
    const idProduct = parseInt(req.params.idProduct)


    const cart = new Cart(id, user.getName())
    msg = cart.get(user.can('read','cart'),idProduct)
    if (msg.status) {
        res.status(401).send(msg.result)
    }
    res.status(200).send(msg.result)
});

cartApi.post('/:id/productos', (req, res) => {
    const newProduct = req.body

    if (!newProduct) {
        res.status(400).send('Error, debe usar body, no query')
    }


    const id = req.params.id

    const cart = new Cart(id, user.getName())
    msg = cart.create(user.can('create','product'), newProduct)

    if (!msg.done) {
        res.status(500).send(msg.result)
    }
    res.status(200).send(msg.result)
});

cartApi.delete('/:id', (req, res) => {
    const id = req.params.id
    const cart = new Cart(id, user.getName())
    msg = cart.delete(user.can('delete','product'), 'ALL')
    res.send(msg)
});

cartApi.delete('/:id/productos/:idProduct', (req, res) => {
    const id = req.params.id
    const idProduct = parseInt(req.params.idProduct)

    console.log('Endpoint', id, idProduct);

    const cart = new Cart(id, user.getName())
    msg = cart.delete(user.can('delete','product'), idProduct)
    res.send(msg)
});

module.exports = cartApi