const express = require('express'),
      { Router } = express,
      api = Router(),
      Product = require('./src/controller/Product.js'),
      Cart = require('./src/controller/Cart.js'),
      User = require('./src/controller/User.js'),
      app = express(),
      port = 8080 || process.env.port;

const user = new User({name:'miguel', isAdmin: true, id: 1})
const products = new Product('products')

api.use(express.json());
api.use(express.urlencoded({extended : true}));


// Producto
api.get('/producto', (req, res) => {
    msg = products.get(user.can('read','product'))
    if (msg.status) {
        res.status(401).send(msg.result)
    }
    res.status(200).send(msg.result)
});

api.get('/producto/:id', (req, res) => {
    const id = parseInt(req.params.id)
    // console.log(id)
    msg = products.get(user.can('read','product'),id)
    if (msg.status) {
        res.status(401).send(msg.result)
    }
    res.status(200).send(msg.result)
});

api.post('/producto', (req, res) => {
    const newProduct = req.body
    console.log(newProduct);
    msg = products.create(user.can('create','product'), newProduct)

    if (!msg.done) {
        res.status(500).send(msg.result)
    }
    res.status(200).send(msg.result)
});

api.put('/producto/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const newProduct = req.body
    msg = products.update(user.can('update','product'), id, newProduct)
    res.send(msg)
});

api.delete('/producto/:id', (req, res) => {
    const id = parseInt(req.params.id)
    msg = products.delete(user.can('delete','product'), id)
    res.send(msg)
});


//Carrito

api.get('/', (req, res) => {
    const id = parseInt(req.params.id)

    const cart = new Cart(user.getId(), user.getName())
    msg = cart.get(user.can('read','cart'),id)
    if (msg.status) {
        res.status(401).send(msg.result)
    }
    const result = {cartId: user.getId()} 
    console.log(result)
    res.status(200).send( result )
});

api.get('/:id/producto', (req, res) => {
    const id = parseInt(req.params.id)

    const cart = new Cart(id, user.getName())
    msg = cart.get(user.can('read','cart'),id)
    if (msg.status) {
        res.status(401).send(msg.result)
    }
    res.status(200).send(msg.result)
});

api.post('/:id/producto', (req, res) => {
    const id = parseInt(req.params.id)
    const newProduct = req.body

    const cart = new Cart(id, user.getName())
    msg = cart.create(user.can('create','product'), newProduct)

    if (!msg.done) {
        res.status(500).send(msg.result)
    }
    res.status(200).send(msg.result)
});

api.delete('/:id', (req, res) => {
    const cart = new Cart(id, user.getName())
    msg = cart.delete(user.can('delete','product'), 'ALL')
    res.send(msg)
});

api.delete('/:id/:id_prod', (req, res) => {
    const id = parseInt(req.params.id)
    msg = cart.delete(user.can('delete','product'), id_prod)
    res.send(msg)
});

app.use("/api", api);
app.listen(port, () => {
    console.log(`Escuchando en http://localhost:${port}`)
  }).on('error', e => {
      console.log(e);
  });