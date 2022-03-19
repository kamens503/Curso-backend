const { Schema, model} = require('mongoose')

const productSchema = new Schema ({
    name        : { type: String, required: true },
    price       : { type: Number, required: true },
    description : { type: String, required: true },
    sku         : { type: Number, required: true},
    img         : { type: String, required: true},
    stock       : { type: Number, required: true},
    timestamp   : { type: String, required: true}
})

module.exports = model('products', productSchema)