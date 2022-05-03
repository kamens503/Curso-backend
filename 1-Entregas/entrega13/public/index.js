const socket = io();
const date = new Date();

const chat = document.querySelector('#history');
const form = document
	.querySelector('#form')
	.addEventListener('submit', (event) => {
		event.preventDefault();
		const message = document.querySelector('#msg').value,
			name = document.querySelector('#name').value,
			last_name = document.querySelector('#last_name').value,
			age = document.querySelector('#age').value,
			alias = document.querySelector('#alias').value,
			avatar = document.querySelector('#avatar').value,
			_date = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

		socket.emit('message_send', {
			author: {
				name,
				last_name,
				age,
				alias,
				avatar,
			},
			message,

			date: _date,
		});
	});

socket.on('render_history', (raw) => {
    console.log(raw);
	const schema = normalizr.schema;
	const denormalize = normalizr.denormalize;
	const authors = new schema.Entity('authors');
	const _messages = new schema.Entity(
		'messages',
		{
			author: { authors },
		},
		{ idAttribute: 'message' }
	);
	const chat_schema = [_messages];
	const messages = denormalize(raw.result, chat_schema, raw.entities);
	let html = '';
	console.log(messages);
	if (!messages || messages?.length < 1) {
		chat.innerHTML = '<p class="ml-2">No hay mensajes</p>';
		return;
	}
	Object.values(messages).forEach((message) => {
		console.log(message);
		if (!message) {
			return;
		}
		html += `<div class=" text-white bubble inline-block ${
			message.alias == document.querySelector('#alias').value
				? 'bg-green-800 mx-5'
				: 'bg-slate-800'
		} p-5 rounded-md mx-3 my-2 relative w-3/4">
                <img src='${message.author.avatar}' class='inline-block w-10'> 
                <b class="user text-sm"> ${message.author.alias}</b>
                <i class="absolute top-2 right-2 opacity-40 text-xs">${
									message.date
								}</i :<br> 
                <p>${message.message}</p></div>`;
		html += '<br>';
	});
	chat.innerHTML = html;
});
