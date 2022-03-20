
require('dotenv').config()

const { controller } = require('./config.js')

let Cart, 
    Product,
    cartId,
    productId

switch (process.env.provider) {
  case 'file':
    Cart    = controller.file.Cart
    Product = controller.file.Product
    cartId = process.env.FILE_CART_ID
    productId = process.env.FILE_PRODUCT_ID
    break;
  
  case 'mongodb':
    Cart    = controller.mongodb.Cart
    Product = controller.file.Product
    cartId = process.env.MONGODB_CONNECTION
    productId = process.env.MONGODB_CONNECTION
    break;

  case 'firebase':
    Cart    = controller.firebase.Cart
    Product = controller.firebase.Product
    break;

  default:
    Cart    = controller.file.Cart
    Product = controller.file.Product
    break;
}


module.exports.Cart = new Cart(cartId)
module.exports.Product = new Product(productId)