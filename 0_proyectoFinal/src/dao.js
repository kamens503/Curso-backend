
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
    cartId = process.env.file_cart_id
    productId = process.env.file_product_id
    break;
  
  case 'mongodb':
    Cart    = controller.mongodb.Cart
    Product = controller.file.Product
    cartId = process.env.mongoodb_connection
    productId = process.env.file_product_id
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