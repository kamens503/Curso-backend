module.exports.endpoints = {
    productEndpoint : '/api/productos',
    cartEndpoint    : '/api'
}

module.exports.controller = {
    file: {
        product: require('./controller/file/Product'),
        cart   : require('./controller/file/Cart')
    },
    firebase: {
        product : require('./controller/firebase/Product'),
        cart    : require('./controller/firebase/Cart')
    },
    mongo   : {
        product : require('./controller/mongo/Product'),
        cart    : require('./controller/mongo/Cart')
    },
    user : require('./controller/User')
}
