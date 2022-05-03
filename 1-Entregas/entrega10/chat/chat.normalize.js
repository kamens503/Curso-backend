const { normalize, schema } = require('normalizr')
     

const authors = new schema.Entity('authors');
const messages = new schema.Entity(
	'messages',
	{
		author: {authors}
	},
	{ idAttribute: 'message' }
);
const chat_schema = [messages];
module.exports = (data) => normalize(data, chat_schema);