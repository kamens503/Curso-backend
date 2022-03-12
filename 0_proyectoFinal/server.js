const express = require('express'),
      { Router } = express,
      { v4: uuidv1 } = require('uuid'),

      productApi = Router(),
      cartApi = Router(),
      Product = require('./src/controller/Product.js'),
      Cart = require('./src/controller/Cart.js'),
      User = require('./src/controller/User.js'),

      app = express(),
      port = 8080 || process.env.port;

const user = new User({name:'miguel', isAdmin: true, id: 1})
const products = new Product('products')

productApi.use(express.json());
productApi.use(express.urlencoded({extended : true}));

cartApi.use(express.json());
cartApi.use(express.urlencoded({extended : true}));


// Producto -- /api/productos
productApi.get('/', (req, res) => {
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
});


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

app.use("/api/productos", productApi);
app.use("/api", cartApi);
app.listen(port, () => {
    console.log(`Escuchando en http://localhost:${port}`)
  }).on('error', e => {
      console.log(e);
  });