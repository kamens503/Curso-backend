module.exports.accessControl = (method, url, user) => {
	let container = 'cart';

	if (url.includes('/api/productos')) {
		container = 'product';
	}
	console.log(user.can('read', container));
	switch (method) {
		case 'GET':
			if (!user.can('read', container)) {
				console.log('GET');
				return { done: true, result: 'No tienes acceso a esta funcionalidad' };
			}
			break;
		case 'POST':
			if (!user.can('create', container)) {
				return { done: true, result: 'No tienes acceso a esta funcionalidad' };
			}
			break;
		case 'PUT':
			if (!user.can('update', container)) {
				return { done: true, result: 'No tienes acceso a esta funcionalidad' };
			}
			break;
		case 'DELETE':
			if (!user.can('delete', container)) {
				return { done: true, result: 'No tienes acceso a esta funcionalidad' };
			}
			break;
		default:
			return { done: true, result: 'No tienes acceso a esta funcionalidad' };
	}
	return { done: true };
};

// eslint-disable-next-line no-unused-vars
module.exports.validateNewProduct = (req, res, next) => {
	const object = req.body;
	let valid = false,
		response = {};

	valid =
		'name' in object &&
		'description' in object &&
		'sku' in object &&
		'img' in object &&
		'price' in object &&
		'stock' in object;

	response = {
		name: 'name' in object ? 'OK' : 'Faltante',
		description: 'description' in object ? 'OK' : 'Faltante',
		sku: 'sku' in object ? 'OK' : 'Faltante',
		img: 'img' in object ? 'OK' : 'Faltante',
		price: 'price' in object ? 'OK' : 'Faltante',
		stock: 'stock' in object ? 'OK' : 'Faltante',
	};

	if (!valid) {
		response.msg = 'Error: Datos faltantes';
		return res.status(400).send(response);
	}

	valid =
		typeof object.name == 'string' &&
		typeof object.description == 'string' &&
		typeof object.img == 'string' &&
		typeof object.price == 'number' &&
		typeof object.stock == 'number';

	response = {
		name: typeof object.name == 'string' ? 'OK' : 'Tipo incorrecto',
		description:
			typeof object.description == 'string' ? 'OK' : 'Tipo incorrecto',
		img: typeof object.img == 'string' ? 'OK' : 'Tipo incorrecto',
		price: typeof object.price == 'number' ? 'OK' : 'Tipo incorrecto',
		stock: typeof object.stock == 'number' ? 'OK' : 'Tipo incorrecto',
	};

	if (!valid) {
		response.msg = 'Error: Datos incorrectos';
		return res.status(400).send(response);
	}

	next();
};

// eslint-disable-next-line no-unused-vars
module.exports.validateProductChange = (req, res, next) => {
	const object = req.body;
	let incorrect = false;

	incorrect =
		typeof object.name != 'string' ||
		typeof object.description != 'string' ||
		typeof object.img != 'string' ||
		typeof object.price != 'number' ||
		typeof object.stock != 'number';

	if (incorrect) {
		const msg = 'Error: Algunos o todos los datos son incorrectos';
		return res.status(400).send(msg);
	}

	next();
};
