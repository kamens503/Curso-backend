const Chat = require('./Contenedor'),
	chat = new Chat('chat');

module.exports = async function chatAsyncConnection(socket) {
	//CHAT
	try {
		const raw = await chat.getAll();
		delete raw.result.objects;
		const data = raw.result;
		normal_data = console.log('Usuario conectado');
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
};
