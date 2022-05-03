//TODO: Add login functionality, add mongo Atlas connection

const chatAsyncConnection = require('./chat/chat.asyncConnection');

const express = require('express'),
	//SERVER
	{ Server: HttpServer } = require('http'),
	{ Server: IOServer } = require('socket.io'),
	app = express(),
	httpServer = new HttpServer(app),
	io = new IOServer(httpServer),
	//ROUTER
    productsRouter = require('./products/products.router'),
	port = 8080 || process.env.port

//Middlewares
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Sessions
app.use(
	session({
		// store: MongoStore.create({ mongoUrl: config.mongoLocal.cnxStr }),
		store: MongoStore.create({ mongoUrl: config.mongoRemote.cnxStr }),
		secret: 'shhhhhhhhhhhhhhhhhhhhh!',
		resave: false,
		saveUninitialized: false,
		rolling: true,
		cookie: {
			maxAge: 60000,
		},
	})
);

app.get('/login', (req, res) => {
	res.render('login.ejs');
});
app.use('/api/productos-test', productsRouter);

app.use(express.static(__dirname + '/public'));
httpServer
	.listen(port, () => {
		console.log(`Escuchando en http://localhost:${port}`);
	})
	.on('error', (e) => {
		console.log(e);
	});

io.on('connection', chatAsyncConnection);
