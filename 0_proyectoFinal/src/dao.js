
require('dotenv').config()

const { controller, container } = require('./config.js')

let Cart, 
    Product,
    cartId,
    productId

console.log(`Using ${container.provider} as a provider`);
switch (container.provider) {
  case 'file':
    Cart      = controller.file.Cart
    Product   = controller.file.Product
    cartId    = container.file.name.cart
    productId = container.file.name.product
    break;
  
  case 'mongodb':
    Cart      = controller.mongodb.Cart
    Product   = controller.file.Product
    cartId    = process.env.MONGODB_CONNECTION
    productId = process.env.MONGODB_CONNECTION
    break;

  case 'firebase':
    Cart    = controller.firebase.Cart
    Product = controller.firebase.Product
    cartId    = process.firebase.collection.cart
    productId = process.firebase.collection.product
    break;

  default:
    Cart    = controller.file.Cart
    Product = controller.file.Product
    cartId    = container.file.name.cart
    productId = container.file.name.product
    break;
}


module.exports.cart    = new Cart(cartId)
module.exports.products = new Product(productId)