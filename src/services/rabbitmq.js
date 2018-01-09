module.exports = (config) => {
	const open = require('amqplib').connect(config.rabbitHost);

	open.then((conn) => {
		return conn.createChannel();
	}).then((ch) => {
		
	});
}