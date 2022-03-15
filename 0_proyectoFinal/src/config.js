const User = require('./controller/User.js')


module.exports.user = new User({name:'miguel', isAdmin: true, id: 1})

module.exports.controller = {
    file: {
        product: require('./controller/file/Product'),
        cart: require('./controller/file/Cart')
    },
    firebase: {
        product: require('./controller/firebase/Product'),
        cart: require('./controller/firebase/Cart')
    },
    mongo: {
        product: require('./controller/mongo/Product'),
        cart: require('./controller/mongo/Cart')
    }
}
