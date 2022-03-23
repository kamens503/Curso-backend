module.exports.endpoints = {
	productEndpoint : '/api/productos',
	cartEndpoint    : '/api',
};



module.exports.container = {
	provider : "firebase", //Available -> file / mongodb / firebase
  mongodb  : {
    host : process.env.MONGODB_CONNECTION,
    collection: {
      // Take into account mongoose convert collections name in plural cuz it hate me (So many hours lost on this...) It WILL break the code if you use a singular name 
      cart    : 'carts',
      product : 'products'
    },
  },
  file : {
    name: {
      cart    : 'default',
      product : 'products'
    }
  },
  firebase : {
    collection: {
      cart    : 'carts',
      product : 'products'
    }
  }
};

module.exports.controller = {
	file: {
		Product : require('./controller/file/Product'),
		Cart    : require('./controller/file/Cart'),
	},
	firebase: {
		Product : require('./controller/firebase/Product'),
		Cart    : require('./controller/firebase/Cart'),
	},
	mongodb: {
		Product : require('./controller/mongo/Product'),
		Cart    : require('./controller/mongo/Cart'),
	},
	user : {
    controller : require('./controller/User'),
    admin      : true,
    name       : 'Miguel'
  },
};