
/* eslint-disable no-undef */
const express = require('express'),
	app = express(),
	port = 8080 || process.env.port,
	cartApi = require('./src/routers/cart'),
	productApi = require('./src/routers/product');
    (User = require('./src/controller/User')),
	({ controller } = require('./src/config')),
	(user = new User({
		name: controller.user.name,
		isAdmin: controller.user.admin,
		id: 0,
	})),
    { accessControl } = require('./src/middleware')


//Middleware -> User access control
app.use((req, res, next) => {
	const method = req.method,
		url = req.originalUrl,
        msg = accessControl(method,url, user)
    if (!msg.done) { return res.status(403).send(msg.result) }
	next();
});

app.use('/api/productos', productApi);
app.use('/api', cartApi);

app.use((req, res) => {
	res.status(404).send('Error 404: Ruta o protocolo equivocado');
});

app
	.listen(port, () => {
		console.log(`Escuchando en http://localhost:${port}`);
	})
	.on('error', (e) => {
		console.log(e);
	});
