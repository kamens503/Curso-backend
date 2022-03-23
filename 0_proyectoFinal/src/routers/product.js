// TODO: Refactor all endpoints
const express     = require('express'),
      { Router }  = express,
      { products } = require('../dao')


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

try {
  products.init()
} catch (error) {
  throw `No se pudo iniciar el controller ${error}`
}




// Producto -- /api/productos
productApi.get('/', (req, res) => {
    msg = products.get()
    if (!msg.done) {
        return res.status(401).send(msg.result)
    }
    return res.status(200).send(msg.result)
});

productApi.get('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    msg = products.get(id)
    if (!msg.done) {
        res.status(401).send(msg.result)
    }
    res.status(200).send(msg.result)
});

productApi.post('/', (req, res) => {
    const newProduct = req.body

    if (!newProduct) {
        return res.status(400).send('Error, debe usar body, no query')
    }
    msg = products.addProduct(newProduct)

    if (!msg.done) {
      return res.status(500).send(msg.result)
    }
    res.status(200).send(msg.result)
});

productApi.put('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const newProduct = req.body
    msg = products.update(id, newProduct)
    if (!msg.done) {
      return res.status(500).send(msg.result)
    }
    return res.status(200).send(msg.result)
});

productApi.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    msg = products.delete(id)
    if (!msg.done) {
      return res.status(500).send(msg.result)
    }
    return res.status(200).send(msg.result)
})


module.exports = productApi