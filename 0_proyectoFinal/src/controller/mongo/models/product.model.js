const { Schema, model} = require('mongoose')
require('dotenv').config()

const productSchema = new Schema ({
    name        : { type: String, required: true },
    price       : { type: Number, required: true },
    description : { type: String, required: true },
    sku         : { type: Number, required: true},
    img         : { type: String, required: true},
    stock       : { type: Number, required: true},
    timestamp   : { type: String, required: true}
})

module.exports = model(process.env.MONGODB_PRODUCT_COLLECTION, productSchema)