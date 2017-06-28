const Settings = require('./settings');

const debug = (msg) => {
	if (Settings.debug) {
		console.log('\x1b[37m', 'Doxter [DEBUG] ||', msg);
		return msg;
	}
	return null;
};
const success = (msg) => {
	console.log('\x1b[32m', 'Doxter >', msg);
	return msg;
};
const error = (msg) => {
	console.log('\x1b[31m', 'Doxter [ERROR]', msg);
	return msg;
};

module.exports = {
	debug,
	success,
	error,
};
