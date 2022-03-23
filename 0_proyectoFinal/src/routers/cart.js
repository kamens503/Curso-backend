// TODO: Refactor all endpoints

const express = require('express'),
      { Router } = express,
      { v4: uuidv1 } = require('uuid')

let   { cart } = require('../dao'),
      { container : cart_container } = require('../config')


const cartApi = Router()

//Middlewares
cartApi.use(express.json());
cartApi.use(express.urlencoded({extended : true}))

//Middleware - Init cart
cartApi.use( (req,res,next) => {
  try {
    cart.init()
    return next()

  } catch (error) {
    throw `No se pudo iniciar el controller ${error}`
  }
})

//Middleware - Assign cart by id
cartApi.use( (req,res,next) => {
  const id = req.params.id
  if (!id) { return next() }
  
  cart.assignCart(id)
      .then( () => {
        return next()
      })
      .catch( e => {
        return res.status(401).send(e)
      })
})



// Carrito  -- /api/
cartApi.post('/', async (req, res) => {
    const id = uuidv1()
  console.log(id);

    const msg = await cart.assignCart(id)

    if (!msg.done) {
        return res.status(401).send(msg.result)
    }
    return res.status(200).send(id)
});

cartApi.get('/:id/productos', async(req, res) => {
  const msg = await cart.get()
  if (!msg.done) {
    return res.status(401).send(msg.result)
  }
  res.status(200).send(msg.result)
});

cartApi.get('/:id/productos/:idProduct', async (req, res) => {

  let idProduct
  if (cart_container == 'file') {
    idProduct = parseInt(req.params.idProduct)
  } else {
    idProduct = req.params.idProduct
  }

  const msg = await cart.get(idProduct)
  if (msg.status) {
    return res.status(401).send(msg.result)
  }
  return res.status(200).send(msg.result)
});

cartApi.post('/:id/productos', async (req, res) => {
    const newProduct = req.body

    if (!newProduct) {
        res.status(400).send('Error: No se pudo recibir los datos, debe enviar json en el body del pedido')
    }

    const msg = await cart.addProduct(newProduct)
    if (!msg.done) {
      return res.status(500).send(msg.result)
    }
    return res.status(200).send(msg.result)
});

cartApi.delete('/:id', async (req, res) => {
    const msg = await cart.delete()
    if (!msg.done) {
      return res.status(401).send(msg.result)
    }
    return res.status(200).send(msg.result)
});

cartApi.delete('/:id/productos/:idProduct',async (req, res) => {
  let idProduct
  if (cart_container == 'file') {
    idProduct = parseInt(req.params.idProduct)
  } else {
    idProduct = req.params.idProduct
  }

  const msg = await cart.delete( idProduct )
  if (!msg.done) {
    return res.status(401).send(msg.result)
  }
  return res.status(200).send(msg.result)
});

module.exports = cartApi