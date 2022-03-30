const { default: knex } = require('knex');
const { send } = require('process');

const express = require('express'),
	//Server
	{ Server: HttpServer } = require('http'),
	{ Server: IOServer } = require('socket.io'),
	app = express(),
	httpServer = new HttpServer(app),
	io = new IOServer(httpServer),
	port = 8080 || process.env.port,
	{ faker } = require('@faker-js/faker'),
	{ normalize, schema } = require('normalizr'),
	util = require('util');
//Controllers
Chat = require('./Contenedor');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const chat = new Chat('chat');

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/api/productos-test', (req, res) => {
	const testProducts = [];

	for (let index = 0; index < 4; index++) {
		testProducts.push({
			thumbnail: faker.image.imageUrl(600, 600, 'food', true, true),
			title: faker.commerce.productName(),
			price: faker.commerce.price(),
		});
	}
	res.render('product_table.ejs', { data: testProducts, status: '' });
});

app.use(express.static(__dirname + '/public'));
httpServer
	.listen(port, () => {
		console.log(`Escuchando en http://localhost:${port}`);
	})
	.on('error', (e) => {
		console.log(e);
	});



const authors = new schema.Entity('authors');
const messages = new schema.Entity(
	'messages',
	{
		author: {authors}
	},
	{ idAttribute: 'message' }
);
const chat_schema = [messages];

io.on('connection', async (socket) => {
	//CHAT
	try {
		const raw = await chat.getAll();
		delete raw.result.objects;
		const data = raw.result;
		normal_data = normalize(data, chat_schema);
		console.log('Usuario conectado');
		socket.emit('render_history', normal_data);
	} catch (e) {
		console.log(e);
	}

	socket.on('message_send', async (raw) => {
		try {
			const msg = await chat.save(raw);
			console.log(msg);
			const data = await chat.getAll();
			io.sockets.emit('render_history', data.result);
			socket.emit('render_history', data.result);
		} catch (e) {
			console.log(e);
		}
	});
});
