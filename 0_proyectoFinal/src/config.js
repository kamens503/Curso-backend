module.exports.endpoints = {
    productEndpoint : '/api/productos',
    cartEndpoint    : '/api'
}

module.exports.controller = {
    file: {
        Product: require('./controller/file/Product'),
        Cart   : require('./controller/file/Cart')
    },
    firebase: {
        Product : require('./controller/firebase/Product'),
        Cart    : require('./controller/firebase/Cart')
    },
    mongodb: {
        Product : require('./controller/mongo/Product'),
        Cart    : require('./controller/mongo/Cart')
    },
    user : require('./controller/User')
}
