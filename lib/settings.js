const path = require('path');

module.exports = {
	source: path.join(__dirname, '../test/'),
    destination: path.join(__dirname, '../documentation/'),
	debug: true,
};
