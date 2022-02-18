const express = require('express'),
      { Router } = express,
      api = Router(),
      Product = require('./src/controller/Product.js'),
    //   Cart = require('./Cart.js')
      app = express(),
      port = 8080 || process.env.port;

const products = new Product('products')
// const cart = new Cart('cart')

let admin = true;

 const newProduct = {
    name: 'Jabón',
    description: 'Para bañarse',
    sku: 5,
    img: 'masalgo',
    price: 20,
    stock: 2
 }
 let msg =products.create(admin, newProduct)
 console.log(msg);

api.use(express.json());
api.use(express.urlencoded({extended : true}));

api.get('/producto', (req, res) => {
    msg = products.create(admin, req.params)
    res.send()
});


app.use("/api", api);
app.listen(port, () => {
    console.log(`Escuchando en http://localhost:${port}`)
  }).on('error', e => {
      console.log(e);
  });