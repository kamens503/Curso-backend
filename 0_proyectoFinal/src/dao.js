
require('dotenv').config()

const { controller, container } = require('./config.js')


let Cart, 
    Product,
    cartId,
    productId

switch (container.provider) {
  case 'file':
    Cart      = controller.file.Cart
    Product   = controller.file.Product
    cartId    = container.file.name.cart
    productId = container.file.name.product
    break;
  
  case 'mongodb':
    Cart      = controller.mongodb.Cart
    Product   = controller.mongodb.Product
    cartId    = container.mongodb.collection.cart
    productId = container.mongodb.collection.product
    break;

  case 'firebase':
    Cart    = controller.firebase.Cart
    Product = controller.firebase.Product
    cartId    = container.firebase.collection.cart
    productId = container.firebase.collection.product
    break;

  default:
    Cart    = controller.file.Cart
    Product = controller.file.Product
    cartId    = container.file.name.cart
    productId = container.file.name.product
    break;
}


module.exports.cartId   = cartId
module.exports.cart     = new Cart(cartId)
module.exports.products = new Product(productId)